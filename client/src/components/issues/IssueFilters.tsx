interface Props {
  search: string;
  status: string;
  priority: string;
  severity: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSeverityChange: (value: string) => void;
  onReset: () => void;
}

const IssueFilters = ({
  search,
  status,
  priority,
  severity,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSeverityChange,
  onReset,
}: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or description..."
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <select
          value={priority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select
          value={severity}
          onChange={(e) => onSeverityChange(e.target.value)}
          className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        >
          <option value="">All Severities</option>
          <option value="Minor">Minor</option>
          <option value="Major">Major</option>
          <option value="Critical">Critical</option>
        </select>

        <button
          onClick={onReset}
          className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default IssueFilters;