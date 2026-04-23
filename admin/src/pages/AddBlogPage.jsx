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
      <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-6 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
        <div>
          <p className="m-0 text-[11px] font-bold uppercase tracking-[0.12em] text-cyan-600">Content creation</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">{isEditingBlog ? "Edit Blog" : "Add Blog"}</h3>
          <p className="mt-2 text-sm leading-7 text-slate-500">
            {isEditingBlog
              ? "Update your article details and save the changes."
              : "Write new articles with a more premium form layout and clearer grouped inputs."}
          </p>
        </div>
      </div>
      <form className="grid gap-[18px]" onSubmit={onSubmit}>
        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-[22px] shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="mb-4 text-lg font-semibold text-slate-900">Blog details</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="title" placeholder="Blog title" value={blogForm.title} onChange={onBlogChange} required />
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="slug" placeholder="Slug (e.g. my-first-blog)" value={blogForm.slug} onChange={onBlogChange} required />
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="excerpt" placeholder="Excerpt" value={blogForm.excerpt} onChange={onBlogChange} />
            <div className="grid gap-2">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" type="file" accept="image/*" onChange={onFeaturedImageUpload} />
              {uploadingImageFor === "blog-featured" ? <p className="text-xs text-cyan-600">Uploading featured image...</p> : null}
              {!blogForm.featuredImage ? <p className="text-xs text-slate-500">Please upload featured image from gallery.</p> : null}
              {blogForm.featuredImage ? (
                <div className="relative h-20 w-20">
                  <img src={blogForm.featuredImage} alt="Featured preview" className="h-20 w-20 rounded-xl border border-slate-200 object-cover" />
                  <button
                    type="button"
                    aria-label="Remove featured image"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-rose-200 bg-white text-sm font-bold leading-none text-rose-600 shadow-sm hover:bg-rose-50"
                    onClick={onClearFeaturedImage}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="category" placeholder="Category" value={blogForm.category} onChange={onBlogChange} />
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="tags" placeholder="Tags (comma separated)" value={blogForm.tags} onChange={onBlogChange} />
          </div>
          <textarea className="mt-3.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="content" placeholder="Blog content" value={blogForm.content} onChange={onBlogChange} rows={7} required />
        </div>

        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-[22px] shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="mb-4 text-lg font-semibold text-slate-900">Author and publish settings</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="authorName" placeholder="Author name" value={blogForm.authorName} onChange={onBlogChange} />
            <div className="grid gap-2">
              <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" type="file" accept="image/*" onChange={onAuthorAvatarUpload} />
              {uploadingImageFor === "blog-author-avatar" ? <p className="text-xs text-cyan-600">Uploading avatar...</p> : null}
              {!blogForm.authorAvatar ? <p className="text-xs text-slate-500">Upload author avatar from gallery (optional).</p> : null}
              {blogForm.authorAvatar ? (
                <div className="relative h-20 w-20">
                  <img src={blogForm.authorAvatar} alt="Author avatar preview" className="h-20 w-20 rounded-xl border border-slate-200 object-cover" />
                  <button
                    type="button"
                    aria-label="Remove author avatar"
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-rose-200 bg-white text-sm font-bold leading-none text-rose-600 shadow-sm hover:bg-rose-50"
                    onClick={onClearAuthorAvatar}
                  >
                    ×
                  </button>
                </div>
              ) : null}
            </div>
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="status" value={blogForm.status} onChange={onBlogChange}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/50 bg-white/95 p-[22px] shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="mb-4 text-lg font-semibold text-slate-900">SEO settings</h4>
          <div className="grid gap-3.5 md:grid-cols-2">
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="metaTitle" placeholder="SEO meta title" value={blogForm.metaTitle} onChange={onBlogChange} />
            <input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100" name="keywords" placeholder="SEO keywords (comma separated)" value={blogForm.keywords} onChange={onBlogChange} />
          </div>
          <textarea
            className="mt-3.5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            name="metaDescription"
            placeholder="SEO meta description"
            value={blogForm.metaDescription}
            onChange={onBlogChange}
            rows={3}
          />
        </div>

        <button type="submit" className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_16px_28px_rgba(22,199,209,0.24)] disabled:cursor-not-allowed disabled:opacity-65" disabled={isSubmittingBlog}>
          {isSubmittingBlog ? "Saving..." : isEditingBlog ? "Update Blog" : "Add Blog"}
        </button>
      </form>
      {blogMessage && <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{blogMessage}</p>}
    </section>
  );
}

export default AddBlogPage;
