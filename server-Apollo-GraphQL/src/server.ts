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


const port = 5000;
export const connectionString = process.env.CONNECTION_STRING;
//await connectDB();
app.listen(port, async () => {
  const pool = new Pool();
  const res = await pool.connect();
  res.release();
  console.log(`\n\nDatabase connection test completed successfully`);
  console.log(`\nServer is running at port ${port}...`);
});


// =====================================================================


// server.ts

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { userTypeDefs } from "./GraphQL/schema/userSchema.js";
import { userResolvers } from "./GraphQL/resolvers/userResolvers.js";
import { productTypeDefs } from "./GraphQL/schema/productSchema.js";
import { productResolvers } from "./GraphQL/resolvers/productResolvers.js";

const startServer = async (server: ApolloServer<any>, port: number) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

const createApolloServer = (typeDefs: any, resolvers: any) => {
  return new ApolloServer({ typeDefs, resolvers });
};

const userServer = createApolloServer(userTypeDefs, userResolvers);
const productServer = createApolloServer(productTypeDefs, productResolvers);

const servers = [
  { server: userServer, port: 1000 },
  { server: productServer, port: 2000 },
];

servers.forEach(({ server, port }) => {
  startServer(server, port);
});
