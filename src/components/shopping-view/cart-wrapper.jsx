import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";
import { useDispatch } from "react-redux";
import { removeItemsByShop } from "@/store/shop/cart-slice";
import axios from "axios";

function UserCartWrapper({ cartItems, setCartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  const items = cartItems || [];

  // Group items by shopId, keep shopName for display
  const groupedItems = items.reduce((acc, item) => {
    const shopId = item.flower.shopOwner.id;
    const shopName = item.flower.shopOwner.name || "Unknown Shop";

    if (!acc[shopId]) {
      acc[shopId] = { shopName, items: [] };
    }
    acc[shopId].items.push(item);
    return acc;
  }, {});

  const dispatch = useDispatch();

  const handleCheckout = async (shopId, items) => {
    try {
      const userId = localStorage.getItem("userId"); // fixed key as string

      // Call backend API to remove items from this shop's cart
      await axios.delete(`http://localhost:8765/USERMICROSERVICE/cart/removeByShop`, {
        params: { userId, shopId },
      });

      // Optionally update Redux state to remove these items
      dispatch(removeItemsByShop(shopId));

      // Navigate to checkout page with items
      navigate("/shop/checkoutflow", { state: { items } });

      setOpenCartSheet(false);
    } catch (error) {
      console.error("Failed to remove items by shop", error);
      alert("Failed to proceed to checkout. Please try again.");
    }
  };

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        {Object.entries(groupedItems).length > 0 ? (
          Object.entries(groupedItems).map(([shopId, { shopName, items: shopItems }]) => {
            const total = shopItems.reduce(
              (sum, item) =>
                sum +
                (item.flower?.salePrice > 0 ? item.flower.salePrice : item.flower.price) *
                  item.quantity,
              0
            );

            return (
              <div key={shopId} className="border p-4 rounded-lg bg-[#FFF2F0] space-y-4">
                <h3 className="font-semibold text-lg text-[#81504D]">{shopName}</h3>

                <div className="space-y-3">
                  {shopItems.map((item) => (
                    <UserCartItemsContent key={item.id} cartItem={item} />
                  ))}
                </div>

                <div className="flex justify-between font-semibold text-[#81504D]">
                  <span>Total</span>
                  <span>Nu.{total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={() => handleCheckout(shopId, shopItems)} // pass correct params here
                  className="w-full mt-2"
                >
                  Checkout from {shopName}
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
