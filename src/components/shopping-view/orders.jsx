// import { useEffect, useState } from "react";
// import { Button } from "../ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Dialog } from "../ui/dialog";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import ShoppingOrderDetailsView from "./order-details";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getAllOrdersByUserId,
//   getOrderDetails,
//   resetOrderDetails,
// } from "@/store/shop/order-slice";
// import { Badge } from "../ui/badge";

// function ShoppingOrders() {
//   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

//   function handleFetchOrderDetails(getId) {
//     dispatch(getOrderDetails(getId));
//   }

//   useEffect(() => {
//     dispatch(getAllOrdersByUserId(user?.id));
//   }, [dispatch]);

//   useEffect(() => {
//     if (orderDetails !== null) setOpenDetailsDialog(true);
//   }, [orderDetails]);

//   console.log(orderDetails, "orderDetails");

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Purchase History</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Order Date</TableHead>
//               <TableHead>Order Status</TableHead>
//               <TableHead>Order Price</TableHead>
//               <TableHead>
//                 <span className="sr-only">Details</span>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orderList && orderList.length > 0
//               ? orderList.map((orderItem) => (
//                   <TableRow>
//                     <TableCell>{orderItem?._id}</TableCell>
//                     <TableCell>{orderItem?.orderDate.split("T")[0]}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={`py-1 px-3 ${
//                           orderItem?.orderStatus === "confirmed"
//                             ? "bg-green-500"
//                             : orderItem?.orderStatus === "rejected"
//                             ? "bg-red-600"
//                             : "bg-black"
//                         }`}
//                       >
//                         {orderItem?.orderStatus}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>${orderItem?.totalAmount}</TableCell>
//                     <TableCell>
//                       <Dialog
//                         open={openDetailsDialog}
//                         onOpenChange={() => {
//                           setOpenDetailsDialog(false);
//                           dispatch(resetOrderDetails());
//                         }}
//                       >
//                         <Button
//                           onClick={() =>
//                             handleFetchOrderDetails(orderItem?._id)
//                           }
//                         >
//                           View Details
//                         </Button>
//                         <ShoppingOrderDetailsView orderDetails={orderDetails} />
//                       </Dialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               : null}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

// export default ShoppingOrders;

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import ShoppingOrderDetailsView from "./order-details";
import { Badge } from "../ui/badge";

function ShoppingOrders() {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // ✅ selected order state

  const userInfoString = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(userInfoString);
  const customerEmail = userInfo?.user?.username;

  useEffect(() => {
    if (!customerEmail) return;

    setLoading(true);
    fetch(
      `http://localhost:8765/ORDERMICROSERVICE/api/orders/by-customer?email=${encodeURIComponent(
        customerEmail
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [customerEmail]);
// console.log(orders)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <div>Loading...</div>}
        {!loading && orders.length === 0 && <div>No orders found.</div>}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Delivery Option</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.createdAt.split("T")[0]}</TableCell>
                <TableCell>
                  <Badge
                    className={`py-1 px-3 ${
                      order.payment_success ? "bg-green-500" : "bg-red-600"
                    }`}
                  >
                    {order.payment_success ? "Confirmed" : "Failed"}
                  </Badge>
                </TableCell>
                <TableCell>{order.deliveryOption}</TableCell>
                <TableCell>${order.total_amount}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSelectedOrder(order);
                      setOpenDetailsDialog(true);
                    }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Dialog outside loop */}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            setOpenDetailsDialog(open);
            if (!open) setSelectedOrder(null); // clear selection when dialog closes
          }}
        >
          <DialogContent>
            {selectedOrder && (
              <ShoppingOrderDetailsView orderDetails={selectedOrder} />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ShoppingOrders;
