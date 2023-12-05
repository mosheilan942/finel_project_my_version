import productsService from "../services/productsService.js";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bannerService from "../services/bannerService.js";


const getBannersSide = async (_req: Request, res: Response) => {  
  try {
    console.log('controller banner side get in controll');
    const banner = await bannerService.getSideBannersFromBannerTeam();
    res.json(banner);
    console.log('controll');
  } catch (error) {
    console.log(error);
    
  }
}
const getBannersTop = async (_req: Request, res: Response) => {  
  try {
    const banner = await bannerService.getTopBanners();
    res.json(banner);
    console.log('controll');
  } catch (error) {
    console.log(error);
    
  }
}
  
const getBannersAll = async (req :Request, res:Response) => { 
    console.log('controller banner',req.params);
  const {userID} = req.params
    const top5Products = await bannerService.getAllBanners( userID);
    res.json(top5Products);
  }



export default { getBannersSide, getBannersTop, getBannersAll}