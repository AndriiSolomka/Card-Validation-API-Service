import dotenv from "dotenv";
dotenv.config();
import { APP_CONFIG } from "./app/app.config";
import { REDIS_CONFIG } from "./redis/redis.config";

export { APP_CONFIG, REDIS_CONFIG };
