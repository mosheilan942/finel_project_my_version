import axios from "axios";
import { OrderInterface } from "../types/order.js";
import pg from "pg";
const { Pool } = pg;
import { config } from "dotenv";
config()
const banner = process.env.BANNER_BASE_URL;
const erp = process.env.ERP_BASE_URL;
const oms = process.env.OMS_BASE_URL;


const sendToOms = async (order: OrderInterface) => {
    console.log("order in sendToOms", order);
  
    const res = await fetch(`${oms}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
  
    const resNumOrder = await res.json();
  
    console.log("res in send To Oms: ", resNumOrder);
  
    return { message: 'The order has been placed !', orderID: resNumOrder};
  };
  

    const sendToDB = async (order:OrderInterface) => {
        console.log("order in sendToDB",order);
    const {
        userId,
        orderTime,
        status,
        totalPrice,
        shippingDetails: {
            address: { country, city, street, zipCode},
            orderType,
            contactNumber
        },
       
    } = order;

    const query = `
        UPDATE users
        SET
            contactNumber = $1,
            address = jsonb_set(
                COALESCE(address, '{}'::jsonb),
                '{country}', $2::jsonb,
                true
            )
        WHERE userid = $3
    `;
    const values = [Number(contactNumber), { country, city, street, zipCode }, userId];

    const res = await sendQueryToDatabase(query, values);
    console.log('this res',res)
    const { rowCount } = res;
    return rowCount;
};

const sendQueryToDatabase = async (query: string, values: any[]): Promise<any> => {
    const pool = new Pool();
    const client = await pool.connect();

    try {
        const data = await client.query(query, values);
        return data;
    } catch (err) {
        console.error(err);
        throw err; // Re-throw the error after logging it
    } finally {
        client.release(); // Release the connection in the finally block
    }
};



const getFromOms = async (userId: string) => {
  const res = await axios.get(`${oms}/orders/${userId}`);
  return res.data.data;
};

export default {
  sendToOms,
  getFromOms,
  sendToDB
};


