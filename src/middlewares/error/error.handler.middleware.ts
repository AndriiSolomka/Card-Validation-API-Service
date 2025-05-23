/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { appLoggerService } from "../../logger/logger.service";

export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  appLoggerService.error(`Error: ${err}`);
  res.status(500).json({ error: "Internal Server Error" });
}
