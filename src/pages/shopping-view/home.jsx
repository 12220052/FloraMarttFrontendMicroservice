import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
// import bannerThree from "../../assets/banner-3.webp";
import banner from "../../assets/banner-img.png";
import flower1 from "../../assets/flower1.jpg"
import flower2 from "../../assets/flower2.jpg"
import SearchProducts from "./search";
import { sortOptions } from "@/config";
import logo from "../../assets/logo.png";
import { FaPhone } from 'react-icons/fa';
import { FaMailBulk } from 'react-icons/fa'; // Mail icon
import { FaInstagram } from 'react-icons/fa';
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import {
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";


function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);
const userId = localStorage.getItem("userId")
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const [sort, setSort] = useState(null);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }
  function handleSort(value) {
    setSort(value);
  }
  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

 useEffect(() => {
  console.log("calling")
  dispatch(
    fetchAllFilteredProducts({
      filterParams: {},
      sortParams: "price-lowtohigh",
    })
  );
}, [dispatch]);


  // console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  const [flowers, setFlowers] = useState([]);

  const [loading, setLoading] = useState(true); // To track the loading state

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        console.log("Attempting to fetch flowers...");
        const response = await axios.get(
          "http://localhost:8765/USERMICROSERVICE/api/flowers/getAllflowers",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Response:", response.data);
        setFlowers(response.data);
      } catch (error) {
        console.error("Detailed error:", {
          message: error.message,
          code: error.code,
          config: error.config,
          response: error.response,
        });
 
      }
    };

    fetchFlowers();
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
   

<div className="flex flex-col md:flex-row justify-between items-center pt-6 pl-20 pr-20 bg-[#F8F3F2]">
  {/* Left Section */}
  <div className="md:w-1/2 mb-6 md:mb-0">
  <h1 className="text-5xl md:text-6xl font-bold text-[#81504D] mb-4"> {/* Increased from text-4xl to text-6xl */}
    Decorate your Home<br />
    <span className="text-[#A67C7A] text-4xl md:text-5xl"> {/* Increased subheading size */}
      with Beautiful Flowers
    </span>
  </h1>
  <p className="text-xl md:text-2xl font-medium text-[#81504D] mt-6"> {/* Increased from text-lg to text-2xl */}
    Choose the Best Flowers to keep home
  </p>
  <button className="mt-8 px-8 py-2 bg-[#F5B3AD] text-white rounded-full hover:bg-[#F8CCC8] transition-colors text-lg"> {/* Increased button size */}
  <a href="/shop/listing"> Get Started</a> 
  </button>
</div>

  {/* Right Section - Best Seller with Image */}
  <div className=" flex justify-end">
    <div className="relative flex items-center gap-4 pb-4">
      <span className="text-xl font-semibold text-[#81504D] bg-[#F9CDC9]  rounded-t-[42%] rounded-b-md shadow-md w-[25vw] h-[30vw]">
      <div >
        <img 
          src={banner} 
          alt="Best selling flower" 
          className="w-[30vw] h-[35vw] object-cover pb-[10vh]"
        />
      </div>
      </span>
    </div>
  </div>
</div>
   
      <div className="flex items-center gap-4">
  <div className="flex-1 text-[#81504D]">
    <SearchProducts />
  </div >
  <DropdownMenu>
    <DropdownMenuTrigger asChild >
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        <ArrowUpDownIcon className="h-4 w-4 fill-[#81504D]" />
        <span className="text-[#81504D]">Sort by</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[200px]">
      <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
        {sortOptions.map((sortItem) => (
          <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} className="text-[#81504D]">
            {sortItem.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</div>

<div className="flex flex-col md:flex-row items-center gap-8 p-6 w-[120vw] ">
      {/* Left Column */}
      <div className="md:w-1/2 p-[5vh]">
        <h3 className="text-[#81504D] text-2xl font-bold p-[5px]">What we do</h3>
        <h2 className="text-2xl md:text-3xl font-semibold text-800 mb-4 text-[#81504D]">
          Our platform seamlessly connects flower enthusiasts with trusted florists and sellers.
        </h2>
        <p className="text-[#81504D]">
          Our platform seamlessly connects flower enthusiasts with trusted florists and sellers.
        </p>
      </div>

      {/* Right Column */}
      <div className="md:w-1/2">
        <img
          src={flower1}// Replace with your actual image path
          alt="Flowers in a pot"
          className="rounded-[25px] w-full max-w-sm object-cover"
        />
      </div>
    </div>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-[#81504D]">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {flowers && flowers.length > 0
              ? flowers.map((flowersItem) => (
                
                  <ShoppingProductTile
                  handleGetProductDetails={() => {}}
                  product={{
                    _id: flowersItem.flower_id,
                    image: flowersItem.image,
                    title:flowersItem.name,
                    subtitle:flowersItem.shopOwner.name,
                    category: "electronics",
                    brand: "Dummy Brand",
                    description:flowersItem.details,
                    price: flowersItem.price,
                    salePrice: null,
                    totalStock: flowersItem.quantity,
                  }}
                  handleAddtoCart={() => {}}
                />
                ))
              :  (
                <ShoppingProductTile
                  handleGetProductDetails={() => {}}
                  product={{
                    _id: "dummy-id",
                    image: flower2,
                    title: "Flower1",
                    subtitle: "Namgay Store",
                    category: "electronics",
                    brand: "Dummy Brand",
                    price: 100,
                    salePrice: 80,
                    totalStock: 5,
                  }}
                  handleAddtoCart={() => {}}
                />
              )}
          </div>
        </div>
      </section>
      <footer className="flex flex-col md:flex-row justify-start items-center md:items-start p-6 bg-white">
  {/* Left Section */}
  <div className="flex items-center gap-6 md:w-1/2 mb-6 md:mb-0 md:ml-16">
    <img
      src={logo} // Replace with actual flower logo
      alt="FloraMart Logo"
      className="w-32 h-32 rounded-full object-cover" // Make image bigger
    />
    <div>
      <h3 className="text-2xl font-semibold text-[#81504D]">Decorate your Home with Beautiful Flowers</h3>
      <p className="text-sm font-medium mt-1 text-[#81504D]">
        Where flower enthusiasts meet trusted florists and sellers.
      </p>
    </div>
  </div>

  {/* Right Section */}
  <div className="space-y-3 text-sm text-[#81504D] md:ml-48"> {/* Increased left margin */}
    <div className="flex items-center gap-2">
      <FaPhone size={16} />
      <a href="#" className="text-[#81504D]">Give us a call</a>
    </div>

    <div className="flex items-center gap-2">
      <FaMailBulk size={16} className="text-[#81504D]" />
      <span>Shoot us on email</span>
    </div>
    <div className="flex items-center gap-2">
      <FaInstagram size={16} className="text-[#81504D]" />
      <span>Message us on Instagram</span>
    </div>
  </div>
</footer>



      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
