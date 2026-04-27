import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL

const formatDate = (dateValue) => {
  if (!dateValue) return 'Recently published'
  return new Date(dateValue).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function Blogs() {
  const [blogs, setBlogs] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    const loadBlogs = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await fetch(`${API_BASE_URL}/blogs?limit=50`, { signal: controller.signal })
        const payload = await response.json()
        if (!response.ok || !payload?.success) {
          setError(payload?.message || 'Failed to fetch blogs.')
          return
        }
        setBlogs(Array.isArray(payload.data) ? payload.data : [])
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') return
        setError('Unable to fetch blogs. Please check backend/API URL.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBlogs()
    return () => controller.abort()
  }, [])

  const filteredBlogs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return blogs
    return blogs.filter((blog) =>
      [blog.title, blog.category, blog.excerpt, ...(blog.tags || [])]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    )
  }, [blogs, searchQuery])

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#0F0F0D]">
      <section className="relative overflow-hidden bg-[#0F0F0D] px-4 py-16 text-white md:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,101,39,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="pointer-events-none absolute -top-24 right-[10%] h-[460px] w-[460px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.25) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[340px] w-[340px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="inline-flex rounded-full border border-[#F26527]/40 bg-[#F26527]/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF9C73]">
            Blogs
          </p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Insights For <span className="text-[#F26527]">Founders</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base">
            Explore practical startup guides, compliance updates, growth ideas, and founder stories.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <label htmlFor="blog-search" className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
            Search Blogs
          </label>
          <input
            id="blog-search"
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title, category, tags or excerpt..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#F26527]/60 focus:outline-none"
          />
        </div>

        {isLoading ? (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">Loading blogs...</div>
        ) : null}

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">{error}</div>
        ) : null}

        {!isLoading && !error ? (
          <div className="mt-6 grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(260px,320px))]">
            {filteredBlogs.map((blog) => (
              <Link
                key={blog._id || blog.slug}
                to={`/blogs/${blog.slug}`}
                className="group flex h-full min-h-[420px] flex-col overflow-hidden border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={blog.featuredImage || 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80'}
                  alt={blog.title}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex items-center justify-between gap-2 text-[11px]">
                    <span className="rounded-full bg-[#F26527]/10 px-2.5 py-1 font-semibold uppercase tracking-wide text-[#F26527]">
                      {blog.category || 'General'}
                    </span>
                    <span className="text-slate-500">{blog.readTime || '3 min read'}</span>
                  </div>
                  <h2 className="text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#F26527]">
                    {blog.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {blog.excerpt || 'Open blog to read complete details.'}
                  </p>
                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>{blog.author?.name || 'Admin'}</span>
                    <span>{formatDate(blog.publishedAt)}</span>
                  </div>
                </div>
              </Link>
            ))}
            {!filteredBlogs.length ? (
              <div className="md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-500">
                No blogs found for this search.
              </div>
            ) : null}
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default Blogs
