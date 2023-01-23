import { Request, Response } from "express"
import { TransactionsRepository } from "../repositories/TransactionsRepository"
import { GetConversionsByUserUseCase } from "../useCases/GetConversionsByUserUseCase"
import { HTTP_STATUS_CODE } from "../constants/HttpStatusCode"

export class GetConversionsByUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { userId } = request.params

            const getConversionsByUserUseCase = new GetConversionsByUserUseCase(new TransactionsRepository())
    
            const returned_body = await getConversionsByUserUseCase.execute(userId)
    
            return response.status(HTTP_STATUS_CODE.OK).json(returned_body)
        } catch (err) {
            return response.status(err.statusCode || HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ 
                success: false,
                error: err.message
            })
        }
    }
}