import axios from "axios";
import  {categories, products}  from '../data.js'
import { config } from "dotenv";
config()
const erp = process.env.ERP_BASE_URL;
const banner = process.env.BANNER_BASE_URL;

const getCategories = async () => {

const res = await fetch(`${erp}/shopInventory/categories`)
const resConverted = await res.json()
// console.log('res categories in dal ',resConverted);
if(res.ok){
    return resConverted
}
};

// OMS 
const getCategoryProducts = async (name: string) => {
    const data = products
    const res = await fetch(`${erp}/shopInventory?category=${name}`)
    const resConverted = await res.json()
    // console.log('res categorybyproducts',resConverted);
    if(res.ok){
        return resConverted
    }
    return data
};

// BANNERS 
const getTop5Categories = async () => {
    const res = await axios.get(`${banner}/ext/bannersProduct/top5/categories`)
    if (res.status >= 200 && res.status < 400) {
        return res.data.data;
    }
    throw new Error("Error fetching top 5 categories");
};

export default { getCategories, getCategoryProducts, getTop5Categories };
