import prisma from "../prisma/client";

type Status = "PENDING" | "IN_PROGRESS" | "COMPLETE" | "CANCELED";
type Priority = "LOW" | "MEDIUM" | "HIGH";

export type TodoType = {
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

export const createTodo = async (data: TodoType) => {
  return prisma.todo.create({
    data,
  });
};

export const createManyTodo = async (data: TodoType[]) => {
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

export const updateTodoById = async (data: TodoType, id: number) => {
  return prisma.todo.update({
    where: {
      id,
    },
    data,
  });
};

export const updateTodoByUuid = async (data: TodoType, uuid: string) => {
  return prisma.todo.update({
    where: {
      uuid,
    },
    data,
  });
};

export const deleteTodoById = async (id: number) => {
  return prisma.todo.delete({
    where: {
      id,
    },
  });
};

export const deleteTodoByUuid = async (uuid: string) => {
  return prisma.todo.delete({
    where: {
      uuid,
    },
  });
};
