import express from "express";
import bannerontroller  from "../controllers/bannerController.js";


const bannerRoutes = express.Router();
bannerRoutes.get('/sideBanners', bannerontroller.getBannersSide);
bannerRoutes.get('/topBanners', bannerontroller.getBannersTop);
bannerRoutes.get('/allBanners', bannerontroller.getBannersAll);

export default bannerRoutes; 