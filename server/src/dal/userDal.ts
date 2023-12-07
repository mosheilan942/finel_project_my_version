import { Types } from "mongoose";
import User from "../types/User.js";
import pg from "pg";
const { Pool } = pg;
import { config } from "dotenv";
const connectionString = process.env.CONNECTION_STRING
config()

const addUser = async (user: User) => {
    console.log("user in addUser:", user);
    const query = `INSERT INTO
    users (email, password,name)
    VALUES (
            $1,
            $2,$3)`;
    const values = [user.email, user.password,user.name];
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

const changeUserPassword = async (password: string, email:string): Promise<string> => {
    const query = `UPDATE users
            SET password = $1
            WHERE email = $2;`;
    const values = [password, email];
    const { rowCount } = await sendQueryToDatabase(query, values)
    console.log(rowCount);
    if (rowCount > 0) return `The password for the users ${email} has been successfully changed`;
    return `The password has not been changed Try again`
} 

const checkMailInDB = async (email: string): Promise<boolean> => {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const { rows } = await sendQueryToDatabase(query, values)
    console.log(rows);
    if (rows) return true;
    return false
}


const sendQueryToDatabase = async (query: string, values: any[]): Promise<any> => {
    const pool = new Pool({connectionString: connectionString})
    const res = await pool.connect()
    // console.log("hi from userDal, sendQueryToDatabase:", values);
    const data = await res.query(query, values).catch(err => console.log(err));
    // console.log("hi from userDal, sendQueryToDatabase:", data);
    res.release()
    return data
}


export default { addUser, getUser, getUserByEmail, sendQueryToDatabase,checkMailInDB };