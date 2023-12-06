import { useEffect, useState, useContext } from "react";
import { Typography, Box, Card, Button } from "@mui/material";
import { Product } from "../types/Product";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

export default function WishList() {
  const [wishList, setWishList] = useState<Product[] | null>(null);
  const [load, setLoad] = useState(false);
  const nav = useNavigate();
  const context = useContext(UserContext)!;
  const { userInfo } = context;
  const userId = userInfo?.id;

  async function getWishList(userId: string | undefined) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wishList/${userId}`
      );
      const data = await response.json();
      setWishList(data);
      setLoad(true);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setLoad(false);
    }
  }

  useEffect(() => {
    getWishList(userId);
  }, [userId]);

  const goToProduct = (productId: string) => {
    nav(`/store/product/${productId}`);
  };

  return (
    <>
      <div>
        {load ? (
          <div>
            <Card sx={{ margin: 2, padding: 1 }}>
              {wishList?.map((product: Product) => (
                <Box
                  key={product.id}
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography variant="h5">{product.name}</Typography>
                  <Typography variant="h5">{product.saleprice}</Typography>
                  <Typography variant="h5">{product.quantity}</Typography>
                  <Button onClick={() => goToProduct(product.id)}>
                    Go to product
                  </Button>
                </Box>
              ))}
            </Card>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1>Wishlist not available</h1>
          </div>
        )}
      </div>
    </>
  );
}
