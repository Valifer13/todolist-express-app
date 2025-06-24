import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import * as todoService from "../services/todoService";
import { sendResponse } from "../utils/response";

export const getAll = async (req: Request, res: Response) => {
  const todos = await todoService.getAllTodo(req.user.id);
  sendResponse(res, 200, {
    success: true,
    message: `Retrieve all todos with userId = ${req.user.id}`,
    data: todos
  });
}

export const getByUuid = async (req: Request, res: Response) => {
  const todo = await todoService.getTodo(req.params.uuid);
  if (!todo) {
    sendResponse(res, 404, {
      success: false,
      message: "Todo not found!",
    })
  }
  sendResponse(res, 200, {
    success: true,
    message: `Retrieve todo with uuid = ${req.params.uuid}`,
    data: todo
  });
}

export const create = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.createTodo({
      name: req.body.name,
      uuid: uuidv4(),
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      categoryId: req.body.categoryId,
      userId: req.user.id
    })

    sendResponse(res, 201, {
      success: true,
      message: "New todo created",
      data: todo
    });
  } catch (e) {
    sendResponse(res, res.statusCode, {
      success: false,
      message: res.statusMessage,
      error: {
        errors: e
      }
    })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const todo = await todoService.updateTodo({
      name: req.body.name,
      uuid: uuidv4(),
      description: req.body.description,
      status: req.body.status,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      categoryId: req.body.categoryId,
      userId: req.user.id
    }, req.params.uuid)

    sendResponse(res, 200, {
      success: true,
      message: "Todo updated successfully",
      data: todo
    })
  } catch (e) {
    sendResponse(res, res.statusCode, {
      success: false,
      message: "Todo failed to be updated",
      error: {
        errors: e
      }
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    await todoService.deleteTodo(req.params.uuid);
    sendResponse(res, 200, {
      success: true,
      message: "Todo deleted successfully",
    })
  } catch (e) {
    sendResponse(res, res.statusCode, {
      success: false,
      message: "Todo failed to be deleted",
      error: {
        errors: e
      }
    })
  }
} 