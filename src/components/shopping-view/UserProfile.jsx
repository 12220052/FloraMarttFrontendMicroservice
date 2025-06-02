import React, { useState } from 'react';
import { FaEnvelope, FaUser, FaPhoneAlt, FaCamera } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Pema Tshoki',
    email: 'pematshoki@gmail.com',
    contact: '+97517895049',
    about: 'Pema Tshoki',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const [passwordData, setPasswordData] = useState({
    old: '',
    new: '',
    confirm: '',
  });
  
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };
  const handlePasswordSave = () => {
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
  
    // If all is good
    setPasswordError('');
    setShowPasswordModal(false);
    setShowSuccessModal(true);
  
    // Optional: reset form
    setPasswordData({ old: '', new: '', confirm: '' });
  
    // Auto close success modal
    setTimeout(() => setShowSuccessModal(false), 2000);
  };
  
  return (
    <div className="min-h-screen bg-white px-8 py-10 text-[#81504D]">
      <div className="max-w-5xl mx-auto bg-white shadow-md p-6 rounded-md">
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
          {/* Left Side: Profile Picture & Links */}
          <div className="flex flex-col items-center mb-6 md:mb-0 md:w-1/3">
          <label className="relative cursor-pointer">
  {profile.image ? (
    <img
      src={profile.image}
      alt="Profile"
      className="rounded-full w-40 h-40 object-cover border"
    />
  ) : (
    <div className="bg-gray-200 rounded-full w-40 h-40 flex items-center justify-center">
      <FaCamera className="text-[#81504D] text-2xl" />
    </div>
  )}

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
        setProfile((prev) => ({
          ...prev,
          image: URL.createObjectURL(file),
        }));
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

          {/* Right Side: Form */}
          <div className="md:w-2/3 space-y-5">
            {/* Name */}
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

            {/* Email */}
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

            {/* Contact */}
            <div>
              <label className="block font-semibold mb-1">Contact Number</label>
              <div className="flex items-center border rounded-md shadow-sm bg-gray-50">
                <input
                  type="text"
                  name="contact"
                  className="w-full px-3 py-2 bg-transparent focus:outline-none"
                  value={profile.contact}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                <FaPhoneAlt className="mx-3 text-[#81504D]" />
              </div>
            </div>

            {/* About Me */}
            <div>
              <label className="block font-semibold mb-1">About me</label>
              <textarea
                name="about"
                className="w-full px-3 py-2 border rounded-md shadow-sm bg-gray-50 focus:outline-none"
                value={profile.about}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            {/* About Me */}

{/* Buttons */}
{isEditing && (
  <div className="flex justify-start gap-60 mt-6 ml-20">
    <button
      onClick={() => setIsEditing(false)}
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
      <p className="text-lg font-semibold text-[#333]">Password Change Successfully!</p>
    </div>
  </div>
)}

    </div>
  );
};

export default UserProfile;
