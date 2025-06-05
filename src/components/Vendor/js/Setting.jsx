
// import Sidebar from "./Sidebar";
// import "../css/setting.css"
// import profileImg from "../css/profile.png"; 
// import React, { useState, useEffect } from 'react';
// import { FaEnvelope, FaUser, FaPhoneAlt, FaCamera } from 'react-icons/fa';
// import { MdEdit } from 'react-icons/md';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Card,
//   CardContent,
//   Avatar,
//   IconButton,
//   InputAdornment
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';

// const SettingsPage = () => {
//   const [editMode, setEditMode] = useState(false);
//   const [storeName, setStoreName] = useState("Pema Store");
//   const [email, setEmail] = useState("pemastore@gmail.com");
//   const [contact, setContact] = useState("975+17895049");
//   const [bio, setBio] = useState(
//     "As a dedicated seller on FloraMart, I specialize in offering a diverse selection of high-quality flower plants to bring nature closer to homes and gardens. With a deep passion for plants and customer satisfaction, I ensure that every plant is nurtured with care and delivered with excellence."
//   );

//   const [showPasswordFields, setShowPasswordFields] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const handleUpdate = () => {
//     if (showPasswordFields && newPassword !== confirmPassword) {
//       setPasswordError("New passwords do not match");
//       return;
//     }
//     setPasswordError("");
//     setEditMode(false);
//     setShowPasswordFields(false);
//     alert("Profile updated successfully!");
//   };

//   const handlePasswordToggle = () => {
//     setShowPasswordFields(!showPasswordFields);
//     setPasswordError("");
//   };

//   return (
//     <div className="app-container flex h-screen">
//       <Sidebar />
//       <div className="main-content flex-1 p-4">
//         <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>
//       <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
//           <span className="title-bold">Account</span> <span className="title-light">Settings</span>
//         </h2>

//         <Card className="mt-6 max-w-2xl mx-auto shadow-lg p-4">
//           <CardContent>
//             <div className="flex flex-col items-center">
//               <Avatar
//                 src={profileImg}
//                 alt="Profile"
//                 sx={{ width: 120, height: 120 }}
//               />
//               {editMode && (
//                 <label htmlFor="upload-photo">
//                   <input
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     id="upload-photo"
//                     name="upload-photo"
//                     type="file"
//                   />
//                   <IconButton color="primary" aria-label="upload picture" component="span">
//                     <PhotoCamera />
//                   </IconButton>
//                 </label>
//               )}
//             </div>

//             <Box mt={2}>
//               <TextField
//                 fullWidth
//                 label="Store Name"
//                 variant="outlined"
//                 value={storeName}
//                 onChange={(e) => setStoreName(e.target.value)}
//                 disabled={!editMode}
//                 margin="dense"
//               />
//               <TextField
//                 fullWidth
//                 label="Email"
//                 variant="outlined"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={!editMode}
//                 margin="dense"
//               />
//               <TextField
//                 fullWidth
//                 label="Contact Number"
//                 variant="outlined"
//                 value={contact}
//                 onChange={(e) => setContact(e.target.value)}
//                 disabled={!editMode}
//                 margin="dense"
//               />
//               <TextField
//                 fullWidth
//                 label="Bio"
//                 variant="outlined"
//                 multiline
//                 rows={4}
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 disabled={!editMode}
//                 margin="dense"
//               />

//               <Button onClick={handlePasswordToggle} sx={{ mt: 2 }}>
//                 Change Password
//               </Button>

//               {showPasswordFields && (
//                 <Box mt={2}>
//                   <TextField
//                     fullWidth
//                     label="Current Password"
//                     variant="outlined"
//                     type="password"
//                     value={currentPassword}
//                     onChange={(e) => setCurrentPassword(e.target.value)}
//                     margin="dense"
//                   />
//                   <TextField
//                     fullWidth
//                     label="New Password"
//                     variant="outlined"
//                     type="password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                     margin="dense"
//                   />
//                   <TextField
//                     fullWidth
//                     label="Confirm Password"
//                     variant="outlined"
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     margin="dense"
//                     error={passwordError !== ""}
//                     helperText={passwordError}
//                   />
//                 </Box>
//               )}

//               <Box mt={3} className="flex gap-2">
//                 <Button variant="contained" color="primary" onClick={handleUpdate}>
//                   Update
//                 </Button>
//                 <Button variant="outlined" color="secondary" onClick={() => setEditMode(!editMode)}>
//                   {editMode ? "Cancel" : "Edit Profile"}
//                 </Button>
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default SettingsPage;
import Sidebar from "./Sidebar";
import { useState, useEffect } from 'react';
import { FaEnvelope, FaUser, FaCamera } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultProfile from '../css/profile.png';

