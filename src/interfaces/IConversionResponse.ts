export interface IConversionResponseData {
    base: string
    date: string
    rates: Record<string, number>
    success: boolean
    timestamp: number
}

export interface IConversionResponse {
    data: IConversionResponseData
    status: number
}