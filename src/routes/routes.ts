import { Router } from "express";
import cardRouter from "../card/card.route";

const routes = Router();

routes.use("/card", cardRouter);

export default routes;
