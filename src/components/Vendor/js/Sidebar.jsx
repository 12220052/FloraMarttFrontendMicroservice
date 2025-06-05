// import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaSignOutAlt,
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaCog,
} from "react-icons/fa";
import logo from "../../../assets/logo.png";
import "../css/style.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfoString = localStorage.getItem("userInfo");
   const userInfo = JSON.parse(userInfoString);
   console.log("userinfo", userInfo);

 function handleLogout() {
  // Remove user data from localStorage
  localStorage.removeItem('userId');
  localStorage.removeItem('userInfo');

  navigate("/auth/login");
}

  // Function to check active link
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="sidebarvendor">
      <div className="sidebar-logo">
        <img src={logo} alt="FloraMart Logo" className="logo" />
      </div>

      <div className="sidebar-links">
        <Link
          to="/vendor/vendordashboard"
          className={`link ${isActive("/vendor/vendordashboard")}`}
        >
          <FaHome className="icon" /> Dashboard
        </Link>
        <Link to="/vendor/order-page" className={`link ${isActive("/vendor/order-page")}`}>
          <FaShoppingCart className="icon" /> Orders
        </Link>
        <Link to="/vendor/product" className={`link ${isActive("/vendor/product")}`}>
          <FaBoxOpen className="icon" /> Products
        </Link>
        <Link to="/vendor/setting" className={`link ${isActive("/vendor/setting")}`}>
          <FaCog className="icon" /> Settings
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
