import Blog from "../models/blog.js";

// Helper: auto-generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

// Helper: estimate read time
const estimateReadTime = (content) => {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
};

// ─────────────────────────────────────────────
// @desc    Create a new blog post
// @route   POST /api/blogs
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const createBlog = async (req, res) => {
  try {
    const { title, content, status } = req.body;

    // Auto-generate slug if not provided
    if (!req.body.slug) {
      req.body.slug = generateSlug(title);
    }

    // Auto-calculate read time if not provided
    if (!req.body.readTime && content) {
      req.body.readTime = estimateReadTime(content);
    }

    // Set publishedAt if status is published
    if (status === "published" && !req.body.publishedAt) {
      req.body.publishedAt = new Date();
    }

    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all published blogs (public)
// @route   GET /api/blogs
// @access  Public
// ─────────────────────────────────────────────
export const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      tag,
      search,
      sortBy = "publishedAt",
      order = "desc",
    } = req.query;

    const query = { status: "published" };

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (search) query.$text = { $search: search };

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .select("-content -seo"), // exclude heavy fields from list view
      Blog.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all blogs including drafts (admin)
// @route   GET /api/blogs/admin/all
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = "createdAt", order = "desc" } = req.query;

    const query = {};
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const sortOrder = order === "asc" ? 1 : -1;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(Number(limit))
        .select("-content"),
      Blog.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get single blog by slug (public)
// @route   GET /api/blogs/:slug
// @access  Public
// ─────────────────────────────────────────────
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug, status: "published" },
      { $inc: { views: 1 } }, // increment view count on each read
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get single blog by ID (admin)
// @route   GET /api/blogs/admin/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Update a blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const updateBlog = async (req, res) => {
  try {
    const { content, status } = req.body;

    // Recalculate read time if content is updated
    if (content) {
      req.body.readTime = estimateReadTime(content);
    }

    // Set publishedAt when publishing for the first time
    if (status === "published") {
      const existing = await Blog.findById(req.params.id).select("status publishedAt");
      if (existing && existing.status !== "published" && !existing.publishedAt) {
        req.body.publishedAt = new Date();
      }
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "A blog with this slug already exists",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Delete a blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Toggle blog publish status
// @route   PATCH /api/blogs/:id/toggle-status
// @access  Private (Admin)
// ─────────────────────────────────────────────
export const toggleBlogStatus = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }

    const newStatus = blog.status === "published" ? "draft" : "published";
    const update = { status: newStatus };

    if (newStatus === "published" && !blog.publishedAt) {
      update.publishedAt = new Date();
    }

    const updated = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });

    res.status(200).json({
      success: true,
      message: `Blog ${newStatus === "published" ? "published" : "moved to draft"}`,
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all unique categories
// @route   GET /api/blogs/meta/categories
// @access  Public
// ─────────────────────────────────────────────
export const getCategories = async (req, res) => {
  try {
    const categories = await Blog.distinct("category", { status: "published" });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────
// @desc    Get all unique tags
// @route   GET /api/blogs/meta/tags
// @access  Public
// ─────────────────────────────────────────────
export const getTags = async (req, res) => {
  try {
    const tags = await Blog.distinct("tags", { status: "published" });
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};