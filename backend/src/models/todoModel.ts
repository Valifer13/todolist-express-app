import prisma from "../prisma/client";

type Status = "PENDING" | "IN_PROGRESS" | "COMPLETE" | "CANCELED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

interface TodoInterface {
  name: string;
  uuid: string;
  description?: string;
  status: Status;
  dueDate?: Date;
  priority: Priority;
  categoryId?: number;
  userId: number;
}

export const getAllTodoByUserId = async (id: number) => {
  return prisma.todo.findMany({
    where: {
      userId: id,
    },
  });
};

export const createTodo = async (data: TodoInterface) => {
  return prisma.todo.create({
    data,
  });
};

export const createManyTodo = async (data: TodoInterface[]) => {
  return prisma.todo.createMany({
    data,
  });
};

export const getTodoById = async (id: number) => {
  return prisma.todo.findUnique({
    where: {
      id,
    },
  });
};

export const getTodoByUuid = async (uuid: string) => {
  return prisma.todo.findUnique({
    where: {
      uuid,
    },
  });
};

export const updateTodoById = async (data: TodoInterface, id: number) => {
  return prisma.todo.update({
    where: {
      id,
    },
    data,
  });
};

export const updateTodoByUuid = async (data: TodoInterface, uuid: string) => {
  return prisma.todo.update({
    where: {
      uuid,
    },
    data,
  });
};