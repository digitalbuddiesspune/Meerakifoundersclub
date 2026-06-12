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
      <section className="relative overflow-hidden bg-[#070D1A] px-4 py-20 text-white md:py-28">
        {/* Grid pattern */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(242,101,39,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(242,101,39,0.07) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* Orbs */}
        <div
          className="pointer-events-none absolute -top-28 right-[8%] h-[500px] w-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(242,101,39,0.24) 0%, transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -left-24 h-[380px] w-[380px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,140,66,0.14) 0%, transparent 70%)' }}
        />
        {/* Wavy accent */}
        <svg
          className="pointer-events-none absolute right-0 top-8 hidden h-56 w-64 opacity-10 md:block"
          viewBox="0 0 200 200" fill="none"
        >
          {[40, 80, 120, 160].map((y, i) => (
            <path
              key={y}
              d={`M0 ${y} Q100 ${y - 40} 200 ${y}`}
              stroke="#F26527"
              strokeWidth="1.5"
              strokeOpacity={0.7 - i * 0.12}
            />
          ))}
        </svg>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2">
          {/* Left: text */}
          <div>
            <p className="mb-5 inline-flex items-center rounded-full border border-[#F26527]/40 bg-[#F26527]/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF9C73]">
              ✦ &nbsp; Meraaki Blog
            </p>
            <h1 className="text-[clamp(2.4rem,5.5vw,4.2rem)] font-extrabold leading-[1.06] tracking-tight">
              Insights For{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)' }}
              >
                Founders
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/55 md:text-lg">
              Practical startup guides, compliance updates, growth playbooks, and real founder stories — written for builders, not buzzwords.
            </p>

            {/* Mini stats */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { val: '50+', label: 'Articles' },
                { val: '10+', label: 'Categories' },
                { val: '5K+', label: 'Monthly Readers' },
              ].map((s) => (
                <div key={s.label}>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ backgroundImage: 'linear-gradient(135deg,#F26527,#FFB382)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {s.val}
                  </p>
                  <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden md:block">
            {/* Glow halo */}
            <div
              className="absolute -inset-3 rounded-3xl blur-2xl"
              style={{ background: 'linear-gradient(135deg,rgba(242,101,39,0.28),rgba(255,140,66,0.2))' }}
            />
            {/* Floating badge */}
            <div className="absolute -bottom-5 -left-5 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 shadow-xl backdrop-blur">
              <span className="text-sm">✍️</span>
              <span className="text-xs font-bold text-white">50+ Founder Guides</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
              alt="Founder reading insights"
              className="relative h-[320px] w-full rounded-3xl border border-white/20 object-cover shadow-2xl md:h-[420px]"
            />
          </div>
        </div>

        {/* Bottom wave divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ lineHeight: 0 }}>
          <svg viewBox="0 0 1440 56" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%' }}>
            <path d="M0,28 C360,56 1080,0 1440,28 L1440,56 L0,56 Z" fill="#FAFAF8" />
          </svg>
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
