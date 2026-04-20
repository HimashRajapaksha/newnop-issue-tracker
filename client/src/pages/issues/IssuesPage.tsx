import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getIssuesApi, getIssueStatsApi } from "../../api/issueApi";
import Loader from "../../components/common/Loader";
import IssueCard from "../../components/issues/IssueCard";
import IssueFilters from "../../components/issues/IssueFilters";
import IssueStats from "../../components/issues/IssueStats";
import type {
  Issue,
  IssuePagination,
  IssueStats as IssueStatsType,
} from "../../features/issues/issueTypes";

const IssuesPage = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [stats, setStats] = useState<IssueStatsType>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    closed: 0,
  });

  const [pagination, setPagination] = useState<IssuePagination>({
    page: 1,
    limit: 6,
    total: 0,
    totalPages: 1,
  });

  const [searchInput, setSearchInput] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [severity, setSeverity] = useState("");

  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const debouncedSearch = useMemo(() => searchInput, [searchInput]);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setApiError("");

      const [issuesResponse, statsResponse] = await Promise.all([
        getIssuesApi({
          page: pagination.page,
          limit: pagination.limit,
          search: debouncedSearch,
          status,
          priority,
          severity,
        }),
        getIssueStatsApi(),
      ]);

      setIssues(issuesResponse.data.issues);
      setPagination(issuesResponse.data.pagination);
      setStats(statsResponse.data);
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to load issues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [pagination.page, searchInput, status, priority, severity]);

  const handleReset = () => {
    setSearchInput("");
    setStatus("");
    setPriority("");
    setSeverity("");
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Issues</h2>
          <p className="text-sm text-slate-600">
            Track, manage, and update all reported issues.
          </p>
        </div>

        <Link
          to="/issues/create"
          className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          + Create Issue
        </Link>
      </div>

      <IssueStats stats={stats} />

      <IssueFilters
        search={searchInput}
        status={status}
        priority={priority}
        severity={severity}
        onSearchChange={(value) => {
          setSearchInput(value);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        onPriorityChange={(value) => {
          setPriority(value);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        onSeverityChange={(value) => {
          setSeverity(value);
          setPagination((prev) => ({ ...prev, page: 1 }));
        }}
        onReset={handleReset}
      />

      {apiError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </p>
      )}

      {issues.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">No issues found</h3>
          <p className="mt-2 text-sm text-slate-600">
            Try changing filters or create a new issue.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {issues.map((issue) => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-sm text-slate-600">
          Page {pagination.page} of {pagination.totalPages}
        </p>

        <div className="flex gap-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() =>
              setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssuesPage;