import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, PlusCircle } from "lucide-react";
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
      toast.success("Issue created successfully");
      navigate("/issues");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Failed to create issue";
      setApiError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        to="/issues"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Issues
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-lg md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200">
              <PlusCircle className="h-3.5 w-3.5" />
              New issue form
            </div>

            <h2 className="text-3xl font-bold tracking-tight">Create New Issue</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Add a new issue with clear details, proper priority, and severity so it can
              be tracked and resolved efficiently.
            </p>
          </div>
        </div>
      </section>

      {apiError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
          {apiError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <IssueForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitText="Create Issue"
        />

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Tips</h3>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              Use a clear title that quickly explains the issue.
            </li>
            <li>
              Add enough detail in the description so someone else can understand it.
            </li>
            <li>
              Set priority and severity carefully to help the team focus.
            </li>
            <li>
              Assign the issue if a team or owner is already known.
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default CreateIssuePage;