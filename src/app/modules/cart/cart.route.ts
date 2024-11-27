import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { CartValidations } from "./cart.validation";
import { CartControllers } from "./cart.controller";

const router = express.Router();

router.post(
  "/",
  auth("student"),
  validateRequest(CartValidations.addToCartValidationSchema),
  CartControllers.addToCart,
);

router.get("/", auth("student"), CartControllers.getCart);
router.delete("/:cartItemId", auth("student"), CartControllers.removeFromCart);
router.delete("/", auth("student"), CartControllers.clearCart);

export const CartRoutes = router;
