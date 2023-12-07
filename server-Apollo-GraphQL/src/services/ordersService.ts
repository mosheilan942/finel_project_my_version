import STATUS_CODES from '../utils/StatusCodes.js';
import RequestError from '../types/errors/RequestError.js';
import { OrderInterface } from '../types/order.js';

import cartDal from '../dal/cartDal.js';
import Product from '../types/Product.js';
import ordersDal from '../dal/ordersDal.js';

const sendToOmsAndDB = async ( order:OrderInterface) => {
    const ordersToDb = await ordersDal.sendToDB(order);
    const userProducts =await cartDal.getCart(order.userId);
    order.cartItems = userProducts.items as any;
    console.log('order in service',order);
    const ordersToOms = await ordersDal.sendToOms(order);
  if (!ordersToDb)
  throw new RequestError('Categorys not found', STATUS_CODES.NOT_FOUND);
  return (ordersToOms);
  
};

const getOrdersFromOms = async (req: any) => {
  const { userId } = req.body
  const orders = await ordersDal.getFromOms(userId);
  if (!orders)
  throw new RequestError('Categorys not found', STATUS_CODES.NOT_FOUND);
return orders;
};





export default { sendToOmsAndDB ,getOrdersFromOms};
