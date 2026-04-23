import { useNavigate } from "react-router-dom";

function EyeIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h6" />
      <path d="M14.5 4.5 19.5 9.5" />
      <path d="M12 7 5 14v5h5l7-7a1.8 1.8 0 0 0 0-2.5l-2.5-2.5A1.8 1.8 0 0 0 12 7Z" />
    </svg>
  );
}

function TrashIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 6h18" />
      <path d="M8 6V4.8A1.8 1.8 0 0 1 9.8 3h4.4A1.8 1.8 0 0 1 16 4.8V6" />
      <path d="m8.5 10 .5 8m6-8-.5 8M6.5 6l1 14a2 2 0 0 0 2 1.8h5a2 2 0 0 0 2-1.8l1-14" />
    </svg>
  );
}

function MyBlogsPage({ blogsLoading, blogsError, blogsList, blogMessage, onDeleteBlog }) {
  const navigate = useNavigate();

  const handleDetailBlog = (blog) => {
    navigate(`/admin/blogs/details/${blog._id}`, { state: { blog } });
  };

  const handleEditBlog = (blog) => {
    navigate("/admin/blogs/add-blog", { state: { blog } });
  };

  const handleDeleteClick = async (blog) => {
    const confirmed = window.confirm(`Delete "${blog.title}"?`);
    if (!confirmed) {
      return;
    }

    await onDeleteBlog(blog._id);
  };

  return (
    <section className="grid gap-5">
    
      {blogMessage ? <p className="rounded-2xl bg-cyan-50 px-4 py-3 text-sm font-semibold text-cyan-700">{blogMessage}</p> : null}
      {blogsLoading ? (
        <p className="text-sm text-slate-500">Loading blogs...</p>
      ) : blogsError ? (
        <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{blogsError}. Check backend server and API URL.</p>
      ) : blogsList.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">No blogs found</h4>
          <p className="mt-2 text-sm text-slate-500">Start adding blogs to fill this section with beautiful content cards.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[18px] border border-slate-200 bg-white">
          <div className="min-w-[940px]">
            <div className="grid grid-cols-[90px_minmax(220px,1.8fr)_minmax(110px,0.9fr)_minmax(140px,1fr)_220px] gap-3 border-b border-slate-200 bg-sky-50 px-3.5 py-3">
              <span className="text-xs font-extrabold uppercase text-slate-600">Image</span>
              <span className="text-xs font-extrabold uppercase text-slate-600">Title</span>
              <span className="text-xs font-extrabold uppercase text-slate-600">Status</span>
              <span className="text-xs font-extrabold uppercase text-slate-600">Author</span>
              <span className="text-center text-xs font-extrabold uppercase text-slate-600">Actions</span>
            </div>

            {blogsList.map((blog) => (
              <div
                key={blog._id}
                className="grid grid-cols-[90px_minmax(220px,1.8fr)_minmax(110px,0.9fr)_minmax(140px,1fr)_220px] gap-3 border-b border-slate-100 px-3.5 py-3 last:border-b-0"
              >
                <div className="grid content-start">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title || "Blog image"} className="h-[72px] w-[72px] rounded-xl object-cover" />
                  ) : (
                    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-500">No image</div>
                  )}
                </div>

                <div className="grid content-start gap-1">
                  <strong className="line-clamp-2 text-[13px] text-slate-900">{blog.title || "Untitled blog"}</strong>
                  <p className="line-clamp-2 text-xs text-slate-500">{blog.excerpt || "No excerpt available."}</p>
                </div>

                <div className="grid content-start">
                  <span className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-bold ${blog.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {blog.status || "draft"}
                  </span>
                </div>

                <div className="grid content-start text-xs font-semibold text-slate-700">{blog.author?.name || "Admin"}</div>

                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handleDetailBlog(blog)}
                    aria-label="View blog details"
                    title="View details"
                    className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditBlog(blog)}
                    aria-label="Edit blog"
                    title="Edit"
                    className="rounded-xl bg-cyan-600 p-2 text-white transition hover:bg-cyan-700"
                  >
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(blog)}
                    aria-label="Delete blog"
                    title="Delete"
                    className="rounded-xl bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default MyBlogsPage;
