import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography, Box, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { styled } from "@mui/system";
import { FaUserCheck, FaUsers, FaClipboardList } from "react-icons/fa";
import Sidebar from "./Sidebar";
import axios from "axios"; // 👈 You need this to fetch real data
import "../css/dstyle.css";


const ScrollContainer = styled(Box)({
  display: "flex",
  overflowX: "auto",
  gap: "16px",
  paddingBottom: "10px",
  scrollbarWidth: "thin",
  scrollbarColor: "#888 #f1f1f1",
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
});

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [orderList, setOrderList] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);
  const shopId = userData.user.userId // Replace with actual shopowner ID from auth context or props
  console.log("Shopowner ID:", shopId);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8765/ORDERMICROSERVICE/api/orders/by-shop?shopId=${shopId}`,
        );

        const allOrders = Object.values(response.data).flat();
        // Add default status if missing
        const ordersWithStatus = allOrders.map((order) => ({
          ...order,
          status: "Pending", // Default status
        }));

        setOrderList(ordersWithStatus);

        // Sort by createdAt or updatedAt
        const sortedOrders = allOrders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4); // 👈 Only latest 5

        setOrders(sortedOrders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchOrders();
  }, [shopId]);
const handleUpdate = () => {
    if (editProduct) {
      setOrderList((prev) =>
        prev.map((order) =>
          order.id === editProduct.id
            ? { ...order, status: editProduct.newStatus }
            : order
        )
      );
      setShowUpdateConfirm(false);
      setEditProduct(null);
    }
  };

  const handleDelete = (id) => {
    setOrderList((prev) => prev.filter((order) => order.id !== id));
    setShowDeleteConfirm(null);
  };
 

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>

         <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Hi,</span>
          <span className="title-light">Tshering Zangmo</span>
        </h2>

        <div className="stats-container">
          <div className="stats-card">
            <FaUserCheck className="stats-icon" size={50} />
            <h4>Total Amount</h4>
            <p>Nu .12400/-</p>
          </div>
          <div className="stats-card">
            <FaUsers className="stats-icon" size={50} />
            <h4>Total Pending</h4>
            <p>Nu .2400/-</p>
          </div>
          <div className="stats-card">
            <FaClipboardList className="stats-icon" size={50} />
            <h4>Total Product</h4>
            <p>12</p>
          </div>
          <div className="stats-card">
            <FaClipboardList className="stats-icon" size={50} />
            <h4>Total Order</h4>
            <p>17</p>
          </div>
        </div>
        <div className="table-container">
          <h2 className="section-title">Recent Orders</h2>
          <Box className="orders-scroll space-y-4">
            {orderList.map((order) => (

              <Card key={order.id} sx={{ minWidth: 150, padding: 1, boxShadow: 2, textAlign: "left", fontSize: 3 }}>
                <CardContent className="compact-card-content" sx={{ minWidth: 200, padding: "30px", boxShadow: 2, textAlign: "left", fontSize: 3 }}>
                  <Typography>
                    <span className="label">Order ID:</span>{" "}
                    <span className="value">{order.id}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Placed on:</span>{" "}
                    <span className="value">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Flower Name:</span>{" "}
                    <span className="value">
                      {order.items.map((item) => (
                        <span className="value" key={item.id}>
                          {item.productName}
                        </span>
                      ))}
                    </span>
                  </Typography>
                  <Typography>
                    <span className="label">Quantity:</span>{" "}
                    <span className="value">
                      {order.items.map((item) => (
                        <span className="value" key={item.id}>
                          {item.quantity}
                        </span>
                      ))}
                    </span>
                  </Typography>
                  <Typography>
                    <span className="label">Total Amount:</span>{" "}
                    <span className="value">Nu. {order.total_amount}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Email:</span>{" "}
                    <span className="value">{order.customerEmail}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Address:</span>{" "}
                    <span className="value">{order.address || "N/A"}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Delivery Option:</span>{" "}
                    <span className="value">{order.deliveryOption}</span>
                  </Typography>
                  <Typography>
                    <span className="label">Payment Method:</span>{" "}
                    <span className="value">{order.paymentMethod}</span>
                  </Typography>

                  {/* Status Select */}
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={order.status}
                      onChange={(e) => {
                        setEditProduct({ id: order.id, newStatus: e.target.value });
                        setShowUpdateConfirm(true);
                      }}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>

                  <div className="action-buttons mt-2 flex gap-2">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => setShowDeleteConfirm(order.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Box>
        </div>
        {/* Confirm Modal */}
        {showUpdateConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to update this status</p>
              <div className="modal-buttons">
                <button
                  className="yes"
                  onClick={() => {
                    handleUpdate(); // ✅ update now
                    setShowUpdateConfirm(false);
                    setEditProduct(null);       // ✅ now it's safe to clear

                  }}
                >
                  Yes
                </button>
                <button className="no" onClick={() => setShowUpdateConfirm(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirm Modal */}
        {showDeleteConfirm !== null && (
          <div className="modal-overlay">
            <div className="modal-content">
              <p>Are you sure you want to delete this order?</p>
              <div className="modal-buttons">
                <button className="yes" onClick={() => handleDelete(showDeleteConfirm)}>Yes</button>
                <button className="no" onClick={() => setShowDeleteConfirm(null)}>No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default VendorDashboard