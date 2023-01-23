import axios from "axios";
import { API_URL } from "../constants/ApiUrl";
import { IConversionResponse } from "../interfaces/IConversionResponse";

export class ConversionService {
    async getConversionRate(originCurrency: string): Promise<IConversionResponse> {
        try {
            const url = `${API_URL.BASE_URL}/${API_URL.CONVERSION_API}`
            const replacedUrl = url.replace('${base}', originCurrency)
                
            const response = await axios.get(replacedUrl, {
                headers: {
                    'apikey': process.env.API_KEY
                }
            })

            const response_body = {
                data: response.data,
                status: response.status 
            }

            return response_body
        } catch (err) {
            return { data: err.response.data, status: err.response.status }
        }
    }
}