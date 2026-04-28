import { useState } from "react";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import {
  ChevronIcon,
  SearchIcon,
} from "./AdminIcons";

function AdminLayout() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (name) => setOpenMenu((prev) => (prev === name ? "" : name));
  const searchValue = searchParams.get("q") || "";
  const showSearch = location.pathname.includes("/services/my-services");

  const handleSearchChange = (event) => {
    const value = event.target.value;
    const nextParams = new URLSearchParams(searchParams);

    if (value.trim()) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

    setSearchParams(nextParams);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#070f26] text-slate-100 lg:grid lg:h-screen lg:grid-cols-[286px_1fr] lg:overflow-hidden">
      <aside className="flex flex-col gap-6 border-r border-[#F0B429]/30 bg-[#081a3f] px-[18px] py-7 lg:h-screen">
        <div className="px-2">
          <p className="text-xl font-extrabold tracking-tight text-white">
            Meraaki <span className="text-[#E8621A]">FC</span>
          </p>
          <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Founders Club</p>
        </div>
        <div>
          <p className="m-0 text-[10px] font-extrabold uppercase tracking-[0.24em] text-slate-400">Main</p>
        </div>
        <nav className="flex flex-col gap-2.5 font-semibold">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-white/20 bg-[#1c2f59] font-bold text-white"
                  : "border-transparent bg-transparent font-semibold text-slate-300 hover:border-[#F0B429]/30 hover:bg-white/5"
              }`
            }
          >
            <span className="text-base" aria-hidden="true">
              🏠
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-white/20 bg-[#1c2f59] font-bold text-white"
                  : "border-transparent bg-transparent font-semibold text-slate-300 hover:border-[#F0B429]/30 hover:bg-white/5"
              }`
            }
          >
            <span className="text-base" aria-hidden="true">
              👥
            </span>
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/payments"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-white/20 bg-[#1c2f59] font-bold text-white"
                  : "border-transparent bg-transparent font-semibold text-slate-300 hover:border-[#F0B429]/30 hover:bg-white/5"
              }`
            }
          >
            <span className="text-base" aria-hidden="true">
              💳
            </span>
            <span>Payments</span>
          </NavLink>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-slate-300 transition hover:border-[#F0B429]/30 hover:bg-white/5"
            onClick={() => toggleMenu("services")}
          >
            <span className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">
                💼
              </span>
              <span>Services</span>
            </span>
            <ChevronIcon open={openMenu === "services"} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {openMenu === "services" && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/services/my-services"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">
                  ⚡
                </span>
                <span>My Services</span>
              </NavLink>
              <NavLink
                to="/admin/services/add-service"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">
                  ➕
                </span>
                <span>Add Service</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-slate-300 transition hover:border-[#F0B429]/30 hover:bg-white/5"
            onClick={() => toggleMenu("blogs")}
          >
            <span className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">
                📝
              </span>
              <span>Blogs</span>
            </span>
            <ChevronIcon open={openMenu === "blogs"} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {openMenu === "blogs" && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/blogs/my-blogs"
                onClick={handleScrollToTop}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">
                  📄
                </span>
                <span>My Blogs</span>
              </NavLink>
              <NavLink
                to="/admin/blogs/add-blog"
                onClick={handleScrollToTop}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">
                  ✍️
                </span>
                <span>Add Blog</span>
              </NavLink>
            </div>
          )}

          <NavLink
            to="/admin/partner-list"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-white/20 bg-[#1c2f59] font-bold text-white"
                  : "border-transparent bg-transparent font-semibold text-slate-300 hover:border-[#F0B429]/30 hover:bg-white/5"
              }`
            }
          >
            <span className="text-base" aria-hidden="true">🤝</span>
            <span>Partner List</span>
          </NavLink>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-slate-300 transition hover:border-[#F0B429]/30 hover:bg-white/5"
            onClick={() => toggleMenu("partners")}
          >
            <span className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">🏢</span>
              <span>Partners</span>
            </span>
            <ChevronIcon open={openMenu === "partners"} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {openMenu === "partners" && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/partners"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">🏢</span>
                <span>Partners</span>
              </NavLink>
              <NavLink
                to="/admin/partners/add-partner"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">➕</span>
                <span>Add Partner</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-slate-300 transition hover:border-[#F0B429]/30 hover:bg-white/5"
            onClick={() => toggleMenu("memberships")}
          >
            <span className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">💎</span>
              <span>Membership</span>
            </span>
            <ChevronIcon open={openMenu === "memberships"} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {openMenu === "memberships" && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/memberships"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">⚡</span>
                <span>Show Memberships</span>
              </NavLink>
              <NavLink
                to="/admin/memberships/add-membership"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">➕</span>
                <span>Add Membership</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-xl border border-transparent bg-transparent px-4 py-3.5 text-left text-sm font-semibold text-slate-300 transition hover:border-[#F0B429]/30 hover:bg-white/5"
            onClick={() => toggleMenu("documents")}
          >
            <span className="flex items-center gap-3">
              <span className="text-base" aria-hidden="true">📄</span>
              <span>Document</span>
            </span>
            <ChevronIcon open={openMenu === "documents"} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {openMenu === "documents" && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/documents"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">⚡</span>
                <span>Show Documents</span>
              </NavLink>
              <NavLink
                to="/admin/documents/add-document"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 font-bold text-white" : "font-semibold text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                <span className="text-sm" aria-hidden="true">➕</span>
                <span>Add Document</span>
              </NavLink>
            </div>
          )}
        </nav>
        <div className="mt-auto rounded-[20px] border border-[#F0B429]/30 bg-[#0f2554] p-[18px]">
          <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-300">Admin Workspace</p>
          <strong className="mt-2.5 block text-[15px] font-bold leading-6 text-white">Manage services, blogs and users from one dashboard.</strong>
        </div>
      </aside>

      <main className="p-5 lg:min-h-0 lg:overflow-y-auto lg:p-7">
        {showSearch ? (
          <div className="mb-6 flex justify-end">
            <div className="flex min-w-0 w-full max-w-[310px] items-center gap-2.5 rounded-full border border-[#F0B429]/30 bg-[#142e62] px-4 py-3">
              <SearchIcon className="h-5 w-5 shrink-0 text-cyan-300" />
              <input
                type="text"
                placeholder="Search by service name"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
              />
            </div>
          </div>
        ) : null}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
