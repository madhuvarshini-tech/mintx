"use server";

import { randomBytes } from "crypto";
import { createWriteStream } from "fs";
import path from "path";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { budgetOptions } from "@/lib/content";
import { hashPassword, verifyPassword } from "@/lib/password";
import { rateLimit } from "@/lib/rate-limit";
import { readSession, signSession } from "@/lib/session";
import {
  addApplication,
  addAudit,
  addInquiry,
  getApplications,
  getContent,
  getInquiries,
  getUsers,
  saveApplications,
  saveContent,
  saveInquiries,
  saveUsers,
  uploadRoot,
} from "@/lib/store";
import type { FormState, InquiryStatus } from "@/lib/types";

async function clientKey() {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headerList.get("x-real-ip") || "local";
}

async function currentUser() {
  const jar = await cookies();
  return readSession(jar.get("mx_session")?.value);
}

async function requireUser() {
  const user = await currentUser();
  if (!user) redirect("/admin/login");
  return user;
}

function text(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function submitInquiry(_prev: FormState, formData: FormData): Promise<FormState> {
  if (text(formData, "fax_number")) return { ok: true, message: "Inquiry received. We will reply by email." };

  const limit = rateLimit(`contact:${await clientKey()}`, 5, 15 * 60 * 1000);
  if (!limit.ok) {
    return { ok: false, message: `Too many attempts. Try again in ${limit.retryAfter} seconds.` };
  }

  const services = getContent().services.map((service) => service.title);
  const parsed = z
    .object({
      name: z.string().min(2, "Enter your full name.").max(80),
      email: z.string().email("Enter a valid email address."),
      phone: z.string().max(20).optional().or(z.literal("")),
      company: z.string().max(80).optional().or(z.literal("")),
      service: z.string().refine((value) => services.includes(value) || value === "Not sure yet", "Choose a service."),
      budget: z.string().refine((value) => value === "" || budgetOptions.includes(value as (typeof budgetOptions)[number]), "Choose a budget range."),
      details: z.string().min(20, "Add a little more detail, at least 20 characters.").max(4000),
      consent: z.literal("yes", { errorMap: () => ({ message: "Consent is required before we can store this inquiry." }) }),
    })
    .safeParse({
      name: text(formData, "name"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      company: text(formData, "company"),
      service: text(formData, "service"),
      budget: text(formData, "budget"),
      details: text(formData, "details"),
      consent: text(formData, "consent"),
    });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] = issue.message;
    }
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const saved = addInquiry({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    company: parsed.data.company || "",
    service: parsed.data.service,
    budget: parsed.data.budget || "",
    details: parsed.data.details,
  });

  const mailed = await notifyInquiry(saved.id, parsed.data);
  return {
    ok: true,
    message: mailed
      ? "Inquiry received. A copy was sent to the studio inbox and saved in the dashboard."
      : "Inquiry received and saved. The studio will reply by email.",
  };
}

