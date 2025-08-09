import express from 'express';
import * as todoController from "../../controllers/todoController";
import { body } from 'express-validator';

export const todoRouter = express.Router();

todoRouter.get('/todos', todoController.getAll);

todoRouter.get('/todos/:uuid', todoController.getByUuid);

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
      .notEmpty().withMessage("Due date must be not empty")
      .isISO8601().withMessage("Due date must be a valid date"),
    body("priority")
      .notEmpty()
      .trim()
      .escape(),
    body("categoryId")
      .isNumeric(),
  ],
  todoController.create
);

todoRouter.put('/todos/:uuid',
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
  todoController.update
);

todoRouter.delete('/todos/:uuid', todoController.remove);