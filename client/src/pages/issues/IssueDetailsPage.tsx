import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteIssueApi,
  getIssueByIdApi,
  updateIssueApi,
} from "../../api/issueApi";
import Loader from "../../components/common/Loader";
import type { Issue } from "../../features/issues/issueTypes";
import IssueStatusBadge from "../../components/issues/IssueStatusBadge";
import PriorityBadge from "../../components/issues/PriorityBadge";

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getIssueByIdApi(id!);
        setIssue(response.data);
      } catch (error: any) {
        setApiError(error?.response?.data?.message || "Failed to load issue");
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this issue?");
    if (!confirmed) return;

    try {
      setActionLoading(true);
      await deleteIssueApi(id!);
      navigate("/issues");
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to delete issue");
      setActionLoading(false);
    }
  };

  const handleStatusUpdate = async (status: Issue["status"]) => {
    const confirmed = window.confirm(`Are you sure you want to mark this issue as "${status}"?`);
    if (!confirmed) return;

    try {
      setActionLoading(true);
      const response = await updateIssueApi(id!, { status });
      setIssue(response.data);
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!issue) return <p className="text-red-500">Issue not found.</p>;

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex flex-wrap gap-2">
            <IssueStatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
              {issue.severity}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-slate-900">{issue.title}</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {issue.description}
          </p>
        </div>

        <div className="w-full max-w-xs rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
          <p>
            <span className="font-semibold">Assigned To:</span>{" "}
            {issue.assignedTo || "Unassigned"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Created:</span>{" "}
            {new Date(issue.createdAt).toLocaleString()}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Updated:</span>{" "}
            {new Date(issue.updatedAt).toLocaleString()}
          </p>
        </div>
      </div>

      {apiError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Link
          to={`/issues/${issue._id}/edit`}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
        >
          Edit Issue
        </Link>

        <button
          onClick={() => handleStatusUpdate("Resolved")}
          disabled={actionLoading}
          className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
        >
          Mark Resolved
        </button>

        <button
          onClick={() => handleStatusUpdate("Closed")}
          disabled={actionLoading}
          className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-60"
        >
          Mark Closed
        </button>

        <button
          onClick={handleDelete}
          disabled={actionLoading}
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
        >
          Delete Issue
        </button>
      </div>
    </div>
  );
};

export default IssueDetailsPage;