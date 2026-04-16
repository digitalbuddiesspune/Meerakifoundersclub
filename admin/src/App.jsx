import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AddBlogPage from "./pages/AddBlogPage";
import AddServicePage from "./pages/AddServicePage";
import DashboardPage from "./pages/DashboardPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import MyServicesPage from "./pages/MyServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import useAdminPanel from "./hooks/useAdminPanel";

function App() {
  const admin = useAdminPanel();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route
          path="dashboard"
          element={
            <DashboardPage
              dashboardStats={admin.dashboardStats}
              servicesList={admin.servicesList}
              blogsList={admin.blogsList}
            />
          }
        />
        <Route
          path="services/my-services"
          element={
            <MyServicesPage
              servicesLoading={admin.servicesLoading}
              servicesError={admin.servicesError}
              servicesList={admin.servicesList}
              serviceMessage={admin.serviceMessage}
              onDeleteService={admin.handleDeleteService}
              onDeleteProject={admin.handleDeleteProject}
            />
          }
        />
        <Route
          path="services/details/:serviceId"
          element={
            <ServiceDetailsPage
              servicesList={admin.servicesList}
              serviceMessage={admin.serviceMessage}
              onDeleteService={admin.handleDeleteService}
              onDeleteProject={admin.handleDeleteProject}
            />
          }
        />
        <Route
          path="services/add-service"
          element={
            <AddServicePage
              serviceForm={admin.serviceForm}
              isSubmittingService={admin.isSubmittingService}
              serviceMessage={admin.serviceMessage}
              isEditingService={Boolean(admin.editingServiceId)}
              editingProjectIndex={admin.editingProjectIndex}
              onServiceChange={admin.handleServiceChange}
              onProjectChange={admin.handleProjectChange}
              onAddProject={admin.addProject}
              onRemoveProject={admin.removeProject}
              onSubmit={admin.handleServiceSubmit}
            />
          }
        />
        <Route
          path="blogs/my-blogs"
          element={
            <MyBlogsPage
              blogsLoading={admin.blogsLoading}
              blogsError={admin.blogsError}
              blogsList={admin.blogsList}
              blogMessage={admin.blogMessage}
              onDeleteBlog={admin.handleDeleteBlog}
            />
          }
        />
        <Route
          path="blogs/add-blog"
          element={
            <AddBlogPage
              blogForm={admin.blogForm}
              isSubmittingBlog={admin.isSubmittingBlog}
              blogMessage={admin.blogMessage}
              isEditingBlog={Boolean(admin.editingBlogId)}
              onBlogChange={admin.handleBlogChange}
              onSubmit={admin.handleBlogSubmit}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
