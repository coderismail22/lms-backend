import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryControllers } from "./category.controller";
import { CategoryValidations } from "./category.validation";

const router = express.Router();

router.post(
  "/create-category",
  validateRequest(CategoryValidations.createCategoryValidationSchema),
  CategoryControllers.createCategory,
);

router.get("/:categoryId", CategoryControllers.getCategory);
router.get("/", CategoryControllers.getAllCategories);

router.patch(
  "/update-category/:categoryId",
  validateRequest(CategoryValidations.updateCategoryValidationSchema),
  CategoryControllers.updateCategory,
);

router.delete("/:categoryId", CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
