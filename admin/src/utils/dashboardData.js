export function formatCurrency(amount) {
  const value = Number(amount) || 0;
  return `₹ ${value.toLocaleString("en-IN")}`;
}

export function timeAgo(iso) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"} ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

export function getInitials(name = "") {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function calcTrendPercent(items, dateField, days = 30) {
  const now = Date.now();
  const ms = days * 86400000;
  const recent = items.filter((item) => {
    const t = new Date(item[dateField] || 0).getTime();
    return t >= now - ms;
  }).length;
  const previous = items.filter((item) => {
    const t = new Date(item[dateField] || 0).getTime();
    return t >= now - ms * 2 && t < now - ms;
  }).length;
  if (previous === 0) return recent > 0 ? 100 : 0;
  return Math.round(((recent - previous) / previous) * 1000) / 10;
}

export function buildDailySeries(items, dateField, days = 30) {
  const series = [];
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - i);
    const key = date.toISOString().slice(0, 10);
    const count = items.filter((item) => {
      const raw = item[dateField];
      if (!raw) return false;
      return new Date(raw).toISOString().slice(0, 10) === key;
    }).length;
    series.push({
      label: date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }),
      value: count,
    });
  }
  return series;
}

export function calcRevenue(users = [], memberships = []) {
  const priceMap = memberships.reduce((acc, plan) => {
    const key = String(plan.planName || plan.name || "").trim().toLowerCase();
    if (key) acc[key] = Number(plan.price) || 0;
    return acc;
  }, {});

  return users.reduce((sum, user) => {
    const status = String(user.status || "").toLowerCase();
    if (status !== "active") return sum;
    const plan = String(user.plan || user.membershipPlan || "").trim().toLowerCase();
    return sum + (priceMap[plan] || 0);
  }, 0);
}

export const STATUS_BADGE_SUCCESS = "border-emerald-700 bg-emerald-600 text-white";
export const STATUS_BADGE_PENDING = "border-orange-600 bg-orange-500 text-white";
export const STATUS_BADGE_FAILED = "border-red-700 bg-red-600 text-white";
export const STATUS_BADGE_NEW = "border-blue-700 bg-blue-600 text-white";

export function getInquiryStatusBadgeClass(status) {
  const value = String(status || "Pending").trim();
  if (value === "Closed") return STATUS_BADGE_SUCCESS;
  if (value === "In Progress" || value === "Pending") return STATUS_BADGE_PENDING;
  if (value === "Applied") return "border-cyan-700 bg-cyan-600 text-white";
  if (value === "Issued") return "border-violet-700 bg-violet-600 text-white";
  return STATUS_BADGE_NEW;
}

export function getBlogStatusBadgeClass(status) {
  return status === "published" ? STATUS_BADGE_SUCCESS : STATUS_BADGE_PENDING;
}

export function mapInquiryStatus(progress) {
  const value = String(progress || "New").trim();
  if (value === "Closed") return { label: "Closed", className: STATUS_BADGE_SUCCESS };
  if (value === "In Progress") return { label: "In Progress", className: STATUS_BADGE_PENDING };
  if (value === "Applied" || value === "Issued") return { label: "In Progress", className: STATUS_BADGE_PENDING };
  return { label: "New", className: STATUS_BADGE_NEW };
}

export function mapPaymentStatus(user = {}) {
  const status = String(user.status || "").toLowerCase();
  const plan = String(user.plan || user.membershipPlan || "").trim();
  if (status === "active" && plan) return { label: "Paid", className: STATUS_BADGE_SUCCESS };
  if (plan) return { label: "Pending", className: STATUS_BADGE_PENDING };
  return { label: "Failed", className: STATUS_BADGE_FAILED };
}

export function buildServiceDistribution(services = [], inquiries = []) {
  if (services.length === 0) return [];

  const counts = services.map((service) => {
    const id = String(service._id || "");
    const name = service.name || "Service";
    const inquiryCount = inquiries.filter(
      (item) => String(item.serviceId || "") === id || String(item.serviceName || "") === name
    ).length;
    return { name, count: inquiryCount || 1 };
  });

  const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;
  const colors = ["#6366f1", "#22c55e", "#f97316", "#3b82f6", "#a855f7", "#ec4899"];

  return counts
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map((item, index) => ({
      ...item,
      percent: Math.round((item.count / total) * 100),
      color: colors[index % colors.length],
    }));
}
