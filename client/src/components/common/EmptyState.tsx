import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

const EmptyState = ({ title, description, actionLabel, actionTo }: Props) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>

      {actionLabel && actionTo ? (
        <div className="mt-5">
          <Link
            to={actionTo}
            className="inline-flex rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            {actionLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default EmptyState;