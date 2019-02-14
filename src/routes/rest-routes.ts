import * as Router from "koa-router";
// TODO: replace "require"
import controller = require("controllers");

export const restRouter = new Router();

//Routes for the draw entity
restRouter.get("/draws", controller.draw.getDraws); //Get all draws in the database
restRouter.get("/draws/:id", controller.draw.getDraw); //Get all draws in the database
restRouter.post("/draws", controller.draw.addDraw); //Get all draws in the database
