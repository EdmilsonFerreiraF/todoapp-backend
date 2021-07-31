import { IdGenerator } from "./services/idGenerator";
import { AuthenticationData, TokenGenerator } from "./services/tokenGenerator";
import { ListDatabase } from "../data/ListDatabase";
import { List, ListInputDTO } from "../data/model/List";
import { CustomError } from "../errors/CustomError";

export class ListBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private tokenGenerator: TokenGenerator,
      private listDatabase: ListDatabase
   ){};

   public async createList(
      input: ListInputDTO,
   ){
      try {
         if (
            !input.title
            ) {
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

         const list = await this.listDatabase.createList(
            new List(
               id,
               isTokenValid.id,
               input.title,
            )
         );

         return { list }
      } catch (error) {
         throw new CustomError(error.statusCode, error.message);
      };
   };
}
export default new ListBusiness(new IdGenerator(), new TokenGenerator(), new ListDatabase());