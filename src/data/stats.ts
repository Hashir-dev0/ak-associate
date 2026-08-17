export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  iconName: string;
}

export const statsData: StatItem[] = [
  {
    id: "stat-1",
    value: 13,
    suffix: "+",
    label: "YEARS OF EXPERIENCE",
    iconName: "Award",
  },
  {
    id: "stat-2",
    value: 50,
    suffix: "+",
    label: "PROJECTS COMPLETED",
    iconName: "Building2",
  },
  {
    id: "stat-3",
    value: 100,
    suffix: "%",
    label: "PEC C3 COMPLIANCE & SAFETY",
    iconName: "ShieldCheck",
  },
  {
    id: "stat-4",
    value: 100,
    suffix: "%",
    label: "CLIENT SATISFACTION",
    iconName: "CheckCircle2",
  },
];
