const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
        <p className="text-sm text-slate-600">
          Welcome to your issue tracker dashboard.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-slate-700">
          Auth is working. Next we will add issue stats, issue list, create issue,
          edit issue, search, filter, and pagination.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;