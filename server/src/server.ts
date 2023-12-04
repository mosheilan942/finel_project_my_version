import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import { errorHandler, notFound } from "./middlewares/errorsMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import pg from "pg";
const { Pool } = pg;
import { config } from "dotenv";
import ordersRouter from "./routes/ordersRouets.js";
import bannerRoutes from "./routes/bannerRouetes.js";
config();

const app = express();

// APP CONFIGS
// console.log(process.env);
app.use(
    cors({
        origin: "*",
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/users", userRoutes);
app.use("/users", cartRoutes);
app.use("/products", productRoutes);
app.use("/orders", ordersRouter);
app.use("/banner", bannerRoutes);
app.use("/", categoryRoutes);

app.use(errorHandler);

// app.post('/api/payment/check', (req, res) => {
//   const debitCardDetails = req.body;
//   setTimeout(() => {
//     console.log(debitCardDetails);
//     if (true) {
//       res.status(200).json({ message: 'Credit card details are valid' });
//     } else {
//       res.status(400).json({ message: 'Invalid credit card details' });
//     }
//   }, 3000);
// });

// // Order.
// app.post('/api/payment/order', (req, res) => {
//   const order = req.body;
//   setTimeout(() => {
//     console.log(order);
//     if (true) {
//       res.status(200).json({ message: 'The order has been placed !', orderID: order.paymentPayPal?.orderID ? order.paymentPayPal?.orderID : "876df86sfsYGUG8979" });
//     } else {
//       res.status(400).json({ message: 'An error occurred in the ordering process !!!' });
//     }
//   }, 3000);
// });

const port = 5000;
export const connectionString = process.env.CONNECTION_STRING;
//await connectDB();
app.listen(port, async () => {
    const pool = new Pool();
    const res = await pool.connect();
    res.release();
    console.log(`Database connection test completed successfully`);
    console.log(`\nServer is running at port ${port}...`);
});
