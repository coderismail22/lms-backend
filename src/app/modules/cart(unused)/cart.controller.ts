import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CartServices } from "./cart.service";
import httpStatus from "http-status";

// export const addToCart = catchAsync(async (req: Request, res: Response) => {
//   const userId = req?.user?.userId;
//   const { batchId } = req.body;
//   const cartItem = await CartServices.addItemToCart(userId, batchId);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: "Item added to cart",
//     data: cartItem,
//   });
// });

export const getCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  const cartItems = await CartServices.getCartItems(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart items fetched successfully",
    data: cartItems,
  });
});

export const removeFromCart = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req?.user?.userId;
    const { cartItemId } = req.params;

    await CartServices.removeItemFromCart(userId, cartItemId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Item removed from cart",
    });
  },
);

export const clearCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req?.user?.userId;

  await CartServices.clearCart(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart cleared successfully",
  });
});

export const CartControllers = {
  // addToCart,
  getCart,
  removeFromCart,
  clearCart,
};
