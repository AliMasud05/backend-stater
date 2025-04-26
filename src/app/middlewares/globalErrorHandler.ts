// app/middlewares/globalErrorHandler.ts

import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const globalErrorHandler = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  console.error(err);  // Log the error

  // Handle different types of errors
  if (err.isOperational) {
    // Operational errors (expected errors)
    return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: err.message || 'An error occurred',
      errorMessages: err.errors || [],
    });
  }

  // For unexpected errors (programming errors)
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong',
    errorMessages: [{ message: 'Unexpected error occurred' }],
  });
};

export default globalErrorHandler;