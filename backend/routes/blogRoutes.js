import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getAllBlogsAdmin,
  getBlogById,
  getBlogBySlug,
  getCategories,
  getTags,
  toggleBlogStatus,
  updateBlog,
} from "../controllers/blogController.js";

const blogRouter = express.Router();

blogRouter.get("/blogs", getAllBlogs);
blogRouter.get("/blogs/meta/categories", getCategories);
blogRouter.get("/blogs/meta/tags", getTags);
blogRouter.get("/blogs/admin/all", getAllBlogsAdmin);
blogRouter.get("/blogs/admin/:id", getBlogById);
blogRouter.get("/blogs/:slug", getBlogBySlug);
blogRouter.post("/blogs", createBlog);
blogRouter.put("/blogs/:id", updateBlog);
blogRouter.patch("/blogs/:id/toggle-status", toggleBlogStatus);
blogRouter.delete("/blogs/:id", deleteBlog);

export default blogRouter;
