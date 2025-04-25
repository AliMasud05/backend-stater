import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";

const createUser =catchAsync(async (req:Request, res:Response) => {
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:
          "User created successfully! An OTP has been sent to your email address. Please verify your email to activate your account.",
        data: {
            user:"user created",
            email:"email created",
            password:"password created",
        },
      });

})

export const UserController = {
    createUser,
};
   