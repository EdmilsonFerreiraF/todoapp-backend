import { Request, Response } from "express";
import { IdGenerator } from "../business/services/idGenerator";
import { TokenGenerator } from "../business/services/tokenGenerator";
import { TaskBusiness } from "../business/TaskBusiness";
import { getTaskInputDTO, TaskInputDTO } from "../data/model/Task";
import { TaskDatabase } from "../data/TaskDatabase";

const taskBusiness =
 new TaskBusiness(new IdGenerator(),
                  new TokenGenerator(),
                  new TaskDatabase());

export class TaskController {
   public async createTask(req: Request, res: Response) {
      try {
         const { title } = req.body;

         const input: TaskInputDTO = {
            title,
            token: req.headers.authorization as string
         };
         
         await taskBusiness.createTask({
            title: input.title,
            token: input.token
         });
      } catch (error) {
         const { statusCode, message } = error;
         console.log(statusCode || 400,{ message });

         res.status(statusCode || 400).send({ message });
      };
   };
};

export default new TaskController();