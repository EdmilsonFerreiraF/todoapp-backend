import express from "express";
import taskController from "../TaskController";

export const taskRouter = express.Router();

taskRouter.post("/create", taskController.createTask);