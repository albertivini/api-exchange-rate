import { CODE_MESSAGES } from "../constants/CodeMessages";
import { SchemaValidatorError } from "../exceptions/SchemaError";
import Joi from "joi"

export function schemaValidator(body: unknown, schema: Joi.ObjectSchema) {
    const { value, error } = schema.validate(body);

    if (error) {
        const error_message = error.details[0].message;

        const response_error = {
          code: CODE_MESSAGES.INVALID_BODY.code,
          message: error_message,
        };

        throw new SchemaValidatorError(response_error)
    }
    
    return value;
}