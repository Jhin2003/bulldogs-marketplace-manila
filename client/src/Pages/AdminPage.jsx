import SidebarNavigation from "../features/Admin/components/SidebarNavigation";
import { useState } from "react";
import ManageUsersSection from "../features/Admin/components/ManageUsersSection";
import ManageProductsSection from "../features/Admin/components/ManageProductsSection";
import AdminHeader from "../features/Admin/components/AdminHeader";
import "./AdminPage.scss";

const AdminPage = () => {
  const [activeView, setActiveView] = useState("users");
  return (
    <div className="admin-container">
      <SidebarNavigation
        activeView={activeView}
        setActiveView={setActiveView}
      />
      <div className="right-admin-container">
        <AdminHeader />
        {activeView === "users" ? (
          <ManageUsersSection />
        ) : activeView === "products" ? (
          <ManageProductsSection />
        ) : null}
      </div>
    </div>
  );
};

export default AdminPage;
