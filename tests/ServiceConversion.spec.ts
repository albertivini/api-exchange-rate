import sinon from "sinon"
import { expect } from "chai"
import axios, { AxiosResponse } from "axios"
import { ConversionService } from "../src/services/ConversionService"

const conversionResponse = {
	success: true,
	timestamp: 1674500223,
	base: 'EUR',
	date: '2023-01-23',
	rates: {
        BRL: 1.2
    }
} 

const errorResponse = {
    response: {
        data: {
            error: {
                code: 'invalid_base_currency',
                message: 'An unexpected error ocurred. [Technical Support: support@apilayer.com]'
            }
        },
        status: 400
    }
}

const conversionService = new ConversionService()

describe('Test Suit  - Conversion Service', async () => {
    beforeEach('Before each test', async () => { 
        sinon.restore()
    })

    it('SUCCESS: Get Conversion Rate', async () => {
        sinon.stub(axios, 'get').resolves({ 
            data: conversionResponse, 
            status: 200 
        } as unknown as AxiosResponse<any, any>)

        const response = await conversionService.getConversionRate('EUR')

        expect(response.status).to.be.equal(200)
    })

    it('ERROR: Get Conversion Rate', async () => {
        sinon.stub(axios, 'get').throws(errorResponse as unknown as AxiosResponse<any, any>)

        const response = await conversionService.getConversionRate('EUR')

        expect(response.status).to.be.equal(400)
    })
})