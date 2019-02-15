import { postgresDB } from "databases/postgres-db";
import * as cors from 'kcors';
import * as bodyParser from 'koa-bodyparser';
import { restRouter } from "./routes/rest-routes";

const app = require("./app");
const bootstrap = async () => {
  app.use(cors());

  // Initialize the database
  await postgresDB();

  // Enable bodyParser which is needed to work with information
  // passed to the server from the client requests
  app.use(bodyParser());

  //Tell our application to use the router we have created to handle routes for our rest api
  app.use(restRouter.routes(), restRouter.allowedMethods());

  //Tell the app to listen on port 3000
  app.listen(3000);
};
bootstrap();
