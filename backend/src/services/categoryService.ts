import * as categoryModel from "../models/categoryModel";

export const getCategory = async (uuid: string) => {
  return await categoryModel.getCategoryByUuid(uuid);
}

export const getAllCategory = async (userId: number) => {
  return await categoryModel.getAllCategoryByUserId(userId);
}

export const createCategory = async (data: categoryModel.CategoryType) => {
  return await categoryModel.createCategory(data);
}

export const updateCategory = async (data: categoryModel.CategoryType, uuid: string) => {
  return await categoryModel.updateCategoryByUuid(data, uuid);
}

export const deleteCategory = async (uuid: string) => {
  return await categoryModel.deleteCategoryByUuid(uuid);
} 