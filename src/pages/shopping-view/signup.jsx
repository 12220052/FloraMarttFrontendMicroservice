import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // We'll use axios for making the POST request
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: "",
    email: "",
    phone: "",
    licenseNo: "",
    file: null,
    password: "",
    confirmPassword: "",
    agree: false,
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for UI feedback
  const [fileName, setFileName] = useState(""); // To display the selected file name

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, file: files[0] });
      setFileName(files[0].name); // Display selected file name
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { storeName, email, phone, licenseNo, agree, file,password,confirmPassword } = formData;

    // Validate form fields
    if (!storeName || !email || !phone || !licenseNo || !agree || !file || !password || !confirmPassword) {
      setError("Please fill all fields, upload a file, and agree to terms.");
      return;
    }

  if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Prepare form data for submission
    const userData = new FormData();
    userData.append("Name", storeName); // storeName as username
    userData.append("email", email);
    userData.append("Phone", phone);
    userData.append("License_No", licenseNo);
    userData.append("roles",JSON.stringify([{ id: 2, name: "vendor" }])); // Initially disabled
    userData.append("photo", file); // Attach the photo file
    userData.append("password",password)
  

 try {
  setLoading(true);
  setError("");

  const response = await axios.post("http://localhost:8765/USERMICROSERVICE/api/users", userData);

  if (response.status === 200 || response.status === 201) {
    const result = response.data;
    console.log("User created:", result);

    toast.success("Signup successful! Wait for Approval.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(() => {
      navigate("/auth/login");
    }, 3000);
  } else {
    setError("Signup failed. Please try again.");

    toast.error("Signup failed. Please try again.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }
} 
 catch (err) {
     console.error(err);
     setError("An error occurred during signup");
   
     toast({
       title: "Error",
       description: "An error occurred. Please try again.",
       variant: "destructive",
     });
   }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f9f5f3",
      }}
    >
       <ToastContainer /> 
      <div
        style={{
          display: "flex",
          width: "900px",
          height: "1200px",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Left Side - Form */}
        <div
          style={{
            flex: 1,
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              color: "#744f41",
              fontWeight: "bold",
              marginBottom: "5px",
              marginTop: "5px",
            }}
          >
            SIGN UP
          </h2>
          <p style={{ marginBottom: "20px", color: "#744f41" }}>To Expand Your Business</p>

          <form onSubmit={handleSignup}>
            {["storeName", "email", "phone", "licenseNo","password","confirmPassword"].map((field) => (
              <input
                key={field}
                name={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "10px",
                  border: "none",
                  borderBottom: "2px solid #d4a6a6",
                  background: "transparent",
                  outline: "none",
                }}
              />
            ))}

            <div
              style={{
                border: "1px dashed #d4a6a6",
                padding: "20px",
                textAlign: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ color: "#744f41", fontSize: "13px", marginBottom: "10px" }}>
                Drag your required documents here
              </p>
              <input
  type="file"
  name="file"
  onChange={handleChange}
  style={{ display: "none" }}
  id="fileUpload"
/>
<label htmlFor="fileUpload">
  <div
    style={{
      border: "1px solid #744f41",
      padding: "5px 10px",
      borderRadius: "4px",
      backgroundColor: "#f9f5f3",
      color: "#744f41",
      cursor: "pointer",
      display: "inline-block",
    }}
  >
    Browse Files
  </div>
</label>

              {fileName && (
                <p style={{ fontSize: "12px", color: "#744f41", marginTop: "10px" }}>
                  Selected file: {fileName}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "15px", fontSize: "12px", color: "#744f41" }}>
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                  aria-label="Agree to terms"
                />
                I agree to Vet Connect Terms of Service and acknowledge the Privacy Policy
              </label>
            </div>

            {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

            <button
              type="submit"
              style={{
                backgroundColor: "#f5b3ad",
                border: "none",
                padding: "10px",
                color: "#744f41",
                fontWeight: "bold",
                borderRadius: "6px",
                width: "100%",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "SIGN UP"}
            </button>

            <p style={{ fontSize: "12px", marginTop: "15px", textAlign: "center", color: "#744f41" }}>
              Already have an account?{" "}
              <span
                onClick={() => navigate("/auth/login")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Login
              </span>
            </p>
              <p style={{ fontSize: "12px", marginTop: "15px", textAlign: "center", color: "#744f41" }}>
           
              <span
                onClick={() => navigate("/auth/usersignup")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                 Sign in to purchase the best flowers?{" "}
              </span>
            </p>
          </form>
        </div>

        {/* Right Side - Logo */}
        <div
          style={{
            flex: 1,
            background: "#f3dedb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <img
            src={logo}
            alt="FloraMart Logo"
            style={{ width: "120px", marginBottom: "10px" }}
          />
          <h2 style={{ fontSize: "18px", color: "#744f41", fontWeight: "bold" }}>
            Welcome to FloraMart
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Signup;
