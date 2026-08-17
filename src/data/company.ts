export interface CompanyProfile {
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  contactPerson: string;
  role: string;
  phone: string;
  displayPhone: string;
  whatsappUrl: string;
  email: string;
  address: string;
  mailingAddress: string;
  city: string;
  country: string;
  pecCategory: string;
  yearEstablished: number;
  yearsOfExperience: string;
  businessHours: string;
  googleMapsEmbedUrl: string;
  logo: string;
  socials: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const companyData: CompanyProfile = {
  name: "AK ASSOCIATES ENGINEERS & CONTRACTORS",
  shortName: "AK Associates",
  tagline: "Civil Engineering, Building Construction & General Contracting Services",
  heroHeadline: "Civil Engineering & General Contracting",
  contactPerson: "Rashid Ali",
  role: "Principal Engineer & Managing Director",
  phone: "+923213844024",
  displayPhone: "0321-3844024",
  whatsappUrl: "https://wa.me/923213844024?text=Hello%20AK%20Associates,%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project.",
  email: "akassociates092@gmail.com",
  address: "R-110 Block A, Gulshan-e-Millat, Korangi, Karachi, Pakistan",
  mailingAddress: "R-110 Block A, Near Millat CNG Pump, Gulshan-e-Millat, Korangi, Karachi",
  city: "Karachi",
  country: "Pakistan",
  pecCategory: "PEC - C3",
  yearEstablished: 2013,
  yearsOfExperience: "13+",
  businessHours: "Mon - Sat: 9:00 AM - 6:00 PM",
  googleMapsEmbedUrl: "https://maps.google.com/maps?q=Gulshan-e-Millat,%20Korangi,%20Karachi&t=&z=14&ie=UTF8&iwloc=&output=embed",
  logo: "/assets/images/Ak_logo-removebg-preview.png",
  socials: {
    facebook: "https://facebook.com",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
};
