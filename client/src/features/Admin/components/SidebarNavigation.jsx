import "./SideBarNavigation.scss";

const SidebarNavigation = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Bulldogs Marketplace</h2>
      <ul className="sidebar-list">
        <li
          className={`sidebar-item ${activeView === "users" ? "active" : ""}`}
          onClick={() => setActiveView("users")}
        >
          Users
        </li>
        <li
          className={`sidebar-item ${
            activeView === "products" ? "active" : ""
          }`}
          onClick={() => setActiveView("products")}
        >
          Products
        </li>
      </ul>
    </div>
  );
};

export default SidebarNavigation;
