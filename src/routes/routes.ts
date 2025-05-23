import { Router } from "express";
import cardRouter from "../card/card.route";
import docsRouter from "../documentation/documentation.route";

const routes = Router();

routes.use("/card", cardRouter);
routes.use("/docs", docsRouter);

export default routes;
