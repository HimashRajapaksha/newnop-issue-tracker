import { useNavigate } from "react-router-dom";
import { useState } from "react";
import IssueForm from "../../components/issues/IssueForm";
import { createIssueApi } from "../../api/issueApi";
import type { IssueFormValues } from "../../features/issues/issueTypes";

const CreateIssuePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (values: IssueFormValues) => {
    try {
      setIsSubmitting(true);
      setApiError("");
      await createIssueApi(values);
      navigate("/issues");
    } catch (error: any) {
      setApiError(error?.response?.data?.message || "Failed to create issue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Create New Issue</h2>
        <p className="text-sm text-slate-600">
          Add a new issue with proper status, priority, and severity.
        </p>
      </div>

      {apiError && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {apiError}
        </p>
      )}

      <IssueForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitText="Create Issue"
      />
    </div>
  );
};

export default CreateIssuePage;