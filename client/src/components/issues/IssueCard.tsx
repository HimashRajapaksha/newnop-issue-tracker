import { Link } from "react-router-dom";
import type { Issue } from "../../features/issues/issueTypes";
import IssueStatusBadge from "./IssueStatusBadge";
import PriorityBadge from "./PriorityBadge";

interface Props {
  issue: Issue;
}

const IssueCard = ({ issue }: Props) => {
  return (
    <Link
      to={`/issues/${issue._id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <IssueStatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
              {issue.severity}
            </span>
          </div>

          <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
            {issue.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-slate-600">
            {issue.description}
          </p>
        </div>

        <div className="shrink-0 text-sm text-slate-500">
          <p>
            Assigned to:{" "}
            <span className="font-medium text-slate-700">
              {issue.assignedTo || "Unassigned"}
            </span>
          </p>
          <p className="mt-1">
            Updated: {new Date(issue.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;