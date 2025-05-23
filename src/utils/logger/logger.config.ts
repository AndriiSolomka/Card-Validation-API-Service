import * as path from "path";
import * as fs from "fs";

export const LOG_DIR = path.resolve(process.cwd(), "logs");
export const APP_LOG_FILE_PATH = path.join(LOG_DIR, "app.log");
export const HTTP_LOG_FILE_PATH = path.join(LOG_DIR, "http.log");

export function ensureLogDirsExists(): void {
  const logDirs = [
    path.dirname(APP_LOG_FILE_PATH),
    path.dirname(HTTP_LOG_FILE_PATH),
  ];

  logDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
}
