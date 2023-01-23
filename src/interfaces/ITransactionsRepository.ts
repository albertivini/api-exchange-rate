import { ITransaction } from "./ITransaction";

export interface ITransactionsRepository {
    getTransactions(userId: string): Promise<ITransaction[]>
    postTransaction(payload: ITransaction): Promise<string>
}