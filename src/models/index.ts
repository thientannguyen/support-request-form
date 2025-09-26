export interface SupportRequestFormData {
  fullName: string;
  email: string;
  issueType: string;
  tags: string[];
  stepsToReproduce: {
    step: string;
  }[];
}
