import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import { Product } from '../types/Product';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type Props = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type Tags = { [key: string]: string[] };

const Filter = (props: Props) => {
  const { products, setProducts } = props;
  const tags = Object.keys(products[0].tags);
  const tagsValues: Tags = {};

  const [filters, setFilters] = useState<any>(() =>
    tags.reduce((acc, tag) => {
      acc[tag] = [];
      return acc;
    }, {} as Tags)
  );

  tags.forEach((tag) => {
    tagsValues[tag] = [...new Set(products.map((p: any) => p.tags[tag]))];
  });

  const handleFilterChange = (
    tag: keyof Tags,
    event: SelectChangeEvent<{ value: string[] }>
  ) => {
    const {
      target: { value },
    } = event;
    setFilters((prevFilters:any) => ({ ...prevFilters, [tag]: value }));
  };

  useEffect(() => {
    const filterProducts = () => {
      const newProducts = products.filter((p:any) => {
        for (const tag of tags) {
          if (filters[tag].length > 0 && !filters[tag].includes(p.tags[tag])) {
            return false;
          }
        }
        return true;
      });
      setProducts(newProducts);
    };
    filterProducts();
  }, [filters, products, setProducts, tags]);

  return (
    <Box>
      {tags.map((tag) => (
        <FormControl key={tag} sx={{ m: 1, width: 300 }}>
          <InputLabel id={`search-by-${tag}`}>{`Search by ${tag}`}</InputLabel>
          <Select
            labelId={`search-by-${tag}`}
            id={`${tag}-search`}
            multiple
            value={filters[tag]}
            onChange={(event) => handleFilterChange(tag, event)}
            input={
              <OutlinedInput id={`select-multiple-chip-${tag}`} label="Chip" />
            }
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value:any) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {tagsValues[tag].map((tagValue) => (
              <MenuItem
                key={tagValue}
                value={tagValue}
                style={{
                  fontWeight: 500,
                }}
              >
                {tagValue}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ))}
    </Box>
  );
};

export default Filter;
