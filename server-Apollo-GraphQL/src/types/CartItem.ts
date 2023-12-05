import { Types } from "mongoose";
import Product from "./Product.js";

interface CartItem {
  productid: Product;
  quantity: number;
}

export default CartItem;
