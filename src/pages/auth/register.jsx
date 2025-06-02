import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Correct toast import
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((result) => {
      // Debug log for result
      console.log(result);

      // Check if registration was successful
      if (result?.payload?.success) {
        // Show success toast before navigating
        toast.success("Registration successful!", {
          position: toast.POSITION.TOP_RIGHT, // Correct position usage
          autoClose: 3000, // Toast auto-close time
        });

        // Navigate to login page after showing toast
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      } else {
        // Show error toast
        toast.error(result?.payload?.message || "Registration Failed!", {
          position: toast.POSITION.TOP_RIGHT, // Correct position usage
          autoClose: 3000, // Toast auto-close time
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#81504D" }}>
          SIGN UP
        </h1>
        <p style={{ color: "#81504D" }}>To Purchase the Best Flowers</p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonStyle={{ backgroundColor: "#F5B3AD", color: "#81504D" }}
      />
      <p className="mt-2" style={{ color: "#81504D" }}>
        Already have an account?
        <Link className="font-medium ml-2 hover:underline" to="/auth/login" style={{ color: "#81504D" }}>
          Login
        </Link>
      </p>

      {/* Add ToastContainer to render the toast notifications */}
      <ToastContainer />
    </div>
  );
}

const AppWithProvider = () => (
  <Provider store={store}>
    <AuthRegister />
    <ToastContainer /> {/* Ensure ToastContainer is inside your component tree */}
  </Provider>
);

export default AppWithProvider;
