<<<<<<< HEAD
export type Service = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
  published: boolean;
};

export type Project = {
  slug: string;
  name: string;
  url: string | null;
  category: string;
  image: string | null;
  imageAlt: string | null;
  summary: string;
  linkNote: string | null;
  published: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
  published: boolean;
};

export type Role = {
  slug: string;
  title: string;
  type: string;
  location: string;
  posted: string;
  summary: string;
  skills: string[];
  published: boolean;
};

export type ProductFeature = { title: string; text: string };

export type Product = {
  slug: string;
  name: string;
  url: string;
  summary: string;
  problem: string;
  solution: string;
  features: ProductFeature[];
  steps: string[];
  image: string;
  imageAlt: string;
};

export type Settings = {
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  location: string;
};

export type Content = {
  services: Service[];
  projects: Project[];
  posts: Post[];
  roles: Role[];
  product: Product;
  settings: Settings;
};

export type InquiryStatus = "new" | "read" | "replied" | "archived";

export type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  details: string;
  status: InquiryStatus;
};

export type Application = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  note: string;
  resumeName: string;
  resumePath: string;
  status: "new" | "read" | "archived";
};

export type AuditEntry = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type FormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};
=======
export type Service = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
  published: boolean;
};

export type Project = {
  slug: string;
  name: string;
  url: string | null;
  category: string;
  image: string | null;
  imageAlt: string | null;
  summary: string;
  linkNote: string | null;
  published: boolean;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  paragraphs: string[];
  published: boolean;
};

export type Role = {
  slug: string;
  title: string;
  type: string;
  location: string;
  posted: string;
  summary: string;
  skills: string[];
  published: boolean;
};

export type ProductFeature = { title: string; text: string };

export type Product = {
  slug: string;
  name: string;
  url: string;
  summary: string;
  problem: string;
  solution: string;
  features: ProductFeature[];
  steps: string[];
  image: string;
  imageAlt: string;
};

export type Settings = {
  email: string;
  phoneDisplay: string;
  phoneTel: string;
  whatsapp: string;
  instagram: string;
  instagramHandle: string;
  location: string;
};

export type Content = {
  services: Service[];
  projects: Project[];
  posts: Post[];
  roles: Role[];
  product: Product;
  settings: Settings;
};

export type InquiryStatus = "new" | "read" | "replied" | "archived";

export type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  details: string;
  status: InquiryStatus;
};

export type Application = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  note: string;
  resumeName: string;
  resumePath: string;
  status: "new" | "read" | "archived";
};

export type AuditEntry = {
  id: string;
  at: string;
  actor: string;
  action: string;
  detail: string;
};

export type FormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};
>>>>>>> 23694d815d194957a50633911c429caf59c439b9
