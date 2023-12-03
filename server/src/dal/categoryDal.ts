import axios from "axios";
import  {categories,products}  from '../data.js'
import { c } from "vitest/dist/reporters-5f784f42.js";
const erp = process.env.ERP_BASE_URL;

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
    const res = await axios.get(`https://banners-deshbord-doker.onrender.com/banners/api/ext/bannersProduct/top5/categories`)
    // console.log('top 5 categories', res.status);
    // console.log('top 5 categories res', res.data.data);
    if (res.status >= 200 && res.status < 400) {
        return res.data.data;
    }
    throw new Error("Error fetching top 5 categories");
};

export default { getCategories, getCategoryProducts, getTop5Categories };
