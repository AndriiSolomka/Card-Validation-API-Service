import * as fs from "fs";
import pino, { Logger, multistream, LoggerOptions } from "pino";

export function createPinoLogger(
  filePath: string,
  pretty: boolean = false,
  options: LoggerOptions = {},
): Logger {
  const streams: Array<{ stream: NodeJS.WritableStream }> = [
    { stream: fs.createWriteStream(filePath, { flags: "a" }) },
  ];

  if (pretty) {
    streams.push({
      stream: pino.transport({
        target: "pino-pretty",
        options: { colorize: true, singleLine: true },
      }) as unknown as NodeJS.WritableStream,
    });
  }

  return pino(
    {
      level: "info",
      timestamp: pino.stdTimeFunctions.isoTime,
      ...options,
    },
    multistream(streams),
  );
}