async function notifyInquiry(
  id: string,
  data: { name: string; email: string; phone?: string; company?: string; service: string; budget?: string; details: string },
) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO || getContent().settings.email;
  if (!host || !user || !pass || !to) return false;
  try {
    const nodemailer = await import("nodemailer");
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT || 587) === 465,
      auth: { user, pass },
    });
    await transport.sendMail({
      from: process.env.SMTP_FROM || user,
      to,
      replyTo: data.email,
      subject: `New project inquiry from ${data.name}`,
      text: [`Inquiry ${id}`, data.name, data.email, data.phone || "", data.company || "", data.service, data.budget || "", "", data.details].join("\n"),
    });
    return true;
  } catch (error) {
    console.error("Inquiry email failed", error);
    return false;
  }
}

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  if (text(formData, "fax_number")) return { ok: true, message: "Application received." };
  const limit = rateLimit(`career:${await clientKey()}`, 4, 30 * 60 * 1000);
  if (!limit.ok) return { ok: false, message: `Too many attempts. Try again in ${limit.retryAfter} seconds.` };

  const roles = ["General application", ...getContent().roles.filter((role) => role.published).map((role) => role.title)];
  const parsed = z
    .object({
      name: z.string().min(2, "Enter your name.").max(80),
      email: z.string().email("Enter a valid email address."),
      phone: z.string().max(20).optional().or(z.literal("")),
      role: z.string().refine((value) => roles.includes(value), "Choose a role."),
      note: z.string().min(10, "Add a short note.").max(2000),
    })
    .safeParse({
      name: text(formData, "name"),
      email: text(formData, "email"),
      phone: text(formData, "phone"),
      role: text(formData, "role"),
      note: text(formData, "note"),
    });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { ok: false, message: "Check the highlighted fields.", fieldErrors };
  }

  const file = formData.get("resume");
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, message: "Attach a resume.", fieldErrors: { resume: "Attach a PDF, DOC, or DOCX file." } };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, message: "That file is over 5 MB.", fieldErrors: { resume: "Keep the resume under 5 MB." } };
  }
  const extension = path.extname(file.name).toLowerCase();
  if (![".pdf", ".doc", ".docx"].includes(extension)) {
    return { ok: false, message: "Use a PDF, DOC, or DOCX resume.", fieldErrors: { resume: "PDF, DOC, or DOCX only." } };
  }

  const filename = `${randomBytes(16).toString("hex")}${extension}`;
  const fullPath = path.join(uploadRoot(), filename);
  const stream = createWriteStream(fullPath);
  stream.write(Buffer.from(await file.arrayBuffer()));
  await new Promise<void>((resolve, reject) => {
    stream.end(() => resolve());
    stream.on("error", reject);
  });

  addApplication({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone || "",
    role: parsed.data.role,
    note: parsed.data.note,
    resumeName: path.basename(file.name),
    resumePath: filename,
  });

  return { ok: true, message: "Application received. We will write if there is a match." };
}

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const limit = rateLimit(`login:${await clientKey()}`, 8, 15 * 60 * 1000);
  if (!limit.ok) return { ok: false, message: "Too many login attempts. Wait and try again." };

  const email = text(formData, "email").toLowerCase();
  const password = String(formData.get("password") ?? "");
  const secret = process.env.SESSION_SECRET;
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!secret || !adminEmail || !adminPassword) {
    return { ok: false, message: "Admin login is not configured. Set SESSION_SECRET, ADMIN_EMAIL, and ADMIN_PASSWORD." };
  }

  let users = getUsers();
  if (users.length === 0) {
    users = [{ email: adminEmail, passwordHash: hashPassword(adminPassword) }];
    saveUsers(users);
    addAudit("system", "admin.seed", "Created the first admin from environment variables.");
  }

  const user = users.find((item) => item.email === email);
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return { ok: false, message: "Email or password is incorrect." };
  }

  const token = await signSession(user.email, secret);
  const jar = await cookies();
  jar.set("mx_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  addAudit(user.email, "auth.login", "Signed in.");
  redirect("/admin");
}

export async function logout() {
  const user = await currentUser();
  const jar = await cookies();
  jar.delete("mx_session");
  if (user) addAudit(user.email, "auth.logout", "Signed out.");
  redirect("/admin/login");
}

export async function updateInquiryStatus(formData: FormData) {
  const user = await requireUser();
  const id = text(formData, "id");
  const status = text(formData, "status") as InquiryStatus;
  if (!["new", "read", "replied", "archived"].includes(status)) return;
  const all = getInquiries();
  const item = all.find((inquiry) => inquiry.id === id);
  if (!item) return;
  item.status = status;
  saveInquiries(all);
  addAudit(user.email, "inquiry.status", `${id} set to ${status}`);
}

