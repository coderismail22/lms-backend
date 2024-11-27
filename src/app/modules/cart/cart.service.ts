import { Cart } from "./cart.model";
import { Batch } from "../batch/batch.model";
import AppError from "../../errors/AppError";

const addItemToCart = async (userId: string, batchId: string) => {
  const batch = await Batch.findById(batchId);
  if (!batch) throw new AppError(404, "Batch not found");

  const existingItem = await Cart.findOne({ userId, batchId });
  if (existingItem) throw new AppError(400, "Item already exists in the cart");

  return Cart.create({
    userId,
    batchId,
    courseId: batch.courseId,
    price: batch.discountPrice || batch.price,
  });
};

const getCartItems = async (userId: string) => {
  return Cart.find({ userId }).populate("batchId").populate("courseId");
};

const removeItemFromCart = async (userId: string, cartItemId: string) => {
  const cartItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });
  if (!cartItem) throw new AppError(404, "Cart item not found");

  return cartItem;
};

const clearCart = async (userId: string) => {
  return Cart.deleteMany({ userId });
};

export const CartServices = {
  addItemToCart,
  getCartItems,
  removeItemFromCart,
  clearCart,
};
