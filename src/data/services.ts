export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  featured?: boolean;
  capabilities: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "1",
    slug: "new-construction",
    title: "New Construction",
    shortDescription: "Construction of new residential, commercial and industrial properties from planning through completion.",
    fullDescription: "From ground-up structural engineering to full turnkey handover, AK Associates manages every phase of residential bungalows, multi-story commercial buildings, and industrial warehouse construction with precision and strict safety standards.",
    iconName: "HardHat",
    featured: true,
    capabilities: [
      "Residential Bungalows & Luxury Villas",
      "Commercial Plazas & Corporate Towers",
      "Industrial Plants & Warehouses",
      "Heavy Concrete & Structural Steel Works",
    ],
  },
  {
    id: "2",
    slug: "design-build",
    title: "Design-Build",
    shortDescription: "Integrated architectural design and construction services delivered through one coordinated team.",
    fullDescription: "Streamline your project with unified architecture, 3D spatial planning, and construction under a single contract. We eliminate miscommunication, control budgets, and accelerate execution timelines.",
    iconName: "Compass",
    featured: false,
    capabilities: [
      "Architectural 3D Modeling & CAD Drafting",
      "Structural Engineering Analysis",
      "BIM Integration & Project Scheduling",
      "End-to-End Turnkey Delivery",
    ],
  },
  {
    id: "3",
    slug: "remodel-renovations",
    title: "Remodel & Renovations",
    shortDescription: "Professional renovation and remodeling solutions for existing residential and commercial spaces.",
    fullDescription: "Breathe new life into aging structures. We perform comprehensive structural retrofits, commercial facade modernizations, space reconfigurations, and modern infrastructure overhauls.",
    iconName: "Hammer",
    featured: false,
    capabilities: [
      "Structural Strengthening & Seismic Retrofits",
      "Commercial Building Facade Upgrades",
      "Office Space Reconfiguration",
      "Modern Mechanical & Plumbing Overhauls",
    ],
  },
  {
    id: "4",
    slug: "interior-design",
    title: "Interior Design",
    shortDescription: "Modern interior planning, material selection and finishing solutions.",
    fullDescription: "Crafting bespoke interior spaces with architectural finesse. We deliver luxurious false ceiling designs, custom cabinetry, acoustic treatments, executive office suites, and premium flooring.",
    iconName: "Layout",
    featured: false,
    capabilities: [
      "Corporate Executive Suites & Workspaces",
      "Luxury Residential Finishing & Millwork",
      "Modern False Ceiling & Ambient Lighting",
      "Custom Tile, Marble & Wood Flooring",
    ],
  },
  {
    id: "5",
    slug: "site-improvements",
    title: "Site Improvements",
    shortDescription: "Site preparation, exterior improvements, infrastructure and development services.",
    fullDescription: "Solid foundations begin with comprehensive site engineering. We handle earthwork excavation, storm water drainage, perimeter security fencing, paving, and external electrical grid setups.",
    iconName: "Truck",
    featured: false,
    capabilities: [
      "Excavation, Grading & Soil Stabilization",
      "Underground Drainage & Sewerage Lines",
      "Roadways, Driveways & Concrete Paving",
      "Retaining Walls & Boundary Infrastructure",
    ],
  },
  {
    id: "6",
    slug: "construction-consult",
    title: "Construction Consult",
    shortDescription: "Professional construction consultation, planning and project guidance.",
    fullDescription: "Leverage 13+ years of engineering mastery. Our PEC-registered consultants provide accurate BOQ estimations, structural audits, project feasibility studies, and quality control supervision.",
    iconName: "ClipboardCheck",
    featured: false,
    capabilities: [
      "BOQ Preparation & Cost Estimation",
      "PEC Compliance & Structural Audits",
      "Contractor & Vendor Quality Assurance",
      "Project Risk Assessment & Management",
    ],
  },
];
