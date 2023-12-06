import categoryDal from "../dal/categoryDal.js";
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";
import { Request } from "express";

const getCategories = async () => {
    const categorys = await categoryDal.getCategories();
    if (!categorys)
        throw new RequestError('Categorys not found', STATUS_CODES.NOT_FOUND);
    return categorys;
}

const getCategoryProducts = async (req: Request) => {
    console.log("hi from service getCategoryProducts:", req.params);
    const { name } = req.params;
    const categoryProducts = await categoryDal.getCategoryProducts(name);
    if (!categoryProducts)
        throw new RequestError('Category not found', STATUS_CODES.NOT_FOUND);
    return categoryProducts;

}
const getTop5Categories = async () => {
    const category = await categoryDal.getTop5Categories();
    if (!category)
        throw new RequestError('Category not found', STATUS_CODES.NOT_FOUND);
    return category;
}


export default { getCategories, getCategoryProducts, getTop5Categories }