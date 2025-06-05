import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaTimes } from "react-icons/fa";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate("/auth/enter-otp");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <FaTimes onClick={() => navigate("/")} style={styles.crossIcon} />
        <h3 style={styles.heading}>Forgot Password?</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
            <FaEnvelope style={styles.icon} />
          </div>
          <p style={styles.hint}>**You will receive an OTP via email</p>
          <button type="submit" style={styles.button}>Confirm</button>
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
    width: "400px",
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
  inputWrapper: {
    position: "relative"
  },
  input: {
    width: "100%",
    border: "none",
    borderBottom: "2px solid #cfa6a0",
    padding: "10px",
    fontSize: "16px",
    outline: "none"
  },
  icon: {
    position: "absolute",
    right: "10px",
    top: "12px",
    color: "#744f41"
  },
  hint: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#bbaaaa"
  },
  button: {
    marginTop: "30px",
    backgroundColor: "#e4b2ac",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ForgotPassword;
