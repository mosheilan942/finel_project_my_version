import Card from "@mui/material/Card";
import { useRef } from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Button } from "@mui/material";
import { To, useNavigate } from "react-router-dom";
import { Product } from "../types/Product";

type Props = {
  product: Product;
  navigateToOnClick?: To;
};

export default function ProductCardsForHomePage({
  product,
  navigateToOnClick,
}: Props) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(navigateToOnClick || `/store/product/${product.id}`);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <div>
      <Grid
        item
        xs={12}
        sx={{
          marginBottom: "20px",
          padding: "5px",
        }}
      >
        <Card
          onClick={handleClick}
          sx={{
            width: 370,
            height: 415,
            margin: "2px 3px 2px 2px",
            marginLeft: "15px",
            boxSizing: "border-box",
            boxShadow: "0 5px 8px rgba(0, 0, 0.9, 0.8)",
            backgroundColor: " gray",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.03)",
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              image={product.image.url}
              alt={product.image.alt}
              sx={{ maxHeight: "280px" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {product.description}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                price: {product.saleprice}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  );
}
