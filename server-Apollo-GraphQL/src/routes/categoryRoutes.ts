import express from "express";
import categoryController from "../controllers/categoryController.js";

const categoryRouter = express.Router();


categoryRouter.get('/categories', categoryController.getCategories)
categoryRouter.get('/topFiveCategories', categoryController.get5Categories)
categoryRouter.get('/:name', categoryController.getCategoryProducts)


export default categoryRouter