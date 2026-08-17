export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: {
    day: string;
    month: string;
    year: string;
  };
  category: string;
  image: string;
  commentsCount: number;
  readTime: string;
}

export const newsData: NewsItem[] = [
  {
    id: "news-1",
    slug: "how-to-hire-a-general-contractor-pakistan",
    title: "How to Hire a Registered PEC Contractor for Commercial Projects",
    excerpt: "Key considerations for vetting engineering qualifications, PEC categories, contract structures, and structural safety standards in Pakistan.",
    date: {
      day: "14",
      month: "AUG",
      year: "2026",
    },
    category: "Contracting Advice",
    image: "/assets/images/site-upscaled/3.jpeg",
    commentsCount: 4,
    readTime: "5 min read",
  },
  {
    id: "news-2",
    slug: "modern-structural-engineering-trends-karachi",
    title: "Modern Structural Engineering Trends in Coastal Urban Construction",
    excerpt: "Exploring corrosion-resistant reinforcement, waterproof foundation engineering, and high-efficiency MEP design for Karachi buildings.",
    date: {
      day: "28",
      month: "JUL",
      year: "2026",
    },
    category: "Civil Engineering",
    image: "/assets/images/site-upscaled/4.jpeg",
    commentsCount: 7,
    readTime: "7 min read",
  },
  {
    id: "news-3",
    slug: "luxury-residential-turnkey-architecture",
    title: "Luxury Residential Architecture: From 3D Concept to Concrete Handover",
    excerpt: "How an integrated design-build methodology eliminates friction between architects and civil teams during high-end villa construction.",
    date: {
      day: "12",
      month: "JUN",
      year: "2026",
    },
    category: "Architecture",
    image: "/assets/images/site-upscaled/1.jpeg",
    commentsCount: 2,
    readTime: "4 min read",
  },
];
