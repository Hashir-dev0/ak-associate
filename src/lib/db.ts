import fs from "fs";
import path from "path";
import { hashPassword } from "./auth";
import { companyData as initialCompany } from "@/data/company";
import { servicesData as initialServices } from "@/data/services";
import { projectsData as initialProjects } from "@/data/projects";
import { testimonialsData as initialTestimonials } from "@/data/testimonials";
import { newsData as initialNews } from "@/data/news";

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "content.json");

export interface HeroData {
  badge: string;
  headline: string;
  highlightText: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  backgroundImage: string;
}

export interface AboutData {
  eyebrow: string;
  heading: string;
  storyP1: string;
  storyP2: string;
  pecDetails: string;
  yearsBadgeNumber: string;
  yearsBadgeText: string;
  primaryImage: string;
  secondaryImage: string;
  mission: string;
  vision: string;
  coreValues: string[];
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  size: number;
  mime: string;
  uploadedAt: string;
}

export interface MessageItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "unread" | "read";
  createdAt: string;
}

export interface AdminUser {
  email: string;
  passwordHash: string;
  name: string;
  role: "admin";
}

export interface DatabaseSchema {
  hero: HeroData;
  about: AboutData;
  company: typeof initialCompany;
  services: typeof initialServices;
  projects: typeof initialProjects;
  testimonials: typeof initialTestimonials;
  news: typeof initialNews;
  media: MediaItem[];
  messages: MessageItem[];
  admin: AdminUser;
}

function getDefaultData(): DatabaseSchema {
  return {
    hero: {
      badge: "PEC Category C3 Registered Firm",
      headline: "Civil Engineering &",
      highlightText: "General Contracting",
      subtitle: `${initialCompany.name} provides residential bungalow construction, commercial plazas, and industrial warehouse engineering across Karachi and Pakistan with certified PEC C3 standards.`,
      primaryCtaText: "REQUEST A QUOTATION",
      primaryCtaLink: "/contact",
      secondaryCtaText: "VIEW COMPLETED PROJECTS",
      secondaryCtaLink: "/projects",
      backgroundImage: "/assets/images/ak-headquarters-hero.png",
    },
    about: {
      eyebrow: "ABOUT AK ASSOCIATES",
      heading: "EXPERIENCED ENGINEERING & CONSTRUCTION CONTRACTORS",
      storyP1: `Established in ${initialCompany.yearEstablished} in ${initialCompany.city}, Pakistan, ${initialCompany.name} provides civil engineering, general contracting, and turnkey construction services for residential, commercial, and industrial clients.`,
      storyP2: `Certified under ${initialCompany.pecCategory} by the Pakistan Engineering Council and directed by Principal Engineer Rashid Ali, our firm emphasizes structural durability, accurate cost estimation, quality material compliance, and timely milestone handover.`,
      pecDetails: `Pakistan Engineering Council License: ${initialCompany.pecCategory} (Year Established: ${initialCompany.yearEstablished})`,
      yearsBadgeNumber: "13+",
      yearsBadgeText: "Years of Experience",
      primaryImage: "/assets/images/site-upscaled/1.jpeg",
      secondaryImage: "/assets/images/site-upscaled/2.jpeg",
      mission: "To deliver reliable civil engineering and general contracting services that strictly adhere to Pakistan Engineering Council standards, structural codes, and client specifications.",
      vision: "To be a dependable engineering contractor in Pakistan recognized for practical structural execution, quality materials, and transparent client partnerships.",
      coreValues: [
        "Pakistan Engineering Council (PEC) Standards Compliance",
        "Direct Engineering Oversight on Every Project",
        "Transparent BOQ & Material Specifications",
        "On-Schedule Milestone Handover",
      ],
    },
    company: initialCompany,
    services: initialServices,
    projects: initialProjects,
    testimonials: initialTestimonials,
    news: initialNews,
    media: [
      {
        id: "media-1",
        filename: "ak-headquarters-hero.png",
        url: "/assets/images/ak-headquarters-hero.png",
        size: 1540000,
        mime: "image/png",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: "media-2",
        filename: "1.jpeg",
        url: "/assets/images/site-upscaled/1.jpeg",
        size: 898000,
        mime: "image/jpeg",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: "media-3",
        filename: "2.jpeg",
        url: "/assets/images/site-upscaled/2.jpeg",
        size: 753000,
        mime: "image/jpeg",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: "media-4",
        filename: "3.jpeg",
        url: "/assets/images/site-upscaled/3.jpeg",
        size: 616000,
        mime: "image/jpeg",
        uploadedAt: new Date().toISOString(),
      },
      {
        id: "media-5",
        filename: "4.jpeg",
        url: "/assets/images/site-upscaled/4.jpeg",
        size: 605000,
        mime: "image/jpeg",
        uploadedAt: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-1",
        firstName: "Hassan",
        lastName: "Raza",
        email: "hassan.raza@gmail.com",
        phone: "0300-8234190",
        service: "New Construction",
        message: "We own a 1,000 sq. yard plot in DHA Phase 8 and want to build a contemporary 2-story bungalow. Looking for turnkey civil construction and MEP quotation.",
        status: "unread",
        createdAt: "2026-08-16T10:30:00Z",
      },
      {
        id: "msg-2",
        firstName: "Kamran",
        lastName: "Siddiqui",
        email: "ksiddiqui@textilepk.com",
        phone: "0322-9988112",
        service: "Design-Build",
        message: "Inquiry regarding a 30,000 sq.ft. PEB industrial warehouse structure in Korangi Industrial Area. Require preliminary BOQ and timeline estimation.",
        status: "read",
        createdAt: "2026-08-15T14:15:00Z",
      },
    ],
    admin: {
      email: "akassociates092@gmail.com",
      passwordHash: hashPassword("Admin@AK2026!"),
      name: "Rashid Ali",
      role: "admin",
    },
  };
}

