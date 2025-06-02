// import React, { useEffect, useRef, useState } from 'react';

// const useGoogleMaps = () => {
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (window.google && window.google.maps) {
//         setLoaded(true);
//         clearInterval(interval);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, []);

//   return loaded;
// };

// const CheckoutFlow = () => {
//   const mapsLoaded = useGoogleMaps(); // ✅ Ensure Google Maps is ready
//   const [step, setStep] = useState(1);
//   const [deliveryOption, setDeliveryOption] = useState('pickup');
//   const [address, setAddress] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const infoWindowRef = useRef(null);

//   const goToStep = (newStep) => {
//     if (newStep <= step) {
//       setStep(newStep);
//     }
//   };

//   const nextStep = () => setStep((prev) => prev + 1);

//   useEffect(() => {
//     if (
//       mapsLoaded &&
//       deliveryOption === 'delivery' &&
//       mapRef.current &&
//       !mapInstanceRef.current
//     ) {
//       mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//         center: { lat: 27.4712, lng: 89.6339 },
//         zoom: 14,
//       });
//       infoWindowRef.current = new window.google.maps.InfoWindow();
//     }
//   }, [deliveryOption, mapsLoaded]);

//   const handleGeolocation = () => {
//     if (navigator.geolocation && mapInstanceRef.current) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           };

//           infoWindowRef.current.setPosition(pos);
//           infoWindowRef.current.setContent("Location found.");
//           infoWindowRef.current.open(mapInstanceRef.current);
//           mapInstanceRef.current.setCenter(pos);

//           // Convert to address using Geocoder (optional)
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ location: pos }, (results, status) => {
//             if (status === "OK" && results[0]) {
//               setAddress(results[0].formatted_address);
//             } else {
//               setAddress(`Lat: ${pos.lat}, Lng: ${pos.lng}`);
//             }
//           });
//         },
//         () => {
//           alert("Geolocation failed.");
//         }
//       );
//     } else {
//       alert("Geolocation not supported by your browser.");
//     }
//   };

//   const StepIndicator = () => (
//     <div className="flex justify-center items-center gap-20 mb-10 text-[#81504D] text-base">
//       {['Delivery', 'Payment', 'Confirm'].map((label, index) => {
//         const stepNumber = index + 1;
//         const isActive = step === stepNumber;
//         const isClickable = step >= stepNumber;
//         return (
//           <div
//             key={label}
//             onClick={() => isClickable && goToStep(stepNumber)}
//             className={`flex flex-col items-center cursor-pointer transition-transform ${
//               isClickable ? 'hover:scale-105' : 'cursor-default'
//             }`}
//           >
//             <div
//               className={`w-5 h-5 rounded-full mb-2 ${
//                 isActive ? 'bg-[#F5B3AD]' : 'bg-gray-300'
//               }`}
//             />
//             <span className={`${isActive ? 'font-semibold text-md' : 'text-sm'}`}>
//               {label}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );

//   const DeliveryStep = () => (
//     <div className="flex flex-col items-center w-full max-w-2xl">
//       <h2 className="text-3xl font-semibold mb-6 text-[#81504D]">Set Address</h2>
//       <StepIndicator />
//       <div className="bg-[#FFF2F0] p-8 rounded-xl w-full space-y-6 text-lg">
//         <label className="block">
//           <input
//             type="radio"
//             value="pickup"
//             checked={deliveryOption === 'pickup'}
//             onChange={() => setDeliveryOption('pickup')}
//             className="mr-3"
//           />
//           <strong>Pick up at store</strong>
//           <p className="text-sm text-gray-600 ml-7">
//             No need to stay at home to get the product.
//           </p>
//         </label>
//         <label className="block">
//           <input
//             type="radio"
//             value="delivery"
//             checked={deliveryOption === 'delivery'}
//             onChange={() => setDeliveryOption('delivery')}
//             className="mr-3"
//           />
//           <strong>Home delivery</strong>
//           <p className="text-sm text-gray-600 ml-7">
//             Product will be delivered to your home.
//           </p>
//         </label>

//         {deliveryOption === 'delivery' && (
//           <div className="pt-4 space-y-4">
//             <div
//               ref={mapRef}
//               className="h-48 w-full rounded-lg border border-gray-300"
//             />
//             <button
//               type="button"
//               onClick={handleGeolocation}
//               className="px-4 py-2 bg-[#F5B3AD] text-[#81504D] rounded hover:bg-[#f7c2bd]"
//             >
//               Use My Current Location
//             </button>
//             <input
//               type="text"
//               placeholder="Enter address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
//             />
//           </div>
//         )}
//       </div>
//       <button
//         onClick={nextStep}
//         className="mt-8 px-12 py-3 rounded bg-[#F5B3AD] hover:bg-[#f7c2bd] text-[#81504D] text-lg"
//       >
//         Continue to Payment
//       </button>
//     </div>
//   );

// const PaymentStep = () => {
//   const deliveryFee = deliveryOption === 'pickup' ? 0 : 50;
//   const subtotal = 1000;
//   const total = subtotal + deliveryFee;

//   return (
//     <div className="flex flex-col items-center w-full max-w-2xl">
//       <h2 className="text-2xl font-semibold mb-6 text-[#81504D]">Set Payment</h2>
//       <StepIndicator />
//       <div className="bg-[#FFF2F0] p-6 rounded-lg w-full space-y-4">
//         {[
//           { method: 'Credit/Debit card', icon: '💳' },
//           { method: 'Cash', icon: '💵' },
//           { method: 'Paypal', icon: '🅿️' },
//         ].map(({ method, icon }) => (
//           <label
//             key={method}
//             className="flex items-center justify-between px-4 py-3 bg-[#fdf6f5] rounded-md border border-[#f5b3ad] cursor-pointer hover:shadow-sm"
//           >
//             <div className="flex items-center space-x-2">
//               <input
//                 type="radio"
//                 value={method}
//                 checked={paymentMethod === method}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="accent-[#f5b3ad]"
//               />
//               <span className="text-[#81504D] font-medium">{method}</span>
//             </div>
//             <span className="text-xl">{icon}</span>
//           </label>
//         ))}

//         {paymentMethod === 'Credit/Debit card' && (
//           <StripeCheckoutForm
//             payload={{ amount: total, address, deliveryOption }}
//             onSuccess={nextStep}
//           />
//         )}
//       </div>

//       {paymentMethod !== 'Credit/Debit card' && (
//         <button
//           onClick={nextStep}
//           className="mt-6 px-10 py-2 rounded bg-[#F5B3AD] hover:bg-[#f7c2bd] text-[#81504D] text-lg"
//         >
//           Confirm
//         </button>
//       )}
//     </div>
//   );
// };
// const ConfirmationStep = () => {
//   const deliveryFee = deliveryOption === 'pickup' ? 0 : 50;
//   const subtotal = 1000;
//   const total = subtotal + deliveryFee;

//   return (
//     <div className="flex flex-col items-center w-full max-w-2xl">
//       <h2 className="text-2xl font-semibold mb-6 text-[#81504D]">Confirm Order</h2>
//       <StepIndicator />
//       <div className="bg-[#FFF2F0] p-6 rounded-lg w-full space-y-6">
//         <div>
//           <h3 className="text-lg font-semibold text-[#81504D] mb-1">Delivery detail</h3>
//           {deliveryOption === 'pickup' ? (
//             <>
//               <p className="font-semibold text-[#81504D]">Pick up Store</p>
//               <p className="text-sm text-gray-600">Lower Motithang, Thimphu</p>
//               <p className="text-sm text-gray-600">Street 43, Near Store45</p>
//             </>
//           ) : (
//             <>
//               <p className="font-semibold text-[#81504D]">Home Delivery</p>
//               <p className="text-sm text-gray-600">{address}</p>
//             </>
//           )}
//         </div>
//         {/* Order Summary */}
//         <div>
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Order summary</h3>
//           {[{ name: 'Tulip', price: 150, img: '/tulip.png' },
//             { name: 'Daffodil', price: 250, img: '/daffodil.png' },
//             { name: 'White roses', price: 300, img: '/roses.png' },
//             { name: 'Red lily', price: 100, img: '/lily.png' },
//           ].map((item, i) => (
//             <div key={i} className="flex items-center justify-between py-2 border-b">
//               <div className="flex items-center space-x-4">
//                 <img src={item.img} alt={item.name} className="w-10 h-10 object-cover rounded" />
//                 <p className="text-[#81504D] font-medium">{item.name}</p>
//               </div>
//               <p className="text-[#81504D]">Nu.{item.price}</p>
//             </div>
//           ))}
//         </div>
//         <div className="border-t pt-4 space-y-1">
//           <div className="flex justify-between text-[#81504D] font-semibold text-lg">
//             <span>Total Price</span>
//             <span>Nu. {total}</span>
//           </div>
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Subtotal</span>
//             <span>Nu.{subtotal}</span>
//           </div>
//           <div className="flex justify-between text-sm text-gray-600">
//             <span>Delivery fee</span>
//             <span>{deliveryFee === 0 ? '0' : `Nu.${deliveryFee}`}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


//   return (
//     <div className="min-h-screen flex justify-center bg-white p-8">
//       {step === 1 && <DeliveryStep />}
//       {step === 2 && <PaymentStep />}
//       {step === 3 && <ConfirmationStep />}
//     </div>
//   );
// };

// export default CheckoutFlow;
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from "./stripeCheckoutform";
import StripeWrapper from "./stripeWrapper";


const useGoogleMaps = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.maps) {
        setLoaded(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return loaded;
};

const CheckoutFlow = () => {
  const location = useLocation();
  const cartItems = location.state?.items || [];
  
  const shopId = cartItems.length > 0 ? cartItems[0].flower.shopOwner.id : null;
console.log(shopId)
const userInfoString = localStorage.getItem("userInfo");
const userInfo = JSON.parse(userInfoString); // Convert string to object

console.log(userInfo);
const customerEmail = userInfo.user.username;
console.log(customerEmail)
  const mapsLoaded = useGoogleMaps(); // Ensure Google Maps is ready
  const [step, setStep] = useState(1);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const infoWindowRef = useRef(null);

  // Calculate subtotal dynamically from cart items
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.flower.salePrice > 0 ? item.flower.salePrice : item.flower.price;
    return sum + price * item.quantity;
  }, 0);

  const deliveryFee = deliveryOption === 'pickup' ? 0 : 50;
  const total = subtotal + deliveryFee;

  const goToStep = (newStep) => {
    if (newStep <= step) {
      setStep(newStep);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);

  useEffect(() => {
    if (
      mapsLoaded &&
      deliveryOption === 'delivery' &&
      mapRef.current &&
      !mapInstanceRef.current
    ) {
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 27.4712, lng: 89.6339 },
        zoom: 14,
      });
      infoWindowRef.current = new window.google.maps.InfoWindow();
    }
  }, [deliveryOption, mapsLoaded]);

  // const handleGeolocation = () => {
  //   if (navigator.geolocation && mapInstanceRef.current) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const pos = {
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         };

  //         infoWindowRef.current.setPosition(pos);
  //         infoWindowRef.current.setContent("Location found.");
  //         infoWindowRef.current.open(mapInstanceRef.current);
  //         mapInstanceRef.current.setCenter(pos);

  //         // Convert to address using Geocoder (optional)
  //         const geocoder = new window.google.maps.Geocoder();
  //         geocoder.geocode({ location: pos }, (results, status) => {
  //           if (status === "OK" && results[0]) {
  //             setAddress(results[0].formatted_address);
  //           } else {
  //             setAddress(`Lat: ${pos.lat}, Lng: ${pos.lng}`);
  //           }
  //         });
  //       },
  //       () => {
  //         alert("Geolocation failed.");
  //       }
  //     );
  //   } else {
  //     alert("Geolocation not supported by your browser.");
  //   }
  // };
  const handleGeolocation = () => {
  if (navigator.geolocation && mapInstanceRef.current) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        infoWindowRef.current.setPosition(pos);
        infoWindowRef.current.setContent("Location found.");
        infoWindowRef.current.open(mapInstanceRef.current);
        mapInstanceRef.current.setCenter(pos);

        // Always use GCIT for current location
        setAddress("GCIT, Kabesa, Thimphu");

        // Optional: try reverse geocoding anyway (for fallback or debugging)
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: pos }, (results, status) => {
          if (status === "OK" && results[0]) {
            // Uncomment if you want to show real geocoded address instead of GCIT
            // setAddress(results[0].formatted_address);
          } else {
            // Handle fallback for raw lat/lng ranges
            const fallbackAddress = getLocationNameFromCoordinates(pos.lat, pos.lng);
            setAddress(fallbackAddress);
          }
        });
      },
      () => {
        alert("Geolocation failed.");
      }
    );
  } else {
    alert("Geolocation not supported by your browser.");
  }
};

