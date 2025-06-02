import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const items = cartItems || [];

  // Group items by shopName
  const groupedItems = items.reduce((acc, item) => {
    const shop = item.flower.shopOwner.name || "Unknown Shop";
    if (!acc[shop]) acc[shop] = [];
    acc[shop].push(item);
    return acc;
  }, {});

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        {Object.entries(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([name, items]) => {
            const total = items.reduce(
              (sum, item) =>
                sum +
                (item.flower?.salePrice > 0 ? item.flower.salePrice : item.flower.price) *
                  item.quantity,
              0
            );

            return (
              <div key={name} className="border p-4 rounded-lg bg-[#FFF2F0] space-y-4">
                <h3 className="font-semibold text-lg text-[#81504D]">{name}</h3>

                <div className="space-y-3">
                  {items.map((item) => (
                    <UserCartItemsContent key={item.id} cartItem={item} />
                  ))}
                </div>

                <div className="flex justify-between font-semibold text-[#81504D]">
                  <span>Total</span>
                  <span>Nu.{total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={() => {
                    navigate("/shop/checkoutflow", { state: { items } });
                    setOpenCartSheet(false);
                  }}
                  className="w-full mt-2"
                >
                  Checkout from {name}
                </Button>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 text-gray-600">Your cart is empty.</p>
        )}
      </div>
    </SheetContent>
  );
}

export default UserCartWrapper;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Button } from "../ui/button";
// import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
// import UserCartItemsContent from "./cart-items-content";
// import { useSelector } from "react-redux";
// import flower1 from "../../assets/flower1.jpg";

// // Dummy cart items with shopName added
// const initialDummyCartItems = [
//   {
//     productId: 1,
//     name: "Product 1",
//     price: 20,
//     salePrice: 15,
//     quantity: 2,
//     imageUrl: flower1,
//     isDummy: true,
//     shopName: "Thimphu Flower Boutique",
//   },
//   {
//     productId: 2,
//     name: "Product 2",
//     price: 50,
//     salePrice: 45,
//     quantity: 1,
//     imageUrl: flower1,
//     isDummy: true,
//     shopName: "Bloom & Petals",
//   },
//   {
//     productId: 3,
//     name: "Product 3",
//     price: 40,
//     salePrice: 0,
//     quantity: 1,
//     imageUrl: flower1,
//     isDummy: true,
//     shopName: "Thimphu Flower Boutique",
//   },
// ];

// function UserCartWrapper({ setOpenCartSheet }) {
//   const navigate = useNavigate();
//   const { cartItems: reduxCartItems } = useSelector((state) => state.shopCart);
//   const [dummyCart, setDummyCart] = useState(initialDummyCartItems);

//   const finalCartItems = reduxCartItems?.length ? reduxCartItems : dummyCart;

//   // Update quantity or remove from dummy cart
//   function updateDummyCart(productId, action) {
//     setDummyCart((prevCart) => {
//       return prevCart
//         .map((item) => {
//           if (item.productId === productId) {
//             if (action === "plus") return { ...item, quantity: item.quantity + 1 };
//             if (action === "minus" && item.quantity > 1) return { ...item, quantity: item.quantity - 1 };
//           }
//           return item;
//         })
//         .filter((item) => !(action === "delete" && item.productId === productId));
//     });
//   }

//   // Group items by shop name
//   const groupedItems = finalCartItems.reduce((acc, item) => {
//     const shop = item.shopName || "Unknown Shop";
//     if (!acc[shop]) acc[shop] = [];
//     acc[shop].push(item);
//     return acc;
//   }, {});

//   return (
//     <SheetContent className="sm:max-w-md overflow-y-auto">
//       <SheetHeader>
//         <SheetTitle>Your Cart</SheetTitle>
//       </SheetHeader>

//       <div className="mt-6 space-y-6">
//         {Object.entries(groupedItems).map(([shopName, items]) => {
//           const total = items.reduce(
//             (sum, item) =>
//               sum + (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity,
//             0
//           );

//           return (
//             <div key={shopName} className="border p-4 rounded-lg bg-[#FFF2F0] space-y-4">
//               <h3 className="font-semibold text-lg text-[#81504D]">{shopName}</h3>

//               <div className="space-y-3">
//                 {items.map((item) => (
//                   <UserCartItemsContent
//                     key={item.productId}
//                     cartItem={item}
//                     updateDummyCart={updateDummyCart}
//                   />
//                 ))}
//               </div>

//               <div className="flex justify-between font-semibold text-[#81504D]">
//                 <span>Total</span>
//                 <span>Nu.{total.toFixed(2)}</span>
//               </div>

//               <Button
//                 onClick={() => {
//                   navigate("/shop/checkoutflow", { state: { items } });
//                   setOpenCartSheet(false);
//                 }}
//                 className="w-full mt-2"
//               >
//                 Checkout from {shopName}
//               </Button>
//             </div>
//           );
//         })}
//       </div>
//     </SheetContent>
//   );
// }

// export default UserCartWrapper;
