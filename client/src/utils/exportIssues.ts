import type { Issue } from "../features/issues/issueTypes";

const downloadFile = (content: string, fileName: string, fileType: string) => {
  const blob = new Blob([content], { type: fileType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
};

export const exportIssuesAsJSON = (issues: Issue[]) => {
  const content = JSON.stringify(issues, null, 2);
  downloadFile(content, "issues.json", "application/json");
};

export const exportIssuesAsCSV = (issues: Issue[]) => {
  const headers = [
    "Title",
    "Description",
    "Status",
    "Priority",
    "Severity",
    "Assigned To",
    "Created At",
    "Updated At",
  ];

  const rows = issues.map((issue) => [
    `"${issue.title.replace(/"/g, '""')}"`,
    `"${issue.description.replace(/"/g, '""')}"`,
    issue.status,
    issue.priority,
    issue.severity,
    `"${(issue.assignedTo || "").replace(/"/g, '""')}"`,
    new Date(issue.createdAt).toLocaleString(),
    new Date(issue.updatedAt).toLocaleString(),
  ]);

  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  downloadFile(csvContent, "issues.csv", "text/csv;charset=utf-8;");
};