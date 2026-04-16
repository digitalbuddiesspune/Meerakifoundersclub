import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";

const initialProject = {
  image: "",
  name: "",
  description: "",
  price: "",
  discountedPrice: "",
  technologiesUsed: "",
  demoLink: "",
  quoteLink: "",
};

const initialServiceForm = {
  name: "",
  information: "",
  image: "",
  discountedPrice: "",
  price: "",
  projectsCount: "",
  satisfaction: "",
  support: "",
  avgDelivery: "",
  toolsWeUsed: "",
  projects: [{ ...initialProject }],
};

const initialBlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  category: "general",
  tags: "",
  authorName: "Admin",
  authorAvatar: "",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};

const mapBlogToForm = (blog = {}) => ({
  title: blog.title || "",
  slug: blog.slug || "",
  excerpt: blog.excerpt || "",
  content: blog.content || "",
  featuredImage: blog.featuredImage || "",
  category: blog.category || "general",
  tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : blog.tags || "",
  authorName: blog.author?.name || "Admin",
  authorAvatar: blog.author?.avatar || "",
  status: blog.status || "draft",
  metaTitle: blog.seo?.metaTitle || "",
  metaDescription: blog.seo?.metaDescription || "",
  keywords: Array.isArray(blog.seo?.keywords) ? blog.seo.keywords.join(", ") : blog.seo?.keywords || "",
});

const mapProjectToForm = (project = {}) => ({
  image: project.image || "",
  name: project.name || "",
  description: project.description || "",
  price: project.price ?? "",
  discountedPrice: project.discountedPrice ?? "",
  technologiesUsed: Array.isArray(project.technologiesUsed)
    ? project.technologiesUsed.join(", ")
    : project.technologiesUsed || "",
  demoLink: project.demoLink || "",
  quoteLink: project.quoteLink || "",
});

const mapServiceToForm = (service = {}) => ({
  name: service.name || "",
  information: service.information || "",
  image: service.image || "",
  discountedPrice: service.discountedPrice ?? "",
  price: service.price ?? "",
  projectsCount: service.projectsCount ?? service.projects?.length ?? "",
  satisfaction: service.satisfaction || "",
  support: service.support || "",
  avgDelivery: service.avgDelivery || "",
  toolsWeUsed: Array.isArray(service.toolsWeUsed) ? service.toolsWeUsed.join(", ") : service.toolsWeUsed || "",
  projects:
    Array.isArray(service.projects) && service.projects.length > 0
      ? service.projects.map((project) => mapProjectToForm(project))
      : [{ ...initialProject }],
});

