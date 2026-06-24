import { useNavigate, useSearchParams } from "react-router-dom";

function formatValue(value) {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }

  return value;
}

function MyServicesPage({ servicesLoading, servicesError, servicesList, serviceMessage, onDeleteService }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("q") || "").trim().toLowerCase();
  const filteredServices = servicesList.filter((service) => service.name?.toLowerCase().includes(searchQuery));

  const goToDetails = (service) => {
    navigate(`/admin/services/details/${service._id}`, { state: { service } });
  };

  const handleRowKeyDown = (event, service) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      goToDetails(service);
    }
  };

  const handleServiceDelete = async (serviceId) => {
    if (!window.confirm("Delete this service?")) {
      return;
    }

    await onDeleteService(serviceId);
  };

  return (
    <section className="grid gap-5">
      {serviceMessage ? <p className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{serviceMessage}</p> : null}
      {servicesLoading ? (
        <p className="text-sm text-slate-600">Loading services...</p>
      ) : servicesError ? (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{servicesError}. Check backend server and API URL.</p>
      ) : servicesList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No services found</h4>
          <p className="mt-2 text-sm text-slate-600">Add your first premium service to populate this section.</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-7">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No matching services</h4>
          <p className="mt-2 text-sm text-slate-600">No service name matches `{searchParams.get("q")}`.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white">
          <table className="min-w-[720px] w-full table-fixed border-collapse text-left">
            <colgroup>
              <col className="w-[100px]" />
              <col className="w-[280px]" />
              <col className="w-[140px]" />
              <col className="w-[220px]" />
            </colgroup>
            <thead className="bg-slate-100">
              <tr className="text-xs uppercase tracking-[0.08em] text-slate-900">
                <th className="px-4 py-3 font-semibold">Image</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold text-center">Discount Price</th>
                <th className="px-4 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr
                  key={service._id}
                  role="button"
                  tabIndex={0}
                  onClick={() => goToDetails(service)}
                  onKeyDown={(event) => handleRowKeyDown(event, service)}
                  className="cursor-pointer border-t border-slate-200 align-middle text-sm text-slate-200 transition-colors hover:bg-slate-100/80 focus:bg-slate-100/80 focus:outline-none"
                >
                  <td className="px-4 py-3">
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="h-14 w-14 rounded-xl object-cover" />
                    ) : (
                      <span className="text-xs text-slate-500">N/A</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="truncate font-semibold text-slate-900" title={formatValue(service.name)}>
                      {formatValue(service.name)}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center font-semibold text-slate-900">{formatValue(service.discountedPrice)}</td>
                  <td className="px-4 py-3" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-900"
                        onClick={() => navigate("/admin/services/add-service", { state: { service } })}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-xl border border-red-300/30 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600"
                        onClick={() => handleServiceDelete(service._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default MyServicesPage;
