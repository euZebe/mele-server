import { BaseContext } from "koa";
import { getConnection } from "typeorm";
import { Draw } from "models/draw";
//Creating a class so we can later extend it to include creation of more test data
export class TestData {
  //This handles creating test draws. Seperate functions can be added for other test data later.
  public static async createTestDraws(ctx: BaseContext) {
    try {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Draw)
        .values([
          {
            name: "Noël Martineau 2019",
          },
          {
            name: "Noël Martineau 2018",
          },
        ])
        .execute();
      //Return a success message if theer are no errors
      ctx.body = "Test draws created successfully";

      //Catch any errors and return a 500 error status to the user is there are errors
    } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
        message: err.message
      };
    }
  }
}
