import * as Router from "koa-router";
import createTestData = require("test/createTestData");
export const testRouter = new Router();
//Routes for the user entity
testRouter.post("/test/draws", createTestData.TestData.createTestDraws); //Create some test users
