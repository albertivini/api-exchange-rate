import { HTTP_STATUS_CODE } from "../constants/HttpStatusCode";
import { ICodeMessages } from "../interfaces/ICodeMessages";

export class NotFoundError extends Error {
    statusCode: number;

    code: string;

    constructor(code_messages_interface:ICodeMessages) {
      super(`Not Found Error: ${code_messages_interface.message}`);
      this.name = 'NotFoundError';
      this.code = code_messages_interface.code;
      this.message = code_messages_interface.message;
      this.statusCode = HTTP_STATUS_CODE.NOT_FOUND;
    }
  }