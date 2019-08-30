import "./env";
import "./db";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

const PORT = process.env.PORT;

const app = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated })
});

app.express.use(logger("dev"));
app.express.use(authenticateJwt);

app.start({ port: PORT }, () =>
  console.log(`Server running : http://localhost:${PORT}`)
);
