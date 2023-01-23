import { Request, Response } from "express"
import { TransactionsRepository } from "../repositories/TransactionsRepository"
import { RecordConversionRateUseCase } from "../useCases/RecordConversionRateUseCase"
import { recordConversionRateSchema } from "../schemas/RecordConversionRateSchema"
import { schemaValidator } from "../utils/schemaValidator"
import { IRecordConversionDTO } from "../interfaces/IRecordConversionDTO"
import { HTTP_STATUS_CODE } from "../constants/HttpStatusCode"

export class RecordConversionRateController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params

            const { body } = request
    
            const bodyToValidate = { ...body, userId }
    
            const validatedBody = schemaValidator(bodyToValidate, recordConversionRateSchema) as IRecordConversionDTO

            const recordConversionRateUseCase = new RecordConversionRateUseCase(new TransactionsRepository())
    
            const returned_body = await recordConversionRateUseCase.execute(validatedBody)
    
            return response.status(HTTP_STATUS_CODE.CREATED).json(returned_body)
        } catch (err) {
            return response.status(err.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ 
                success: false,
                error: err.message
            })
        }
    }
}