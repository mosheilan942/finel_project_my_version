import asyncHandler from 'express-async-handler';
import STATUS_CODES from '../utils/StatusCodes.js';
import ordersService from '../services/ordersService.js';
import { c } from 'vitest/dist/reporters-5f784f42.js';


//OMS
const getOrderFromClient = asyncHandler(async (req, res) => {
  const { order } = req.body
  console.log('order in controler', order);
  try {
    const resOrder = await ordersService.sendToOmsAndDB(order);

    res.status(STATUS_CODES.CREATED).json(resOrder);

  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: 'An error occurred in the ordering process !!!', error });
    console.log(error);
  }
});

const checkDebitCard = asyncHandler(async (req, res) => {
  const debitCardDetails = req.body;
  console.log('credit in controler', debitCardDetails);

  setTimeout(() => {
    if (true) {
      res.status(200).json({ message: 'Credit card details are valid' });
    } else {
      res.status(400).json({ message: 'Invalid credit card details' });
    }
  }, 3000);
});

const getOrdersFromServer = asyncHandler(async (req, res) => {
  const { id } = req.params
  try {
    const data = await ordersService.getOrdersFromOms(id);
    res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    console.log(error);
  }
});



export default {
  getOrderFromClient, getOrdersFromServer, checkDebitCard
};
