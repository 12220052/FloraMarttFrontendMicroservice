import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
import flower1 from "../../assets/flower1.jpg"
function ShoppingProductTile({
  product,
  handleGetProductDetails,
  handleAddtoCart,

}) {
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-sm mx-auto text-[#81504D]">
    <div onClick={() => handleGetProductDetails(product?._id)}>
      <div className="relative">
      
      <img
  src={product.image}
  alt={product.title}
  onError={(e) => e.target.src = flower1} // Fallback if image is broken
  className="w-full h-auto object-cover rounded-md"
/>
        {product?.totalStock === 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-[#81504D]">
            Out Of Stock
          </Badge>
        ) : product?.totalStock < 10 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            {`Only ${product?.totalStock} items left`}
          </Badge>
        ) : product?.salePrice > 0 ? (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-[#81504D]">
            Sale
          </Badge>
        ) : null}
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2 text-[#81504D]">{product?.title}</h2>
        
        {/* Add Subtitle */}
        <p className="text-sm text-muted-foreground mb-2 text-[#81504D]">{product?.subtitle}</p>
  
        <div className="flex justify-between items-center mb-2">
          <span className="text-[16px] text-muted-foreground text-[#81504D]">
            {categoryOptionsMap[product?.category]}
          </span>
          <span className="text-[16px] text-muted-foreground text-[#81504D]">
            {brandOptionsMap[product?.brand]}
          </span>
        </div>
        <div className="flex justify-between items-center mb-2 text-[#81504D]">
          <span
            className={`${
              product?.salePrice > 0 ? "line-through" : ""
            } text-lg font-semibold text-[#81504D]`}
          >
            Nu.{product?.price}
          </span>
          {product?.salePrice > 0 ? (
            <span className="text-lg font-semibold text-[#81504D]">
              Nu.{product?.salePrice}
            </span>
          ) : null}
        </div>
      </CardContent>
    </div>
    <CardFooter>
      {product?.totalStock === 0 ? (
        <Button className="w-full opacity-60 cursor-not-allowed">
          Out Of Stock
        </Button>
      ) : (
        <Button
        onClick={() => navigate("/shop/Detail", { state: { product } })}
        className="w-full"
      >
        View
      </Button>
      )}
    </CardFooter>
  </Card>
  
  );
}

export default ShoppingProductTile;
