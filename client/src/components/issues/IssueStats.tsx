import type { IssueStats as StatsType } from "../../features/issues/issueTypes";

interface Props {
  stats: StatsType;
}

const StatCard = ({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: number;
  subtitle: string;
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
};

const IssueStats = ({ stats }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      <StatCard label="Total Issues" value={stats.total} subtitle="All tracked issues" />
      <StatCard label="Open" value={stats.open} subtitle="Need attention" />
      <StatCard label="In Progress" value={stats.inProgress} subtitle="Currently being worked on" />
      <StatCard label="Resolved" value={stats.resolved} subtitle="Fixed and verified" />
      <StatCard label="Closed" value={stats.closed} subtitle="Completed issues" />
    </div>
  );
};

export default IssueStats;