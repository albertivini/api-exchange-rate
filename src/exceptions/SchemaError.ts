import { HTTP_STATUS_CODE } from "../constants/HttpStatusCode";
import { ICodeMessages } from "../interfaces/ICodeMessages";

export class SchemaValidatorError extends Error {
    statusCode: number;

    code: string;

    constructor({ code, message }: ICodeMessages) {
      super(`Schema Validator Error: ${message}`);
      this.name = 'SchemaValidatorError';
      this.code = code;
      this.message = message;
      this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
    }
  }