import { readResumeFile } from "@/lib/files";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const file = await readResumeFile(id);
  if (!file) return new Response("Not found", { status: 404 });
  const extension = file.filename.toLowerCase();
  const type = extension.endsWith(".pdf")
    ? "application/pdf"
    : extension.endsWith(".docx")
      ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      : "application/msword";
  return new Response(new Uint8Array(file.data), {
    headers: {
      "Content-Type": type,
      "Content-Disposition": `attachment; filename="${file.filename.replace(/"/g, "")}"`,
      "Cache-Control": "private, no-store",
    },
  });
}
