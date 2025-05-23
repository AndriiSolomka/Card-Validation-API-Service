import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { SWAGGER_CONFIG } from "../config/swagger/swagger.config";

const docsRouter = Router();

const specs = swaggerJsdoc(SWAGGER_CONFIG);
docsRouter.use("/", swaggerUi.serve, swaggerUi.setup(specs));

export default docsRouter;
