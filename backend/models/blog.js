import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
    },

    category: {
      type: String,
      default: "general",
      trim: true,
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    author: {
      name: {
        type: String,
        default: "Admin",
      },
      avatar: String,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },

    publishedAt: {
      type: Date,
    },

    readTime: {
      type: String, // e.g. "5 min read"
    },

    views: {
      type: Number,
      default: 0,
    },

    seo: {
      metaTitle: String,
      metaDescription: String,
      keywords: [String],
    },
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", content: "text" });

export default mongoose.model("Blog", blogSchema);