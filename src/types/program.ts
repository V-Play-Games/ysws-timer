export interface Program {
  name: string;
  description: string;
  website?: string | null;
  slack?: string | null;
  status: "active" | "ended" | "draft" | "indefinite" | "undefined" | "ditched";
  deadline?: string;
}
