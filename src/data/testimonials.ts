export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  content: string;
}

export const testimonialsData: TestimonialItem[] = [
  {
    id: "test-1",
    name: "Tariq Mahmood",
    role: "Commercial Director",
    company: "Apex Logistics & Warehousing",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "AK Associates delivered our 45,000 sq.ft. Korangi warehouse ahead of schedule. Their structural steel fabrication and laser-screed flooring met the highest industrial standards. Rashid Ali and his team are consummate engineering professionals.",
  },
  {
    id: "test-2",
    name: "Dr. Shahzad Ansari",
    role: "Homeowner & Client",
    company: "DHA Phase 8 Project",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "Building our dream bungalow with AK Associates was a seamless journey. Their attention to structural integrity, exquisite stonework finishing, and transparent cost breakdown made them a true partner from groundbreaking to handover.",
  },
  {
    id: "test-3",
    name: "Imran Siddiqui",
    role: "Managing Partner",
    company: "Al-Baraka Enterprises",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    content: "The electrical and civil refurbishment executed by AK Associates transformed our industrial facility in SITE Area. Their PEC C3 engineering credentials gave us absolute peace of mind regarding safety compliance and load durability.",
  },
];
