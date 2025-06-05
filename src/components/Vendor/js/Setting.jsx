
import Sidebar from "./Sidebar";
import "../css/setting.css"
import profileImg from "../css/profile.png"; 
import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaPhoneAlt, FaCamera } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Avatar,
  IconButton,
  InputAdornment
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const SettingsPage = () => {
  const [editMode, setEditMode] = useState(false);
  const [storeName, setStoreName] = useState("Pema Store");
  const [email, setEmail] = useState("pemastore@gmail.com");
  const [contact, setContact] = useState("975+17895049");
  const [bio, setBio] = useState(
    "As a dedicated seller on FloraMart, I specialize in offering a diverse selection of high-quality flower plants to bring nature closer to homes and gardens. With a deep passion for plants and customer satisfaction, I ensure that every plant is nurtured with care and delivered with excellence."
  );

  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleUpdate = () => {
    if (showPasswordFields && newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    setPasswordError("");
    setEditMode(false);
    setShowPasswordFields(false);
    alert("Profile updated successfully!");
  };

  const handlePasswordToggle = () => {
    setShowPasswordFields(!showPasswordFields);
    setPasswordError("");
  };

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>
      <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Account</span> <span className="title-light">Settings</span>
        </h2>

        <Card className="mt-6 max-w-2xl mx-auto shadow-lg p-4">
          <CardContent>
            <div className="flex flex-col items-center">
              <Avatar
                src={profileImg}
                alt="Profile"
                sx={{ width: 120, height: 120 }}
              />
              {editMode && (
                <label htmlFor="upload-photo">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                  />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
              )}
            </div>

            <Box mt={2}>
              <TextField
                fullWidth
                label="Store Name"
                variant="outlined"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                disabled={!editMode}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editMode}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Contact Number"
                variant="outlined"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                disabled={!editMode}
                margin="dense"
              />
              <TextField
                fullWidth
                label="Bio"
                variant="outlined"
                multiline
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!editMode}
                margin="dense"
              />

              <Button onClick={handlePasswordToggle} sx={{ mt: 2 }}>
                Change Password
              </Button>

              {showPasswordFields && (
                <Box mt={2}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    variant="outlined"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="dense"
                    error={passwordError !== ""}
                    helperText={passwordError}
                  />
                </Box>
              )}

              <Box mt={3} className="flex gap-2">
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="outlined" color="secondary" onClick={() => setEditMode(!editMode)}>
                  {editMode ? "Cancel" : "Edit Profile"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
