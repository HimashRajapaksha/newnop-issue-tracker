export type IssueStatus = "Open" | "In Progress" | "Resolved" | "Closed";
export type IssuePriority = "Low" | "Medium" | "High";
export type IssueSeverity = "Minor" | "Major" | "Critical";

export interface Issue {
  _id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  closed: number;
}

export interface IssuePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IssueListResponse {
  issues: Issue[];
  pagination: IssuePagination;
}

export interface IssueFormValues {
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  assignedTo?: string;
}