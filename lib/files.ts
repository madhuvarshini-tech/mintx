<<<<<<< HEAD
import { readFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { readSession } from "@/lib/session";
import { getApplications, uploadRoot } from "@/lib/store";

export async function readResumeFile(id: string) {
  const jar = await cookies();
  const user = await readSession(jar.get("mx_session")?.value);
  if (!user) return null;
  const application = getApplications().find((item) => item.id === id);
  if (!application) return null;
  const root = uploadRoot();
  const fullPath = path.resolve(root, application.resumePath);
  if (!fullPath.startsWith(root)) return null;
  const data = await readFile(fullPath);
  return { filename: application.resumeName, data };
}
=======
import { readFile } from "fs/promises";
import path from "path";
import { cookies } from "next/headers";
import { readSession } from "@/lib/session";
import { getApplications, uploadRoot } from "@/lib/store";

export async function readResumeFile(id: string) {
  const jar = await cookies();
  const user = await readSession(jar.get("mx_session")?.value);
  if (!user) return null;
  const application = getApplications().find((item) => item.id === id);
  if (!application) return null;
  const root = uploadRoot();
  const fullPath = path.resolve(root, application.resumePath);
  if (!fullPath.startsWith(root)) return null;
  const data = await readFile(fullPath);
  return { filename: application.resumeName, data };
}
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
