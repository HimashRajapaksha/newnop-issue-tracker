import { useForm } from "react-hook-form";
import type { IssueFormValues } from "../../features/issues/issueTypes";
import Input from "../common/Input";
import Button from "../common/Button";

interface Props {
  defaultValues?: IssueFormValues;
  onSubmit: (values: IssueFormValues) => Promise<void>;
  isSubmitting?: boolean;
  submitText?: string;
}

const IssueForm = ({
  defaultValues,
  onSubmit,
  isSubmitting = false,
  submitText = "Save Issue",
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormValues>({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      status: "Open",
      priority: "Medium",
      severity: "Minor",
      assignedTo: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <Input
        label="Issue Title"
        placeholder="Enter a clear issue title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
      />

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          rows={5}
          placeholder="Describe the issue in detail"
          {...register("description", { required: "Description is required" })}
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
        {errors.description?.message && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Priority
          </label>
          <select
            {...register("priority")}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Severity
          </label>
          <select
            {...register("severity")}
            className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-slate-200"
          >
            <option value="Minor">Minor</option>
            <option value="Major">Major</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      <Input
        label="Assigned To"
        placeholder="e.g. Frontend Team"
        {...register("assignedTo")}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
};

export default IssueForm;