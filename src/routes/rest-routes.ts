import * as Router from "koa-router";
// TODO: replace "require"
import controller = require("controllers");

export const restRouter = new Router();

//Routes for the draw entity
restRouter.get("/draws", controller.draw.getDraws);
restRouter.get("/draws/:id", controller.draw.getDraw);
restRouter.post("/draws", controller.draw.addDraw);

//Routes for the assignment entity
restRouter.get("/assignments/:id", controller.assignment.getAssignment);
