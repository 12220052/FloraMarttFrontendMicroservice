import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast, ToastContainer } from "react-toastify"; // Correct toast import
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import logo from "../../assets/logo.png";

// ==========================
// API SLICE - useLoginMutation
// ==========================
const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8765/USERMICROSERVICE/api/",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

const { useLoginMutation } = apiSlice;

// ==========================
// AUTH SLICE - setCredentials
// ==========================
const authSlice = createSlice({
  name: "auth",
  initialState: { userInfo: null },
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

const { setCredentials } = authSlice.actions;

// ==========================
// Redux Store
// ==========================
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// ==========================
// Login Component
// ==========================
const AuthLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));

      // Show success toast
      toast.success("Login successful!", {
         // Correct position usage
        autoClose: 3000,
      });
//  localStorage.setItem("AuthToken",token)
      // Redirect to /shop/home after 3 seconds
      setTimeout(() => {
        navigate("/shop/home");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError(err?.data?.message || "Login failed");
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
      <div
        style={{
          display: "flex",
          width: "800px",
          height: "400px",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "30px",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              fontSize: "22px",
              color: "#744f41",
              fontWeight: "bold",
            }}
          >
            LOG IN
          </h2>
          <form onSubmit={handleLogin} style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderBottom: `2px solid ${error ? "red" : "#d4a6a6"}`,
                outline: "none",
                background: "transparent",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                border: "none",
                borderBottom: `2px solid ${error ? "red" : "#d4a6a6"}`,
                outline: "none",
                background: "transparent",
                fontSize: "16px",
                marginBottom: "10px",
              }}
            />
            {error && (
              <p style={{ color: "red", fontSize: "12px" }}>{error}</p>
            )}
            <p
              style={{
                fontSize: "12px",
                color: "#744f41",
                marginTop: "10px",
                cursor: "pointer",
                marginLeft: "200px",
              }}
            >
              Forgot password?
            </p>
            <button
              type="submit"
              style={{
                marginTop: "20px",
                backgroundColor: "#d4a6a6",
                border: "none",
                padding: "10px 20px",
                color: "white",
                fontSize: "14px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Login
            </button>
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
          <h2
            style={{
              fontSize: "18px",
              color: "#744f41",
              fontWeight: "bold",
            }}
          >
            Welcome to FloraMart
          </h2>
        </div>
      </div>
    </div>
  );
};

const AppWithProvider = () => (
  <Provider store={store}>
    <AuthLogin />
    {/* Add ToastContainer to render the toast notifications */}
    <ToastContainer />
  </Provider>
);

export default AppWithProvider;
