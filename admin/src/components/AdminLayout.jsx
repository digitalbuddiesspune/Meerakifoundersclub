import { useState } from "react";
import { NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom";
import {
  ChevronIcon,
  SearchIcon,
  SidebarBlogIcon,
  SidebarBuildingIcon,
  SidebarPartnerListIcon,
  SidebarDashboardIcon,
  SidebarDocumentIcon,
  SidebarMembershipIcon,
  SidebarPaymentsIcon,
  SidebarServiceEnquiryIcon,
  SidebarServicesIcon,
  SidebarUsersIcon,
  SubmenuBoltIcon,
  SubmenuPlusIcon,
} from "./AdminIcons";

function AdminLayout() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openMenu, setOpenMenu] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const isDesktopCollapsed = !desktopSidebarOpen;

  const toggleMenu = (name) => setOpenMenu((prev) => (prev === name ? "" : name));
  const searchValue = searchParams.get("q") || "";
  const showSearch = location.pathname.includes("/services/my-services");
  const isDashboard = location.pathname === "/admin/dashboard";

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

  const primaryLinkClass = ({ isActive }) =>
    `group relative flex items-center rounded-xl text-left text-sm transition-all duration-200 ${
      isDesktopCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3"
    } ${
      isActive
        ? "bg-indigo-600 font-semibold text-white shadow-sm"
        : "font-medium text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  const submenuLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
      isActive
        ? "bg-indigo-600/80 font-semibold text-white"
        : "font-medium text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  const menuToggleClass = (isOpen) =>
    `flex w-full items-center rounded-xl text-left text-sm font-medium transition ${
      isDesktopCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-3"
    } ${
      isOpen
        ? "bg-white/10 text-white"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div
      className={`min-h-screen bg-[#f0f2f5] text-slate-900 lg:grid lg:h-screen lg:overflow-hidden ${
        desktopSidebarOpen ? "lg:grid-cols-[260px_1fr]" : "lg:grid-cols-[88px_1fr]"
      }`}
    >
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/45 lg:hidden"
          aria-label="Close sidebar overlay"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      {!sidebarOpen ? (
        <button
          type="button"
          className="fixed left-3 top-3 z-40 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-xl text-slate-900 shadow-lg lg:hidden"
          aria-label="Open sidebar"
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          ☰
        </button>
      ) : null}

      <aside
        className={`hide-scrollbar fixed left-0 top-0 z-40 flex h-screen w-[260px] flex-col overflow-y-auto bg-[#1e2139] px-4 py-6 text-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          desktopSidebarOpen
            ? "lg:static lg:z-auto lg:w-auto lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto"
            : "lg:static lg:z-auto lg:w-[88px] lg:translate-x-0 lg:px-3 lg:py-5 lg:opacity-100 lg:pointer-events-auto"
        } lg:h-screen`}
      >
        <div className={`${isDesktopCollapsed ? "px-0" : "px-2"}`}>
          <div className="flex items-start justify-between gap-3">
            {isDesktopCollapsed ? (
              <div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-base font-extrabold text-white">
                M
              </div>
            ) : (
              <div>
                <p className="text-xl font-extrabold tracking-tight text-white">
                  Meraaki <span className="text-[#E8621A]">FC</span>
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">Founders Club</p>
              </div>
            )}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg text-white lg:hidden"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg text-white lg:inline-flex"
              aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setDesktopSidebarOpen((prev) => !prev)}
            >
              {isDesktopCollapsed ? "☰" : "✕"}
            </button>
          </div>
        </div>
        <div className={`px-2 ${isDesktopCollapsed ? "hidden lg:block" : ""}`}>
          <div className="mt-4 h-px w-full bg-white/10" />
        </div>
        <nav className="mt-6 flex flex-1 flex-col gap-1">
          <NavLink
            to="/admin/dashboard"
            className={primaryLinkClass}
          >
            <SidebarDashboardIcon />
            <span className={isDesktopCollapsed ? "hidden" : ""}>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={primaryLinkClass}
          >
            <SidebarUsersIcon />
            <span className={isDesktopCollapsed ? "hidden" : ""}>Users</span>
          </NavLink>

          <NavLink
            to="/admin/payments"
            className={primaryLinkClass}
          >
            <SidebarPaymentsIcon />
            <span className={isDesktopCollapsed ? "hidden" : ""}>Payments</span>
          </NavLink>

          <NavLink
            to="/admin/services/inquiry"
            className={primaryLinkClass}
          >
            <SidebarServiceEnquiryIcon />
            <span className={isDesktopCollapsed ? "hidden" : ""}>Services Inquiry</span>
          </NavLink>

          <button
            type="button"
            className={menuToggleClass(openMenu === "services")}
            onClick={() => toggleMenu("services")}
          >
            <span className="flex items-center gap-3">
              <SidebarServicesIcon />
              <span className={isDesktopCollapsed ? "hidden" : ""}>Services</span>
            </span>
            {!isDesktopCollapsed ? <ChevronIcon open={openMenu === "services"} className="h-[18px] w-[18px] shrink-0" /> : null}
          </button>
          {openMenu === "services" && !isDesktopCollapsed && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/services/my-services"
                className={submenuLinkClass}
              >
                <SubmenuBoltIcon />
                <span>My Services</span>
              </NavLink>
              <NavLink
                to="/admin/services/add-service"
                className={submenuLinkClass}
              >
                <SubmenuPlusIcon />
                <span>Add Service</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className={menuToggleClass(openMenu === "blogs")}
            onClick={() => toggleMenu("blogs")}
          >
            <span className="flex items-center gap-3">
              <SidebarBlogIcon />
              <span className={isDesktopCollapsed ? "hidden" : ""}>Blogs</span>
            </span>
            {!isDesktopCollapsed ? <ChevronIcon open={openMenu === "blogs"} className="h-[18px] w-[18px] shrink-0" /> : null}
          </button>
          {openMenu === "blogs" && !isDesktopCollapsed && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/blogs/my-blogs"
                onClick={handleScrollToTop}
                className={({ isActive }) =>
                  submenuLinkClass({ isActive })
                }
              >
                <SidebarDocumentIcon className="h-5 w-5 shrink-0" />
                <span>My Blogs</span>
              </NavLink>
              <NavLink
                to="/admin/blogs/add-blog"
                onClick={handleScrollToTop}
                className={({ isActive }) =>
                  submenuLinkClass({ isActive })
                }
              >
                <SidebarBlogIcon className="h-5 w-5 shrink-0" />
                <span>Add Blog</span>
              </NavLink>
            </div>
          )}

          <NavLink
            to="/admin/partner-list"
            className={primaryLinkClass}
          >
            <SidebarPartnerListIcon />
            <span className={isDesktopCollapsed ? "hidden" : ""}>Partner List</span>
          </NavLink>

          <button
            type="button"
            className={menuToggleClass(openMenu === "partners")}
            onClick={() => toggleMenu("partners")}
          >
            <span className="flex items-center gap-3">
              <SidebarBuildingIcon />
              <span className={isDesktopCollapsed ? "hidden" : ""}>Partners</span>
            </span>
            {!isDesktopCollapsed ? <ChevronIcon open={openMenu === "partners"} className="h-[18px] w-[18px] shrink-0" /> : null}
          </button>
          {openMenu === "partners" && !isDesktopCollapsed && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/partners"
                className={submenuLinkClass}
              >
                <SidebarBuildingIcon className="h-5 w-5 shrink-0" />
                <span>Partners</span>
              </NavLink>
              <NavLink
                to="/admin/partners/add-partner"
                className={submenuLinkClass}
              >
                <SubmenuPlusIcon />
                <span>Add Partner</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className={menuToggleClass(openMenu === "memberships")}
            onClick={() => toggleMenu("memberships")}
          >
            <span className="flex items-center gap-3">
              <SidebarMembershipIcon />
              <span className={isDesktopCollapsed ? "hidden" : ""}>Membership</span>
            </span>
            {!isDesktopCollapsed ? <ChevronIcon open={openMenu === "memberships"} className="h-[18px] w-[18px] shrink-0" /> : null}
          </button>
          {openMenu === "memberships" && !isDesktopCollapsed && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/memberships"
                className={submenuLinkClass}
              >
                <SubmenuBoltIcon />
                <span>Show Memberships</span>
              </NavLink>
              <NavLink
                to="/admin/memberships/add-membership"
                className={submenuLinkClass}
              >
                <SubmenuPlusIcon />
                <span>Add Membership</span>
              </NavLink>
            </div>
          )}

          <button
            type="button"
            className={menuToggleClass(openMenu === "documents")}
            onClick={() => toggleMenu("documents")}
          >
            <span className="flex items-center gap-3">
              <SidebarDocumentIcon />
              <span className={isDesktopCollapsed ? "hidden" : ""}>Document</span>
            </span>
            {!isDesktopCollapsed ? <ChevronIcon open={openMenu === "documents"} className="h-[18px] w-[18px] shrink-0" /> : null}
          </button>
          {openMenu === "documents" && !isDesktopCollapsed && (
            <div className="mb-2 grid gap-2 pl-3">
              <NavLink
                to="/admin/documents"
                className={submenuLinkClass}
              >
                <SidebarDocumentIcon className="h-5 w-5 shrink-0" />
                <span>Show Documents</span>
              </NavLink>
              <NavLink
                to="/admin/documents/add-document"
                className={submenuLinkClass}
              >
                <SubmenuPlusIcon />
                <span>Add Document</span>
              </NavLink>
            </div>
          )}
        </nav>
        <div className={`mt-auto rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 ${isDesktopCollapsed ? "hidden lg:block lg:p-2" : ""}`}>
          {isDesktopCollapsed ? (
            <p className="m-0 text-center text-lg">⚡</p>
          ) : (
            <>
              <p className="m-0 text-[11px] font-bold uppercase tracking-wider text-indigo-100">Upgrade to Pro</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-white">Unlock advanced analytics & reports</p>
              <button type="button" className="mt-3 w-full rounded-lg bg-white px-3 py-2 text-xs font-bold text-indigo-700">
                Upgrade Now
              </button>
            </>
          )}
        </div>
        {!isDesktopCollapsed ? (
          <p className="mt-4 text-center text-[10px] text-slate-500">© 2026 Meraaki FC</p>
        ) : null}
      </aside>

      <main className={`lg:min-h-0 lg:overflow-y-auto ${isDashboard ? "p-4 md:p-6" : "p-5 pt-3 lg:p-7 lg:pt-4"}`}>
        {!isDashboard ? (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          {showSearch ? (
            <div className="flex min-w-0 w-full max-w-[310px] items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <SearchIcon className="h-5 w-5 shrink-0 text-slate-400" />
              <input
                type="text"
                placeholder="Search by service name"
                aria-label="Search"
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full border-0 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
          ) : (
            <div />
          )}
        </div>
        ) : null}

        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
