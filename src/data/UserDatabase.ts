import mongoose from "mongoose";
import { LoginInputDTO } from "../business/entities/user";
const { Schema } = mongoose;

import BaseDatabase from "./BaseDatabase";
import { User } from "./model/User";

export class UserDatabase extends BaseDatabase {
   protected tableName: string = "users3";

   protected blogSchema = new Schema({
      id: String,
      firstName: String,
      lastName: String,
      username: String,
      email: {
         type: String,
         unique: true
      },
      password: String
   });

   private toModel(dbModel?: any): User {
      return (
         dbModel &&
         new User(
            dbModel.id,
            dbModel.firstName,
            dbModel.lastName,
            dbModel.username,
            dbModel.email,
            dbModel.password
         )
      );
   };

   public async createUser(input: User): Promise<void> {
      try {
         const userDocument = {
            id: input.getId(),
            firstName: input.getFirstName(),
            lastName: input.getLastName(),
            username: input.getUsername(),
            email: input.getEmail(),
            password: input.getPassword(),
         };

         const conn = await BaseDatabase.connection;
         const UserModel = conn.model(this.tableName, this.blogSchema);
         const NewUser = new UserModel(userDocument);

         NewUser.save();
      } catch (error) {
         throw new Error(error.statusCode);
      };
   };

   public async getUserByEmail(input: LoginInputDTO): Promise<User> {
      try {
         const conn = await BaseDatabase.connection;
         const UserModel = conn.model('users2', this.blogSchema);
         const user = await UserModel.where({email: input.email}).findOne({}).exec();

         return this.toModel(user);
      } catch (error) {
         throw new Error(error.statusCode);
      };
   };
};

export default new UserDatabase();