import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

type props = {
  product: Product;
  navigateToOnClick?: To;
};

export default function ProductCard({ product, navigateToOnClick }: props) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(navigateToOnClick || `/store/product/${product.id}`);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 370, 
        height: 420, 
        margin: '20px',
        marginBottom: '20px',
        // padding: '3px',
        boxSizing: 'border-box',
        boxShadow: '0 5px 8px rgba(0, 0, 0.9, 0.8)',
        marginBlock: '8px',
        backgroundColor: "gray",
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" image={product.image.url} alt={product.name} />
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
  );
}
