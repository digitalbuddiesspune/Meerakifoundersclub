import { useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function renderValue(value) {
  if (value === undefined || value === null || value === "") {
    return "N/A";
  }
  return value;
}

function BlogDetailsPage({ blogsList }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { blogId } = useParams();

  const blog = useMemo(() => {
    const stateBlog = location.state?.blog;
    if (stateBlog?._id === blogId) {
      return stateBlog;
    }
    return blogsList.find((item) => item._id === blogId) || null;
  }, [blogId, blogsList, location.state]);

  if (!blog) {
    return (
      <section className="grid gap-5">
        <div className="rounded-3xl border border-slate-200/50 bg-white/90 p-7 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
          <h4 className="m-0 text-lg font-semibold text-slate-900">Blog not found</h4>
          <p className="mt-2 text-sm text-slate-500">This blog could not be loaded.</p>
          <button
            type="button"
            className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={() => navigate("/admin/blogs/my-blogs")}
          >
            Back to Blogs
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="grid gap-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xl font-bold text-slate-900">Blog Details</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
            onClick={() => navigate("/admin/blogs/my-blogs")}
          >
            Back
          </button>
          <button
            type="button"
            className="rounded-2xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
            onClick={() => navigate("/admin/blogs/add-blog", { state: { blog } })}
          >
            Edit Blog
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-5 shadow-[0_16px_34px_rgba(15,23,42,0.06)]">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${blog.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
            {blog.status || "draft"}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700">{blog.category || "general"}</span>
        </div>

        <h4 className="text-2xl font-bold text-slate-900">{renderValue(blog.title)}</h4>
        <p className="mt-2 text-sm text-slate-500">Slug: {renderValue(blog.slug)}</p>

        {blog.featuredImage ? <img src={blog.featuredImage} alt={blog.title || "Featured image"} className="mt-4 h-48 w-full max-w-[520px] rounded-2xl object-cover" /> : null}

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Author</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{renderValue(blog.author?.name || "Admin")}</p>
            {blog.author?.avatar ? <img src={blog.author.avatar} alt={blog.author?.name || "Author avatar"} className="mt-3 h-16 w-16 rounded-xl object-cover" /> : null}
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Tags</p>
            <p className="mt-1 text-sm text-slate-700">{Array.isArray(blog.tags) && blog.tags.length > 0 ? blog.tags.join(", ") : "N/A"}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Excerpt</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{renderValue(blog.excerpt)}</p>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Content</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">{renderValue(blog.content)}</p>
        </div>

        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">SEO</p>
          <p className="mt-2 text-sm text-slate-700">Meta title: {renderValue(blog.seo?.metaTitle)}</p>
          <p className="mt-1 text-sm text-slate-700">Meta description: {renderValue(blog.seo?.metaDescription)}</p>
          <p className="mt-1 text-sm text-slate-700">
            Keywords: {Array.isArray(blog.seo?.keywords) && blog.seo.keywords.length > 0 ? blog.seo.keywords.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailsPage;
