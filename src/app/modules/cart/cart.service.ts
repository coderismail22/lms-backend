import { Cart } from "./cart.model";
import { Batch } from "../batch/batch.model";
import AppError from "../../errors/AppError";
import { Course } from "../course/course.model";

const addItemToCart = async (userId: string, batchId: string) => {
  console.log("check", userId, batchId);

  const batch = await Batch.findById(batchId);
  if (!batch) throw new AppError(404, "Batch not found");
  console.log("here is batch", batch);

  const existingItem = await Cart.findOne({
    userId,
    batchId,
  });

  if (existingItem) throw new AppError(400, "Item already exists in the cart");
  const course = await Course.findById(batch.courseId);

  if (!course) {
    throw new AppError(404, "Course not found");
  }
  console.log("here is course", course);
  const priceWithDiscount = course?.coursePrice - (batch?.discountPrice ?? 0);
  console.log(priceWithDiscount);
  return Cart.create({
    userId,
    batchId,
    courseId: batch?.courseId,
    price: priceWithDiscount,
  });
};

const getCartItems = async (userId: string) => {
  return Cart.find({ userId }).populate("batchId").populate("courseId");
};

const removeItemFromCart = async (userId: string, cartItemId: string) => {
  console.log(userId,cartItemId)
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
