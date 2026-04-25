const DASH_META = [
  {
    icon: "⚡",
    iconBg: "bg-amber-500/20",
  },
  {
    icon: "📄",
    iconBg: "bg-cyan-500/20",
  },
  {
    icon: "👥",
    iconBg: "bg-violet-500/20",
  },
];

function DashboardPage({ dashboardStats }) {
  const quickStats = (dashboardStats || []).map((stat, index) => {
    const meta = DASH_META[index] || DASH_META[0];
    return {
      label: stat?.label || "—",
      value: stat?.value ?? 0,
      iconBg: meta.iconBg,
      icon: meta.icon,
    };
  });

  return (
    <section className="grid gap-6">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-5">
        <p className="m-0 text-xs font-bold uppercase tracking-[0.12em] text-[#F0B429]">Overview</p>
        <h2 className="mt-2 text-2xl font-bold text-[#F0B429]">Admin Dashboard</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 xl:max-w-3xl">
        {quickStats.map((item) => (
          <div key={item.label} className="grid rounded-2xl border border-[#F0B429]/30 bg-[#132c61] px-3 py-2.5 text-left">
            <div className={`mb-2 grid h-7 w-7 place-items-center rounded-xl ${item.iconBg}`}>
              <span className="text-sm leading-none" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <p className="m-0 text-xs font-medium text-[#F0B429]">{item.label}</p>
            <strong className="mt-0.5 block text-xl text-white">{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
