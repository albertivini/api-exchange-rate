import supertest from "supertest"
import { app } from "../src/app"
import { expect } from "chai"
import sinon from "sinon"
import { RecordConversionRateUseCase } from "../src/useCases/RecordConversionRateUseCase"
import { IResponseConversion } from "../src/interfaces/IResponseConversion"

const returnBody: IResponseConversion = {
    transactionId: 'transaction',
    userId: 'user',
    originCurrency: "EUR",
    originValue: 10,
    destinyCurrency: "BRL",
    destinyValue: 20,
    conversionRate: 2,
    timestamp: new Date()
}

describe('Test Suit - Record Conversion Rate Controller', async () => {

    beforeEach('Before Each', async () => {
        sinon.restore()
    })

    it('SUCCESS: Handle', async () => {
        sinon.stub(RecordConversionRateUseCase.prototype, 'execute').resolves(returnBody)

        const bodyToSend = {
            originValue: 10,
            originCurrency: "EUR",
            destinyCurrency: "BRL"
        }

        const response = await supertest(app).post('/exchange/user').send(bodyToSend)

        
        expect(response.statusCode).to.be.equal(201)
    })
    
    it('ERROR: Handle', async () => {
        sinon.stub(RecordConversionRateUseCase.prototype, 'execute').resolves(returnBody)
        
        const bodyToSend = {
            originValue: 10,
            originCurrency: "other",
            destinyCurrency: "BRL"
        }
        
        const response = await supertest(app).post('/exchange/user').send(bodyToSend)
        
        expect(response.statusCode).to.be.equal(400)
    })

    it('ERROR: Handle', async () => {
        sinon.stub(RecordConversionRateUseCase.prototype, 'execute').throws({ code: '001', message: 'error'})
        
        const bodyToSend = {
            originValue: 10,
            originCurrency: "EUR",
            destinyCurrency: "BRL"
        }
        
        const response = await supertest(app).post('/exchange/user').send(bodyToSend)
        
        expect(response.statusCode).to.be.equal(500)
    })
})