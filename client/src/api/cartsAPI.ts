import Cart from "../types/Cart";
import { Product } from "../types/Product";
import ProductCart from "../types/ProductCart";
import handleApiRes from "./apiResHandler";
// import dotenv from "dotenv";
// dotenv.config();
//no need for change
const api = import.meta.env.VITE_API_URI
const userInfo = localStorage.getItem("userInfo");
const token = userInfo ? JSON.parse(userInfo).store_token : null;

async function getCart(userId: string): Promise<ProductCart[]> {
    const response = await fetch(`${api}/users/cart/get`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId: userId,
        }),
    }) ;
    // console.log("hi from get cart");
    return await handleApiRes(response);
}
async function addToCart( userId:string,product:Product,quantityOfProduct:string): Promise<Cart> {
    console.log("hi from cartsAPi addtocart:", product,userId,quantityOfProduct)
    const response = await fetch(`${api}/users/cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,

        },
        body: JSON.stringify({
            userId:userId,
           product: product,
           quantityOfProduct:quantityOfProduct
        }),
    });
    return await handleApiRes(response);
}
async function updateQuantity(pid: string, action : "inc" | "dec"):Promise<Cart> {
    console.log('cartapi update quantity',pid,action)
    const response = await fetch(`${api}/users/cart`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            pid: pid,
            action: action
        }),
    });
    return await handleApiRes(response);
}
async function deleteProductFromCart(pid: string): Promise<Cart> {
    console.log("hi from cartsAPI, deleteProductFromCart:", pid);

    const headers = {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`,
    };

    const response = await fetch(`${api}/users/${pid}/cart`, {
        method: "DELETE",
        headers: headers,
    });

    const data = await handleApiRes(response);
    return data;
}
//external
async function sendCartToOms(cart:object):Promise<Cart> {
    const response =  await fetch(`${api}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            cart: cart,
        }),
    });
    return await handleApiRes(response);
}
async function deleteCart():Promise<Cart> {
    const response = await fetch(`${api}/users/cart`, {method: "DELETE"});
    return await handleApiRes(response);
}
export default { getCart, addToCart, updateQuantity, deleteProductFromCart, deleteCart,sendCartToOms }