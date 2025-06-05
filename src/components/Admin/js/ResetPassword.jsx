import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    // handle password update logic here
    alert("Password changed successfully!");
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <FaTimes onClick={() => navigate("/enter-otp")} style={styles.crossIcon} />
        <h3 style={styles.heading}>Enter New Password</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={styles.input}
            required
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
          <button type="submit" style={styles.button}>Confirm Password</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: "#fff8f6",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    position: "relative",
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "450px",
    textAlign: "center"
  },
  crossIcon: {
    position: "absolute",
    top: "15px",
    right: "20px",
    cursor: "pointer"
  },
  heading: {
    color: "#744f41",
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    border: "none",
    borderBottom: "2px solid #d4a6a6",
    outline: "none",
    fontSize: "16px"
  },
  button: {
    backgroundColor: "#e4b2ac",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ResetPassword;
