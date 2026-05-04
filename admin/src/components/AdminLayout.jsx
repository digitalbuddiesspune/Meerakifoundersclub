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
    `group relative flex items-center rounded-xl border text-left text-sm transition-all duration-200 ${
      isDesktopCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3.5"
    } ${
      isActive
        ? "border-[#F0B429]/60 bg-gradient-to-r from-[#1d3364] to-[#1a2a4d] font-bold text-white shadow-[0_0_0_1px_rgba(240,180,41,0.15)]"
        : "border-transparent bg-transparent font-semibold text-slate-300 hover:border-[#F0B429]/35 hover:bg-white/5 hover:text-slate-100"
    }`;

  const submenuLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
      isActive
        ? "border border-[#F0B429]/40 bg-[#F0B429]/10 font-bold text-[#FFE199]"
        : "border border-transparent font-semibold text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
    }`;

  const menuToggleClass = (isOpen) =>
    `flex w-full items-center rounded-xl border text-left text-sm font-semibold transition ${
      isDesktopCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-3.5"
    } ${
      isOpen
        ? "border-[#F0B429]/45 bg-[#152b59] text-white"
        : "border-transparent bg-transparent text-slate-300 hover:border-[#F0B429]/30 hover:bg-white/5 hover:text-slate-100"
    }`;

  return (
    <div
      className={`min-h-screen bg-[#070f26] text-slate-100 lg:grid lg:h-screen lg:overflow-hidden ${
        desktopSidebarOpen ? "lg:grid-cols-[286px_1fr]" : "lg:grid-cols-[88px_1fr]"
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
          className="fixed left-3 top-3 z-40 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#F0B429]/40 bg-[#132b5c] text-xl text-white shadow-lg transition hover:border-[#F0B429]/70 lg:hidden"
          aria-label="Open sidebar"
          onClick={() => {
            setSidebarOpen(true);
          }}
        >
          ☰
        </button>
      ) : null}

      <aside
        className={`hide-scrollbar fixed left-0 top-0 z-40 flex h-screen w-[286px] flex-col gap-6 overflow-y-auto border-r border-[#F0B429]/35 bg-gradient-to-b from-[#091b44] via-[#081a3f] to-[#061430] px-[18px] py-7 shadow-[inset_-1px_0_0_rgba(240,180,41,0.16)] transition-transform duration-300 ${
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
              <div className="hidden lg:flex h-9 w-9 items-center justify-center rounded-lg border border-[#F0B429]/45 bg-white/5 text-base font-extrabold text-white">
                M
              </div>
            ) : (
              <div>
                <p className="text-xl font-extrabold tracking-tight text-white">
                  Meraaki <span className="text-[#E8621A]">FC</span>
                </p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">Founders Club</p>
              </div>
            )}
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#F0B429]/35 bg-white/5 text-lg text-white transition hover:border-[#F0B429]/65 hover:bg-white/10 lg:hidden"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => {
                setSidebarOpen((prev) => !prev);
              }}
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
            <button
              type="button"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-[#F0B429]/35 bg-white/5 text-lg text-white transition hover:border-[#F0B429]/65 hover:bg-white/10 lg:inline-flex"
              aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setDesktopSidebarOpen((prev) => !prev)}
            >
              {isDesktopCollapsed ? "☰" : "✕"}
            </button>
          </div>
        </div>
        <div className={`px-2 ${isDesktopCollapsed ? "hidden lg:block" : ""}`}>
          <div className="mt-2 h-px w-full bg-gradient-to-r from-[#F0B429]/45 via-[#F0B429]/15 to-transparent" />
        </div>
        <nav className="flex flex-col gap-2.5 font-semibold">
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
        <div className={`mt-auto rounded-[20px] border border-[#F0B429]/40 bg-gradient-to-br from-[#102a60] to-[#0a1e46] p-[18px] shadow-[0_8px_24px_rgba(5,10,30,0.35)] ${isDesktopCollapsed ? "hidden lg:block lg:p-2" : ""}`}>
          {isDesktopCollapsed ? (
            <p className="m-0 text-center text-lg">⚡</p>
          ) : (
            <>
          <p className="m-0 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#C8D6FF]">Admin Workspace</p>
          <strong className="mt-2.5 block text-[15px] font-bold leading-6 text-white">Manage services, blogs and users from one dashboard.</strong>
          <p className="mt-2 text-xs text-slate-300">Improved navigation for faster daily operations.</p>
            </>
          )}
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
