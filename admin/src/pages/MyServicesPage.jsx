import { useNavigate, useSearchParams } from "react-router-dom";

function formatValue(value) {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }

  return value;
}

function MyServicesPage({ servicesLoading, servicesError, servicesList, serviceMessage, onDeleteService, onDeleteProject }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const filteredServices = servicesList.filter((service) => service.name?.toLowerCase().includes(searchQuery));

  const handleServiceDelete = async (serviceId) => {
    if (!window.confirm("Delete this service?")) {
      return;
    }

    await onDeleteService(serviceId);
  };

  return (
    <section className="grid gap-5">
      {serviceMessage ? <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{serviceMessage}</p> : null}
      {servicesLoading ? (
        <p className="text-sm text-slate-500">Loading services...</p>
      ) : servicesError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{servicesError}. Check backend server and API URL.</p>
      ) : servicesList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No services found</h4>
          <p className="mt-2 text-sm text-slate-500">Add your first premium service to populate this stylish portfolio section.</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No matching services</h4>
          <p className="mt-2 text-sm text-slate-500">No service name matches `{searchParams.get("q")}`.</p>
        </div>
      ) : (
        <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
          {filteredServices.map((service) => (
            <article key={service._id} className="grid gap-3 rounded-3xl border border-slate-200/50 bg-gradient-to-b from-white to-slate-50 p-4 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
              <div className="grid justify-items-center gap-3 text-center">
                {service.image ? <img src={service.image} alt={service.name} className="h-[78px] w-[78px] rounded-[16px] object-cover" /> : null}
                <div className="grid gap-2">
                  <h3 className="m-0 text-[17px] font-semibold text-slate-900">{service.name}</h3>
                  <p className="m-0 text-[12px] leading-5 text-slate-500">{service.information}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">Price: {formatValue(service.discountedPrice)}</span>
                    <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">Projects: {service.projects?.length || service.projectsCount || 0}</span>
                    <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">Tools: {service.toolsWeUsed?.length || 0}</span>
                    <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">Delivery: {formatValue(service.avgDelivery)}</span>
                    <span className="rounded-full bg-cyan-50 px-2 py-1 text-[11px] font-bold text-cyan-700">Satisfaction: {formatValue(service.satisfaction)}</span>
                  </div>
                  <div className="flex min-h-8 flex-wrap justify-center gap-2">
                    {(service.toolsWeUsed || []).slice(0, 3).map((tool, index) => (
                      <span key={`${service._id}-tool-${index}`} className="rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold text-slate-600">
                        {tool}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="rounded-xl bg-slate-100 px-2.5 py-2 text-left">
                      <span className="mb-1 block text-[11px] font-bold text-slate-500">Original Price</span>
                      <strong className="text-[13px] text-slate-900">{formatValue(service.price)}</strong>
                    </div>
                    <div className="rounded-xl bg-slate-100 px-2.5 py-2 text-left">
                      <span className="mb-1 block text-[11px] font-bold text-slate-500">Project Objects</span>
                      <strong className="text-[13px] text-slate-900">{service.projects?.length || 0}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                  onClick={() => navigate(`/admin/services/details/${service._id}`, { state: { service } })}
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                  onClick={() => navigate("/admin/services/add-service", { state: { service } })}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="rounded-2xl bg-gradient-to-br from-red-500 to-red-600 px-3 py-2 text-xs font-semibold text-white"
                  onClick={() => handleServiceDelete(service._id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyServicesPage;
