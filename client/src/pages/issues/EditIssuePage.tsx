import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft, PencilLine } from "lucide-react";
import { getIssueByIdApi, updateIssueApi } from "../../api/issueApi";
import Loader from "../../components/common/Loader";
import IssueForm from "../../components/issues/IssueForm";
import type { Issue, IssueFormValues } from "../../features/issues/issueTypes";

const EditIssuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

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

  const handleSubmit = async (values: IssueFormValues) => {
    try {
      setIsSubmitting(true);
      setApiError("");
      await updateIssueApi(id!, values);
      toast.success("Issue updated successfully");
      navigate(`/issues/${id}`);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to update issue";
      setApiError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  if (!issue) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          Issue not found.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to={`/issues/${issue._id}`}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Details
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-8">
        <div className="max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
            <PencilLine className="h-3.5 w-3.5" />
            Update issue details
          </div>

          <h2 className="text-3xl font-bold tracking-tight">Edit Issue</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Update the issue title, description, status, priority, severity, and assignment
            details to keep the workflow accurate and organized.
          </p>
        </div>
      </section>

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {apiError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <IssueForm
          defaultValues={{
            title: issue.title,
            description: issue.description,
            status: issue.status,
            priority: issue.priority,
            severity: issue.severity,
            assignedTo: issue.assignedTo || "",
          }}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Update Issue"
        />

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Current Info</h3>

          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <div>
              <p className="font-medium text-slate-800">Current Status</p>
              <p>{issue.status}</p>
            </div>

            <div>
              <p className="font-medium text-slate-800">Priority</p>
              <p>{issue.priority}</p>
            </div>

            <div>
              <p className="font-medium text-slate-800">Severity</p>
              <p>{issue.severity}</p>
            </div>

            <div>
              <p className="font-medium text-slate-800">Assigned To</p>
              <p>{issue.assignedTo || "Unassigned"}</p>
            </div>

            <div>
              <p className="font-medium text-slate-800">Last Updated</p>
              <p>{new Date(issue.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EditIssuePage;