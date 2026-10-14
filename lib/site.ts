export function siteUrl() {
  return (process.env.SITE_URL || "https://www.mintxsolutions.com").replace(/\/$/, "");
}

export function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(date);
}
