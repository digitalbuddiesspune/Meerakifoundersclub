import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart, DonutChart, LineChart } from "../components/dashboard/DashboardCharts";
import {
  buildDailySeries,
  buildServiceDistribution,
  calcRevenue,
  calcTrendPercent,
  formatCurrency,
  getInitials,
  mapInquiryStatus,
  mapPaymentStatus,
  timeAgo,
} from "../utils/dashboardData";

const AVATAR_COLORS = [
  "bg-indigo-100 text-indigo-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
  "bg-violet-100 text-violet-700",
  "bg-cyan-100 text-cyan-700",
];

const KPI_META = [
  {
    key: "users",
    label: "Total Users",
    icon: "👥",
    cardClass: "bg-blue-500",
  },
  {
    key: "services",
    label: "Total Services",
    icon: "⚡",
    cardClass: "bg-emerald-600",
  },
  {
    key: "blogs",
    label: "Total Blogs",
    icon: "📄",
    cardClass: "bg-orange-500",
  },
  {
    key: "revenue",
    label: "Total Revenue",
    icon: "₹",
    cardClass: "bg-red-500",
  },
];

function TrendBadge({ value, light = false }) {
  const positive = value >= 0;
  if (light) {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/95">
        {positive ? "↑" : "↓"} {Math.abs(value)}%{" "}
        <span className="font-normal text-white/75">vs last month</span>
      </span>
    );
  }
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${positive ? "text-emerald-600" : "text-red-500"}`}>
      {positive ? "↑" : "↓"} {Math.abs(value)}% <span className="font-normal text-slate-400">vs last month</span>
    </span>
  );
}

function DashboardPage({
  usersList = [],
  servicesList = [],
  blogsList = [],
  serviceInquiries = [],
  memberships = [],
  adminName = "Admin",
}) {
  const navigate = useNavigate();
  const [chartRange, setChartRange] = useState("30");

  const handleLogout = () => {
    localStorage.removeItem("mfc_admin_auth_user");
    navigate("/admin/login", { replace: true });
  };

  const statsMap = useMemo(() => {
    const revenue = calcRevenue(usersList, memberships);
    return {
      users: usersList.length,
      services: servicesList.length,
      blogs: blogsList.length,
      revenue,
      usersTrend: calcTrendPercent(usersList, "createdAt"),
      servicesTrend: calcTrendPercent(servicesList, "createdAt"),
      blogsTrend: calcTrendPercent(blogsList, "createdAt"),
      revenueTrend: calcTrendPercent(
        usersList.filter((user) => String(user.status || "").toLowerCase() === "active"),
        "updatedAt"
      ),
    };
  }, [usersList, servicesList, blogsList, memberships]);

  const userGrowth = useMemo(() => buildDailySeries(usersList, "createdAt", Number(chartRange)), [usersList, chartRange]);
  const overviewSeries = useMemo(() => buildDailySeries(usersList, "createdAt", Number(chartRange)), [usersList, chartRange]);

  const recentInquiries = useMemo(
    () =>
      [...serviceInquiries]
        .sort((a, b) => new Date(b.submittedAt || b.createdAt || 0) - new Date(a.submittedAt || a.createdAt || 0))
        .slice(0, 5),
    [serviceInquiries]
  );

  const recentPayments = useMemo(
    () =>
      [...usersList]
        .filter((user) => user.plan || user.membershipPlan)
        .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
        .slice(0, 5),
    [usersList]
  );

  const serviceDistribution = useMemo(
    () => buildServiceDistribution(servicesList, serviceInquiries),
    [servicesList, serviceInquiries]
  );

  const kpiValues = {
    users: statsMap.users,
    services: statsMap.services,
    blogs: statsMap.blogs,
    revenue: formatCurrency(statsMap.revenue),
  };

  const kpiTrends = {
    users: statsMap.usersTrend,
    services: statsMap.servicesTrend,
    blogs: statsMap.blogsTrend,
    revenue: statsMap.revenueTrend,
  };

  return (
    <div className="space-y-6">
      {/* Top header bar */}
      <header className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm md:px-5">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">Dashboard</h1>
        </div>
        <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:max-w-md">
          <span className="text-slate-400">🔍</span>
          <input
            type="search"
            placeholder="Search anything..."
            className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg">
            🔔
            {recentInquiries.length > 0 ? (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            ) : null}
          </button>
          <button
              type="button"
              onClick={() => navigate("/admin/account")}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:border-orange-200"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8621A] text-sm font-bold text-white">
                {getInitials(adminName)}
              </span>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold leading-tight text-slate-900">{adminName}</p>
                <p className="text-[11px] text-slate-500">Super Admin</p>
              </div>
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
      </header>

      {/* KPI cards */}
      <div>
        <h2 className="text-lg font-bold text-slate-900">Dashboard Overview</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_META.map((item) => (
            <article
              key={item.key}
              className={`rounded-2xl p-5 text-white shadow-md transition hover:shadow-lg ${item.cardClass}`}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 text-lg">
                {item.icon}
              </div>
              <p className="mt-4 text-sm font-medium text-white/90">{item.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight">{kpiValues[item.key]}</p>
              <div className="mt-3">
                <TrendBadge value={kpiTrends[item.key]} light />
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Overview + Recent Inquiries */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Overview</h2>
              <p className="text-xs text-slate-500">Users growth over time</p>
            </div>
            <select
              value={chartRange}
              onChange={(event) => setChartRange(event.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 outline-none"
            >
              <option value="30">Last 30 Days</option>
              <option value="14">Last 14 Days</option>
              <option value="7">Last 7 Days</option>
            </select>
          </div>
          <div className="h-[240px] w-full">
            <LineChart series={overviewSeries} stroke="#6366f1" fill="rgba(99,102,241,0.15)" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>{overviewSeries[0]?.label}</span>
            <span>{overviewSeries[overviewSeries.length - 1]?.label}</span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Inquiries</h2>
            <Link to="/admin/services/inquiry" className="text-xs font-semibold text-[#E8621A] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentInquiries.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">No inquiries yet</p>
            ) : (
              recentInquiries.map((inquiry, index) => {
                const status = mapInquiryStatus(inquiry.progressStatus);
                const name = inquiry.userName || inquiry.username || "User";
                return (
                  <div key={inquiry.submissionId || index} className="flex items-start gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
                      {getInitials(name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">{name}</p>
                      <p className="truncate text-xs text-slate-500">{inquiry.userEmail || inquiry.email || "—"}</p>
                      <p className="mt-0.5 truncate text-xs text-slate-400">{inquiry.serviceName || "Service inquiry"}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.className}`}>
                        {status.label}
                      </span>
                      <p className="mt-1 text-[10px] text-slate-400">{timeAgo(inquiry.submittedAt || inquiry.createdAt)}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>

      {/* Top Services + Recent Payments + Users Growth */}
      <div className="grid gap-4 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Top Services</h2>
          <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <DonutChart segments={serviceDistribution} />
            <div className="w-full space-y-2">
              {serviceDistribution.length === 0 ? (
                <p className="text-sm text-slate-400">No services yet</p>
              ) : (
                serviceDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-2 text-sm">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} />
                      <span className="truncate text-slate-700">{item.name}</span>
                    </div>
                    <span className="shrink-0 font-semibold text-slate-900">
                      {item.percent}% <span className="font-normal text-slate-400">({item.count})</span>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent Payments</h2>
            <Link to="/admin/payments" className="text-xs font-semibold text-[#E8621A] hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentPayments.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">No payments yet</p>
            ) : (
              recentPayments.map((user, index) => {
                const status = mapPaymentStatus(user);
                const planPrice =
                  memberships.find(
                    (plan) =>
                      String(plan.planName || plan.name || "").toLowerCase() ===
                      String(user.plan || user.membershipPlan || "").toLowerCase()
                  )?.price || 0;
                return (
                  <div key={user._id || index} className="flex items-center gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm">🧾</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        #{String(user._id || "").slice(-6).toUpperCase() || "ORDER"}
                      </p>
                      <p className="truncate text-xs text-slate-500">{user.username || user.email || "Customer"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(planPrice)}</p>
                      <span className={`mt-0.5 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${status.className}`}>
                        {status.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Users Growth</h2>
          <p className="mt-1 text-xs text-slate-500">Daily sign-ups</p>
          <div className="mt-4 h-[220px] w-full">
            <BarChart series={userGrowth} barColor="#6366f1" />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>{userGrowth[0]?.label}</span>
            <span>{userGrowth[userGrowth.length - 1]?.label}</span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
