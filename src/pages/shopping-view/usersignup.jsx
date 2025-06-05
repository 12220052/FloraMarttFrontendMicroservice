import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    file: null,
    Phone:"",
    confirmPassword: "",
    agree: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // const handleSignup = (e) => {
  //   e.preventDefault();
  //   const { Name, email, Phone, password, agree } = formData;

  //   if (!Name || !email || !Phone || !password || !agree) {
  //     setError("Please fill all fields and agree to terms");
  //     return;
  //   }

  //   // Simulate signup
  //   console.log("Signed up with:", formData);
  //   navigate("/auth/login");

  // };
  const handleSignup = async (e) => {
    e.preventDefault();
    const { Name, email, Phone, password, confirmPassword, agree } = formData;
  
    // if (!Name || !email || !Phone || !password || !confirmPassword || !agree) {
    //   setError("Please fill all fields and agree to terms");
    //   return;
    // }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const form = new FormData();
      form.append("Name", Name);
      if (Phone.trim() !== "") {
        form.append("Phone", Phone);
      } else {
        setError("Phone number is required");
        return;
      }
      
      form.append("email", email);
      form.append("password", password);
      form.append("License_No", ""); // optional or fill as needed
      form.append("roles", JSON.stringify([{ id: 3, name: "client" }])); // example role
      form.append("photo", new File([""], "default.jpg", { type: "image/jpeg" }));
  
      const response = await fetch("http://localhost:8765/USERMICROSERVICE/api/users", {
        method: "POST",
        body: form,
      });
  
   if (response.ok) {
  const result = await response.json();
  console.log("User created:", result);

  toast.success("Signup successful! You can now log in.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
setTimeout(() => {
  navigate("/auth/login");
}, 3000)
} else {
  const errorData = await response.json();
  setError(errorData.message || "Signup failed");

  toast.error(errorData.message || "Signup failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
}

} catch (err) {
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
          height: "600px",
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
          <h2 style={{ fontSize: "22px", color: "#744f41", fontWeight: "bold", marginBottom: "5px", marginTop:"5px" }}>
            SIGN UP
          </h2>
          <p style={{ marginBottom: "20px", color: "#744f41" }}>To Purchase the Best Flowers</p>

          <form onSubmit={handleSignup}>
            {["Name", "email", "Phone", "password", "confirmPassword"].map((field) => (
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

          

            <div style={{ marginBottom: "15px", fontSize: "12px", color: "#744f41" }}>
              <label>
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
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
            >
              SIGN UP
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
                onClick={() => navigate("/auth/storesignup")}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                 Sign in to expand your flower business?{" "}
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

export default UserSignup;
