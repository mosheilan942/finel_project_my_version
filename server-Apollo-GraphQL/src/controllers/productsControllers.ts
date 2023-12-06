import productsService from "../services/productsService.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { string } from "joi";



//OMS
const getProductByID = asyncHandler(async (req: Request, res: Response) => {
    try {
        const { pid } = req.params
        const product = await productsService.getProductByID(pid)
        res.json(product)
    } catch (error) {
        console.log(error);   
    }
})


const getTop5Products = async (_req: Request, res: Response) => {
    try {
        console.log('this is get top 5 products in controller')
        const top5Products = await productsService.getTop5Products();
        res.json(top5Products);
    } catch (error) {
        console.log(error);    
    }
}

// const getTop5ForCategory = async (req: Request, res: Response) => {
//     try {
//         const { name } = req.params
//         const top5Products = await productsService.getTop5ForCategory(name);
//         console.log('controll');
//         res.json(top5Products);
//     } catch (error) {
        
//     }
// }


const saveReviewsToDB = asyncHandler(async (req: Request, res: Response) => {
  try{
    const pid = req.params.pid
    console.log('this is reviews', req.body)
    const result = await productsService.saveReviewsToDB( req.body,pid)
    console.log('this is result for review', result)
    res.json(result)
}
catch(error){
  res.json(error)
}
})


const getReviewsFromDB = asyncHandler(async (req: Request, res: Response) => {
    try{
        const pid = req.params.pid
        const reviews = await productsService.getReviewsFromDB(pid)
        res.json(reviews)
    }
    catch(error){
        res.json(error)
}})

const feedbackReviews = asyncHandler(async (req: Request, res: Response) => {

    console.log('this is feedback', req.body)
    try{
        
        const {pid, feedback,userId} = req.body
        const result = await productsService.feedbackReviews(pid,userId,feedback)
    }
    catch(error){
        res.json(error)
}})

const getProductBySearch = asyncHandler(async (req: Request, res: Response) => {
    try{
        console.log('this is search', req.body)
        const {searchItem} = req.body
        const result = await productsService.getProductBySearch(searchItem)
        res.json(result)
    }
    catch(error){
        res.json(error)
    }
})




export default { getProductBySearch,getProductByID, getTop5Products, saveReviewsToDB, getReviewsFromDB, feedbackReviews }

