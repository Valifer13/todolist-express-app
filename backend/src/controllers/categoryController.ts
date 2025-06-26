import { Request, Response } from "express";
import * as categoryService from "../services/categoryService";
import { sendResponse } from "../utils/response";
import { v4 as uuidv4 } from "uuid";

export const getAll = async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategory(req.user.id);
  sendResponse(res, 200, {
    success: true,
    message: `Retrieve all categories with userId = ${req.user.id}`,
    data: {
      categories,
    },
  });
}

export const getByUuid = async (req: Request, res: Response) => {
  const category = await categoryService.getCategory(req.params.uuid);
  if (!category) {
    sendResponse(res, 404, {
      success: false,
      message: `Category with uuid = ${req.params.uuid} not found`
    })
  }

  sendResponse(res, 200, {
    success: true,
    message: `Get category with uuid = ${req.params.uuid}`,
    data: {
      category
    }
  })
}

export const create = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory({
      name: req.body.name,
      uuid: uuidv4(),
      userId: req.user.id
    })
    sendResponse(res, 201, {
      success: true,
      message: "Category created",
      data: {
        category
      }
    })
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
    const currentCategory = await categoryService.getCategory(req.params.uuid);

    if (!currentCategory) {
      throw new Error(`Category with uuid = ${req.params.uuid} not found`);
    }

    const updatedCategory = await categoryService.updateCategory({
      name: req.body.name,
      uuid: currentCategory.uuid,
      userId: req.user.id
    }, req.params.uuid)

    sendResponse(res, 200, {
      success: true,
      message: `Category with uuid = ${req.params.uuid} updated successfully`,
      data: {
        currentCategory,
        updatedCategory
      }
    })
  } catch (e) {
    sendResponse(res, res.statusCode, {
      success: false,
      message: "Category failed to be updated",
      error: {
        errors: e
      }
    })
  }
}

export const remove = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteCategory(req.params.uuid);
    sendResponse(res, 200, {
      success: true,
      message: "Category deleted successfully",
    })
  } catch (e) {
    sendResponse(res, res.statusCode, {
      success: false,
      message: "Category failed to be deleted",
      error: {
        errors: e
      }
    })
  }
}