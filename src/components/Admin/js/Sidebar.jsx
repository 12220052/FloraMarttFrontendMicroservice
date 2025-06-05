// import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUserCog, FaFileInvoice, FaSignOutAlt } from "react-icons/fa";
import logo from "../../../assets/logo.png";
import "../css/styles.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("userInfo")
  navigate("/auth/login");
  };

  // Function to check active link
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebaradmin">
      <div className="sidebar-logo">
        <img src={logo} alt="FloraMart Logo" className="logo" />
      </div>

      <div className="sidebar-links">
        <Link
          to="/admin/admindashboard"
          className={`link ${isActive("/admindashboard")}`}
        >
          <FaHome className="icon" /> Dashboard
        </Link>
        <Link
          to="/admin/user-management"
          className={`link ${isActive("/user-management")}`}
        >
          <FaUserCog className="icon" /> User Management
        </Link>
        <Link
          to="/admin/vendor-application"
          className={`link ${isActive("/vendor-application")}`}
        >
          <FaFileInvoice className="icon" /> Vendor Application
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
