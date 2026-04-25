import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function formatValue(value) {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }

  return value;
}

function ServiceDetailsPage({ servicesList, serviceMessage, onDeleteProject }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceId } = useParams();

  const service = useMemo(() => {
    const stateService = location.state?.service;

    if (stateService?._id === serviceId) {
      return stateService;
    }

    return servicesList.find((item) => item._id === serviceId) || null;
  }, [location.state, serviceId, servicesList]);
  const searchQuery = (new URLSearchParams(location.search).get("q") || "").trim().toLowerCase();
  const filteredProjects = (service?.projects || [])
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => (project.name || "").toLowerCase().includes(searchQuery));

  const handleProjectDelete = async (projectIndex) => {
    if (!service || !window.confirm("Delete this project from the service?")) {
      return;
    }

    const removed = await onDeleteProject(service, projectIndex);

    if (removed) {
      navigate(0);
    }
  };

  if (!service) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">Service not found</h4>
          <p className="mt-2 text-sm text-slate-300">This service could not be loaded.</p>
          <button
            type="button"
            className="mt-4 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            onClick={() => navigate("/admin/services/my-services")}
          >
            Back to Services
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      {serviceMessage ? <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{serviceMessage}</p> : null}

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-[#F0B429]">{service.name} Projects</h3>
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 w-full max-w-[260px] items-center gap-2.5 rounded-full border border-[#F0B429]/30 bg-[#142e62] px-4 py-3">
            <input
              type="text"
              placeholder="Search by project name"
              aria-label="Search projects by name"
              value={searchQuery}
              onChange={(event) => navigate(`/admin/services/details/${serviceId}?q=${encodeURIComponent(event.target.value)}`, { state: { service } })}
              className="w-full border-0 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
            />
          </div>
          <button
            type="button"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            onClick={() => navigate("/admin/services/my-services")}
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid overflow-hidden rounded-[18px] border border-[#F0B429]/30">
          <div className="hidden grid-cols-[90px_minmax(150px,1.2fr)_minmax(110px,0.8fr)_minmax(130px,1fr)_minmax(170px,1fr)_minmax(140px,0.9fr)] gap-3 border-b border-[#F0B429]/30 bg-[#142e62] px-3.5 py-3 md:grid">
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Image</span>
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Name</span>
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Price</span>
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Tools</span>
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Links</span>
            <span className="text-xs font-extrabold uppercase text-[#F0B429]">Actions</span>
          </div>
          {filteredProjects.map(({ project, index }) => (
            <div
              key={`${service._id}-page-project-${index}`}
              className="grid grid-cols-1 gap-3 border-b border-[#F0B429]/20 bg-[#0d214d] p-3.5 last:border-b-0 md:grid-cols-[90px_minmax(150px,1.2fr)_minmax(110px,0.8fr)_minmax(130px,1fr)_minmax(170px,1fr)_minmax(140px,0.9fr)]"
            >
              <div className="grid content-start">
                {project.image ? <img src={project.image} alt={project.name || `Project ${index + 1}`} className="h-[72px] w-[72px] rounded-xl object-cover" /> : null}
              </div>
              <div className="grid gap-2">
                <strong className="text-[13px] text-white">{project.name || `Project ${index + 1}`}</strong>
                <p className="m-0 text-xs leading-5 text-slate-300">{project.description || "No description available."}</p>
              </div>
              <div className="grid gap-2 text-xs font-bold text-white">
                <span>Discounted: {formatValue(project.discountedPrice)}</span>
                <span>Original: {formatValue(project.price)}</span>
              </div>
              <div className="grid gap-2">
                <div className="flex flex-wrap gap-2">
                  {(project.technologiesUsed || []).map((technology, techIndex) => (
                    <span key={`${service._id}-page-project-${index}-tool-${techIndex}`} className="text-[11px] font-semibold text-slate-300">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.demoLink ? (
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="inline-flex whitespace-nowrap rounded-full border border-cyan-300/30 bg-cyan-500/20 px-3 py-2 text-xs font-bold text-cyan-100">
                    Live Demo
                  </a>
                ) : null}
                {project.quoteLink ? (
                  <a href={project.quoteLink} target="_blank" rel="noreferrer" className="inline-flex whitespace-nowrap rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-bold text-slate-100">
                    Quote Link
                  </a>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-2xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100 whitespace-nowrap"
                  onClick={() =>
                    navigate("/admin/services/add-service", {
                      state: { service, projectIndex: index },
                    })
                  }
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-red-300/30 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-200 whitespace-nowrap"
                  onClick={() => handleProjectDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceDetailsPage;
