import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { Draw } from "models/draw";

function generateDraw(participantNames: any, name: any) {
  const assignments = participantNames.map((p, index) => ({
    from: p,
    to:
        index === 0
            ? participantNames[participantNames.length - 1]
            : participantNames[index - 1]
  }));

  const drawToBeSaved = new Draw();
  drawToBeSaved.name = name;
  drawToBeSaved.assignments = assignments;
  return drawToBeSaved;
}

export default class DrawController {
  public static async getDraws(ctx: BaseContext) {
    // get a draw repository to perform operations with draw
    const drawRepository: Repository<Draw> = getManager().getRepository(Draw);
    // load all draws
    const draws: Draw[] = await drawRepository.find({relations: ['assignments']});
    // return OK status code and loaded draws array
    ctx.status = 200;
    ctx.body = draws;
  }

  public static async getDraw(ctx: BaseContext) {
    // get a draw repository to perform operations with draw
    const drawRepository: Repository<Draw> = getManager().getRepository(Draw);
    // load all draws
    const draw: Draw = await drawRepository.findOne(ctx.params.id, {relations: ['assignments']});
    if (draw) {
      // return OK status code and loaded draw
      ctx.status = 200;
      ctx.body = draw;
    } else {
      ctx.status = 400;
      ctx.body = `no draw found for the given ID: ${ctx.params.id}`;
    }
  }

  public static async addDraw(ctx: BaseContext) {
    const drawRepository: Repository<Draw> = getManager().getRepository(Draw);

    const { name, participantNames, allowedAssignments } = ctx.request.body;
    const drawToBeSaved = generateDraw(participantNames, name);

    // validate draw entity
    const errors: ValidationError[] = await validate(drawToBeSaved, {
      skipMissingProperties: true
    }); // errors is an array of validation errors
    if (errors.length > 0) {
      // return BAD REQUEST status code and errors array
      ctx.status = 400;
      ctx.body = errors;
    } else {
      // save the draw contained in the POST body
      const draw = await drawRepository.save(drawToBeSaved);

      // return CREATED status code and updated draw
      ctx.status = 201;
      ctx.body = draw ;
    }
  }
}
