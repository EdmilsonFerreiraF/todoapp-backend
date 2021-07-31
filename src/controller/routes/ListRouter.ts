import express from "express";
import listController from "../ListController";

export const listRouter = express.Router();

listRouter.post("/create", listController.createList);