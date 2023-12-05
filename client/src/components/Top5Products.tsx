import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import {Product} from '../types/Product';
import { Grid, Typography } from '@mui/material';
import ProductCardsForHomePage from '../pages/ProductCardsForHomePage';

function Top5ProductsPage() {
  const [top5Products, setTop5Products] = useState<Product[]>([]);

  useEffect(() => {
    const fetchTop5Products = async () => {
      try {
        const top5Products = await productsAPI.getTop5Products();
        console.log('top5Products:', top5Products);
        setTop5Products(top5Products);

      } catch (error) {
        console.error('Error fetching top 5 products:', error);
      }
    };
    fetchTop5Products();
  }, []);

  return (
    <>
      <Typography
        marginTop={5}
        display={'flex'}
        justifyContent={'center'}
        variant="h4"
      >
        Top 5 Products
      </Typography>

      <Grid
        container
        direction="row"
        justifyContent="space-between" 
        alignItems="center"
        sx={{
          marginLeft: '3px', 
          marginRight: '3px',
          paddingLeft: '3px', 
          paddingRight: '3px', 
        }}      >
        {top5Products.map((product) => (
            <ProductCardsForHomePage key={product.id} product={product} />
         
        ))}
      </Grid>
    </>
  );
}

export default Top5ProductsPage;
