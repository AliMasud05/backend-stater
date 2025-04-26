import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserServices } from "./user.services";

const createUser =catchAsync(async (req:Request, res:Response) => {
   
  const result =await UserServices.createUserIntoDb(req.body);
  console.log(result);
  sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message:
          "User created successfully! ",
        data:result,
      });

})

export const UserController = {
    createUser,
};
   