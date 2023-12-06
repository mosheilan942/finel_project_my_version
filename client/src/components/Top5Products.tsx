import { useState, useEffect } from 'react';
import productsAPI from '../api/productsAPI';
import { Product } from '../types/Product';
import { Grid, Typography } from '@mui/material';
import ProductCardsForHomePage from '../pages/ProductCardsForHomePage';

function Top5ProductsPage() {
  const [top5Products, setTop5Products] = useState<Product[]>([]);
  const [load, setLoad] = useState(false);
  const [productsNotAvailable, setProductsNotAvailable] = useState(false);

  useEffect(() => {
    let fetchTimeout = setTimeout(() => {
      if (!load) {
        setProductsNotAvailable(true);
      }
    }, 15000);

    const fetchTop5Products = async () => {
      try {
        const fetchedProducts = await productsAPI.getTop5Products();
        if (fetchedProducts.length === 0) {
          setProductsNotAvailable(true);
        } else {
          setTop5Products(fetchedProducts);
          setLoad(true);
          clearTimeout(fetchTimeout);
        }
      } catch (error) {
        console.error('Error fetching top 5 products:', error);
        setProductsNotAvailable(true);
      }
    };

    fetchTop5Products();

    return () => {
      clearTimeout(fetchTimeout);
    };
  }, [load]);

  return (
    <>
      {load ? (
        <>
          <Typography marginTop={5} display={'flex'} justifyContent={'center'} variant="h4">
            Top 3 Products
          </Typography>

          <Grid
            container
            justifyContent="center"
            alignItems="center"

          >
            {top5Products.slice(0,3).map((product) => (
              <ProductCardsForHomePage key={product.id} product={product} />
            ))}
          </Grid>
        </>
      ) : productsNotAvailable ? (
        <Typography marginTop={5} display={'flex'} justifyContent={'center'} variant="h4">
          Products not available
        </Typography>
      ) : (
        <Typography marginTop={5} display={'flex'} justifyContent={'center'} variant="h4">
          Loading...
        </Typography>
      )}
    </>
  );
}

export default Top5ProductsPage;
