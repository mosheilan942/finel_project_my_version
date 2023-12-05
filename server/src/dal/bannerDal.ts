import axios from "axios";
import { config } from 'dotenv';
config();

const banner = process.env.BANNER_BASE_URL





const getSideFromBanners=  async () => {
    const res = await axios.get('https://banners-deshbord-doker.onrender.com/bannersImage/ext/?limit=1&size=side&')    
    if (res.statusText) {
        console.log('msho ichoodi',res.data);  
        return res.data
    }
    throw new Error("error");
    
};

const getTopFromBanners = async () => {
    const res = await axios.get(`https://banners-deshbord-doker.onrender.com/bannersImage/ext/?limit=1&size=side&`)
    if (res.status >= 200 && res.status < 400) {
        return res.data;
        }
        throw new Error("error");
    };

const getAllFromBanners=  async (userID:string) => {
    const res = await axios.get(`${banner}/bannersImage/ext/?size={allscreen}`)
    if (res.status >= 200 && res.status < 400) {
        return res.data;
        }
        throw new Error("error");
    };




export default { getSideFromBanners, getAllFromBanners ,getTopFromBanners }