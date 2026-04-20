import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  Pencil,
  CheckCircle2,
  Archive,
  Trash2,
  UserRound,
  CircleAlert,
} from "lucide-react";
import {
  deleteIssueApi,
  getIssueByIdApi,
  updateIssueApi,
} from "../../api/issueApi";
import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import type { Issue } from "../../features/issues/issueTypes";
import IssueStatusBadge from "../../components/issues/IssueStatusBadge";
import PriorityBadge from "../../components/issues/PriorityBadge";

type ModalAction = "delete" | "resolve" | "close" | null;

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [modalAction, setModalAction] = useState<ModalAction>(null);

  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const response = await getIssueByIdApi(id!);
        setIssue(response.data);
      } catch (error: any) {
        const message = error?.response?.data?.message || "Failed to load issue";
        setApiError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleDelete = async () => {
    try {
      setActionLoading(true);
      await deleteIssueApi(id!);
      toast.success("Issue deleted successfully");
      navigate("/issues");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to delete issue";
      setApiError(message);
      toast.error(message);
    } finally {
      setActionLoading(false);
      setModalAction(null);
    }
  };

  const handleStatusUpdate = async (status: Issue["status"]) => {
    try {
      setActionLoading(true);
      const response = await updateIssueApi(id!, { status });
      setIssue(response.data);
      toast.success(`Issue marked as ${status}`);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to update status";
      setApiError(message);
      toast.error(message);
    } finally {
      setActionLoading(false);
      setModalAction(null);
    }
  };

  if (loading) return <Loader />;

  if (!issue) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Issue not found.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          to="/issues"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Issues
        </Link>

        <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap gap-2">
                <IssueStatusBadge status={issue.status} />
                <PriorityBadge priority={issue.priority} />
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-200">
                  {issue.severity}
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight">{issue.title}</h2>
              <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
                {issue.description}
              </p>
            </div>

            <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <UserRound className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium text-white">Assigned To</p>
                  <p>{issue.assignedTo || "Unassigned"}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium text-white">Created</p>
                  <p>{new Date(issue.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 flex items-start gap-3">
                <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <p className="font-medium text-white">Last Updated</p>
                  <p>{new Date(issue.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {apiError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
            {apiError}
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Actions</h3>
              <p className="text-sm text-slate-500">
                Manage the issue lifecycle and update the record.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to={`/issues/${issue._id}/edit`}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
              >
                <Pencil className="h-4 w-4" />
                Edit Issue
              </Link>

              <button
                onClick={() => setModalAction("resolve")}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-60"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark Resolved
              </button>

              <button
                onClick={() => setModalAction("close")}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 disabled:opacity-60"
              >
                <Archive className="h-4 w-4" />
                Mark Closed
              </button>

              <button
                onClick={() => setModalAction("delete")}
                disabled={actionLoading}
                className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 disabled:opacity-60"
              >
                <Trash2 className="h-4 w-4" />
                Delete Issue
              </button>
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={modalAction === "delete"}
        title="Delete Issue"
        message="Are you sure you want to permanently delete this issue?"
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setModalAction(null)}
        isLoading={actionLoading}
      />

      <Modal
        isOpen={modalAction === "resolve"}
        title="Mark as Resolved"
        message='Are you sure you want to mark this issue as "Resolved"?'
        confirmText="Mark Resolved"
        onConfirm={() => handleStatusUpdate("Resolved")}
        onCancel={() => setModalAction(null)}
        isLoading={actionLoading}
      />

      <Modal
        isOpen={modalAction === "close"}
        title="Mark as Closed"
        message='Are you sure you want to mark this issue as "Closed"?'
        confirmText="Mark Closed"
        onConfirm={() => handleStatusUpdate("Closed")}
        onCancel={() => setModalAction(null)}
        isLoading={actionLoading}
      />
    </>
  );
};

export default IssueDetailsPage;