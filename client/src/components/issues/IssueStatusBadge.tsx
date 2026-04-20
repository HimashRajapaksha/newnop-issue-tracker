import type { IssueStatus } from "../../features/issues/issueTypes";

interface Props {
  status: IssueStatus;
}

const statusClasses: Record<IssueStatus, string> = {
  Open: "bg-blue-100 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-100 text-amber-700 border-amber-200",
  Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Closed: "bg-slate-200 text-slate-700 border-slate-300",
};

const IssueStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default IssueStatusBadge;