import { cardService } from "./card.service";
import { CardDto } from "./dto/card.dto";
import { HTTP_STATUS } from "../constants/enums/http/http.enum";
import { ExpressHandler } from "../constants/types/controllers/controller.type";

class CardController {
  validate: ExpressHandler = async (req, res, next) => {
    try {
      const result = await cardService.validateCard(req.body as CardDto);
      res.status(HTTP_STATUS.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const cardController = new CardController();
