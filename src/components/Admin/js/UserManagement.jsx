import React, { useState, useEffect } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../css/styles.css";

const UserManagement = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const itemsPerPage = 6;

 useEffect(() => {
  const token =`eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6W3siYXV0aG9yaXR5IjoiVmVuZG9yIn1dLCJzdWIiOiJwaHVudHNob0BnbWFpbC5jb20iLCJpYXQiOjE3NDkwNzE2ODYsImV4cCI6MTc0OTEwNzY4Nn0.BKLigXeXn724z66qPNM9lqSiYm9TkFrP8REv0sHUXzM`; // Or wherever you store it

  fetch("http://localhost:8765/USERMICROSERVICE/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) throw new Error("Failed to fetch users");
      const text = await res.text();
      if (!text) return [];
      return JSON.parse(text);
    })
      .then((data) => {
        const filtered = data.filter((user) =>
          user.roles.some((role) => role.name === "Vendor" || role.name === "Client")
        );

        const formatted = filtered.map((user) => ({
          id: user.id,
          profile: "logo.png", // Placeholder image
          name: user.name,
          email: user.email,
          registeredDate: "N/A", // Update if available from backend
          regNo: user.id || "N/A",
          role: user.roles[0]?.name || "Unknown",
          contact: user.phone || "N/A",
        }));

        setAllUsers(formatted);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Filter and search users based on current filter and search term
  const filteredUsers = allUsers.filter(
    (user) =>
      (filter === "All" || user.role === filter) &&
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const displayedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

const handleDelete = async () => {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`http://localhost:8765/USERMICROSERVICE/api/users/${showDeleteConfirm}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Failed to delete user');
    }

    // Remove from UI if deletion succeeded
    setAllUsers((prevUsers) => prevUsers.filter((user) => user.id !== showDeleteConfirm));
    setShowDeleteConfirm(null);
  } catch (error) {
    console.error('Delete error:', error);
    alert('Failed to delete user.');
  }
};

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>
        <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">User</span>
          <span className="title-light">Management</span>
        </h2>

        <div className="table-containeradmin">
          <div className="filter-search-container flex justify-between items-center mb-4">
            <div className="search-container flex items-center">
              <FaSearch className="search-icon" />
              <input
                type="text"
                className="search-bar"
                placeholder="Find User"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1); // reset page on search
                }}
              />
            </div>
            <select
              className="filter-dropdown"
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1); // reset page on filter change
              }}
            >
              <option value="All">All</option>
              <option value="Vendor">Vendor</option>
              <option value="Client">Client</option>
            </select>
          </div>

          <table className="table-containeruser">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email ID</th>
                <th>Registered Date</th>
                <th>Registered No</th>
                <th>Role</th>
                <th>Contact No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                displayedUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img src={user.profile} alt="Profile" className="profile-pic" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.registeredDate}</td>
                    <td>{user.regNo}</td>
                    <td className={user.role === "Vendor" ? "vendor" : "customer"}>
                      {user.role}
                    </td>
                    <td>{user.contact}</td>
                    <td className="actions">
                      <FaTrash
                        className="delete-icon"
                        title="Delete"
                        onClick={() => setShowDeleteConfirm(user.id)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to delete this user?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleDelete}>
                  Yes
                </button>
                <button className="no" onClick={() => setShowDeleteConfirm(null)}>
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="pagination flex justify-center mt-4">
          {totalPages > 0 &&
            Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