let memoryCache: DatabaseSchema | null = null;

// Read database
export function readDb(): DatabaseSchema {
  if (memoryCache) {
    return memoryCache;
  }

  const pathsToTry = [
    DB_FILE,
    path.join("/tmp", "content.json"),
  ];

  let rawData: any = null;
  for (const p of pathsToTry) {
    try {
      if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, "utf-8");
        rawData = JSON.parse(content);
        break;
      }
    } catch {
      // Continue to next path
    }
  }

  const defaultData = getDefaultData();
  const mergedData: DatabaseSchema = {
    ...defaultData,
    ...(rawData || {}),
    messages: Array.isArray(rawData?.messages) ? rawData.messages : defaultData.messages || [],
    media: Array.isArray(rawData?.media) ? rawData.media : defaultData.media || [],
    projects: Array.isArray(rawData?.projects) ? rawData.projects : defaultData.projects || [],
    services: Array.isArray(rawData?.services) ? rawData.services : defaultData.services || [],
  };

  memoryCache = mergedData;
  return mergedData;
}

// Write database atomically with serverless fallback
export function writeDb(data: DatabaseSchema): void {
  memoryCache = data;

  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    // If process.cwd() is read-only (e.g. Vercel serverless environment), fallback to /tmp
    try {
      const tmpPath = path.join("/tmp", "content.json");
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
    } catch (tmpErr) {
      console.warn("Could not persist to disk, keeping in-memory state:", tmpErr);
    }
  }
}

/* ==================== CRUD HELPERS ==================== */

// HERO
export function getHeroData(): HeroData {
  return readDb().hero;
}

export function updateHeroData(hero: Partial<HeroData>): HeroData {
  const db = readDb();
  db.hero = { ...db.hero, ...hero };
  writeDb(db);
  return db.hero;
}

// ABOUT
export function getAboutData(): AboutData {
  return readDb().about;
}

export function updateAboutData(about: Partial<AboutData>): AboutData {
  const db = readDb();
  db.about = { ...db.about, ...about };
  writeDb(db);
  return db.about;
}

// COMPANY
export function getCompanyData(): typeof initialCompany {
  return readDb().company;
}

export function updateCompanyData(company: Partial<typeof initialCompany>): typeof initialCompany {
  const db = readDb();
  db.company = { ...db.company, ...company };
  writeDb(db);
  return db.company;
}

// SERVICES
export function getServicesData() {
  return readDb().services;
}

export function createService(service: any) {
  const db = readDb();
  const newService = {
    ...service,
    id: `svc-${Date.now()}`,
    slug: service.slug || service.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  };
  db.services.push(newService);
  writeDb(db);
  return newService;
}

export function updateService(id: string, updates: any) {
  const db = readDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  db.services[index] = { ...db.services[index], ...updates };
  writeDb(db);
  return db.services[index];
}

export function deleteService(id: string) {
  const db = readDb();
  db.services = db.services.filter((s) => s.id !== id);
  writeDb(db);
  return true;
}

// PROJECTS
export function getProjectsData() {
  return readDb().projects;
}

export function createProject(project: any) {
  const db = readDb();
  const newProject = {
    ...project,
    id: `proj-${Date.now()}`,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    scope: project.scope || ["Civil Engineering", "Turnkey Construction"],
    gallery: project.gallery && project.gallery.length > 0 ? project.gallery : [project.image],
  };
  db.projects.unshift(newProject);
  writeDb(db);
  return newProject;
}