const SettingsPage = () => {
  // Initialize all state variables first
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [passwordData, setPasswordData] = useState({
    old: '',
    new: '',
    confirm: '',
  });
  const [profile, setProfile] = useState({
    id: null,
    name: '',
    email: '',
    contact: '',
    about: '',
    image: null,
  });
  const [originalProfile, setOriginalProfile] = useState({ ...profile });

  // const userId = localStorage.getItem("userId");
  const userinfo = localStorage.getItem("userInfo");
  console.log(userinfo);
  const userInfo = JSON.parse(userinfo);
  console.log("userinfo", userInfo);
  const userId = userInfo.user.userId
  console.log(userId)
  useEffect(() => {
    // Get user info from localStorage
    const userInfoString = localStorage.getItem("userInfo");

    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      console.log("userinfo", userInfo);
      const userId = userInfo.user.userId
      // Set basic profile info from localStorage
      setProfile(prev => ({
        ...prev,
        id: userInfo.user.userId,
        email: userInfo.user.username,
        name: userInfo.user.name || 'Pema Tshoki' // Fallback to default name if not available
      }));

      // Also update the originalProfile
      setOriginalProfile({
        id: userInfo.user.userId,
        email: userInfo.user.username,
        name: userInfo.user.name || 'Pema Tshoki',
        contact: '+97517895049',
        about: 'Pema Tshoki',
        image: null
      });

      setIsLoading(false);
    }
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    // Make API call to update user details (without password)

    try {
      console.log('Updating user:', profile);
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      if (imageFile) {
        formData.append("photo", imageFile);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:, value`);
      }
      const response = await fetch(`http://localhost:8765/USERMICROSERVICE/api/users/${userId}`, {
        method: 'PUT',
        body: formData
      });

      // First check if the response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Get raw response first
        console.error('Server responded with error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Show success toast
      console.log("toasting")
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Update failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }); // Re-throw to handle in calling code
    }
  };

  const handlePasswordSave = async () => {
    const { old, new: newPass, confirm } = passwordData;

    if (!old || !newPass || !confirm) {
      setPasswordError('All fields are required');
      return;
    }
    if (newPass.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }
    if (newPass !== confirm) {
      setPasswordError("Passwords don't match");
      return;
    }

    setPasswordError('');

    try {
      console.log('Updating user:', profile);
      const formData1 = new FormData();
      formData1.append('name', profile.name);
      formData1.append('email', profile.email);

      // Include password if it was changed
      if (passwordData.new && passwordData.new.length >= 6) {
        formData1.append('password', passwordData.new);
      }

      const response = await fetch(`http://localhost:8765/USERMICROSERVICE/api/users/${userId}`, {
        method: 'PUT',
        body: formData1,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast.success('Password updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setIsEditing(false);
      setPasswordData({ old: '', new: '', confirm: '' }); // Clear password fields
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Update failed: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="main-content flex-1 p-4">
        <header className="header bg-white shadow p-4 flex justify-between items-center border-b-2 border-black"></header>
        <h2 className="dashboard-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          <span className="title-bold">Account</span> <span className="title-light">Settings</span>
        </h2>

        <div className="min-h-screen bg-white px-8 py-10 text-[#81504]">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <div className="max-w-5xl mx-auto  bg-[#eeeee4] shadow-md p-6 rounded-md">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 text-[#81504D] font-semibold"
              >
                <MdEdit />
                Edit Profile
              </button>
            </div>

            <div className="md:flex md:gap-10">
              <div className="flex flex-col items-center mb-6 md:mb-0 md:w-1/3">
                <label className="relative cursor-pointer">
                  <img
                    src={
                      imagePreview
                        ? imagePreview
                        : profile?.photo
                          ? `http://localhost:8765/USERMICROSERVICE/images/${profile.photo}`
                          : defaultProfile
                    }
                    alt="Profile"
                    className="rounded-full w-40 h-40 object-cover border"
                  />


                  {isEditing && (
                    <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow">
                      <FaCamera className="text-[#81504D]" />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setImageFile(file);                      // Actual file for upload
                        setImagePreview(URL.createObjectURL(file)); // Preview URL
                      }
                    }}
                    className="hidden"
                    disabled={!isEditing}
                  />
                </label>

                <div className="mt-6 space-y-3 text-center">
                  <button
                    className="text-[#81504D] font-semibold underline"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Change Password
                  </button>
                </div>
              </div>

              <div className="md:w-2/3 space-y-5">
                <div>
                  <label className="block font-semibold mb-1">Name</label>
                  <div className="flex items-center border rounded-md shadow-sm bg-gray-50">
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 bg-transparent focus:outline-none"
                      value={profile.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FaUser className="mx-3 text-[#81504D]" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Email</label>
                  <div className="flex items-center border rounded-md shadow-sm bg-gray-50">
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 bg-transparent focus:outline-none"
                      value={profile.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <FaEnvelope className="mx-3 text-[#81504D]" />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex justify-start gap-60 mt-6 ml-20">
                    <button
                      onClick={handleUpdateProfile}
                      className="px-6 py-2 bg-[#F5B3AD] text-[#81504D] rounded hover:bg-[#F7C2BD] shadow"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        setProfile(originalProfile);
                        setIsEditing(false);
                      }}
                      className="px-6 py-2 bg-gray-300 text-[#81504D] rounded hover:bg-gray-400 shadow"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {showPasswordModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-[#81504D]">Change Password</h2>
                <div className="space-y-3">
                  <input
                    type="password"
                    name="old"
                    placeholder="Old Password"
                    value={passwordData.old}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                  />
                  <input
                    type="password"
                    name="new"
                    placeholder="New Password"
                    value={passwordData.new}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                  />
                  <input
                    type="password"
                    name="confirm"
                    placeholder="Confirm Password"
                    value={passwordData.confirm}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none"
                  />

                  {passwordError && (
                    <p className="text-red-500 text-sm font-medium">{passwordError}</p>
                  )}

                  <div className="flex justify-between mt-4">
                    <button
                      onClick={handlePasswordSave}
                      className="px-4 py-2 bg-[#F5B3AD] text-[#81504D] rounded hover:bg-[#F7C2BD]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowPasswordModal(false)}
                      className="px-4 py-2 bg-gray-300 text-[#81504D] rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showSuccessModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-[#333]">Password Changed Successfully!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
