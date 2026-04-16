import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function formatValue(value) {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }

  return value;
}

function ServiceDetailsPage({ servicesList, serviceMessage, onDeleteService, onDeleteProject }) {
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

  const handleServiceDelete = async () => {
    if (!service || !window.confirm("Delete this service?")) {
      return;
    }

    await onDeleteService(service._id);
    navigate("/admin/services/my-services");
  };

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
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">Service not found</h4>
          <p className="mt-2 text-sm text-slate-500">This service could not be loaded.</p>
          <button
            type="button"
            className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
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
      {serviceMessage ? <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{serviceMessage}</p> : null}

      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">{service.name} Projects</h3>
        <div className="flex items-center gap-3">
          <div className="flex min-w-0 w-full max-w-[260px] items-center gap-2.5 rounded-full border border-slate-200/60 bg-white/90 px-4 py-3 shadow-[0_12px_24px_rgba(15,23,42,0.06)]">
            <input
              type="text"
              placeholder="Search by project name"
              aria-label="Search projects by name"
              value={searchQuery}
              onChange={(event) => navigate(`/admin/services/details/${serviceId}?q=${encodeURIComponent(event.target.value)}`, { state: { service } })}
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none"
            />
          </div>
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={() => navigate("/admin/services/my-services")}
          >
            Back
          </button>
        </div>
      </div>

      <div className="grid gap-2">
        <div className="grid overflow-hidden rounded-[18px] border border-slate-200">
          <div className="hidden grid-cols-[90px_minmax(150px,1.2fr)_minmax(110px,0.8fr)_minmax(130px,1fr)_minmax(170px,1fr)_minmax(140px,0.9fr)] gap-3 border-b border-slate-200 bg-sky-50 px-3.5 py-3 md:grid">
            <span className="text-xs font-extrabold uppercase text-slate-600">Image</span>
            <span className="text-xs font-extrabold uppercase text-slate-600">Name</span>
            <span className="text-xs font-extrabold uppercase text-slate-600">Price</span>
            <span className="text-xs font-extrabold uppercase text-slate-600">Tools</span>
            <span className="text-xs font-extrabold uppercase text-slate-600">Links</span>
            <span className="text-xs font-extrabold uppercase text-slate-600">Actions</span>
          </div>
          {filteredProjects.map(({ project, index }) => (
            <div
              key={`${service._id}-page-project-${index}`}
              className="grid grid-cols-1 gap-3 border-b border-slate-100 bg-white p-3.5 last:border-b-0 md:grid-cols-[90px_minmax(150px,1.2fr)_minmax(110px,0.8fr)_minmax(130px,1fr)_minmax(170px,1fr)_minmax(140px,0.9fr)]"
            >
              <div className="grid content-start">
                {project.image ? <img src={project.image} alt={project.name || `Project ${index + 1}`} className="h-[72px] w-[72px] rounded-xl object-cover" /> : null}
              </div>
              <div className="grid gap-2">
                <strong className="text-[13px] text-slate-900">{project.name || `Project ${index + 1}`}</strong>
                <p className="m-0 text-xs leading-5 text-slate-500">{project.description || "No description available."}</p>
              </div>
              <div className="grid gap-2 text-xs font-bold text-slate-900">
                <span>Discounted: {formatValue(project.discountedPrice)}</span>
                <span>Original: {formatValue(project.price)}</span>
              </div>
              <div className="grid gap-2">
                <div className="flex flex-wrap gap-2">
                  {(project.technologiesUsed || []).map((technology, techIndex) => (
                    <span key={`${service._id}-page-project-${index}-tool-${techIndex}`} className="text-[11px] font-semibold text-slate-600">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {project.demoLink ? (
                  <a href={project.demoLink} target="_blank" rel="noreferrer" className="inline-flex whitespace-nowrap rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 px-3 py-2 text-xs font-bold text-white">
                    Live Demo
                  </a>
                ) : null}
                {project.quoteLink ? (
                  <a href={project.quoteLink} target="_blank" rel="noreferrer" className="inline-flex whitespace-nowrap rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">
                    Quote Link
                  </a>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 whitespace-nowrap"
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
                  className="rounded-2xl bg-gradient-to-br from-red-500 to-red-600 px-3 py-2 text-xs font-semibold text-white whitespace-nowrap"
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
