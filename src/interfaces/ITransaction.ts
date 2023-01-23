export interface ITransaction {
    id?: string
    userId: string
    originCurrency: string
    originValue:  number
    destinyCurrency: string
    destinyValue: number
    conversionRate: number
    timestamp: Date
}