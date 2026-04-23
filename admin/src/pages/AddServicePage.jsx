function AddServicePage({
  serviceForm,
  isSubmittingService,
  serviceMessage,
  isEditingService,
  editingProjectIndex,
  onServiceChange,
  onProjectChange,
  onServiceImageUpload,
  onProjectImageUpload,
  onClearServiceImage,
  onClearProjectImage,
  onAddProject,
  onRemoveProject,
  onSubmit,
  uploadingImageFor,
}) {
  const inputClassName =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100";

  return (
    <section className="grid gap-5">
      {isEditingService && editingProjectIndex !== null && (
        <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">Project {editingProjectIndex + 1} is ready for editing below.</p>
      )}
      <form className="grid gap-[18px]" onSubmit={onSubmit}>
        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-[22px] shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="mb-4 text-lg font-semibold text-slate-900">Service details</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className={inputClassName} name="name" placeholder="Service name" value={serviceForm.name} onChange={onServiceChange} required />
            <input
              className={inputClassName}
              name="information"
              placeholder="Service information"
              value={serviceForm.information}
              onChange={onServiceChange}
              required
            />
            <div className="grid gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">Service image</label>
              <input
                className={inputClassName}
                type="file"
                accept="image/*"
                onChange={onServiceImageUpload}
              />
              {uploadingImageFor === "service-main" ? <p className="text-xs text-cyan-600">Uploading image...</p> : null}
              {!serviceForm.image ? <p className="text-xs text-slate-500">Please upload a service image from gallery.</p> : null}
              {serviceForm.image ? (
                <div className="relative h-20 w-20">
                  <img
                    src={serviceForm.image}
                    alt="Service preview"
                    className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove service image"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-rose-200 bg-white text-sm font-bold leading-none text-rose-600 shadow-sm hover:bg-rose-50"
                    onClick={onClearServiceImage}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
            <input
              className={inputClassName}
              type="number"
              name="discountedPrice"
              placeholder="Discounted price"
              value={serviceForm.discountedPrice}
              onChange={onServiceChange}
              required
            />
            <input className={inputClassName} type="number" name="price" placeholder="Price" value={serviceForm.price} onChange={onServiceChange} required />
            <input
              className={inputClassName}
              type="number"
              name="projectsCount"
              placeholder="Projects count"
              value={serviceForm.projectsCount}
              onChange={onServiceChange}
            />
            <input className={inputClassName} name="satisfaction" placeholder="Satisfaction (e.g. 98%)" value={serviceForm.satisfaction} onChange={onServiceChange} />
            <input className={inputClassName} name="support" placeholder="Support (e.g. 24/7)" value={serviceForm.support} onChange={onServiceChange} />
            <input className={inputClassName} name="avgDelivery" placeholder="Avg delivery time" value={serviceForm.avgDelivery} onChange={onServiceChange} />
            <input
              className={inputClassName}
              name="toolsWeUsed"
              placeholder="Tools used (comma separated)"
              value={serviceForm.toolsWeUsed}
              onChange={onServiceChange}
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-[22px] shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">Projects</h3>
          {serviceForm.projects.map((project, index) => (
            <div className="mb-4 grid gap-3 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4" key={index}>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-semibold text-slate-900">Project {index + 1}</h4>
                <button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700" onClick={() => onRemoveProject(index)}>
                  Remove
                </button>
              </div>
              <input
                className={inputClassName}
                name="name"
                placeholder="Project name"
                value={project.name}
                onChange={(event) => onProjectChange(index, event)}
                required
              />
              <input
                className={inputClassName}
                type="file"
                accept="image/*"
                onChange={(event) => onProjectImageUpload(index, event)}
              />
              {uploadingImageFor === `project-${index}` ? <p className="text-xs text-cyan-600">Uploading project image...</p> : null}
              {!project.image ? <p className="text-xs text-slate-500">Please upload project image from gallery.</p> : null}
              {project.image ? (
                <div className="relative h-20 w-20">
                  <img
                    src={project.image}
                    alt={`Project ${index + 1} preview`}
                    className="h-20 w-20 rounded-xl border border-slate-200 object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Remove project ${index + 1} image`}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-rose-200 bg-white text-sm font-bold leading-none text-rose-600 shadow-sm hover:bg-rose-50"
                    onClick={() => onClearProjectImage(index)}
                  >
                    ×
                  </button>
                </div>
              ) : null}
              <textarea
                className={inputClassName}
                name="description"
                placeholder="Project description"
                value={project.description}
                onChange={(event) => onProjectChange(index, event)}
                rows={3}
                required
              />
              <input
                className={inputClassName}
                type="number"
                name="price"
                placeholder="Project price"
                value={project.price}
                onChange={(event) => onProjectChange(index, event)}
                required
              />
              <input
                className={inputClassName}
                type="number"
                name="discountedPrice"
                placeholder="Project discounted price"
                value={project.discountedPrice}
                onChange={(event) => onProjectChange(index, event)}
                required
              />
              <input
                className={inputClassName}
                name="technologiesUsed"
                placeholder="Technologies (comma separated)"
                value={project.technologiesUsed}
                onChange={(event) => onProjectChange(index, event)}
              />
              <input
                className={inputClassName}
                name="demoLink"
                placeholder="Project demo link"
                value={project.demoLink}
                onChange={(event) => onProjectChange(index, event)}
                required
              />
              <input
                className={inputClassName}
                name="quoteLink"
                placeholder="Project quote link"
                value={project.quoteLink}
                onChange={(event) => onProjectChange(index, event)}
                required
              />
            </div>
          ))}
          <button type="button" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700" onClick={onAddProject}>
            + Add Another Project
          </button>
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(22,199,209,0.24)] disabled:cursor-not-allowed disabled:opacity-65"
          disabled={isSubmittingService}
        >
          {isSubmittingService ? "Saving..." : isEditingService ? "Update Service" : "Add Service"}
        </button>
      </form>
      {serviceMessage && <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{serviceMessage}</p>}
    </section>
  );
}

export default AddServicePage;
