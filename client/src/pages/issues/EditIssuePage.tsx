import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
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
    return <p className="text-sm text-red-500">Issue not found.</p>;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Edit Issue</h2>
        <p className="text-sm text-slate-600">
          Update issue details and workflow status.
        </p>
      </div>

      {apiError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </p>
      )}

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
    </div>
  );
};

export default EditIssuePage;