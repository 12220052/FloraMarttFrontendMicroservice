import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import flower1 from "../../assets/flower1.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

// Local sort options
const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

function ShoppingListing() {
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.shopProducts);
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { toast } = useToast();
  const [flowers, setFlowers] = useState([]);
const userId = localStorage.getItem("userId")
console.log("userid",userId)
  function handleAddtoCart(productId, totalStock) {
    const getCartItems = cartItems.items || [];
    const indexOfCurrentItem = getCartItems.findIndex(
      (item) => item.productId === productId
    );

    if (indexOfCurrentItem > -1) {
      const quantity = getCartItems[indexOfCurrentItem].quantity;
      if (quantity + 1 > totalStock) {
        toast({
          title: `Only ${quantity} quantity can be added for this item`,
          variant: "destructive",
        });
        return;
      }
    }

    dispatch(
      addToCart({
        userId: user?.id,
        productId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(userId));
        toast({ title: "Product is added to cart" });
      }
    });
  }

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8765/USERMICROSERVICE/api/flowers/getAllflowers"
        );
        setFlowers(response.data);
      } catch (error) {
        console.error("Error fetching flowers:", error);
      }
    };
    fetchFlowers();
  }, []);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  // Sort flowers locally
  const sortedFlowers = useMemo(() => {
    const clone = [...flowers];
    switch (sort) {
      case "price-lowtohigh":
        return clone.sort((a, b) => a.price - b.price);
      case "price-hightolow":
        return clone.sort((a, b) => b.price - a.price);
      case "title-atoz":
        return clone.sort((a, b) => a.name.localeCompare(b.name));
      case "title-ztoa":
        return clone.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return clone;
    }
  }, [flowers, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 p-4 md:p-6">
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-[#81504D]">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-[#81504D]">
              {flowers.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[#81504D]">Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] text-[#81504D]">
                <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.id} value={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {sortedFlowers.length > 0 ? (
            sortedFlowers.map((flower) => (
              <ShoppingProductTile
                key={flower.flower_id}
                handleGetProductDetails={() =>
                  dispatch(fetchProductDetails(flower.flower_id))
                }
                handleAddtoCart={() =>
                  handleAddtoCart(flower.flower_id, flower.quantity)
                }
                product={{
                  _id: flower.flower_id,
                  image: flower.image,
                  title: flower.name,
                  subtitle: flower.shopOwner?.name || "Unknown",
                  category: "flowers",
                  brand: "Local Vendor",
                  description: flower.details,
                  price: flower.price,
                  salePrice: null,
                  totalStock: flower.quantity,
                }}
              />
            ))
          ) : (
            <ShoppingProductTile
              handleGetProductDetails={() => {}}
              handleAddtoCart={() => {}}
              product={{
                _id: "dummy-id",
                image: flower1,
                title: "Flower1",
                subtitle: "Namgay Store",
                category: "electronics",
                brand: "Dummy Brand",
                price: 100,
                salePrice: 80,
                totalStock: 5,
              }}
            />
          )}
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingListing;
