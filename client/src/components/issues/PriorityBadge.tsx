import type { IssuePriority } from "../../features/issues/issueTypes";

interface Props {
  priority: IssuePriority;
}

const priorityClasses: Record<IssuePriority, string> = {
  Low: "bg-slate-100 text-slate-700 border-slate-200",
  Medium: "bg-violet-100 text-violet-700 border-violet-200",
  High: "bg-rose-100 text-rose-700 border-rose-200",
};

const PriorityBadge = ({ priority }: Props) => {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${priorityClasses[priority]}`}
    >
      {priority}
    </span>
  );
};

export default PriorityBadge;