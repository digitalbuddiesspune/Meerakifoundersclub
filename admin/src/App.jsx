import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AddBlogPage from "./pages/AddBlogPage";
import AddServicePage from "./pages/AddServicePage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import MyServicesPage from "./pages/MyServicesPage";
import ServiceDetailsPage from "./pages/ServiceDetailsPage";
import UsersPage from "./pages/UsersPage";
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
            <DashboardPage dashboardStats={admin.dashboardStats} />
          }
        />
        <Route
          path="users"
          element={
            <UsersPage
              usersLoading={admin.usersLoading}
              usersError={admin.usersError}
              usersList={admin.usersList}
              userMessage={admin.userMessage}
              onDeleteUser={admin.handleDeleteUser}
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
            />
          }
        />
        <Route
          path="services/details/:serviceId"
          element={
            <ServiceDetailsPage
              servicesList={admin.servicesList}
              serviceMessage={admin.serviceMessage}
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
              onServiceImageUpload={admin.handleServiceImageUpload}
              onProjectImageUpload={admin.handleProjectImageUpload}
              onClearServiceImage={admin.clearServiceImage}
              onClearProjectImage={admin.clearProjectImage}
              onAddProject={admin.addProject}
              onRemoveProject={admin.removeProject}
              onSubmit={admin.handleServiceSubmit}
              uploadingImageFor={admin.uploadingImageFor}
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
          path="blogs/details/:blogId"
          element={
            <BlogDetailsPage
              blogsList={admin.blogsList}
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
              onFeaturedImageUpload={admin.handleBlogFeaturedImageUpload}
              onAuthorAvatarUpload={admin.handleBlogAuthorAvatarUpload}
              onClearFeaturedImage={admin.clearBlogFeaturedImage}
              onClearAuthorAvatar={admin.clearBlogAuthorAvatar}
              onSubmit={admin.handleBlogSubmit}
              uploadingImageFor={admin.uploadingImageFor}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
