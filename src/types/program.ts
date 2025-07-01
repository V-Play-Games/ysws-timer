export interface Program {
  name: string;
  description: string;
  detailedDescription?: string | null;
  website?: string | null;
  slack?: string | null;
  slackChannel?: string | null;
  status: "active" | "ended" | "draft" | "indefinite" | "undefined" | "ditched";
  deadline?: string;
}
