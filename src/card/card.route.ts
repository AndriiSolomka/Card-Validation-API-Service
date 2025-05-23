import { Router } from "express";
import { cardController } from "./card.controller";
import { cardDtoValidation } from "../common/middlewares/validation/validate.card.dto";
import "../documentation/openapi/card.openapi";

const cardRouter = Router();

cardRouter.post("/validate", cardDtoValidation, cardController.validate);

export default cardRouter;
