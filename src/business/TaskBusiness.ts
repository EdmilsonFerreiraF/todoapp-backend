import { CustomError } from "../errors/CustomError";
import { IdGenerator } from "./services/idGenerator";
import { AuthenticationData, TokenGenerator } from "./services/tokenGenerator";
import { TaskInputDTO } from "../data/model/Task";

export class TaskBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private tokenGenerator: TokenGenerator,
   ){};

   public async createTask(
      input: TaskInputDTO,
   ){
      try {
         if (!input.title) {
            throw new CustomError(422, "Missing input");
         };
         
         if (!input.token) {
            throw new CustomError(422, "Missing token");
         };
         
         const id: string = this.idGenerator.generate();
         
         const isTokenValid: AuthenticationData = this.tokenGenerator.verify(input.token.includes("Bearer") ? input.token.substring(7, input.token.length) as string : input.token);

         if (!isTokenValid) {
            throw new CustomError(409, "Invalid token");
         };
      } catch (error) {
         throw new CustomError(error.statusCode, error.message);
      };
   };
};

export default new TaskBusiness(new IdGenerator(), new TokenGenerator());