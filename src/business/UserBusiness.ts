import { HashGenerator } from "./services/hashGenerator";
import { IdGenerator } from "./services/idGenerator";
import { TokenGenerator } from "./services/tokenGenerator";

import { User } from "../data/model/User";
import { UserDatabase } from "../data/UserDatabase";

import { CustomError } from "../errors/CustomError";
import { SignupInputDTO } from "./entities/user";

export class UserBusiness {
   constructor(
      private idGenerator: IdGenerator,
      private hashGenerator: HashGenerator,
      private userDatabase: UserDatabase,
      private tokenGenerator: TokenGenerator
   ){};

   public async createUser(
      input: SignupInputDTO
   ) {
      try {
         if (
            !input.firstName ||
            !input.lastName ||
            !input.nickname ||
            !input.email ||
            !input.password
         ) {
            throw new CustomError(422, "Missing input");
         };

         if (input.email.indexOf("@") === -1) {
            throw new CustomError(422, "Invalid email address");
         };

         if (input.password.length < 6) {
            throw new CustomError(422, "Password must be more or equal than 6 characters length");
         };

         const id = this.idGenerator.generate();

         const cypherPassword = await this.hashGenerator.hash(input.password);

         await this.userDatabase.createUser(
            new User(
               id,
               input.firstName,
               input.lastName,
               input.nickname,
               input.email,
               cypherPassword
            )
         );

         const token = this.tokenGenerator.generate({
            id,
            nickname: input.nickname
         });

         return { token };
      } catch (error) {
         throw new CustomError(error.statusCode, error.message);
      };
   };
};

export default new UserBusiness(new IdGenerator(), new HashGenerator(), new UserDatabase(), new TokenGenerator());