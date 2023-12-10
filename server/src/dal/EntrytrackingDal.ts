import User from "../types/User.js";
import pg from "pg";
const { Pool } = pg;
import { config } from "dotenv";
const connectionString = process.env.CONNECTION_STRING
config()


const getUsers = async () => {
    const query = 'SELECT * FROM entrytracking';
    const res = await sendQueryToDatabase(query)
    const { rows } = res
    return rows;
}

const sendQueryToDatabase = async (query: string, values?: any[]): Promise<any> => {
    const pool = new Pool({connectionString: connectionString})
    const res = await pool.connect()
    const data = await res.query(query, values).catch(err => console.log(err));
    res.release()
    return data
}


export { getUsers, sendQueryToDatabase };