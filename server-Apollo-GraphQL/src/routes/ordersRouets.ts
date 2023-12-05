import express from 'express';
import { authHandler } from '../middlewares/authMiddleware.js';
import ordersControllers from '../controllers/ordersController.js';
const ordersRouter = express.Router();


// cartRouter.use(authHandler);

ordersRouter.post('/checkout/order', ordersControllers.getOrderFromClient);
ordersRouter.post('/checkout/check', ordersControllers.checkDebitCard);
ordersRouter.get('/allOrders', ordersControllers.getOrdersFromServer);

export default ordersRouter;
