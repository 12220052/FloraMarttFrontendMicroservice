import { useState, useEffect } from "react";
import {
  FaSearch,
  FaEye,
  FaTrash,
  FaClipboardList,
  FaTimes,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import "../css/styles.css";
import file from "../../../assets/download.jpg";

const VendorApplication = () => {
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showApproveConfirm, setShowApproveConfirm] = useState(false);
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false); // ✅ New modal flag
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [vendorIdToDelete, setVendorIdToDelete] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const tokenInfo = localStorage.getItem("userInfo");
  const tokenData = JSON.parse(tokenInfo);
  const token = tokenData.jwt;

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
        const vendors = data.filter(
          (user) =>
            user.roles?.some((role) => role.name === "Vendor") &&
            user.enabled === false
        );

        const formatted = vendors.map((user) => ({
          id: user.id,
          storeName: user.name,
          phone: user.phone || "N/A",
          email: user.email,
          license_No: user.license_No || user.id,
          certificate: user.certificate || "", // ✅ FIXED typo here
          status: user.status || "Pending",
        }));

        setApplications(formatted);
      })
      .catch((err) => console.error("Error fetching application:", err));
  }, []);

  const filteredApps = applications.filter((app) =>
    app.storeName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApps.length / itemsPerPage);
  const displayedApps = filteredApps.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReject = async () => {
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

      if (!res.ok) throw new Error("Failed to reject user");

      setApplications((prev) =>
        prev.filter((app) => app.id !== showDeleteConfirm)
      );
      setShowDeleteConfirm(null);
      setSelectedVendor(null);
      setShowRejectConfirm(false);
      toast.success("Vendor rejected successfully"); // ✅ toast success on reject
    } catch (error) {
      console.error("Reject error:", error);
      toast.error("Failed to reject vendor."); // ✅ toast error on reject fail
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
          body: JSON.stringify({ enabled: true }),
        }
      );

      if (!res.ok) throw new Error("Failed to approve vendor");

      setApplications((prev) =>
        prev.filter((app) => app.id !== selectedVendor.id)
      );
      setSelectedVendor(null);
      setShowApproveConfirm(false);
    toast.success("Vendor approved successfully");  // ✅ toast success on approve
    } catch (err) {
      console.error("Approve error:", err);
      toast.error("Failed to approve vendor.");      // ✅ toast error on approve fail
    }
  };

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <h2
          className="dashboard-title"
          style={{ fontSize: "30px", fontWeight: "bold" }}
        >
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
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <table className="table-containeruser">
            <thead>
              <tr>
                <th>APPNO</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>License</th>
                <th>Certificate</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedApps.map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.storeName}</td>
                  <td>{app.phone}</td>
                  <td>{app.email}</td>
                  <td>{app.license_No}</td>
                  <td>
                    <FaClipboardList
                      className="file-icon"
                      style={{ cursor: "pointer" }}
                      onClick={() => setPreviewImage(file)}
                    />
                  </td>
                  <td>{app.status}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedVendor(app)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {selectedVendor && !showCertificateModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <FaTimes
                className="close-icon"
                onClick={() => setSelectedVendor(null)}
              />
              <h2 className="modal-title">
                Vendor <span className="highlight">Details</span>
              </h2>
              <div
                className="approve-modal"
                style={{ padding: "20px", textAlign: "left" }}
              >
                <p>
                  <strong>Name:</strong> {selectedVendor.storeName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedVendor.phone}
                </p>
                <p>
                  <strong>License No:</strong> {selectedVendor.license_No}
                </p>
                <p>
                  <strong>Status:</strong> {selectedVendor.status}
                </p>
              </div>
              <div className="modal-buttons mt-6 flex gap-40">
                <button
                  className="yes"
                  onClick={() => setShowApproveConfirm(true)}
                >
                  Approve
                </button>
                <button
                  className="no"
                  onClick={() => {
                    setShowDeleteConfirm(selectedVendor.id); // 👈 FIX: set the correct ID here
                    setShowRejectConfirm(true); // 👈 FIX: now this is just for showing the modal
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirm Modals */}
        {showApproveConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to approve this vendor?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleApprove}>
                  Yes
                </button>
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

        {showRejectConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to reject (delete) this vendor?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={handleReject}>
                  Yes
                </button>
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
        {previewImage && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "60%",
                height: "40%",
                backgroundColor: "#fff",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <FaTimes
                onClick={() => setPreviewImage(null)}
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "20px",
                  cursor: "pointer",
                  color: "#333",
                }}
              />
              <img
                src={previewImage}
                alt="Certificate"
                style={{
                  width: "600px",
                  height: "900px",
                  maxWidth: "80%",
                  maxHeight: "100%",
                  objectFit: "contain",
                  borderRadius: "6px",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = defaultCertificate;
                }}
              />
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

export default VendorApplication;
