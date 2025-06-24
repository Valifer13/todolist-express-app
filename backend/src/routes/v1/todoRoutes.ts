import express from 'express';
import * as todoController from "../../controllers/todoController";
import { body } from 'express-validator';

export const todoRouter = express.Router();

todoRouter.get('/todos', todoController.getAll);

todoRouter.post('/todos',
  [
    body("name")
      .notEmpty()
      .trim()
      .escape(),
    body("description")
      .trim()
      .escape(),
    body("status")
      .notEmpty()
      .trim()
      .escape(),
    body("dueDate")
      .isDate(),
    body("priority")
      .notEmpty()
      .trim()
      .escape(),
    body("categoryId")
      .isNumeric(),
  ],
  todoController.create);