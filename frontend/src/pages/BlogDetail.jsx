import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

const formatDate = (dateValue) => {
  if (!dateValue) return 'Recently published'
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function BlogDetail() {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadBlog = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, { signal: controller.signal })
        const payload = await response.json()
        if (!response.ok || !payload?.success) {
          setError(payload?.message || 'Failed to fetch blog details.')
          return
        }
        setBlog(payload.data || null)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') return
        setError('Unable to fetch blog details. Please check backend/API URL.')
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) loadBlog()
    return () => controller.abort()
  }, [slug])

  const parsedContent = useMemo(() => {
    if (!blog?.content) return []
    return String(blog.content)
      .split(/\n{2,}/)
      .map((item) => item.trim())
      .filter(Boolean)
  }, [blog])

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#0F0F0D]">
      <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
        <Link
          to="/blogs"
          className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600 transition hover:border-[#F26527]/40 hover:text-[#F26527]"
        >
          ← Back to Blogs
        </Link>

        {isLoading ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">Loading blog...</div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">{error}</div>
        ) : null}

        {!isLoading && !error && blog ? (
          <article className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <img
              src={blog.featuredImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80'}
              alt={blog.title}
              className="h-[280px] w-full object-cover md:h-[420px]"
            />

            <div className="p-5 md:p-8">
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-[#F26527]/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-[#F26527]">
                  {blog.category || 'General'}
                </span>
                <span className="text-slate-500">{formatDate(blog.publishedAt)}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{blog.readTime || '3 min read'}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500">{blog.views || 0} views</span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                {blog.title}
              </h1>

              {blog.excerpt ? <p className="mt-4 text-base leading-7 text-slate-600">{blog.excerpt}</p> : null}

              <p className="mt-4 text-sm font-semibold text-slate-500">By {blog.author?.name || 'Admin'}</p>

              <div className="mt-8 space-y-5 text-[15px] leading-8 text-slate-700">
                {parsedContent.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {Array.isArray(blog.tags) && blog.tags.length ? (
                <div className="mt-8 border-t border-slate-200 pt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </article>
        ) : null}
      </section>
    </main>
  )
}

export default BlogDetail
