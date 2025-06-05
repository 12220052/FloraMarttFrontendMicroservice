import { Route, Routes } from "react-router-dom";
// import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";

// import AdminLayout from "./components/admin-view/layout";

import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ProductDescription from "./pages/shopping-view/ProductDescription";
import ContactUs from "./pages/shopping-view/ContactUs";
import CheckoutFlow from "./pages/shopping-view/checkoutflow";
import Signup from "./pages/shopping-view/signup";
import UserSignup from "./pages/shopping-view/usersignup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import EnterOTP from "./pages/auth/EnterOTP";


// Admin
import Login from "@/components/Admin/js/Login.jsx";
import ResetPassword from "@/components/Admin/js/ResetPassword.jsx";
import AdminDashboard from "@/components/Admin/js/AdminDashboard.jsx";
import UserManagement from "@/components/Admin/js/UserManagement.jsx";
import VendorApplication from "@/components/Admin/js/VendorApplication.jsx";

// Vendor
import VendorDashboard from "@/components/Vendor/js/VendorDashboard.jsx";
import OrderPage from "@/components/Vendor/js/OrderPage.jsx";
import ProductPage from "@/components/Vendor/js/ProductPage.jsx";
import SettingsPage from "@/components/Vendor/js/Setting.jsx";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        
        <Route
          path="/auth"
          // element={
          //   <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          //     {/* <AuthLayout /> */}
          //   </CheckAuth>
          // }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="enter-otp" element={<EnterOTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="storesignup" element={<Signup />} />
          <Route path="usersignup" element={<UserSignup />} />
        

        </Route>
        <Route
          path="/admin"
          // element={
          //   <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          //     <AdminLayout />
          //   </CheckAuth>
          // }
        >
          <Route path="login" element={<Login />} />

          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="enter-otp" element={<EnterOTP />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
                <Route path="vendor-application" element={<VendorApplication />} />
        </Route>
            <Route
          path="/vendor"
          // element={
          //   <CheckAuth isAuthenticated={isAuthenticated} user={user}>
          //     <AdminLayout />
          //   </CheckAuth>
          // }
          >
          <Route path="vendor-application" element={<VendorApplication />} />
          <Route path="vendordashboard" element={<VendorDashboard />} />
          <Route path="order-page" element={<OrderPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="setting" element={<SettingsPage />} />
        </Route>
          
        <Route
          path="/shop"
          element={

              <ShoppingLayout />
       
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="Detail" element={<ProductDescription />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          <Route path="ProductDetailsDialog" element={<ProductDetailsDialog />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="checkoutflow" element={<CheckoutFlow />} />
          <Route path="signup" element={<Signup />} />

        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
// import { Route, Routes } from "react-router-dom";
// import AuthLogin from "./pages/auth/login";
// import AuthRegister from "./pages/auth/register";
// import AdminLayout from "./components/admin-view/layout";
// import AdminDashboard from "./pages/admin-view/dashboard";
// import AdminProducts from "./pages/admin-view/products";
// import AdminOrders from "./pages/admin-view/orders";
// import AdminFeatures from "./pages/admin-view/features";
// import ShoppingLayout from "./components/shopping-view/layout";
// import NotFound from "./pages/not-found";
// import ShoppingHome from "./pages/shopping-view/home";
// import ShoppingListing from "./pages/shopping-view/listing";
// import ShoppingCheckout from "./pages/shopping-view/checkout";
// import ShoppingAccount from "./pages/shopping-view/account";
// import CheckAuth from "./components/common/check-auth";
// import UnauthPage from "./pages/unauth-page";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { checkAuth } from "./store/auth-slice";
// import { Skeleton } from "@/components/ui/skeleton";
// import PaypalReturnPage from "./pages/shopping-view/paypal-return";
// import PaymentSuccessPage from "./pages/shopping-view/payment-success";
// import SearchProducts from "./pages/shopping-view/search";
// import ProductDetailsDialog from "@/components/shopping-view/product-details";
// import ProductDescription from "./pages/shopping-view/ProductDescription";
// import ContactUs from "./pages/shopping-view/ContactUs";
// import CheckoutFlow from "./pages/shopping-view/checkoutflow";
// import Signup from "./pages/shopping-view/signup";
// import UserSignup from "./pages/shopping-view/usersignup";
// import StripeCheckoutPage from "./pages/shopping-view/stripeCheckoutform"; // NEW

// function App() {
//   const { user, isAuthenticated, isLoading } = useSelector(
//     (state) => state.auth
//   );
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(checkAuth());
//   }, [dispatch]);

//   if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

//   return (
//     <div className="flex flex-col overflow-hidden bg-white">
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <CheckAuth
//               isAuthenticated={isAuthenticated}
//               user={user}
//             ></CheckAuth>
//           }
//         />

//         <Route path="/auth">
//           <Route path="login" element={<AuthLogin />} />
//           <Route path="storesignup" element={<Signup />} />
//           <Route path="usersignup" element={<UserSignup />} />
//         </Route>

//         <Route
//           path="/admin"
//           element={
//             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
//               <AdminLayout />
//             </CheckAuth>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="orders" element={<AdminOrders />} />
//           <Route path="features" element={<AdminFeatures />} />
//         </Route>

//         <Route path="/shop" element={<ShoppingLayout />}>
//           <Route path="home" element={<ShoppingHome />} />
//           <Route path="listing" element={<ShoppingListing />} />
//           <Route path="Detail" element={<ProductDescription />} />
//           <Route path="checkout" element={<ShoppingCheckout />} />
//           <Route path="account" element={<ShoppingAccount />} />
//           <Route path="paypal-return" element={<PaypalReturnPage />} />
//           <Route path="payment-success" element={<PaymentSuccessPage />} />
//           <Route path="search" element={<SearchProducts />} />
//           <Route path="ProductDetailsDialog" element={<ProductDetailsDialog />} />
//           <Route path="contactus" element={<ContactUs />} />
//           <Route path="checkoutflow" element={<CheckoutFlow />} />
//           <Route path="signup" element={<Signup />} />
//           <Route path="stripe-checkout" element={<StripeCheckoutPage />} /> {/* NEW */}
//         </Route>

//         <Route path="/unauth-page" element={<UnauthPage />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;
