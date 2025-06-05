import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const EnterOTP = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const navigate = useNavigate();

  const handleChange = (val, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = val.slice(-1);
    setOtp(updatedOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length === 6) {
      navigate("/auth/reset-password");
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <FaTimes onClick={() => navigate("/auth/forgot-password")} style={styles.crossIcon} />
        <h3 style={styles.heading}>Enter OTP</h3>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.otpBoxes}>
            {otp.map((digit, index) => (
              <input
                key={index}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                style={styles.otpInput}
              />
            ))}
          </div>
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
  otpBoxes: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },
  otpInput: {
    width: "40px",
    height: "50px",
    fontSize: "20px",
    textAlign: "center",
    border: "1px solid #cca7a7",
    borderRadius: "5px"
  },
  resend: {
    fontSize: "14px",
    color: "#6e90c4",
    cursor: "pointer",
    marginBottom: "20px"
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

export default EnterOTP;