export function updateProject(id: string, updates: any) {
  const db = readDb();
  const index = db.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.projects[index] = { ...db.projects[index], ...updates };
  writeDb(db);
  return db.projects[index];
}

export function deleteProject(id: string) {
  const db = readDb();
  db.projects = db.projects.filter((p) => p.id !== id);
  writeDb(db);
  return true;
}

// TESTIMONIALS
export function getTestimonialsData() {
  return readDb().testimonials;
}

export function createTestimonial(testimonial: any) {
  const db = readDb();
  const newItem = {
    ...testimonial,
    id: `test-${Date.now()}`,
  };
  db.testimonials.push(newItem);
  writeDb(db);
  return newItem;
}

export function updateTestimonial(id: string, updates: any) {
  const db = readDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;
  db.testimonials[index] = { ...db.testimonials[index], ...updates };
  writeDb(db);
  return db.testimonials[index];
}

export function deleteTestimonial(id: string) {
  const db = readDb();
  db.testimonials = db.testimonials.filter((t) => t.id !== id);
  writeDb(db);
  return true;
}

// NEWS
export function getNewsData() {
  return readDb().news;
}

export function createNews(newsItem: any) {
  const db = readDb();
  const dateObj = new Date();
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const newItem = {
    ...newsItem,
    id: `news-${Date.now()}`,
    slug: newsItem.slug || newsItem.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    date: newsItem.date || {
      day: String(dateObj.getDate()).padStart(2, "0"),
      month: months[dateObj.getMonth()],
      year: String(dateObj.getFullYear()),
    },
    commentsCount: newsItem.commentsCount || 0,
    readTime: newsItem.readTime || "5 min read",
  };
  db.news.unshift(newItem);
  writeDb(db);
  return newItem;
}

export function updateNews(id: string, updates: any) {
  const db = readDb();
  const index = db.news.findIndex((n) => n.id === id);
  if (index === -1) return null;
  db.news[index] = { ...db.news[index], ...updates };
  writeDb(db);
  return db.news[index];
}

export function deleteNews(id: string) {
  const db = readDb();
  db.news = db.news.filter((n) => n.id !== id);
  writeDb(db);
  return true;
}

// MEDIA
export function getMediaData() {
  return readDb().media;
}

export function addMediaItem(item: Omit<MediaItem, "id" | "uploadedAt">) {
  const db = readDb();
  const newMedia: MediaItem = {
    ...item,
    id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    uploadedAt: new Date().toISOString(),
  };
  db.media.unshift(newMedia);
  writeDb(db);
  return newMedia;
}

export function deleteMediaItem(id: string) {
  const db = readDb();
  const mediaItem = db.media.find((m) => m.id === id);
  if (mediaItem) {
    // Attempt physical deletion if inside public/uploads
    if (mediaItem.url.startsWith("/uploads/")) {
      const filePath = path.join(process.cwd(), "public", mediaItem.url);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error("Could not delete physical file:", e);
        }
      }
    }
  }
  db.media = db.media.filter((m) => m.id !== id);
  writeDb(db);
  return true;
}

// MESSAGES
export function getMessagesData() {
  return readDb().messages;
}

export function createMessage(msg: Omit<MessageItem, "id" | "status" | "createdAt">) {
  const db = readDb();
  if (!Array.isArray(db.messages)) {
    db.messages = [];
  }
  const newMsg: MessageItem = {
    ...msg,
    id: `msg-${Date.now()}`,
    status: "unread",
    createdAt: new Date().toISOString(),
  };
  db.messages.unshift(newMsg);
  writeDb(db);
  return newMsg;
}

export function updateMessageStatus(id: string, status: "unread" | "read") {
  const db = readDb();
  const msg = db.messages.find((m) => m.id === id);
  if (!msg) return null;
  msg.status = status;
  writeDb(db);
  return msg;
}

export function deleteMessage(id: string) {
  const db = readDb();
  db.messages = db.messages.filter((m) => m.id !== id);
  writeDb(db);
  return true;
}

// ADMIN AUTH
export function verifyAdminCredentials(email: string, passwordPlain: string): boolean {
  const db = readDb();
  if (db.admin.email.toLowerCase() !== email.trim().toLowerCase()) return false;
  const hash = hashPassword(passwordPlain);
  return db.admin.passwordHash === hash;
}

export function updateAdminPassword(email: string, newPasswordPlain: string): boolean {
  const db = readDb();
  if (db.admin.email.toLowerCase() !== email.trim().toLowerCase()) return false;
  db.admin.passwordHash = hashPassword(newPasswordPlain);
  writeDb(db);
  return true;
}
