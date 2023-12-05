import { Paper, Typography, Link, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import categoriesAPI from '../api/categoriesAPI';
import Category from '../types/Category';
import {v4 as uuidv4  } from "uuid";

export default function CategoryNav() {
  const theme = useTheme();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoriesAPI
      .getCategories()
      .then((categories) => setCategories(categories))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'sticky',
        flexWrap: 'wrap',
        marginBottom: 2,
        top: 0,
        zIndex: 100,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? '#333'
            : theme.palette.background.default,
      }}
    >
      {categories.slice(0,4).map((category) => (
        <Link
          href={`/store/category/${category.name}`}
          underline="none"
          key={uuidv4()}
          sx={{
            margin: 0.5,
            padding: 1,
            borderRadius: theme.shape.borderRadius,
            //backgroundColor: theme.palette.mode === 'dark' ? '#444' : theme.palette.background.paper,
            color: theme.palette.getContrastText(
              theme.palette.mode === 'dark'
                ? '#444'
                : theme.palette.background.paper
            ),
            '&:hover': {
              transform: 'scale(1.08)',
              fontWeight: 'bold',
            },
          }}
        >
          <Typography variant="body1">{category.name}</Typography>
        
        </Link>
      ))}
    </Paper>
  );
}
