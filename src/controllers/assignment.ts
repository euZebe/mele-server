import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import {Assignment} from "../models/assignment";


export default class AssignmentController {

  public static async getAssignment(ctx: BaseContext) {
    const repository: Repository<Assignment> = getManager().getRepository(Assignment);
    // load all draws
    try{
      const assignment: Assignment = await repository.findOne(ctx.params.id, { relations: ['draw']});
      if (assignment) {
        ctx.status = 200;
        ctx.body = assignment;
      } else {
        ctx.status = 400;
        ctx.body = `no assignment found for the given ID: ${ctx.params.id}`;
      }
    } catch (e) {
      ctx.status = 400;
      ctx.body = e.message;
      // TODO: log error in file logger
    }
  }
}
