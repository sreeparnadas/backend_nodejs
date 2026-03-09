import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  if (err.code === "P2025") {
    res.status(404).json({ success: false, error: "Record not found" });
    return;
  }

  if (err.code === "P2003") {
    res
      .status(400)
      .json({
        success: false,
        error: "Invalid foreign key — related record does not exist",
      });
    return;
  }

  if (err.code === "P2002") {
    res
      .status(409)
      .json({
        success: false,
        error: "Duplicate entry — record already exists",
      });
    return;
  }

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
};