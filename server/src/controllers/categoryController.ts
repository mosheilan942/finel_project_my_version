import asyncHandler from 'express-async-handler';
import categoryService from '../services/categoryService.js';

const getCategories = asyncHandler(async (_req, res) => {
  try {
    const categories = await categoryService.getCategories();

    res.json(categories);
  } catch (error) {
    console.log(error);
  }});     

const getCategoryProducts = asyncHandler(async (req, res) => {
  try {
    const products = await categoryService.getCategoryProducts(req);
    res.json(products);
    // console.log('controll');
  } catch (error) {
    console.log(error);
  }
});

const get5Categories = asyncHandler(async (_req, res) => {
  try {
    const categories = await categoryService.getTop5Categories();
    res.json(categories);
  } catch (error) {
    console.log(error);
  }
});

export default {
  getCategories,
  getCategoryProducts,
  get5Categories,
};
