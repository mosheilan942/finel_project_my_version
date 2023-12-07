import UserInfo from "../types/UserInfo";
import handleApiRes from "./apiResHandler";
// import dotenv from "dotenv";
// dotenv.config();
const api = import.meta.env.VITE_API_URI

async function loginUser(email: string, password: string,name:string): Promise<UserInfo> {
    console.log('hello from login api',name)
    const response = await fetch(`${api}
/users/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password,name }),
    });
    return await handleApiRes(response);
}

async function checkEmail(email: string,): Promise<Response> {
    const response = await fetch(`${api}
/users/checkEmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return await handleApiRes(response);
}

async function logoutUser(): Promise<{message:string}> {
    const response = await fetch(`${api}
/users/auth/logout`, { method: "POST" });
    return await handleApiRes(response);
}
async function getUser(): Promise<UserInfo> {
    const response = await fetch( `${api}
/users/`);
    return await handleApiRes(response);
}
async function register(email: string, password: string,name:string):Promise<any> {

    console.log('hello from register api',email,password,name)

    const response = await fetch(`${api}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password , name}),
    });
    return response;
}
export default { loginUser, logoutUser, getUser , register,checkEmail}