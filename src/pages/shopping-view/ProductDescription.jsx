import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/components/ui/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";  // Import Redux hooks
import { fetchCartItems,addToCart } from "@/store/shop/cart-slice"; // Assuming you want to update cart
import { useToast } from "./../../components/ui/use-toast";

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const { toast } = useToast();
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Invalid JWT token", e);
    return null;
  }
}

// Example usage:
let userId = null; // Declare in outer scope

const storedUserInfo = localStorage.getItem("userInfo");
if (storedUserInfo) {
  const userInfo = JSON.parse(storedUserInfo);
  const jwt = userInfo.jwt;

  const decoded = parseJwt(jwt);
  console.log("Decoded JWT payload:", decoded);

  userId = decoded?.userId ?? null;
  console.log("UserId from JWT:", userId);
}

// Now you can use userId here
console.log("UserId outside block:", userId);
localStorage.setItem("userId",userId)
// Example usage
if (userId) {
  // make API calls or conditionally show content
  console.log("Logged in user ID is:", userId);
}

  // console.log("UserId from JWT:", userId);
 // Get user from redux

  const product = location.state?.product;
  console.log(product)
  const [toastData, setToastData] = useState({ open: false, message: "", type: "success" });

  if (!product) {
    return <div className="text-center text-red-500 mt-10">No product data found.</div>;
  }

  const handleAddToCart = async () => {
    if (!storedUserInfo) {
      setToastData({ open: true, message: "Please login first to add items to cart", type: "error" });
      return;
    }
     console.log("caaling add to cart");
     dispatch(
       addToCart({
         userId: userId,
         flowerId:product._id,
         quantity:1
       })
     ).then((data) => {
       if (data?.payload){
           toast({
             title: "Cart item is added successfully",
           });
            dispatch(fetchCartItems(userId));
         }
     })

  };

  return (
    <div className="min-h-screen bg-white text-[#81504D]">
      {/* Back button */}
      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#81504D] hover:text-[#6D413E] bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>

      {/* Title */}
      <div className="text-center pt-12">
        <h1 className="text-2xl font-bold">Product Detail</h1>
      </div>

      {/* Image */}
      <div className="flex justify-center my-6">
        <img
          src={product.image}
          alt="flower"
          className="w-[300px] h-[300px] object-contain"
        />
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center mb-4 space-x-2">
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
        <span className="w-2 h-2 rounded-full bg-gray-400"></span>
        <span className="w-2 h-2 rounded-full bg-gray-300"></span>
      </div>

      {/* Product Info */}
      <div className="px-6 sm:px-12 md:px-32 text-sm md:text-base">
        <div className="flex justify-between items-center mb-1">
          <p className="font-semibold">{product.title}</p>
          <p className="text-sm text-[#81504D]">
            Quantity Available: <span className="font-medium">{product.totalStock}</span>
          </p>
        </div>
        <p className="text-sm text-gray-500 mb-4">{product.subtitle}</p>

        {/* Description */}
        <div className="mb-4">
          <h2 className="font-semibold mb-1">Flower Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>

        {/* Price */}
        <div className="flex justify-end mb-6">
          <p>Nu. {product.price}</p>
        </div>

        {/* Add to Cart */}
        <ToastProvider>
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#f4ada5] hover:bg-[#e68d8d] text-white font-semibold py-3 rounded-full text-center mb-6"
          >
            ADD TO CART
          </button>

          {toastData.open && (
            <Toast variant={toastData.type === "error" ? "destructive" : "default"}>
              <ToastTitle>{toastData.type === "error" ? "Error" : "Success"}</ToastTitle>
              <ToastDescription>{toastData.message}</ToastDescription>
            </Toast>
          )}

          <ToastViewport />
        </ToastProvider>
      </div>
    </div>
  );
};

export default ProductDescription;
