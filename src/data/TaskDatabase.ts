import mongoose from "mongoose";
const { Schema } = mongoose;

import BaseDatabase from "./BaseDatabase";
import { Task } from "./model/Task";

export class TaskDatabase extends BaseDatabase {
   protected tableName: string = "task";
   protected taskSchema = new Schema({
      id: String,
      title: String,
      userId: String,
      tasks: [
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

   public async createTask(task: Task): Promise<void> {
      try {
         const taskDocument = {
            id: task.getId(),
            userId: task.getUserId(),
            title: task.getTitle(),
            repeat: task.getRepeat(),
            reminder: task.getReminder(),
            expiresAt: task.getExpiresAt(),
            subtasks: task.getSubtasks(),
            isFinished: task.getIsFinished(),
         };

         const conn = await BaseDatabase.connection;
         const TaskModel = conn.model(this.tableName, this.taskSchema);
         const m = new TaskModel(taskDocument);

         m.save(); // works

         BaseDatabase.closeConnection()
      } catch (error) {
         throw new Error(error.sqlMessage || error.message);
      };
   };
};

export default new TaskDatabase();