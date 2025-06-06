import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../css/dstyle.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { Margin } from "@mui/icons-material";
const OrderPage = () => {
  const [orderList, setOrderList] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const userInfo = localStorage.getItem("userInfo");
  const userData = JSON.parse(userInfo);
  const shopId = userData.user.userId // Replace with actual shopowner ID from auth context or props
  console.log("Shopowner ID:", shopId);


  // 🔁 Fetch Orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      console.log("Shopowner ID:", shopId);
      try {
        const response = await axios.get(
          `http://localhost:8765/ORDERMICROSERVICE/api/orders/by-shop?shopId=${shopId}`,
          // {
          //   params: { shopId },
          // }
        );
        const allOrders = Object.values(response.data).flat();

        // Add default status if missing
        const ordersWithStatus = allOrders.map(order => ({
          ...order,
          status:
            order.orderStatus && order.orderStatus.length
              ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1).toLowerCase()
              : "Pending",
        }));
        setOrderList(ordersWithStatus);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [shopId]);

  const filteredOrders = orderList.filter((order) => {
    const matchStatus = statusFilter === "All" || order.status === statusFilter;
    const matchQuery = order.customerEmail
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleUpdate = async () => {
    if (editProduct) {
      try {
        const response = await fetch(
          `http://localhost:8765/ORDERMICROSERVICE/api/orders/update-status?orderId=${editProduct.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: editProduct.newStatus.toLowerCase() }), // send new status here
          }
        );

        if (response.ok) {
          // Update frontend state only after successful API call
          setOrderList((prev) =>
            prev.map((order) =>
              order.id === editProduct.id ? { ...order, status: editProduct.newStatus } : order
            )
          );
          console.log('Order status updated successfully!');
        } else {
          console.error('Failed to update order status.');
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      }

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
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black">
          {/* Header content can go here */}
        </header>

        <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Placed </span>
          <span className="title-light">Orders</span>
        </h2>

        <div className="top-controls my-4 flex gap-4 items-center">
          <div className="tabs flex gap-2">
            {["All", "Pending", "Delivered"].map((tab) => (
              <button
                key={tab}
                className={`tab-button px-4 py-2 border ${statusFilter === tab ? "bg-black text-white" : "bg-gray-200"
                  } rounded`}
                onClick={() => setStatusFilter(tab)}
              >
                {tab}
              </button>
            ))}

            <TextField
              variant="outlined"
              placeholder="Find by Email"
              size="small"
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>


        </div>
        <div className="table-container">
          <Box className="orders-scroll space-y-1 mt-50">
            {filteredOrders.map((order) => (

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
              <p>Are you sure you want to update this status?</p>
              <div className="modal-buttons">
                <button
                  className="yes"
                  onClick={() => {
                    handleUpdate(); // ✅ update status now
                    setShowUpdateConfirm(false);
                    setEditProduct(null); // ✅ safely clear the state
                  }}
                >
                  Yes
                </button>
                <button
                  className="no"
                  onClick={() => {
                    setShowUpdateConfirm(false); // Close modal without update
                  }}
                >
                  Cancel
                </button>
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


export default OrderPage;