// Function to map coordinates to known location names
const getLocationNameFromCoordinates = (lat, lng) => {
  if (lat >= 27.47 && lat <= 27.48 && lng >= 89.63 && lng <= 89.64) {
    return "Motithang, Thimphu";
  }  else {
 
    return "GCIT, Kabesa, Thimphu";
  
  }
};

  const StepIndicator = () => (
    <div className="flex justify-center items-center gap-20 mb-10 text-[#81504D] text-base">
      {['Delivery', 'Payment', 'Confirm'].map((label, index) => {
        const stepNumber = index + 1;
        const isActive = step === stepNumber;
        const isClickable = step >= stepNumber;
        return (
          <div
            key={label}
            onClick={() => isClickable && goToStep(stepNumber)}
            className={`flex flex-col items-center cursor-pointer transition-transform ${
              isClickable ? 'hover:scale-105' : 'cursor-default'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full mb-2 ${
                isActive ? 'bg-[#F5B3AD]' : 'bg-gray-300'
              }`}
            />
            <span className={`${isActive ? 'font-semibold text-md' : 'text-sm'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );

  const DeliveryStep = () => (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-[#81504D]">Set Address</h2>
      <StepIndicator />
      <div className="bg-[#FFF2F0] p-8 rounded-xl w-full space-y-6 text-lg">
        <label className="block">
          <input
            type="radio"
            value="pickup"
            checked={deliveryOption === 'pickup'}
            onChange={() => setDeliveryOption('pickup')}
            className="mr-3"
          />
          <strong>Pick up at store</strong>
          <p className="text-sm text-gray-600 ml-7">
            No need to stay at home to get the product.
          </p>
        </label>
        <label className="block">
          <input
            type="radio"
            value="delivery"
            checked={deliveryOption === 'delivery'}
            onChange={() => setDeliveryOption('delivery')}
            className="mr-3"
          />
          <strong>Home delivery</strong>
          <p className="text-sm text-gray-600 ml-7">
            Product will be delivered to your home.
          </p>
        </label>

        {deliveryOption === 'delivery' && (
          <div className="pt-4 space-y-4">
            <div
              ref={mapRef}
              className="h-48 w-full rounded-lg border border-gray-300"
            />
            <button
              type="button"
              onClick={handleGeolocation}
              className="px-4 py-2 bg-[#F5B3AD] text-[#81504D] rounded hover:bg-[#f7c2bd]"
            >
              Use My Current Location
            </button>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none"
            />
          </div>
        )}
      </div>
      <button
        onClick={nextStep}
        className="mt-8 px-12 py-3 rounded bg-[#F5B3AD] hover:bg-[#f7c2bd] text-[#81504D] text-lg"
      >
        Continue to Payment
      </button>
    </div>
  );

  // Placeholder StripeCheckoutForm for demonstration
  // Replace this with your actual Stripe form component
  // const StripeCheckoutForm = ({ payload, onSuccess }) => {
  //   const handleSubmit = () => {
  //     // Implement Stripe payment processing here
  //     console.log("Stripe payment payload:", payload);
  //     // Simulate success:
  //     setTimeout(onSuccess, 1000);
  //   };

  //   return (
  //     <div>
  //       <button
  //         onClick={handleSubmit}
  //         className="mt-4 px-6 py-2 bg-[#F5B3AD] text-[#81504D] rounded hover:bg-[#f7c2bd]"
  //       >
  //         Pay Nu. {payload.amount.toFixed(2)} with Stripe
  //       </button>
  //     </div>
  //   );
  // };

  const PaymentStep = () => (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-2xl font-semibold mb-6 text-[#81504D]">Set Payment</h2>
      <StepIndicator />
      <div className="bg-[#FFF2F0] p-6 rounded-lg w-full space-y-4">
        {[
          { method: 'Credit/Debit card', icon: '💳' },
          { method: 'Cash', icon: '💵' },
          { method: 'Stripe', icon: '🅿️' },
        ].map(({ method, icon }) => (
          <label
            key={method}
            className="flex items-center justify-between px-4 py-3 bg-[#fdf6f5] rounded-md border border-[#f5b3ad] cursor-pointer hover:shadow-sm"
          >
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-[#f5b3ad]"
              />
              <span className="text-[#81504D] font-medium">{method}</span>
            </div>
            <span className="text-xl">{icon}</span>
          </label>
        ))}

        {paymentMethod === 'Stripe' && (
         
  //           <StripeWrapper>
  //   <CheckoutForm amount={total} address={address} onSuccess={nextStep} />
  // </StripeWrapper>
  <StripeWrapper>
  <CheckoutForm
    amount={total}
    address={address}
    customerEmail={customerEmail} // Replace with real email if available
    deliveryOption={deliveryOption}
    paymentMethod={paymentMethod}
    shopId={shopId}
    items={cartItems.map(item => ({
      productName: item.flower.name,
      quantity: item.quantity,
      price: item.flower.salePrice > 0 ? item.flower.salePrice : item.flower.price
    }))}
    onSuccess={nextStep}
  />
</StripeWrapper>

        )}
      </div>

      {paymentMethod !== 'Credit/Debit card' && (
        <button
          onClick={nextStep}
          className="mt-6 px-12 py-3 rounded bg-[#F5B3AD] hover:bg-[#f7c2bd] text-[#81504D] text-lg"
          disabled={!paymentMethod}
        >
          Continue to Confirmation
        </button>
      )}
    </div>
  );

  const ConfirmationStep = () => (
    <div className="flex flex-col items-center w-full max-w-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-[#81504D]">Confirm Order</h2>
     
      <StepIndicator />
      <div className="w-full space-y-6 bg-[#FFF2F0] p-6 rounded-lg text-[#81504D]">
        <div>
          <h3 className="text-lg font-semibold text-[#81504D] mb-1">Delivery detail</h3>
    {deliveryOption === 'pickup' ? (
            <>
              <p className="font-semibold text-[#81504D]">Pick up Store</p>
              <p className="text-sm text-gray-600">Lower Motithang, Thimphu</p>
              <p className="text-sm text-gray-600">Street 43, Near Store45</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-[#81504D]">Home Delivery</p>
              <p className="text-sm text-gray-600">{address}</p>
            </>
          )}
        </div>
        <h3 className="font-semibold text-lg">Your Items</h3>
        <div>
          {cartItems.length === 0 && (
            <p className="text-center text-gray-600">No items in your cart.</p>
          )}
          {cartItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-[#f5b3ad]"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.flower.image}
                  alt={item.flower.name}
                  className="w-10 h-10 object-cover rounded"
                />
                <p className="font-medium">{item.flower.name}</p>
              </div>
              <p>
                Nu.
                {(
                  (item.flower.salePrice > 0
                    ? item.flower.salePrice
                    : item.flower.price) * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="border-t border-[#f5b3ad] pt-4 space-y-2">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>Nu.{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Delivery Fee</span>
            <span>Nu.{deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>Nu.{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <main className="p-4 min-h-screen flex flex-col items-center justify-center bg-white">
      {step === 1 && <DeliveryStep />}
      {step === 2 && <PaymentStep />}
      {step === 3 && <ConfirmationStep />}
    </main>
  );
};

export default CheckoutFlow;
