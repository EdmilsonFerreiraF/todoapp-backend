import mongoose from "mongoose";
const { Schema } = mongoose;

import BaseDatabase from "./BaseDatabase";
import { List } from "./model/List";

export class ListDatabase extends BaseDatabase {
   protected tableName: string = "list";
   protected listSchema = new Schema({
      id: String,
      userId: String,
      title: String,
      lists: [
         {
            id: String,
            title: String,
            repeat: [],
            reminder: String,
            expiresAt: Date,
            subtasks: [],
            isFinished: false
         }
      ]
   });

   public async createList(list: List): Promise<void> {
      try {
         const listDocument = {
            id: list.getId(),
            userId: list.getUserId(),
            title: list.getTitle(),
         };

         const conn = await BaseDatabase.connection;
         const ListModel = conn.model(this.tableName, this.listSchema);
         const m = new ListModel(listDocument);

         m.save(); // works

         BaseDatabase.closeConnection()
      } catch (error) {
         throw new Error(error.sqlMessage || error.message);
      };
   };
};

export default new ListDatabase();