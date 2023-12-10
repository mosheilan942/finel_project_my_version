import cors from "cors";
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
import { ApolloServer } from "@apollo/server";
import { WebSocketServer } from "ws";
import { createServer } from "http";
import { useServer } from "graphql-ws/lib/use/ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
config();

const app = express();

app.use(
    cors({
        origin: "*",
    })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHandler);

// app.use("/users", userRoutes);
// app.use("/users", cartRoutes);
// app.use("/products", productRoutes);
// app.use("/orders", ordersRouter);
// app.use("/banner", bannerRoutes);
// export const categoryUse =  app.use("/", categoryRoutes);


const port = 5000;

const schema = makeExecutableSchema({ typeDefs, resolvers });

const httpServer = createServer(app);

const apolloServer = new ApolloServer({
    schema,
    plugins: [
        // Proper shutdown for the HTTP server.
        ApolloServerPluginDrainHttpServer({ httpServer }),

        // Proper shutdown for the WebSocket server.
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await wsServerCleanup.dispose();
                    },
                };
            },
        },
    ],
});

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
});

const wsServerCleanup = useServer({ schema }, wsServer);

export const connectionString = process.env.CONNECTION_STRING;

(async function () {
    await apolloServer.start();
    app.use("/graphql", expressMiddleware(apolloServer));
    
    const pool = new Pool();
    const res = await pool.connect();
    res.release();
    console.log(`Database connection test completed successfully`);
})();

httpServer.listen(port, () => {
    console.log(`🚀 Query endpoint ready at http://localhost:${port}/graphql`);
    console.log(
        `🚀 Subscription endpoint ready at ws://localhost:${port}/graphql`
    );
});
