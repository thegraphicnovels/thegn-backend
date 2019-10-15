import "./env";
import "./db";
import express from "express";
import playground from "graphql-playground-middleware-express";
import { ApolloServer } from "apollo-server-express";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import EnhancedRedis from "./enhancedRedis";

const PORT = process.env.PORT;

const app = express();
app.use(logger("dev"));
app.use(authenticateJwt);
//product 일시 주석처리할 것.
app.use("/playground", playground({ endpoint: "/graphql" }));

const server = new ApolloServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
  persistedQueries: {
    cache: new EnhancedRedis()
  }
  // playground: false
});

server.applyMiddleware({ app });

app.listen(PORT, () =>
  console.log(`listening on port: http://localhost:${PORT}`)
);
