import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <DialogContent className="sm:max-w-[650px] p-6">
      <div className="grid gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <Label>{orderDetails?.id}</Label>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <Label>{orderDetails?.createdAt?.split("T")[0]}</Label>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <Label>Nu.{orderDetails?.total_amount}</Label>
            </div>
          
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <Label>{orderDetails?.paymentMethod || "N/A"}</Label>
            </div>

            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Status</span>
              <Badge
                className={`py-1 px-3 text-white ${
                  orderDetails?.payment_success ? "bg-green-500" : "bg-red-600"
                }`}
              >
                {orderDetails?.payment_success ? "Success" : "Failed"}
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Items List */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Ordered Items</h2>
          {orderDetails?.items?.length > 0 ? (
            <ul className="space-y-2">
              {orderDetails.items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center border rounded-md px-4 py-2"
                >
                  <span className="font-medium">{item.productName}</span>
                  <span className="text-sm">Qty: {item.quantity}</span>
                  <span className="text-sm text-muted-foreground">
                    ${item.price}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No items found.</p>
          )}
        </div>

        <Separator />

        {/* Shipping Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Customer Email:</span>{" "}
              {orderDetails?.customerEmail}
            </div>
            <div>
              <span className="font-medium text-foreground">Address:</span>{" "}
              {orderDetails?.address || "N/A"}
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
