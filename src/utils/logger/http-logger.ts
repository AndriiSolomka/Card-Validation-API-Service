import { Request, Response } from "express";
import { Logger } from "pino";

export function logHttpRequest(
  req: Request,
  res: Response,
  start: number,
  logger: Logger,
): void {
  const duration = Date.now() - start;

  const logData = {
    req: {
      method: req.method,
      url: req.originalUrl,
      query: req.query,
      params: req.params,
      headers: req.headers,
      remoteAddress: req.socket.remoteAddress,
      remotePort: req.socket.remotePort,
    },
    res: {
      statusCode: res.statusCode,
      headers: res.getHeaders(),
    },
    responseTime: duration,
  };

  logger.info({ ...logData }, "request completed");
}
