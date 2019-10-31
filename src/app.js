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

const PORT = process.env.PORT;

const app = express();
app.use(logger("dev"));
app.use(authenticateJwt);
//product 일시 주석처리할 것.
app.use("/playground", playground({ endpoint: "/graphql" }));

const server = new ApolloServer({
  schema,
  context: ({ req: request }) => {
    return { request, isAuthenticated };
  },
  persistedQueries: {
    cache: new RedisCache(process.env.REDIS_URL)
  },
  introspection: true,
  playground: false
});

server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`listening on port: http://localhost:${PORT}`)
);
