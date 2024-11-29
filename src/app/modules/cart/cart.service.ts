import { Cart } from "./cart.model";
import { Batch } from "../batch/batch.model";
import AppError from "../../errors/AppError";
import { Course } from "../course/course.model";

// const addItemToCart = async (userId: string, batchId: string) => {
//   // Fetch the batch and course details
//   const batch = await Batch.findById(batchId);
//   if (!batch) throw new AppError(404, "Batch not found");

//   const course = await Course.findById(batch.courseId);
//   if (!course) throw new AppError(404, "Course not found");

//   // Find the user's cart
//   const cart = await Cart.findOne({ userId });

//   if (!cart) {
//     // If no cart exists, create one with the batch
//     return Cart.create({
//       userId,
//       items: [
//         {
//           batchId,
//           courseId: batch.courseId,
//           price: batch?.price, // assume price is fetched from batch
//           quantity: 1, // always 1
//         },
//       ],
//     });
//   }

//   // Check if the batch is already in the cart
//   const existingItem = cart.items.find(
//     (item) => item.batchId.toString() === batchId,
//   );
//   if (existingItem) {
//     // If batch already exists, do nothing or show a message
//     throw new AppError(400, "This batch is already in your cart");
//   }

//   // If batch does not exist in the cart, add it
//   cart?.items?.push({
//     batchId,
//     courseId: batch.courseId,
//     price: batch.price,
//     quantity: 1, // always 1
//   });

//   return cart.save(); // save updated cart
// };

const getCartItems = async (userId: string) => {
  return Cart.find({ userId }).populate("batchId").populate("courseId");
};

const removeItemFromCart = async (userId: string, cartItemId: string) => {
  console.log(userId, cartItemId);
  const cartItem = await Cart.findOneAndDelete({ _id: cartItemId, userId });
  if (!cartItem) throw new AppError(404, "Cart item not found");

  return cartItem;
};

const clearCart = async (userId: string) => {
  return Cart.deleteMany({ userId });
};

export const CartServices = {
  // addItemToCart,
  getCartItems,
  removeItemFromCart,
  clearCart,
};
