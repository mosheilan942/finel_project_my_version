import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { To, useNavigate } from 'react-router-dom';
import { Product } from '../types/Product';

type Props = {
  product: Product;
  navigateToOnClick?: To;
};

export default function ProductCardsForHomePage({ product, navigateToOnClick }: Props) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      navigate(navigateToOnClick || `/store/product/${product.id}`);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={2} sx={{ marginBottom: '20px', padding: '5px' }}>
      <Card
        onClick={handleClick}
        sx={{
          width: 230,
          height: 380,
          margin: '0 3px 0 0',
          boxSizing: 'border-box',
          boxShadow: '0 5px 8px rgba(0, 0, 0.9, 0.8)',
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
    </Grid>
  );
}
