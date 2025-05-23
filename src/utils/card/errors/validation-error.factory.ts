import { ValidationError } from "../../../constants/interfaces/card/card.interface";
import { FieldMessage } from "../../../constants/types/messages/messages.type";

export function createError(fieldMessage: FieldMessage): ValidationError {
  return { field: fieldMessage.FIELD, message: fieldMessage.MESSAGE };
}
