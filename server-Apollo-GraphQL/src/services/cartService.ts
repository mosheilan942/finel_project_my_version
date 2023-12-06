import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../types/errors/RequestError.js';
import { Types } from 'mongoose';
import cartDal from '../dal/cartDal.js';
import Cart from '../types/Cart.js';
import Product from '../types/Product.js';

// Assuming CartItem is the type of objects in cart.items
interface CartItem {
    userid: string;
    productid: string;
    quantity: string;
    quantityofproduct: string;
    saleprice: string;
    name: string;
    description: string;
    discount: string;
    image: string;
  }
  
  const getCart = async (userId: string): Promise<CartItem[]> => {
    const cart = await cartDal.getCart(userId);
  
    const filteredCart = cart.items.map((item: CartItem) => ({
      userid: item.userid,
      productid: item.productid,
      storequantity: Number(item.quantity),
      quantityofproduct: Number(item.quantityofproduct),
      price: Number(item.saleprice),
      name: item.name,
      description: item.description,
      discount: Number(item.discount),
      image: item.image
    }));
  
   
    return filteredCart;
  };
  
const updateAmount = async (userId: string, itemId: string, quantity:number) => {
//   const cart = await cartDal.getCartProducts(userId, itemId);
//   if(!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
//   const prodInCart = cart.find(prod => prod.id.toString() === itemId.toString());
//   if(!prodInCart){
//     // cart.items.push(itemId);
//     const newItemInCart = await cartDal.updateCart(userId, itemId, quantity);
//     if (!newItemInCart) throw new RequestError('Cart update failed', STATUS_CODES.INTERNAL_SERVER_ERROR);
//     return newItemInCart
//   }
//   const updatedCart = await cartDal.updateAmount(userId, itemId.toString(), quantity);
//   if(!updatedCart)
//     throw new RequestError('Cart not found', STATUS_CODES.NO_CONTENT);
//   return updatedCart;
};


const updateCart = async (userId: string, product:Product, quantityOfProduct:number) => {
    console.log("hi from service updateCart:", userId, product, quantityOfProduct);
    const cartRes = await cartDal.updateCart(userId,product, quantityOfProduct);
    if (cartRes.length === 0)
      throw new RequestError(
        'Cart update failed',
        STATUS_CODES.INTERNAL_SERVER_ERROR
      );
    return cartRes;
  };
const sendToOms = async ( cart: Cart) => {
  const omsCart = await cartDal.sendToOms(cart);
  return omsCart;
};
const deleteCart = async (userId: string) => {
  const cart = await cartDal.deleteCart(userId);
  if (!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  return cart;
};
const deleteCartItem = async (userId: string, productId: string) => {
  const cart = await cartDal.deleteCartItem(userId, productId);
  //wite for adding logic to function cartDal.deleteCartItem
//   if (!cart) throw new RequestError('No cart found', STATUS_CODES.NO_CONTENT);
  return cart;
}
const patchAmount = async (
  userId: string,
  metaDate: { pid: string; action: string }
) => {
  if (metaDate.action === 'inc')
    return await cartDal.incAmount(userId, metaDate.pid);
  return await cartDal.decAmount(userId, metaDate.pid);
};
export default { getCart,updateAmount, updateCart, deleteCart, deleteCartItem, patchAmount,sendToOms };