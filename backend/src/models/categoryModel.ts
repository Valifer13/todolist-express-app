import prisma from "../prisma/client";

export type CategoryType = {
  name: string;
  uuid: string;
  userId: number;
};

export const getAllCategoryByUserId = async (userId: number) => {
  return prisma.category.findMany({
    where: {
      userId,
    },
  });
};

export const getCategoryById = async (id: number) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

export const getCategoryByUuid = async (uuid: string) => {
  return prisma.category.findUnique({
    where: {
      uuid,
    },
  });
};

export const createCategory = async (data: CategoryType) => {
  return prisma.category.create({
    data,
  });
};

export const updateCategoryById = async (data: CategoryType, id: number) => {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

export const updateCategoryByUuid = async (data: CategoryType, uuid: string) => {
  return prisma.category.update({
    where: {
      uuid,
    },
    data,
  });
};

export const deleteCategoryById = async (id: number) => {
  return prisma.category.delete({
    where: {
      id,
    },
  });
};

export const deleteCategoryByUuid = async (uuid: string) => {
  return prisma.category.delete({
    where: {
      uuid,
    },
  });
};