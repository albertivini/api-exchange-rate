import { ICodeMessages } from "../interfaces/ICodeMessages";
import { HTTP_STATUS_CODE } from "../constants/HttpStatusCode";

export class BusinessError extends Error {
  statusCode: number;

  code: string;

  constructor({ code, message }: ICodeMessages) {
    super(`Business Error: ${message}`);
    this.name = 'BusinessError';
    this.code = code;
    this.message = message;
    this.statusCode = HTTP_STATUS_CODE.BAD_REQUEST;
  }
}
  
