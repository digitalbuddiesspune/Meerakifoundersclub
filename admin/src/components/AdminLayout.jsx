import { useState } from "react";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import {
  BriefcaseIcon,
  ChevronIcon,
  FileTextIcon,
  GridIcon,
  PenSquareIcon,
  PlusSquareIcon,
  SearchIcon,
} from "./AdminIcons";

function AdminLayout() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [servicesOpen, setServicesOpen] = useState(true);
  const [blogsOpen, setBlogsOpen] = useState(true);
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

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(46,196,182,0.18),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,159,67,0.14),transparent_18%),#eef4fb] text-slate-900 lg:grid lg:grid-cols-[290px_1fr]">
      <aside className="flex flex-col gap-6 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),transparent_18%),linear-gradient(180deg,#083344_0%,#0f5b6e_55%,#0b4253_100%)] px-[18px] py-7 text-cyan-50 shadow-none lg:min-h-screen lg:shadow-[18px_0_40px_rgba(8,51,68,0.22)]">
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dd0imqx3p/image/upload/q_auto/f_auto/v1776147066/IMG_1857_iz7m7a.png"
            alt="Meraaki Founders Club"
            className="h-auto w-full max-w-[220px]"
          />
        </div>
        <nav className="flex flex-col gap-2.5">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm transition ${
                isActive
                  ? "border-white/20 bg-gradient-to-br from-cyan-400 to-teal-500 text-white shadow-[0_14px_25px_rgba(22,199,209,0.26)]"
                  : "border-white/10 bg-white/5 text-cyan-100 hover:translate-x-1"
              }`
            }
          >
            <GridIcon className="h-5 w-5 shrink-0" />
            <span>Dashboard</span>
          </NavLink>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left text-sm text-cyan-100 transition hover:translate-x-1"
            onClick={() => setServicesOpen((prev) => !prev)}
          >
            <span className="flex items-center gap-3">
              <BriefcaseIcon className="h-5 w-5 shrink-0" />
              <span>Services</span>
            </span>
            <ChevronIcon open={servicesOpen} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {servicesOpen && (
            <div className="mb-2 grid gap-2 pl-2.5">
              <NavLink
                to="/admin/services/my-services"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 text-white" : "bg-white/[0.04] text-cyan-50/85 hover:translate-x-1"
                  }`
                }
              >
                <BriefcaseIcon className="h-4 w-4 shrink-0" />
                <span>My Services</span>
              </NavLink>
              <NavLink
                to="/admin/services/add-service"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 text-white" : "bg-white/[0.04] text-cyan-50/85 hover:translate-x-1"
                  }`
                }
              >
                <PlusSquareIcon className="h-4 w-4 shrink-0" />
                <span>Add Service</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-left text-sm text-cyan-100 transition hover:translate-x-1"
            onClick={() => setBlogsOpen((prev) => !prev)}
          >
            <span className="flex items-center gap-3">
              <FileTextIcon className="h-5 w-5 shrink-0" />
              <span>Blogs</span>
            </span>
            <ChevronIcon open={blogsOpen} className="h-[18px] w-[18px] shrink-0" />
          </button>
          {blogsOpen && (
            <div className="mb-2 grid gap-2 pl-2.5">
              <NavLink
                to="/admin/blogs/my-blogs"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 text-white" : "bg-white/[0.04] text-cyan-50/85 hover:translate-x-1"
                  }`
                }
              >
                <FileTextIcon className="h-4 w-4 shrink-0" />
                <span>My Blogs</span>
              </NavLink>
              <NavLink
                to="/admin/blogs/add-blog"
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    isActive ? "bg-white/15 text-white" : "bg-white/[0.04] text-cyan-50/85 hover:translate-x-1"
                  }`
                }
              >
                <PenSquareIcon className="h-4 w-4 shrink-0" />
                <span>Add Blog</span>
              </NavLink>
            </div>
          )}
        </nav>
        <div className="mt-auto rounded-[20px] border border-white/10 bg-gradient-to-b from-white/12 to-white/5 p-[18px]">
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-50/70">Creative workspace</p>
          <strong className="mt-2.5 block text-[15px] leading-6 text-white">Build, publish and track your content from one place.</strong>
        </div>
      </aside>

      <main className="p-5 lg:p-7">
        {showSearch ? (
          <header className="mb-5 flex justify-end">
            <div className="flex min-w-0 w-full max-w-[300px] items-center gap-2.5 rounded-full border border-slate-200/60 bg-white/90 px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
              <SearchIcon className="h-5 w-5 shrink-0" />
              <input
                type="text"
                placeholder="Search by service name"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none"
              />
            </div>
          </header>
        ) : null}
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
