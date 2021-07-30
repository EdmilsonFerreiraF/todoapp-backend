import { Request, Response } from "express";
import { TaskInputDTO } from "../data/model/Task";

export class TaskController {
   public async createTask(req: Request, res: Response) {
      try {
         const { title } = req.body;

         const input: TaskInputDTO = {
            title,
            token: req.headers.authorization as string
         };
      } catch (error) {
         const { statusCode, message } = error;
         console.log(statusCode || 400,{ message });

         res.status(statusCode || 400).send({ message });
      };
   };
};

export default new TaskController();