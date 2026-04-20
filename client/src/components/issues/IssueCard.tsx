import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
      className="group block rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <IssueStatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
              <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {issue.severity}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                  {issue.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {issue.description}
                </p>
              </div>

              <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-slate-700" />
            </div>
          </div>

          <div className="shrink-0 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            <p>
              <span className="font-medium text-slate-800">Assigned:</span>{" "}
              {issue.assignedTo || "Unassigned"}
            </p>
            <p className="mt-1">
              <span className="font-medium text-slate-800">Updated:</span>{" "}
              {new Date(issue.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-slate-100 pt-4">
          <span className="text-xs font-medium text-slate-400">
            Click card to view details
          </span>
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;