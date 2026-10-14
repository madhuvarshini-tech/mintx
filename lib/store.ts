<<<<<<< HEAD
import { randomUUID } from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { seedContent } from "@/lib/content";
import type { Application, AuditEntry, Content, Inquiry } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const uploadDir = path.join(dataDir, "private-uploads");

type UserRecord = { email: string; passwordHash: string };

function ensureDir() {
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(uploadDir, { recursive: true });
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path.join(dataDir, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  ensureDir();
  writeFileSync(path.join(dataDir, file), JSON.stringify(value, null, 2));
}

export function getContent(): Content {
  const stored = readJson<Partial<Content>>("content.json", {});
  return {
    services: stored.services ?? seedContent.services,
    projects: stored.projects ?? seedContent.projects,
    posts: stored.posts ?? seedContent.posts,
    roles: stored.roles ?? seedContent.roles,
    product: stored.product ?? seedContent.product,
    settings: { ...seedContent.settings, ...stored.settings },
  };
}

export function saveContent(content: Content) {
  writeJson("content.json", content);
}

export function getUsers() {
  return readJson<UserRecord[]>("users.json", []);
}

export function saveUsers(users: UserRecord[]) {
  writeJson("users.json", users);
}

export function getInquiries() {
  return readJson<Inquiry[]>("inquiries.json", []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveInquiries(inquiries: Inquiry[]) {
  writeJson("inquiries.json", inquiries);
}

export function addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) {
  const next: Inquiry = { ...inquiry, id: randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  const all = getInquiries();
  all.unshift(next);
  saveInquiries(all);
  return next;
}

export function getApplications() {
  return readJson<Application[]>("applications.json", []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveApplications(applications: Application[]) {
  writeJson("applications.json", applications);
}

export function addApplication(application: Omit<Application, "id" | "createdAt" | "status">) {
  const next: Application = {
    ...application,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const all = getApplications();
  all.unshift(next);
  saveApplications(all);
  return next;
}

export function getAudit() {
  return readJson<AuditEntry[]>("audit.json", []).sort((a, b) => (a.at < b.at ? 1 : -1));
}

export function addAudit(actor: string, action: string, detail: string) {
  const all = getAudit();
  all.unshift({ id: randomUUID(), at: new Date().toISOString(), actor, action, detail });
  writeJson("audit.json", all.slice(0, 400));
}

export function uploadRoot() {
  ensureDir();
  return uploadDir;
}
=======
import { randomUUID } from "crypto";
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { seedContent } from "@/lib/content";
import type { Application, AuditEntry, Content, Inquiry } from "@/lib/types";

const dataDir = path.join(process.cwd(), "data");
const uploadDir = path.join(dataDir, "private-uploads");

type UserRecord = { email: string; passwordHash: string };

function ensureDir() {
  mkdirSync(dataDir, { recursive: true });
  mkdirSync(uploadDir, { recursive: true });
}

function readJson<T>(file: string, fallback: T): T {
  try {
    return JSON.parse(readFileSync(path.join(dataDir, file), "utf8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, value: unknown) {
  ensureDir();
  writeFileSync(path.join(dataDir, file), JSON.stringify(value, null, 2));
}

export function getContent(): Content {
  const stored = readJson<Partial<Content>>("content.json", {});
  return {
    services: stored.services ?? seedContent.services,
    projects: stored.projects ?? seedContent.projects,
    posts: stored.posts ?? seedContent.posts,
    roles: stored.roles ?? seedContent.roles,
    product: stored.product ?? seedContent.product,
    settings: { ...seedContent.settings, ...stored.settings },
  };
}

export function saveContent(content: Content) {
  writeJson("content.json", content);
}

export function getUsers() {
  return readJson<UserRecord[]>("users.json", []);
}

export function saveUsers(users: UserRecord[]) {
  writeJson("users.json", users);
}

export function getInquiries() {
  return readJson<Inquiry[]>("inquiries.json", []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveInquiries(inquiries: Inquiry[]) {
  writeJson("inquiries.json", inquiries);
}

export function addInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "status">) {
  const next: Inquiry = { ...inquiry, id: randomUUID(), createdAt: new Date().toISOString(), status: "new" };
  const all = getInquiries();
  all.unshift(next);
  saveInquiries(all);
  return next;
}

export function getApplications() {
  return readJson<Application[]>("applications.json", []).sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function saveApplications(applications: Application[]) {
  writeJson("applications.json", applications);
}

export function addApplication(application: Omit<Application, "id" | "createdAt" | "status">) {
  const next: Application = {
    ...application,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  const all = getApplications();
  all.unshift(next);
  saveApplications(all);
  return next;
}

export function getAudit() {
  return readJson<AuditEntry[]>("audit.json", []).sort((a, b) => (a.at < b.at ? 1 : -1));
}

export function addAudit(actor: string, action: string, detail: string) {
  const all = getAudit();
  all.unshift({ id: randomUUID(), at: new Date().toISOString(), actor, action, detail });
  writeJson("audit.json", all.slice(0, 400));
}

export function uploadRoot() {
  ensureDir();
  return uploadDir;
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
