import { body } from "express-validator";
import * as categoryController from "../../controllers/categoryController";
import express from "express";

export const categoryRouter = express.Router();

categoryRouter.get('/categories', categoryController.getAll);
categoryRouter.get('/categories/:uuid', categoryController.getByUuid);

categoryRouter.post(
  '/categories',
  [
    body('name')
      .notEmpty()
      .trim()
      .escape()
  ],
  categoryController.create
);

categoryRouter.put(
  '/categories/:uuid',
  [
    body('name')
      .notEmpty()
      .trim()
      .escape()
  ],
  categoryController.update
);

categoryRouter.delete('/categories/:uuid', categoryController.remove);