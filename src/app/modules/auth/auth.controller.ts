import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
// import { User } from "../user/user.model";
import { AuthServices } from "./auth.service";
import catchAsync from "../../utils/catchAsync";
import config from "../../config";

// login controller
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
    // sameSite: "Strict", // Prevent CSRF
    path: "/", // Cookie available site-wide
    maxAge: 7 * 24 * 60 * 60 * 1000, // Optional: 7 days
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Login successful",
    data: {
      accessToken,
      refreshToken,
    },
  });
});

// change password controller
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const accessToken = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token has been retrieved successfully.",
    data: accessToken,
  });
});

//TODO: make a logout endpoint that invalidates the refresh token*

// change password controller
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePassword(req.user, passwordData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password has been updated successfully.",
    data: result,
  });
});
// forgot password (UI link generation)
const forgotPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgotPassword(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset link has been generated successfully.",
    data: result,
  });
});

// reset password
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password has been reset successfully.",
    data: result,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  refreshToken,
  forgotPassword,
  resetPassword,
};
