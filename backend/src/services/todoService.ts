import * as todoModel from "../models/todoModel";

export const createTodo = async (data: todoModel.TodoType) => {
  // if (data.length > 1) {
  //   return await todoModel.createManyTodo(data);
  // }
  return await todoModel.createTodo(data);
}

export const getAllTodo = async (userId: number) => {
  return await todoModel.getAllTodoByUserId(userId);
}

export const getTodo = async (data: number | string) => {
  if (typeof data === "string") {
    return await todoModel.getTodoByUuid(data);
  }
  return await todoModel.getTodoById(data);
}

export const updateTodo = async (data: todoModel.TodoType, uuid: string) => {
  return await todoModel.updateTodoByUuid(data, uuid);
}

export const deleteTodo = async (uuid: string) => {
  return await todoModel.deleteTodoByUuid(uuid);
}