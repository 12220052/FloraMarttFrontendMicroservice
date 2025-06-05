import { Minus, Plus, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect } from "react"; 

import { useDispatch, useSelector } from "react-redux";
 import { deleteCartItem, updateCartQuantity,fetchCartItems } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";
import { toast, ToastContainer } from "react-toastify"; // Correct toast import
import "react-toastify/dist/ReactToastify.css";
function UserCartItemsContent({ cartItem }) {
  const { user } = useSelector((state) => state.auth);
 const userId =localStorage.getItem("userId")
  const { cartItems } = useSelector((state) => state.shopCart);
  const { productList } = useSelector((state) => state.shopProducts);
  const dispatch = useDispatch();
  // const { toast } = useToast(); 

function handleUpdateQuantity(getCartItem, typeOfAction) {
  if (typeOfAction === "plus") {
    let getCartItems = Array.isArray(cartItems) ? cartItems : [];
    let products = Array.isArray(productList) ? productList : [];
console.log(productList)
    console.log("getCartItems", getCartItems);
    console.log("productList", products);

   if (getCartItems.length) {
  const indexOfCurrentCartItem = getCartItems.findIndex(
    (item) => item.flower_id === getCartItem?.flower.flower_id
  );

  const getCurrentProductIndex = products.findIndex(
    (product) => product.flower_id === getCartItem?.flower.flower_id
  );

  if (getCurrentProductIndex === -1) {
    console.warn("Product not found in productList");
    return;
  }

  const getTotalStock = products[getCurrentProductIndex].quantity;

  console.log(getCurrentProductIndex, getTotalStock, "getTotalStock");

  if (indexOfCurrentCartItem > -1) {
    const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
    if (getQuantity + 1 > getTotalStock) {
      toast({
        title: `Only ${getTotalStock} quantity can be added for this item`,
        variant: "destructive",
      });
      return;
    }
  }
}

  }

  dispatch(
    updateCartQuantity({
      userId: userId,
      flowerId:getCartItem.flower.flower_id,
      quantity:
        typeOfAction === "plus"
          ? getCartItem?.quantity + 1
          : getCartItem?.quantity - 1,
    })
  ).then((data) => {
    if (data?.payload){
        toast.success(
       "Cart item is updated successfully",
           {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
        );
         dispatch(fetchCartItems(userId));
      }
  });
}
useEffect(() => {
  console.log("Cart items after update:", cartItems);
}, [cartItems]);

  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId, flowerId: getCartItem.flower.flower_id })
    ).then((data) => {
      if (data?.payload){
        toast.success(
        "Cart item is deleted successfully",
         {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
        );
         dispatch(fetchCartItems(userId));
      }
      
    });
  }

 return (
  <div className="flex items-center space-x-4">
    <ToastContainer/>
    <img
      src={cartItem?.flower?.image}
      alt={cartItem?.flower?.name}
      className="w-20 h-20 rounded object-cover"
    />
    <div className="flex-1">
      <h3 className="font-extrabold">{cartItem?.flower?.name}</h3>
      <div className="flex items-center gap-2 mt-1">
        <Button
          variant="outline"
          className="h-8 w-8 rounded-full"
          size="icon"
          disabled={cartItem?.quantity === 1}
          onClick={() => handleUpdateQuantity(cartItem, "minus")}
        >
          <Minus className="w-4 h-4" />
          <span className="sr-only">Decrease</span>
        </Button>
        <span className="font-semibold">{cartItem?.quantity}</span>
        <Button
          variant="outline"
          className="h-8 w-8 rounded-full"
          size="icon"
          onClick={() => handleUpdateQuantity(cartItem, "plus")}
        >
          <Plus className="w-4 h-4" />
          <span className="sr-only">Increase</span>
        </Button>
      </div>
    </div>
    <div className="flex flex-col items-end">
      <p className="font-semibold">
        Nu.
        {(
          (cartItem?.flower?.salePrice > 0 ? cartItem.flower.salePrice : cartItem.flower.price) *
          cartItem.quantity
        ).toFixed(2)}
      </p>
      <Trash
        onClick={() => handleCartItemDelete(cartItem)}
        className="cursor-pointer mt-1"
        size={20}
      />
    </div>
  </div>
);

}

export default UserCartItemsContent;

// import { useState } from "react";
// import { Minus, Plus, Trash } from "lucide-react";
// import { Button } from "../ui/button";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteCartItem, updateCartQuantity } from "@/store/shop/cart-slice";
// import { useToast } from "../ui/use-toast";

// function UserCartItemsContent({ cartItem, updateDummyCart }) {
//   const { user } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   function handleUpdateQuantity(getCartItem, typeOfAction) {
//     if (cartItem.isDummy) {
//       // Handle local dummy cart updates
//       updateDummyCart(getCartItem.productId, typeOfAction);
//     } else {
//       // Normal Redux update
//       dispatch(
//         updateCartQuantity({
//           userId: user?.id,
//           productId: getCartItem?.productId,
//           quantity:
//             typeOfAction === "plus"
//               ? getCartItem?.quantity + 1
//               : getCartItem?.quantity - 1,
//         })
//       ).then((data) => {
//         if (data?.payload?.success) {
//           toast({
//             title: "Cart item is updated successfully",
//           });
//         }
//       });
//     }
//   }

//   function handleCartItemDelete(getCartItem) {
//     if (cartItem.isDummy) {
//       // Remove locally for dummy items
//       updateDummyCart(getCartItem.productId, "delete");
//     } else {
//       dispatch(
//         deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
//       ).then((data) => {
//         if (data?.payload?.success) {
//           toast({
//             title: "Cart item is deleted successfully",
//           });
//         }
//       });
//     }
//   }

//   return (
//     <div className="flex items-center space-x-4">
//       <img
//         src={cartItem?.imageUrl}
//         alt={cartItem?.name}
//         className="w-20 h-20 rounded object-cover"
//       />
//       <div className="flex-1">
//         <h3 className="font-extrabold">{cartItem?.name}</h3>
//         <div className="flex items-center gap-2 mt-1">
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             disabled={cartItem?.quantity === 1}
//             onClick={() => handleUpdateQuantity(cartItem, "minus")}
//           >
//             <Minus className="w-4 h-4" />
//             <span className="sr-only">Decrease</span>
//           </Button>
//           <span className="font-semibold">{cartItem?.quantity}</span>
//           <Button
//             variant="outline"
//             className="h-8 w-8 rounded-full"
//             size="icon"
//             onClick={() => handleUpdateQuantity(cartItem, "plus")}
//           >
//             <Plus className="w-4 h-4" />
//             <span className="sr-only">Increase</span>
//           </Button>
//         </div>
//       </div>
//       <div className="flex flex-col items-end">
//         <p className="font-semibold">
//           Nu.
//           {(
//             (cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem?.price) *
//             cartItem?.quantity
//           ).toFixed(2)}
//         </p>
//         <Trash
//           onClick={() => handleCartItemDelete(cartItem)}
//           className="cursor-pointer mt-1"
//           size={20}
//         />
//       </div>
//     </div>
//   );
// }

// export default UserCartItemsContent;

