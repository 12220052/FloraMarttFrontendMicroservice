import React, { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "../css/styles.css";  // Include any necessary styles

const UserEdit = ({ user, onUpdate }) => {
  const [userName, setUserName] = useState(user.name);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userContact, setUserContact] = useState(user.contact);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");

  const handleUpdateUser = () => {
    let hasError = false;
    setNameError("");
    setEmailError("");
    setContactError("");

    if (!userName) {
      setNameError("Name is required.");
      hasError = true;
    }
    if (!userEmail) {
      setEmailError("Email is required.");
      hasError = true;
    }
    if (!userContact) {
      setContactError("Contact number is required.");
      hasError = true;
    }

    if (hasError) return;

    // Update user data
    onUpdate({ ...user, name: userName, email: userEmail, contact: userContact });
  };

  return (
    <div className="user-edit-modal-overlay">
      <div className="user-edit-modal">
        <h3>Edit User Details</h3>
        <label>
          Name:
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter Name"
          />
          {nameError && <p className="error-text">{nameError}</p>}
        </label>
        <label>
          Email:
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="Enter Email"
          />
          {emailError && <p className="error-text">{emailError}</p>}
        </label>
        <label>
          Contact Number:
          <input
            type="text"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
            placeholder="Enter Contact"
          />
          {contactError && <p className="error-text">{contactError}</p>}
        </label>
        <div className="modal-buttons">
          <button onClick={handleUpdateUser} className="save-btn">
            <FaCheck /> Save Changes
          </button>
          <button onClick={() => setUserName(user.name)} className="cancel-btn">
            <FaTimes /> Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserEdit;
