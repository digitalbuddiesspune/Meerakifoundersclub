import { BriefcaseIcon, FileTextIcon } from "../components/AdminIcons";

function DashboardPage({ dashboardStats }) {
  const quickStats = [
    {
      label: dashboardStats[0]?.label || "Services",
      value: dashboardStats[0]?.value || 0,
      bg: "bg-gradient-to-br from-white to-[#dff9f7]",
      icon: <BriefcaseIcon className="h-6 w-6" />,
    },
    {
      label: dashboardStats[1]?.label || "Blogs",
      value: dashboardStats[1]?.value || 0,
      bg: "bg-gradient-to-br from-white to-[#fff0de]",
      icon: <FileTextIcon className="h-6 w-6" />,
    },
  ];

  return (
    <section className="grid gap-6">
      <div className="grid gap-3 sm:grid-cols-2 xl:max-w-md">
        {quickStats.map((item) => (
          <div key={item.label} className={`grid justify-items-center rounded-3xl px-4 py-3 text-center text-slate-900 ${item.bg}`}>
            <p className="m-0 text-sm font-semibold text-slate-700">{item.label}</p>
            <div className="my-2.5 grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400 to-sky-600 text-white shadow-[0_10px_20px_rgba(16,149,178,0.18)]">
              {item.icon}
            </div>
            <strong className="block text-2xl">{item.value}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DashboardPage;
