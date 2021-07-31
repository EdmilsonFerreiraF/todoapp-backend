import { Request, Response } from "express";
import { IdGenerator } from "../business/services/idGenerator";
import { TokenGenerator } from "../business/services/tokenGenerator";
import { ListBusiness } from "../business/ListBusiness";
import { ListInputDTO } from "../data/model/List";
import { ListDatabase } from "../data/ListDatabase";

const listBusiness =
 new ListBusiness(new IdGenerator(),
                  new TokenGenerator(),
                  new ListDatabase());

export class ListController {
   public async createList(req: Request, res: Response) {
      try {
         const { title } = req.body;

         const input: ListInputDTO = {
            title,
            token: req.headers.authorization as string
         };
         
         await listBusiness.createList({
            title: input.title,
            token: input.token
         });

         res.status(200).send("List created successfully");
      } catch (error) {
         const { statusCode, message } = error;
         console.log(statusCode || 400,{ message });

         res.status(statusCode || 400).send({ message });
      };
   };
};

export default new ListController();