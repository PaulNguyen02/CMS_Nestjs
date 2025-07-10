import { ErrorMessage } from "../enums/response-code";
export const ERROR_MESSAGES_MAP: Record<string, string> = {
  'should not be empty': ErrorMessage.NOT_EMPTY,
  'must be a string': ErrorMessage.MUST_BE_STRING,
  'must be a number': ErrorMessage.MUST_BE_NUMBER,
  'must be a boolean': ErrorMessage.MUST_BE_BOOLEAN,
  'must be a UUID': ErrorMessage.MUST_BE_UUID
};