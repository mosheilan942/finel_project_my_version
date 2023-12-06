import Product from "./types/Product.js";
import Category from "./types/Category.js";
import { v4 as uuidv4 } from 'uuid';
const products: Product[] = [
    {
      id: uuidv4(),
      name: "Product 1",
      saleprice: 29.99,
      quantity: 10,
      description: "Description for Product 1.",
      category: "Category A",
      discount: 10,
      rating: 4.5,
      click: 100,
      coordinate: {
        longitude1: 40.7128,
        longitude2: -74.0060,
        longitude3: 45.5122,
        latitude1: -74.0060,
        latitude2: 40.7128,
        latitude3: -122.6795,
      },
      image: {
        url: "https://example.com/product1.jpg",
        alt: "Product 1 Image",
      },
      tags: {
        tag: "Tag A",
        tag2: "Tag B",
      },
    },
    {
      id: uuidv4(),
      name: "Product 2",
      saleprice: 49.99,
      quantity: 15,
      description: "Description for Product 2.",
      category: "Category B",
      discount: 15,
      rating: 4.2,
      click: 150,
      coordinate: {
        longitude1: 34.0522,
        longitude2: -118.2437,
        longitude3: 51.5074,
        latitude1: -118.2437,
        latitude2: 34.0522,
        latitude3: 0.1278,
      },
      image: {
        url: "https://example.com/product2.jpg",
        alt: "Product 2 Image",
      },
      tags: {
        tag: "Tag C",
        tag2: "Tag D",
      },
    },
    // ... (Repeat the same structure for other products)
  ];
  
  const categories: Category[] = [
    {
      id: "1",
      name: "Category A",
      clicked: 150,
    },
    {
      id: "2",
      name: "Category B",
      clicked: 200,
    },
    {
      id: "3",
      name: "Category C",
      clicked: 120,
    },
    {
      id: "4",
      name: "Category D",
      clicked: 180,
    },
    {
      id: "5",
      name: "Category E",
      clicked: 90,
    },
  ];
export  {products, categories}