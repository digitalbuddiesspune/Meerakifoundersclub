import { useNavigate } from "react-router-dom";

function MyBlogsPage({ blogsLoading, blogsError, blogsList, blogMessage, onDeleteBlog }) {
  const navigate = useNavigate();

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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {blogsList.map((blog) => (
            <article key={blog._id} className="rounded-3xl border border-slate-200/50 bg-gradient-to-b from-white to-slate-50 p-5 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <span className={`rounded-full px-3 py-2 text-xs font-bold ${blog.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{blog.status}</span>
                <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600">{blog.category || "general"}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{blog.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500">{blog.excerpt || "No excerpt added yet for this post."}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <span className="rounded-full bg-cyan-50 px-3 py-2 text-xs text-cyan-700">Author: {blog.author?.name || "Admin"}</span>
                <span className="rounded-full bg-cyan-50 px-3 py-2 text-xs text-cyan-700">Slug: {blog.slug || "not-set"}</span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleEditBlog(blog)}
                  className="rounded-2xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteClick(blog)}
                  className="rounded-2xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
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

export default MyBlogsPage;
