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
        <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-7">
          <h4 className="m-0 text-lg font-semibold text-white">Blog not found</h4>
          <p className="mt-2 text-sm text-slate-300">This blog could not be loaded.</p>
          <button
            type="button"
            className="mt-4 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
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
        <h3 className="text-xl font-bold text-[#F0B429]">Blog Details</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100"
            onClick={() => navigate("/admin/blogs/my-blogs")}
          >
            Back
          </button>
          <button
            type="button"
            className="rounded-2xl border border-cyan-300/30 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 hover:bg-cyan-500/30"
            onClick={() => navigate("/admin/blogs/add-blog", { state: { blog } })}
          >
            Edit Blog
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-[#F0B429]/30 bg-[#0d214d] p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${blog.status === "published" ? "bg-emerald-500/20 text-emerald-200" : "bg-amber-500/20 text-amber-200"}`}>
            {blog.status || "draft"}
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-bold text-slate-200">{blog.category || "general"}</span>
        </div>

        <h4 className="text-2xl font-bold text-white">{renderValue(blog.title)}</h4>
        <p className="mt-2 text-sm text-slate-300">Slug: {renderValue(blog.slug)}</p>

        {blog.featuredImage ? <img src={blog.featuredImage} alt={blog.title || "Featured image"} className="mt-4 h-48 w-full max-w-[520px] rounded-2xl object-cover" /> : null}

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#F0B429]/30 bg-[#132c61] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">Author</p>
            <p className="mt-1 text-sm font-semibold text-white">{renderValue(blog.author?.name || "Admin")}</p>
            {blog.author?.avatar ? <img src={blog.author.avatar} alt={blog.author?.name || "Author avatar"} className="mt-3 h-16 w-16 rounded-xl object-cover" /> : null}
          </div>
          <div className="rounded-2xl border border-[#F0B429]/30 bg-[#132c61] p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">Tags</p>
            <p className="mt-1 text-sm text-slate-100">{Array.isArray(blog.tags) && blog.tags.length > 0 ? blog.tags.join(", ") : "N/A"}</p>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[#F0B429]/30 bg-[#132c61] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">Excerpt</p>
          <p className="mt-1 text-sm leading-6 text-slate-100">{renderValue(blog.excerpt)}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-[#F0B429]/30 bg-[#132c61] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">Content</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-100">{renderValue(blog.content)}</p>
        </div>

        <div className="mt-5 rounded-2xl border border-[#F0B429]/30 bg-[#132c61] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-[#F0B429]">SEO</p>
          <p className="mt-2 text-sm text-slate-100">Meta title: {renderValue(blog.seo?.metaTitle)}</p>
          <p className="mt-1 text-sm text-slate-100">Meta description: {renderValue(blog.seo?.metaDescription)}</p>
          <p className="mt-1 text-sm text-slate-100">
            Keywords: {Array.isArray(blog.seo?.keywords) && blog.seo.keywords.length > 0 ? blog.seo.keywords.join(", ") : "N/A"}
          </p>
        </div>
      </div>
    </section>
  );
}

export default BlogDetailsPage;
