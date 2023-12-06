import { Grid, Typography } from '@mui/material';
import Category from '../types/Category';
import { useEffect, useState } from 'react';
import categoriesAPI from '../api/categoriesAPI';
import CategoryCard from './CategoryCard';
import { v4 as uuidv4 } from 'uuid';

export default function Top5Categories() {
  const [top5Categories, setTop5Categories] = useState<Category[]>([]);
  const [load, setLoad] = useState(false);
  const [categoriesNotAvailable, setCategoriesNotAvailable] = useState(false);

  useEffect(() => {
    let fetchTimeout = setTimeout(() => {
      if (!load) {
        setCategoriesNotAvailable(true);
      }
    }, 15000);

    const fetchTopCategories = async () => {
      try {
        const categories = await categoriesAPI.getTop5categories();
        setTop5Categories(categories);
        setLoad(true);
        clearTimeout(fetchTimeout);
      } catch (err) {
        console.error('Error fetching top 5 categories');
        setCategoriesNotAvailable(true);
      }
    };

    fetchTopCategories();

    return () => {
      clearTimeout(fetchTimeout);
    };
  }, [load]);

  return (
    <>
      {load ? (
        <>
          <Typography display={'flex'} justifyContent={'center'} variant="h4">
            Top 4 Categories
          </Typography>
          {top5Categories && (
            <Grid container direction="row" justifyContent="center" alignItems="center">
              {top5Categories.slice(0,4).map((category) => (
                <Grid item xs key={uuidv4()}>
                  <CategoryCard category={category} />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : categoriesNotAvailable ? (
        <Typography marginTop={5} display={'flex'} justifyContent={'center'} variant="h4">
          Categories not available
        </Typography>
      ) : (
        <Typography marginTop={5} display={'flex'} justifyContent={'center'} variant="h4">
          Loading...
        </Typography>
      )}
    </>
  );
}
