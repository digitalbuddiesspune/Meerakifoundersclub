import { BriefcaseIcon, PlusSquareIcon } from "../components/AdminIcons";

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
    "w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20";

  return (
    <section className="grid gap-5">
      {isEditingService && editingProjectIndex !== null && (
        <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">Project {editingProjectIndex + 1} is ready for editing below.</p>
      )}
      <form className="grid gap-[18px]" onSubmit={onSubmit}>
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <BriefcaseIcon className="h-5 w-5 text-amber-300" />
            Service details
          </h4>
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
              <label className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-300">Service image</label>
              <input
                className={inputClassName}
                type="file"
                accept="image/*"
                onChange={onServiceImageUpload}
              />
              {uploadingImageFor === "service-main" ? <p className="text-xs text-cyan-300">Uploading image...</p> : null}
              {!serviceForm.image ? <p className="text-xs text-slate-300">Please upload a service image from gallery.</p> : null}
              {serviceForm.image ? (
                <div className="relative h-20 w-20">
                  <img
                    src={serviceForm.image}
                    alt="Service preview"
                    className="h-20 w-20 rounded-xl border border-[#F0B429]/30 object-cover"
                  />
                  <button
                    type="button"
                    aria-label="Remove service image"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-red-300/30 bg-[#0d214d] text-sm font-bold leading-none text-red-200 hover:bg-red-500/20"
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

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <PlusSquareIcon className="h-5 w-5 text-emerald-300" />
            Projects
          </h3>
          {serviceForm.projects.map((project, index) => (
            <div className="mb-4 grid gap-3 rounded-3xl border border-[#F0B429]/30 bg-[#132c61] p-4" key={index}>
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-semibold text-white">Project {index + 1}</h4>
                <button type="button" className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100" onClick={() => onRemoveProject(index)}>
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
              {uploadingImageFor === `project-${index}` ? <p className="text-xs text-cyan-300">Uploading project image...</p> : null}
              {!project.image ? <p className="text-xs text-slate-300">Please upload project image from gallery.</p> : null}
              {project.image ? (
                <div className="relative h-20 w-20">
                  <img
                    src={project.image}
                    alt={`Project ${index + 1} preview`}
                    className="h-20 w-20 rounded-xl border border-[#F0B429]/30 object-cover"
                  />
                  <button
                    type="button"
                    aria-label={`Remove project ${index + 1} image`}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-red-300/30 bg-[#0d214d] text-sm font-bold leading-none text-red-200 hover:bg-red-500/20"
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
          <button type="button" className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100" onClick={onAddProject}>
            + Add Another Project
          </button>
        </div>

        <button
          type="submit"
          className="rounded-2xl bg-[#f4b741] px-5 py-3 text-sm font-bold text-[#122652] disabled:cursor-not-allowed disabled:opacity-65"
          disabled={isSubmittingService}
        >
          {isSubmittingService ? "Saving..." : isEditingService ? "Update Service" : "Add Service"}
        </button>
      </form>
      {serviceMessage && <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{serviceMessage}</p>}
    </section>
  );
}

export default AddServicePage;
