import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Download,
  FileJson,
  Filter,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getIssuesApi, getIssueStatsApi } from "../../api/issueApi";
import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";
import IssueCard from "../../components/issues/IssueCard";
import IssueFilters from "../../components/issues/IssueFilters";
import IssueStats from "../../components/issues/IssueStats";
import useDebounce from "../../hooks/useDebounce";
import { exportIssuesAsCSV, exportIssuesAsJSON } from "../../utils/exportIssues";
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

  const debouncedSearch = useDebounce(searchInput, 500);

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
      const message = error?.response?.data?.message || "Failed to load issues";
      setApiError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, [pagination.page, debouncedSearch, status, priority, severity]);

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
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              <Filter className="h-3.5 w-3.5" />
              Smart issue tracking workspace
            </div>

            <h2 className="text-3xl font-bold tracking-tight">Issues</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Track, prioritize, and manage issues with a cleaner workflow.
              Search quickly, filter results, export records, and keep progress visible.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => exportIssuesAsCSV(issues)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>

            <button
              onClick={() => exportIssuesAsJSON(issues)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/15"
            >
              <FileJson className="h-4 w-4" />
              Export JSON
            </button>

            <Link
              to="/issues/create"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              <Plus className="h-4 w-4" />
              Create Issue
            </Link>
          </div>
        </div>
      </section>

      <IssueStats stats={stats} />

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
          <Search className="h-4 w-4 text-slate-500" />
          Search and filters
        </div>

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
      </section>

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {apiError}
        </div>
      )}

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">Issue Results</h3>
            <p className="text-sm text-slate-500">
              Showing {issues.length} issue{issues.length !== 1 ? "s" : ""} on this page
            </p>
          </div>

          <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            Page {pagination.page} of {pagination.totalPages}
          </div>
        </div>

        {issues.length === 0 ? (
          <EmptyState
            title="No issues found"
            description="Try adjusting your filters, changing the search term, or creating a new issue."
            actionLabel="Create Issue"
            actionTo="/issues/create"
          />
        ) : (
          <div className="grid gap-4">
            {issues.map((issue) => (
               <IssueCard key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-slate-600">
            Total records: <span className="font-semibold text-slate-900">{pagination.total}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={pagination.page <= 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <button
              disabled={pagination.page >= pagination.totalPages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IssuesPage;