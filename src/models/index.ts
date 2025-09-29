export interface SupportRequestFormData {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[];
  stepsToReproduce: {
    step: string;
  }[];
}

export const issueTypeOptions = [
  { value: "bugReport", label: "Bug Report" },
  { value: "featureRequest", label: "Feature Request" },
  { value: "generalInquiry", label: "General Inquiry" },
];

export const tagOptions = [
  { value: "ui", label: "UI" },
  { value: "backend", label: "Backend" },
  { value: "performance", label: "Performance" },
  { value: "security", label: "Security" },
];