export async function updateApplicationStatus(formData: FormData) {
  const user = await requireUser();
  const id = text(formData, "id");
  const status = text(formData, "status");
  if (!["new", "read", "archived"].includes(status)) return;
  const all = getApplications();
  const item = all.find((application) => application.id === id);
  if (!item) return;
  item.status = status as "new" | "read" | "archived";
  saveApplications(all);
  addAudit(user.email, "application.status", `${id} set to ${status}`);
}

export async function saveService(formData: FormData) {
  const user = await requireUser();
  const content = getContent();
  const slug = text(formData, "slug");
  const service = content.services.find((item) => item.slug === slug);
  if (!service) return;
  service.title = text(formData, "title") || service.title;
  service.summary = text(formData, "summary");
  service.body = text(formData, "body").split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  service.published = formData.get("published") === "yes";
  saveContent(content);
  addAudit(user.email, "service.save", slug);
}

export async function saveProject(formData: FormData) {
  const user = await requireUser();
  const content = getContent();
  const slug = text(formData, "slug");
  let project = content.projects.find((item) => item.slug === slug);
  if (!project) {
    const name = text(formData, "name");
    if (name.length < 2) return;
    const nextSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || randomBytes(4).toString("hex");
    project = {
      slug: nextSlug,
      name,
      url: null,
      category: "Business website",
      image: null,
      imageAlt: null,
      summary: "Website developed by MintX Solutions.",
      linkNote: null,
      published: true,
    };
    content.projects.unshift(project);
  }
  project.name = text(formData, "name") || project.name;
  const url = text(formData, "url");
  project.url = url || null;
  project.category = text(formData, "category") || project.category;
  project.summary = text(formData, "summary") || project.summary;
  project.linkNote = text(formData, "linkNote") || null;
  project.published = formData.get("published") === "yes";
  saveContent(content);
  addAudit(user.email, "project.save", project.slug);
}

export async function saveProduct(formData: FormData) {
  const user = await requireUser();
  const content = getContent();
  content.product.summary = text(formData, "summary") || content.product.summary;
  content.product.problem = text(formData, "problem");
  content.product.solution = text(formData, "solution");
  content.product.url = text(formData, "url") || content.product.url;
  const features = [0, 1, 2, 3].map((index) => ({
    title: text(formData, `feature_title_${index}`),
    text: text(formData, `feature_text_${index}`),
  })).filter((feature) => feature.title && feature.text);
  if (features.length) content.product.features = features;
  saveContent(content);
  addAudit(user.email, "product.save", content.product.slug);
}

export async function savePost(formData: FormData) {
  const user = await requireUser();
  const content = getContent();
  const slug = text(formData, "slug");
  let post = content.posts.find((item) => item.slug === slug);
  if (!post) {
    const title = text(formData, "title");
    if (title.length < 4) return;
    post = {
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title,
      date: new Date().toISOString().slice(0, 10),
      paragraphs: [],
      published: false,
    };
    content.posts.unshift(post);
  }
  post.title = text(formData, "title") || post.title;
  post.date = text(formData, "date") || post.date;
  post.paragraphs = text(formData, "body").split(/\n\s*\n/).map((part) => part.trim()).filter(Boolean);
  post.published = formData.get("published") === "yes";
  saveContent(content);
  addAudit(user.email, "post.save", post.slug);
}

export async function saveSettings(formData: FormData) {
  const user = await requireUser();
  const content = getContent();
  content.settings = {
    email: text(formData, "email") || content.settings.email,
    phoneDisplay: text(formData, "phoneDisplay") || content.settings.phoneDisplay,
    phoneTel: text(formData, "phoneTel") || content.settings.phoneTel,
    whatsapp: text(formData, "whatsapp") || content.settings.whatsapp,
    instagram: text(formData, "instagram") || content.settings.instagram,
    instagramHandle: text(formData, "instagramHandle") || content.settings.instagramHandle,
    location: text(formData, "location") || content.settings.location,
  };
  saveContent(content);
  addAudit(user.email, "settings.save", "Updated public contact settings.");
}

