import { Link } from "react-router-dom";

// ── Feature card data ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    color: "text-violet-600 bg-violet-50 border-violet-100",
    dot: "bg-violet-500",
    label: "Workflow",
    title: "Organized Workflow",
    description: "Manage issue lifecycle from Open to Closed with clear status updates and structured handoffs.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
      </svg>
    ),
    color: "text-amber-600 bg-amber-50 border-amber-100",
    dot: "bg-amber-500",
    label: "Priority",
    title: "Priority Tracking",
    description: "Surface critical issues instantly with priority and severity indicators that cut through the noise.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    dot: "bg-emerald-500",
    label: "Speed",
    title: "Fast Management",
    description: "Search, filter, edit, and resolve issues through a fluid, keyboard-friendly experience.",
  },
];

// ── Stat pill ─────────────────────────────────────────────────────────────────
const StatPill = ({ value, label }: { value: string; label: string }) => (
  <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
    <span className="text-xl font-bold text-white">{value}</span>
    <span className="text-[12px] leading-tight text-slate-400">{label}</span>
  </div>
);

// ── Decorative grid lines (pure CSS, no deps) ─────────────────────────────────
const GridAccent = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 rounded-3xl overflow-hidden"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
);

// ── Glow blobs ────────────────────────────────────────────────────────────────
const HeroGlows = () => (
  <>
    <div
      aria-hidden
      className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-20 blur-3xl"
      style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)" }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-10 h-48 w-48 rounded-full opacity-10 blur-3xl"
      style={{ background: "radial-gradient(circle, #38bdf8, transparent 70%)" }}
    />
  </>
);

// ── Main Page ─────────────────────────────────────────────────────────────────
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">

        {/* ── Hero Banner ──────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-10 shadow-xl">
          <GridAccent />
          <HeroGlows />

          <div className="relative z-10">
            {/* Eyebrow tag */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-300">
                Issue Tracker
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your command center
              <br />
              <span className="text-slate-400">for every issue.</span>
            </h1>

            <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate-400">
              Manage issues, track progress, and keep your workflow organized with
              a clean and efficient issue tracking experience.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/issues"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-150 hover:bg-slate-100 hover:shadow-md active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" />
                </svg>
                View Issues
              </Link>
              <Link
                to="/issues/create"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-150 hover:bg-white/10 hover:border-white/25 active:scale-[0.98]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create Issue
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              <StatPill value="3" label="Status levels" />
              <StatPill value="4" label="Priority tiers" />
              <StatPill value="∞" label="Issues tracked" />
            </div>
          </div>
        </div>

        {/* ── Section label ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-3 px-1">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">
            What's included
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* ── Feature Cards ─────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-[2px] hover:border-slate-300 hover:shadow-md"
            >
              {/* Subtle hover tint */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 rounded-2xl"
                style={{ background: "radial-gradient(ellipse at top left, rgba(248,250,252,0.8), transparent 70%)" }}
              />

              <div className="relative z-10">
                {/* Icon + label row */}
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${f.color}`}>
                    {f.icon}
                  </div>
                  <span className="flex items-center gap-1.5 rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 border border-slate-100">
                    <span className={`h-1.5 w-1.5 rounded-full ${f.dot}`} />
                    {f.label}
                  </span>
                </div>

                <h3 className="text-[15px] font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-500">
                  {f.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Quick action strip ────────────────────────────────────────────── */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-[13px] font-semibold text-slate-800">Ready to get started?</p>
            <p className="text-[12px] text-slate-500">Jump straight into your issues.</p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/issues"
              className="rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-[13px] font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Browse
            </Link>
            <Link
              to="/issues/create"
              className="rounded-lg bg-slate-900 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-slate-800 active:scale-[0.98]"
            >
              + New Issue
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;