const buildProjectPayload = (project = {}) => ({
  image: String(project.image || "").trim(),
  name: String(project.name || "").trim(),
  description: String(project.description || "").trim(),
  price: Number(project.price || 0),
  discountedPrice: Number(project.discountedPrice || 0),
  technologiesUsed: Array.isArray(project.technologiesUsed)
    ? project.technologiesUsed.map((item) => String(item).trim()).filter(Boolean)
    : String(project.technologiesUsed || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
  demoLink: String(project.demoLink || "").trim(),
  quoteLink: String(project.quoteLink || "").trim(),
});

const buildServicePayload = (service = {}) => {
  const projects = Array.isArray(service.projects)
    ? service.projects.map((project) => buildProjectPayload(project)).filter((project) => project.name && project.image && project.description)
    : [];

  return {
    name: String(service.name || "").trim(),
    information: String(service.information || "").trim(),
    image: String(service.image || "").trim(),
    discountedPrice: Number(service.discountedPrice || 0),
    price: Number(service.price || 0),
    projectsCount: Number(service.projectsCount || projects.length || 0),
    satisfaction: String(service.satisfaction || "").trim(),
    support: String(service.support || "").trim(),
    avgDelivery: String(service.avgDelivery || "").trim(),
    toolsWeUsed: Array.isArray(service.toolsWeUsed)
      ? service.toolsWeUsed.map((item) => String(item).trim()).filter(Boolean)
      : String(service.toolsWeUsed || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
    projects,
  };
};

function useAdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [blogForm, setBlogForm] = useState(initialBlogForm);
  const [servicesList, setServicesList] = useState([]);
  const [blogsList, setBlogsList] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [servicesError, setServicesError] = useState("");
  const [blogsError, setBlogsError] = useState("");
  const [isSubmittingService, setIsSubmittingService] = useState(false);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const [serviceMessage, setServiceMessage] = useState("");
  const [blogMessage, setBlogMessage] = useState("");
  const [editingServiceId, setEditingServiceId] = useState("");
  const [editingBlogId, setEditingBlogId] = useState("");
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  const dashboardStats = useMemo(
    () => [
      { label: "Total Services", value: servicesList.length },
      { label: "Total Blogs", value: blogsList.length },
    ],
    [servicesList.length, blogsList.length]
  );

  const fetchServices = async () => {
    setServicesLoading(true);
    setServicesError("");
    try {
      const response = await fetch(`${API_BASE_URL}/services`);
      if (!response.ok) {
        throw new Error("Failed to fetch services");
      }
      const result = await response.json();
      setServicesList(Array.isArray(result) ? result : []);
    } catch (error) {
      setServicesList([]);
      setServicesError(error.message || "Cannot connect to service API");
    } finally {
      setServicesLoading(false);
    }
  };

  const fetchBlogs = async () => {
    setBlogsLoading(true);
    setBlogsError("");
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/admin/all`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const result = await response.json();
      setBlogsList(Array.isArray(result?.data) ? result.data : []);
    } catch (error) {
      setBlogsList([]);
      setBlogsError(error.message || "Cannot connect to blog API");
    } finally {
      setBlogsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (!location.pathname.includes("/services/add-service")) {
      return;
    }

    const serviceToEdit = location.state?.service;

    if (serviceToEdit?._id) {
      setEditingServiceId(serviceToEdit._id);
      setEditingProjectIndex(Number.isInteger(location.state?.projectIndex) ? location.state.projectIndex : null);
      setServiceForm(mapServiceToForm(serviceToEdit));
      setServiceMessage("");
      return;
    }

    setEditingServiceId("");
    setEditingProjectIndex(null);
    setServiceForm(initialServiceForm);
  }, [location.pathname, location.state]);

  useEffect(() => {
    if (!location.pathname.includes("/blogs/add-blog")) {
      return;
    }

    const blogToEdit = location.state?.blog;

    if (blogToEdit?._id) {
      setEditingBlogId(blogToEdit._id);
      setBlogForm(mapBlogToForm(blogToEdit));
      setBlogMessage("");
      return;
    }

    setEditingBlogId("");
    setBlogForm(initialBlogForm);
  }, [location.pathname, location.state]);

  const handleServiceChange = (event) => {
    const { name, value } = event.target;
    setServiceForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (index, event) => {
    const { name, value } = event.target;
    setServiceForm((prev) => {
      const updatedProjects = [...prev.projects];
      updatedProjects[index] = { ...updatedProjects[index], [name]: value };
      return { ...prev, projects: updatedProjects };
    });
  };

  const addProject = () => {
    setServiceForm((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...initialProject }],
    }));
  };

  const removeProject = (index) => {
    setServiceForm((prev) => {
      if (prev.projects.length === 1) {
        return prev;
      }
      const updatedProjects = prev.projects.filter((_, projectIndex) => projectIndex !== index);
      return { ...prev, projects: updatedProjects };
    });
  };

  const handleBlogChange = (event) => {
    const { name, value } = event.target;
    setBlogForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSubmit = async (event) => {
    event.preventDefault();
    setServiceMessage("");
    setIsSubmittingService(true);
    const payload = buildServicePayload(serviceForm);
    const requestUrl = editingServiceId ? `${API_BASE_URL}/update-service/${editingServiceId}` : `${API_BASE_URL}/add-service`;
    const requestMethod = editingServiceId ? "PUT" : "POST";

    try {
      const response = await fetch(requestUrl, {
        method: requestMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save service");
      }

      setServiceMessage(editingServiceId ? "Service updated successfully." : "Service added successfully.");
      setServiceForm(initialServiceForm);
      setEditingServiceId("");
      setEditingProjectIndex(null);
      fetchServices();
      if (editingServiceId) {
        navigate("/admin/services/my-services");
      }
    } catch (error) {
      setServiceMessage(error.message);
    } finally {
      setIsSubmittingService(false);
    }
  };

  const handleDeleteService = async (serviceId) => {
    setServiceMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/delete-service/${serviceId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete service");
      }

      setServiceMessage("Service deleted successfully.");
      fetchServices();
    } catch (error) {
      setServiceMessage(error.message || "Failed to delete service");
    }
  };

  const handleDeleteProject = async (service, projectIndex) => {
    const updatedProjects = (service.projects || []).filter((_, index) => index !== projectIndex);
    const payload = buildServicePayload({
      ...service,
      projects: updatedProjects,
      projectsCount: updatedProjects.length,
    });

    try {
      const response = await fetch(`${API_BASE_URL}/update-service/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete project");
      }

      setServiceMessage("Project removed successfully.");
      fetchServices();
      return true;
    } catch (error) {
      setServiceMessage(error.message || "Failed to delete project");
      return false;
    }
  };

  const handleBlogSubmit = async (event) => {
    event.preventDefault();
    setBlogMessage("");
    setIsSubmittingBlog(true);

    const payload = {
      title: blogForm.title,
      slug: blogForm.slug,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      featuredImage: blogForm.featuredImage,
      category: blogForm.category,
      tags: blogForm.tags
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      author: {
        name: blogForm.authorName,
        avatar: blogForm.authorAvatar,
      },
      status: blogForm.status,
      seo: {
        metaTitle: blogForm.metaTitle,
        metaDescription: blogForm.metaDescription,
        keywords: blogForm.keywords
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      },
    };

    try {
      const response = await fetch(editingBlogId ? `${API_BASE_URL}/blogs/${editingBlogId}` : `${API_BASE_URL}/blogs`, {
        method: editingBlogId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save blog");
      }

      setBlogMessage(editingBlogId ? "Blog updated successfully." : "Blog added successfully.");
      setBlogForm(initialBlogForm);
      setEditingBlogId("");
      fetchBlogs();
      if (editingBlogId) {
        navigate("/admin/blogs/my-blogs");
      }
    } catch (error) {
      setBlogMessage(error.message);
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  const handleDeleteBlog = async (blogId) => {
    setBlogMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${blogId}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete blog");
      }

      setBlogMessage("Blog deleted successfully.");
      fetchBlogs();
    } catch (error) {
      setBlogMessage(error.message || "Failed to delete blog");
    }
  };

  return {
    dashboardStats,
    servicesList,
    blogsList,
    servicesLoading,
    blogsLoading,
    servicesError,
    blogsError,
    serviceForm,
    blogForm,
    isSubmittingService,
    isSubmittingBlog,
    serviceMessage,
    blogMessage,
    editingServiceId,
    editingBlogId,
    editingProjectIndex,
    handleServiceChange,
    handleProjectChange,
    addProject,
    removeProject,
    handleDeleteService,
    handleDeleteProject,
    handleDeleteBlog,
    handleBlogChange,
    handleServiceSubmit,
    handleBlogSubmit,
  };
}

export default useAdminPanel;
