import { useState, useEffect } from "react";
import { FaSearch, FaEye, FaTrash, FaClipboardList, FaTimes } from "react-icons/fa";
import Sidebar from "./Sidebar";
import "../css/styles.css";

const VendorApplication = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);

const tokeninfo = localStorage.getItem("userInfo");
const tokenData = JSON.parse(tokeninfo);
const token = tokenData.jwt;
console.log("Token:", tokenData.jwt);
  useEffect(() => {
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
        const vendors = data.filter((user) =>
          user.roles.some((role) => role.name === "Vendor")
        );

        const formatted = vendors.map((user) => ({
          id: user.id,
          storeName: user.name,
          phone: user.phone || "N/A",
          submittedOn: user.createdAt || "N/A",
          license_No: user.license_No || user.id,
          status: user.status || "Pending",
        }));

        setApplications(formatted);
      })
      .catch((err) => console.error("Error fetching vendors:", err));
  }, []);

  const filteredApps = applications.filter((app) =>
    app.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:8765/USERMICROSERVICE/api/users/${showDeleteConfirm}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete user");

      setApplications((prev) =>
        prev.filter((app) => app.id !== showDeleteConfirm)
      );
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user.");
    }
  };

  const handleApprove = async () => {
    try {
      const res = await fetch(
        `http://localhost:8765/USERMICROSERVICE/api/users/${selectedVendor.id}/enabled`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ enabled: "true" }),
        }
      );

      if (!res.ok) throw new Error("Failed to approve vendor");

      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedVendor.id ? { ...app, status: "Approved" } : app
        )
      );
      setSelectedVendor(null);
      setShowApproveConfirm(false);
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(
        `http://localhost:8765/USERMICROSERVICE/api/users/reject/${selectedVendor.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to reject vendor");

      setApplications((prev) =>
        prev.map((app) =>
          app.id === selectedVendor.id ? { ...app, status: "Rejected" } : app
        )
      );
      setSelectedVendor(null);
      setShowRejectConfirm(false);
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
   <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>
         <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Vendor</span>
          <span className="title-light">Applications</span>
        </h2>

        <div className="table-containeradmin">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-bar"
              placeholder="Find Vendor"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <table className="table-containeruser">
            <thead>
              <tr>
                <th>APPNO</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Submitted On</th>
                <th>License</th>
                <th>Status</th>
                <th>Attachment</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.storeName}</td>
                  <td>{app.phone}</td>
                  <td>{app.submittedOn}</td>
                  <td>{app.license_No}</td>
                  <td>{app.status}</td>
                  <td>
                    <FaClipboardList className="file-icon" />
                  </td>
                  <td className="action">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedVendor(app)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                     <td className="action">
                    <button
                      className="delete-btn"
                      onClick={() => setShowDeleteConfirm(app.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {selectedVendor && (
          <div className="modal-overlay">
            <div className="modal-content">
              <FaTimes
                className="close-icon"
                onClick={() => setSelectedVendor(null)}
              />
              <h2 className="modal-title">
                Vendor <span className="highlight">Details</span>
              </h2>
              <p><strong>Name:</strong> {selectedVendor.storeName}</p>
              <p><strong>Phone:</strong> {selectedVendor.phone}</p>
              <p><strong>License No:</strong> {selectedVendor.license_No}</p>
              <p><strong>Status:</strong> {selectedVendor.status}</p>

              <div className="modal-buttons mt-4">
                <button
                  className="yes"
                  onClick={() => setShowApproveConfirm(true)}
                >
                  Approve
                </button>
                <button
                  className="no"
                  onClick={() => setShowRejectConfirm(true)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Approve Confirmation Modal */}
        {showApproveConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to approve this vendor?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleApprove}>Yes</button>
                <button
                  className="no"
                  onClick={() => setShowApproveConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Confirmation Modal */}
        {showRejectConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to reject this vendor?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleReject}>Yes</button>
                <button
                  className="no"
                  onClick={() => setShowRejectConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to delete this user?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleDelete}>Yes</button>
                <button
                  className="no"
                  onClick={() => setShowDeleteConfirm(null)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorApplication;
