import { NextFunction, Request, Response } from "express";

export const notFound = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

export const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(error);

  if (error.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: Object.values(error.errors).map((err: any) => err.message),
    });
    return;
  }

  if (error.code === 11000) {
    res.status(400).json({
      success: false,
      message: "Duplicate field value entered",
    });
    return;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal server error",
  });
};