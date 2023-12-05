import { Types } from "mongoose";
import productsDal from "../dal/productsDal.js";
import RequestError from "../types/errors/RequestError.js";
import STATUS_CODES from "../utils/StatusCodes.js";


const getProductByID = async (ID: string) => {
    const product = productsDal.getProductByID(ID)
    if (!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return product
}


const getTop5Products = async () => {
    const Top5Products = await productsDal.getTop5Products();
    if (!Top5Products)
        throw new RequestError('Top5Products not found', STATUS_CODES.NOT_FOUND);
    console.log('service');
    return Top5Products;
}

// const getTop5ForCategory = async (name: string) => {
//     const Top5Products = await productsDal.getTop5ForCategory(name);
//     if (!Top5Products)
//         throw new RequestError('Top5Products not found', STATUS_CODES.NOT_FOUND);
//     console.log('service');
//     return Top5Products;
// }
const saveReviewsToDB = async (reviews: any, pid: string) => {
    const product = await productsDal.saveReviewsToDB(reviews, pid)
    if (!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return product
}

const getReviewsFromDB = async (pid: string) => {
    const product = await productsDal.getReviewsFromDB(pid)
    if (!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return product
}

const feedbackReviews = async (pid: string, userId: string, feedback: boolean) => {
    
    const product = await productsDal.feedbackReviews(pid, userId, feedback)
    if (!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return product
}
const getProductBySearch = async (search: string) => {
    const product = await productsDal.getProductBySearch(search)
    if (!product)
        throw new RequestError('product not found', STATUS_CODES.BAD_REQUEST)
    return product
}
export default { getProductByID, getTop5Products, saveReviewsToDB, getReviewsFromDB, feedbackReviews, getProductBySearch }