// import React from "react";
import { FaUsers, FaClipboardList, FaUserCheck, FaEye, FaTrash, FaSearch } from "react-icons/fa";
import "../css/styles.css";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const applications = [
    { id: 1, appNo: "1002", name: "Sangay Wangmo", cid: "10905002378", submittedOn: "8/3/2024", license: "100903049" },
    { id: 2, appNo: "1002", name: "Sangay Wangmo", cid: "10905002378", submittedOn: "8/3/2024", license: "100903049" },
    { id: 3, appNo: "1002", name: "Sangay Wangmo", cid: "10905002378", submittedOn: "8/3/2024", license: "100903049" },

  ];

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black">
        </header>

        <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Admin</span>
          <span className="title-light">Panel</span>
        </h2>
        <div className="statsadmin-container">
          <div className="stats-card">
            <FaUserCheck className="stats-icon" size={50} />
            <h3>Total Vendors</h3>
            <p>10</p>
          </div>
          <div className="stats-card">
            <FaUsers className="stats-icon" size={50} />
            <h3>Total Customers</h3>
            <p>38</p>
          </div>
          <div className="stats-card">
            <FaClipboardList className="stats-icon" size={50} />
            <h3>Pending Approvals</h3>
            <p>12</p>
          </div>
        </div>
        <h2 className="section-title">Recent Application</h2>
        <div className="table-containeradmin">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input type="text" className="search-bar" placeholder="Find User" />
          </div>
          <table className="table-containeruser">
            <thead>
              <tr>
                <th>APPNO</th>
                <th>Name</th>
                <th>CID Number</th>
                <th>Submitted On</th>
                <th>Licensee</th>
                <th>Attachment</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.appNo}</td>
                  <td>{app.name}</td>
                  <td>{app.cid}</td>
                  <td>{app.submittedOn}</td>
                  <td>{app.license}</td>
                  <td><FaClipboardList className="file-icon" /></td>
                  <td className="action">
                    <button className="view-btn"><FaEye /> View</button>
                  </td>
                  <td className="action">
                    <button className="action-btn delete-btn">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
