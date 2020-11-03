import "./env";
import "./db";
import express from "express";
import playground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import { RedisCache } from "apollo-server-cache-redis";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import { express as voyagerMiddleware } from "graphql-voyager/middleware";

const PORT = process.env.PORT;

const app = express();
app.use(logger("dev"));
app.use(authenticateJwt);
//product 일시 주석처리할 것.
// app.use("/playground", playground({ endpoint: "/graphql" }));
// app.use("/model", voyagerMiddleware({ endpointUrl: "/graphql" }));

const server = new ApolloServer({
  schema,
  context: ({ req: request }) => {
    return { request, isAuthenticated };
  },
  // persistedQueries: {
  //   cache: new RedisCache({
  //     connectTimeout: 5000,
  //     reconnectOnError: err => {
  //       console.log("Reconnect on error", err);
  //       var targetError = "READONLY";
  //       if (err.message.slice(0, targetError.length) === targetError) {
  //         // Only reconnect when the error starts with "READONLY"
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     },
  //     retryStrategy: times => {
  //       console.log("Redis Retry", times);
  //       if (times >= 3) {
  //         return undefined;
  //       }
  //       var delay = Math.min(times * 50, 2000);
  //       return delay;
  //     },
  //     socket_keepalive: false,
  //     host: process.env.REDIS_HOST || "127.0.0.1",
  //     port: process.env.REDIS_PORT || 6379,
  //     password: process.env.REDIS_PASSWORD || ""
  //   })
  // },
  introspection: true,
  playground: false,
});

server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`listening on port: http://localhost:${PORT}`)
);
