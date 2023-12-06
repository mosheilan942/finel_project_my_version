import axios from "axios";
import {products} from "../data.js";
import Product from "../types/Product.js";
import { c } from "vitest/dist/reporters-5f784f42.js";
import pg from "pg";
const { Pool } = pg;
const erp = process.env.ERP_BASE_URL;
const banner = process.env.BANNER_BASE_URL;

const getProductByID = async (id:string) => {
    // console.log('hellow from dal get poroduct', id);
    const res = await fetch(`${erp}/shopInventory/${id}`)
    const resConverted = await res.json()
    // console.log('hellow from dal fetch product bybyid', resConverted);
    if(res.ok){
        
        return resConverted
    }
    const data = products
    console.log('hellow from dal data product by id', data[0]);
    //add function to get reviews 
    return data[0]
}


const getTop5Products =  async () => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${banner}/ext/bannersProduct/top5/products`,
        headers: { 
          'Content-Type': 'application/json'
        },
      };

        const res = await axios.request(config)
        return res.data.data
              
    
};

const getTop5ForCategory = async (name: string) => {
    const res = await axios.get(`${process.env.BANNER_BASE_URI}/topFiveCategories${name}`)
    return res.data
};

const saveReviewsToDB = async (reviews: any, pid: string) => {
    // console.log('hellow from dal', reviews,pid);
    const thumbUp = 0;
    const thumbDown = 0;
    const query = `INSERT INTO reviews (userid , productid ,author,title,body,rating,thumbUp,thumbDown) VALUES ($1, $2, $3, $4, $5, $6,$7,$8)`;
    const values = [reviews.userId, pid, reviews.author, reviews.title, reviews.review, reviews.rating,thumbUp,thumbDown];
    const res = await sendQueryToDatabase(query, values)
    const { rows } = res
    return rows;
    
}

const getReviewsFromDB = async (pid: string) => { 
    const query = `SELECT * FROM reviews WHERE productid = $1`;
    const values = [pid];
    const res = await sendQueryToDatabase(query, values)
    const { rows } = res
    console.log('Query result from getReviewsFromDB:', rows);
    return rows;
}    // console.log('Query result from getReviewsFromDB:', rows);

const feedbackReviews = async (pid: string,userId: string, feedback: boolean) => {
    console.log('hello from dal pid', pid,"userid", userId,'feedbeack', feedback);
    
    let thumbsUpValue = 0;
    let thumbsDownValue = 0;

    if (feedback) {
        // If feedback is true, update thumbUp
        thumbsUpValue = 1;
    } else {
        // If feedback is false, update thumbDown
        thumbsDownValue = 1;
    }

    const query = `
        INSERT INTO reviews (productid, userid, thumbUp, thumbDown)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (productid, userid) DO UPDATE 
        SET thumbUp = reviews.thumbUp + $3, thumbDown = reviews.thumbDown + $4    `;
    const values = [pid, userId, thumbsUpValue, thumbsDownValue];
    const res = await sendQueryToDatabase(query, values)
    const { rows } = res
    const array = []
    array[0] = {"items":rows}
    console.log('Query result from feedbackReviews:', rows);
    return array;

};

const getProductBySearch = async (search: string) => {
    const res = await fetch(`${erp}/shopInventory/?search=${search}`) 
    const resConverted = await res.json()
        return resConverted
    
    }


const sendQueryToDatabase = async (query: string, values: any[]): Promise<any> => {
    const pool = new Pool()
    const res = await pool.connect()
    const data = await res.query(query, values).catch(err => console.log(err));
    res.release()
    return data
  }

export default {getProductByID, getTop5Products, saveReviewsToDB, getReviewsFromDB, feedbackReviews, getProductBySearch,getTop5ForCategory}