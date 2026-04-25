import { FileTextIcon, PenSquareIcon, UsersIcon } from "../components/AdminIcons";

function AddBlogPage({
  blogForm,
  isSubmittingBlog,
  blogMessage,
  isEditingBlog,
  onBlogChange,
  onFeaturedImageUpload,
  onAuthorAvatarUpload,
  onClearFeaturedImage,
  onClearAuthorAvatar,
  onSubmit,
  uploadingImageFor,
}) {
  return (
    <section className="grid gap-5">
      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-6">
        <div>
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-300">Content creation</p>
          <h3 className="mt-1 text-2xl font-bold text-white">{isEditingBlog ? "Edit Blog" : "Add Blog"}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            {isEditingBlog
              ? "Update your article details and save the changes."
              : "Write new articles with a cleaner and consistent dashboard layout."}
          </p>
        </div>
      </div>
      <form className="grid gap-[18px]" onSubmit={onSubmit}>
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <FileTextIcon className="h-5 w-5 text-sky-300" />
            Blog details
          </h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="title" placeholder="Blog title" value={blogForm.title} onChange={onBlogChange} required />
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="slug" placeholder="Slug (e.g. my-first-blog)" value={blogForm.slug} onChange={onBlogChange} required />
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="excerpt" placeholder="Excerpt" value={blogForm.excerpt} onChange={onBlogChange} />
            <div className="grid gap-2">
              <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" type="file" accept="image/*" onChange={onFeaturedImageUpload} />
              {uploadingImageFor === "blog-featured" ? <p className="text-xs text-cyan-300">Uploading featured image...</p> : null}
              {!blogForm.featuredImage ? <p className="text-xs text-slate-300">Please upload featured image from gallery.</p> : null}
              {blogForm.featuredImage ? (
                <div className="relative h-20 w-20">
                  <img src={blogForm.featuredImage} alt="Featured preview" className="h-20 w-20 rounded-xl border border-[#F0B429]/30 object-cover" />
                  <button
                    type="button"
                    aria-label="Remove featured image"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-red-300/30 bg-[#0d214d] text-sm font-bold leading-none text-red-200 hover:bg-red-500/20"
                    onClick={onClearFeaturedImage}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="category" placeholder="Category" value={blogForm.category} onChange={onBlogChange} />
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="tags" placeholder="Tags (comma separated)" value={blogForm.tags} onChange={onBlogChange} />
          </div>
          <textarea className="mt-3.5 w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="content" placeholder="Blog content" value={blogForm.content} onChange={onBlogChange} rows={7} required />
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <UsersIcon className="h-5 w-5 text-violet-300" />
            Author and publish settings
          </h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="authorName" placeholder="Author name" value={blogForm.authorName} onChange={onBlogChange} />
            <div className="grid gap-2">
              <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" type="file" accept="image/*" onChange={onAuthorAvatarUpload} />
              {uploadingImageFor === "blog-author-avatar" ? <p className="text-xs text-cyan-300">Uploading avatar...</p> : null}
              {!blogForm.authorAvatar ? <p className="text-xs text-slate-300">Upload author avatar from gallery (optional).</p> : null}
              {blogForm.authorAvatar ? (
                <div className="relative h-20 w-20">
                  <img src={blogForm.authorAvatar} alt="Author avatar preview" className="h-20 w-20 rounded-xl border border-[#F0B429]/30 object-cover" />
                  <button
                    type="button"
                    aria-label="Remove author avatar"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-red-300/30 bg-[#0d214d] text-sm font-bold leading-none text-red-200 hover:bg-red-500/20"
                    onClick={onClearAuthorAvatar}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
            <select className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="status" value={blogForm.status} onChange={onBlogChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-[22px]">
          <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <PenSquareIcon className="h-5 w-5 text-fuchsia-300" />
            SEO settings
          </h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="metaTitle" placeholder="SEO meta title" value={blogForm.metaTitle} onChange={onBlogChange} />
            <input className="w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20" name="keywords" placeholder="SEO keywords (comma separated)" value={blogForm.keywords} onChange={onBlogChange} />
          </div>
          <textarea
            className="mt-3.5 w-full rounded-2xl border border-[#F0B429]/30 bg-white/5 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-400 focus:border-[#F0B429] focus:ring-2 focus:ring-[#F0B429]/20"
            name="metaDescription"
            placeholder="SEO meta description"
            value={blogForm.metaDescription}
            onChange={onBlogChange}
            rows={3}
          />
        </div>

        <button type="submit" className="rounded-2xl bg-[#f4b741] px-5 py-3 text-sm font-bold text-[#122652] disabled:cursor-not-allowed disabled:opacity-65" disabled={isSubmittingBlog}>
          {isSubmittingBlog ? "Saving..." : isEditingBlog ? "Update Blog" : "Add Blog"}
        </button>
      </form>
      {blogMessage && <p className="rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200">{blogMessage}</p>}
    </section>
  );
}

export default AddBlogPage;
