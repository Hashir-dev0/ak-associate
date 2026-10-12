import React from "react";

export function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["GeneralContractor", "EngineeringService", "LocalBusiness"],
        "@id": "https://akassociates.com.pk/#organization",
        name: "AK Associates Engineers & Contractors",
        alternateName: [
          "AK Associates",
          "AK Associates Karachi",
          "AK Associates Pakistan",
          "AK Associates Construction",
          "AK Associates Civil Engineers",
        ],
        url: "https://akassociates.com.pk",
        logo: {
          "@type": "ImageObject",
          url: "https://akassociates.com.pk/assets/images/Ak_logo-removebg-preview.png",
          caption: "AK Associates Engineers & Contractors Logo",
        },
        image: "https://akassociates.com.pk/assets/images/ak-headquarters-hero.png",
        description:
          "AK Associates Engineers & Contractors is a premier Pakistan Engineering Council (PEC Category C3) registered construction and civil engineering firm based in Karachi, Pakistan. Founded by Managing Director Rashid Ali, the firm specializes in industrial warehouses, pre-engineered buildings (PEB), commercial plazas, residential bungalows, and turnkey general contracting.",
        telephone: "+923213844024",
        email: "akassociates092@gmail.com",
        address: {
          "@type": "PostalAddress",
          streetAddress: "R-110 Block A, Gulshan-e-Millat, Korangi",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          postalCode: "74900",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 24.827,
          longitude: 67.1265,
        },
        founder: {
          "@type": "Person",
          name: "Rashid Ali",
          jobTitle: "Principal Engineer & Managing Director",
          telephone: "+923213844024",
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "PEC Category C3 License",
          recognizedBy: {
            "@type": "GovernmentOrganization",
            name: "Pakistan Engineering Council (PEC)",
          },
        },
        priceRange: "$$$",
        areaServed: [
          {
            "@type": "City",
            name: "Karachi",
          },
          {
            "@type": "AdministrativeArea",
            name: "Sindh",
          },
          {
            "@type": "Country",
            name: "Pakistan",
          },
        ],
        knowsAbout: [
          "Civil Engineering",
          "Pre-Engineered Building (PEB) Steel Structures",
          "Industrial Warehouse Construction",
          "Commercial Plaza Construction",
          "Residential Bungalow Architecture & Construction",
          "Turnkey General Contracting",
          "Bill of Quantities (BOQ) Preparation",
          "Structural Concrete Execution",
          "Pakistan Engineering Council (PEC) Code Compliance",
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        sameAs: [
          "https://wa.me/923213844024",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://akassociates.com.pk/#website",
        url: "https://akassociates.com.pk",
        name: "AK Associates Engineers & Contractors",
        description:
          "Official website of AK Associates Engineers & Contractors — PEC C3 Certified Civil Engineering & Construction Firm in Karachi, Pakistan.",
        publisher: {
          "@id": "https://akassociates.com.pk/#organization",
        },
        inLanguage: "en-PK",
      },
      {
        "@type": "FAQPage",
        "@id": "https://akassociates.com.pk/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is AK Associates in Pakistan?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AK Associates Engineers & Contractors is a leading civil engineering and general contracting firm established in 2013 in Karachi, Pakistan. Certified under Category C3 by the Pakistan Engineering Council (PEC), the company is led by Principal Engineer Rashid Ali.",
            },
          },
          {
            "@type": "Question",
            name: "What construction and engineering services does AK Associates provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AK Associates provides turnkey civil construction, Pre-Engineered Building (PEB) steel structures, industrial warehouse fabrication, commercial plaza development, luxury residential bungalows, MEP installations, and transparent BOQ estimations.",
            },
          },
          {
            "@type": "Question",
            name: "Is AK Associates registered with the Pakistan Engineering Council (PEC)?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. AK Associates is an officially registered PEC Category C-3 engineering and construction contracting firm in Pakistan, qualifying it for large-scale institutional, industrial, commercial, and residential projects.",
            },
          },
          {
            "@type": "Question",
            name: "Where is AK Associates located and how can I contact them?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "AK Associates is headquartered at R-110 Block A, Gulshan-e-Millat, Korangi, Karachi, Pakistan. You can contact Managing Director Rashid Ali directly via phone/WhatsApp at +92 321-3844024 or email akassociates092@gmail.com.",
            },
          },
          {
            "@type": "Question",
            name: "How can I get a project quotation or BOQ estimate from AK Associates?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "You can request an itemized Bill of Quantities (BOQ) or schedule a site inspection by filling out the online enquiry form at akassociates.com.pk/contact or directly calling +92 321-3844024.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
