import { CODE_MESSAGES } from "../constants/CodeMessages";
import { BusinessError } from "../exceptions/BusinessError";
import { ITransaction } from "../interfaces/ITransaction";
import { ConversionService } from "../services/ConversionService";
import { IRecordConversionDTO } from "../interfaces/IRecordConversionDTO";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";
import { IResponseConversion } from "../interfaces/IResponseConversion";



export class RecordConversionRateUseCase {

    private conversionService: ConversionService

    constructor(private transactionRepository: ITransactionsRepository) {
        this.conversionService = new ConversionService()
    }

    async execute({ destinyCurrency, originCurrency, originValue, userId}: IRecordConversionDTO): Promise<IResponseConversion> {

        const response = await this.conversionService.getConversionRate(originCurrency)

        if (response.status !== 200) {
            throw new BusinessError(CODE_MESSAGES.ERROR_CALLING_API)
        }

        const { rates } = response.data

        if (!(destinyCurrency in rates)) throw new BusinessError(CODE_MESSAGES.CURRENCY_NOT_FOUND)

        const conversionRate = rates[destinyCurrency]

        const destinyValue = originValue * conversionRate

        const timestamp = new Date(response.data.timestamp * 1000)

        const payload: ITransaction = {
            userId,
            originCurrency,
            originValue,
            destinyCurrency,
            destinyValue,
            conversionRate,
            timestamp
        }

        const transactionId = await this.transactionRepository.postTransaction(payload)

        const response_body = {
            transactionId,
            ...payload
        }

        return response_body
    }
}