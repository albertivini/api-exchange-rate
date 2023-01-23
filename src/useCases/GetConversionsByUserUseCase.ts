import { NotFoundError } from "../exceptions/NotFoundError";
import { CODE_MESSAGES } from "../constants/CodeMessages";
import { ITransaction } from "../interfaces/ITransaction";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";



export class GetConversionsByUserUseCase {

    constructor(private transactionRepository: ITransactionsRepository) {}

    async execute(userId: string): Promise<ITransaction[]> {

        const response = await this.transactionRepository.getTransactions(userId)

        if (response.length === 0) throw new NotFoundError(CODE_MESSAGES.EXCHANGES_NOT_FOUND)

        return response
    }
}