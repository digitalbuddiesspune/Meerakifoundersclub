import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import AddBlogPage from "./pages/AddBlogPage";
import AddServicePage from "./pages/AddServicePage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import DashboardPage from "./pages/DashboardPage";
import MyBlogsPage from "./pages/MyBlogsPage";
import MyServicesPage from "./pages/MyServicesPage";
import PartnerListPage from "./pages/PartnerListPage";
import PartnerPage from "./pages/PartnerPage";
import PartnerDetailsPage from "./pages/PartnerDetailsPage";
import AddPartnerPage from "./pages/AddPartnerPage";
import MembershipsPage from "./pages/MembershipsPage";
import AddMembershipPage from "./pages/AddMembershipPage";
import DocumentTypesPage from "./pages/DocumentTypesPage";
import DocumentTypeDetailsPage from "./pages/DocumentTypeDetailsPage";
import AddDocumentTypePage from "./pages/AddDocumentTypePage";
import PaymentsPage from "./pages/PaymentsPage";
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
          path="payments"
          element={
            <PaymentsPage
              usersLoading={admin.usersLoading}
              usersError={admin.usersError}
              usersList={admin.usersList}
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
              documentTypes={admin.documentTypes}
              documentTypeMessage={admin.documentTypeMessage}
              serviceDetailsMessage={admin.serviceDetailsMessage}
              setServiceDetailsMessage={admin.setServiceDetailsMessage}
              onLoadServiceDetails={admin.loadServiceDetails}
              onSaveServiceDetails={admin.saveServiceDetails}
              onDeleteServiceDetailsConfig={admin.deleteServiceDetailsConfig}
              onAddDocumentType={admin.handleAddDocumentType}
              uploadAdminImage={admin.uploadAdminImage}
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
        <Route
          path="partner-list"
          element={
            <PartnerListPage
              partnerListLoading={admin.partnerListLoading}
              partnerListError={admin.partnerListError}
              partnerList={admin.partnerList}
              partnerListMessage={admin.partnerListMessage}
              onAddPartner={admin.handleAddPartner}
              onUpdatePartner={admin.handleUpdatePartner}
              onDeletePartner={admin.handleDeletePartner}
            />
          }
        />
        <Route
          path="partners"
          element={
            <PartnerPage
              partnersLoading={admin.partnersLoading}
              partnersError={admin.partnersError}
              partners={admin.partners}
              partnersMessage={admin.partnersMessage}
              onAddPartner={admin.handleAddPartnerRecord}
              onUpdatePartner={admin.handleUpdatePartnerRecord}
              onDeletePartner={admin.handleDeletePartnerRecord}
              partnerList={admin.partnerList}
            />
          }
        />
        <Route
          path="partners/details/:partnerId"
          element={<PartnerDetailsPage />}
        />
        <Route
          path="partners/add-partner"
          element={
            <AddPartnerPage
              partnersMessage={admin.partnersMessage}
              onAddPartner={admin.handleAddPartnerRecord}
              onUpdatePartner={admin.handleUpdatePartnerRecord}
              partnerList={admin.partnerList}
            />
          }
        />
        <Route
          path="memberships"
          element={
            <MembershipsPage
              membershipsLoading={admin.membershipsLoading}
              membershipsError={admin.membershipsError}
              memberships={admin.memberships}
              membershipMessage={admin.membershipMessage}
              onDeleteMembership={admin.handleDeleteMembership}
            />
          }
        />
        <Route
          path="memberships/add-membership"
          element={
            <AddMembershipPage
              membershipMessage={admin.membershipMessage}
              onAddMembership={admin.handleAddMembership}
              onUpdateMembership={admin.handleUpdateMembership}
            />
          }
        />
        <Route
          path="documents"
          element={
            <DocumentTypesPage
              documentTypesLoading={admin.documentTypesLoading}
              documentTypesError={admin.documentTypesError}
              documentTypes={admin.documentTypes}
              documentTypeMessage={admin.documentTypeMessage}
              onDeleteDocumentType={admin.handleDeleteDocumentType}
            />
          }
        />
        <Route
          path="documents/details/:docId"
          element={<DocumentTypeDetailsPage />}
        />
        <Route
          path="documents/add-document"
          element={
            <AddDocumentTypePage
              documentTypeMessage={admin.documentTypeMessage}
              onAddDocumentType={admin.handleAddDocumentType}
              onUpdateDocumentType={admin.handleUpdateDocumentType}
              uploadAdminImage={admin.uploadAdminImage}
            />
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
