import mongoose from "mongoose";
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
};

export default new UserDatabase();