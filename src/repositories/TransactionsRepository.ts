import { PrismaClient } from "@prisma/client";
import { ITransaction } from "../interfaces/ITransaction";
import { ITransactionsRepository } from "../interfaces/ITransactionsRepository";

export class TransactionsRepository implements ITransactionsRepository {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async getTransactions(userId: string): Promise<ITransaction[]> {
        const response = await this.prisma.transaction.findMany({
            where: {
                userId
            }
        })

        return response
    }
    
    async postTransaction(payload: ITransaction): Promise<string> {
        const response = await this.prisma.transaction.create({
            data: payload
        })

        return response.id
    }
}