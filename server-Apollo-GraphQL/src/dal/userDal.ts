import { Types } from "mongoose";
import User from "../types/User.js";
import pg from "pg";
const { Pool } = pg;
import { config } from "dotenv";
config()
const addUser = async (user: User) => {
    const query = `INSERT INTO
    users (email, password)
    VALUES (
            $1,
            $2)`;
    const values = [user.email, user.password];
    console.log("values", values);
    const res = await sendQueryToDatabase(query, values)
    const { rowCount } = res
    console.log(rowCount);
    return rowCount;
}
const getUser = async (userId: string) => {
    const query = 'SELECT * FROM users WHERE userid ::text = $1';
    const values = [userId];
    const res = await sendQueryToDatabase(query, values)
    return res;
}
const getUserByEmail = async (email: string): Promise<User[]> => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await sendQueryToDatabase(query, values)
    console.log(rows);
    return rows;
}
const sendQueryToDatabase = async (query: string, values: any[]): Promise<any> => {
    const pool = new Pool()
    const res = await pool.connect()
    // console.log("hi from userDal, sendQueryToDatabase:", values);
    const data = await res.query(query, values).catch(err => console.log(err));
    // console.log("hi from userDal, sendQueryToDatabase:", data);
    res.release()
    return data
}
export default { addUser, getUser, getUserByEmail, sendQueryToDatabase };