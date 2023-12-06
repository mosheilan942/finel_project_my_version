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


// ==========================================================================
// ==========================================================================

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// TypeDefs.
import { userTypeDefs } from "./GraphQL/schema/userSchema.js";
import { productTypeDefs } from "./GraphQL/schema/productSchema.js";

// Resolvers.
import { userResolvers } from "./GraphQL/resolvers/userResolvers.js";
import { productResolvers } from "./GraphQL/resolvers/productResolvers.js";


// Combining type definitions from user and product schemas
const typeDefs = `
  ${userTypeDefs} 
  ${productTypeDefs}
`;

// Combining resolver objects for users and products
const resolvers = {
  Query: {
    ...userResolvers.Query,
  ...productResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};


// Creating a new ApolloServer instance with type definitions and resolvers
const server = new ApolloServer({ typeDefs, resolvers });


// Function to start the server on a specified port
const startServer = async (server: ApolloServer<any>, port: number) => {
  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  // Logging the server's URL once it's ready
  console.log(`🚀  Server ready at: ${url}`);
};

// Port.
const PORT = 3000;

// Start server.
startServer(server, PORT)
