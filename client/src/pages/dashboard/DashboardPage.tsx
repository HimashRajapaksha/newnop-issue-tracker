import { Link } from "react-router-dom";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg">
        <h2 className="text-3xl font-bold">Issue Tracker Dashboard</h2>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Manage issues, track progress, and keep your workflow organized with a
          clean and efficient issue tracking experience.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/issues"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            View Issues
          </Link>
          <Link
            to="/issues/create"
            className="rounded-xl border border-slate-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create Issue
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Organized Workflow</h3>
          <p className="mt-2 text-sm text-slate-600">
            Easily manage issue lifecycle from Open to Closed with clear status updates.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Priority Tracking</h3>
          <p className="mt-2 text-sm text-slate-600">
            Highlight important issues using priority and severity indicators.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Fast Management</h3>
          <p className="mt-2 text-sm text-slate-600">
            Search, filter, edit, and resolve issues through a smooth user experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;