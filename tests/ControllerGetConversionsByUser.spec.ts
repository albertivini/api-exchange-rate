import supertest from "supertest"
import { expect } from "chai"
import sinon from "sinon"
import { app } from "../src/app"
import { GetConversionsByUserUseCase } from "../src/useCases/GetConversionsByUserUseCase"
import { ITransaction } from "../src/interfaces/ITransaction"
import { NotFoundError } from "../src/exceptions/NotFoundError"

const returnBody: ITransaction[] = [
    {
        id: 'transaction',
        userId: 'user',
        originCurrency: "EUR",
        originValue: 10,
        destinyCurrency: "BRL",
        destinyValue: 20,
        conversionRate: 2,
        timestamp: new Date()
    },
    {
        id: 'transaction2',
        userId: 'user',
        originCurrency: "EUR",
        originValue: 5,
        destinyCurrency: "BRL",
        destinyValue: 10,
        conversionRate: 2,
        timestamp: new Date()
    },
]

describe('Test Suit - Get Conversions By User Controller', async () => {
    beforeEach('Before Each', async () => {
        sinon.restore()
    })

    it('SUCCESS: Handle', async () => {
        sinon.stub(GetConversionsByUserUseCase.prototype, 'execute').resolves(returnBody)
        const response = await supertest(app).get('/exchange/user')
        expect(response.statusCode).to.be.equal(200)
    })

    it('ERROR: Handle with specific error', async () => {
        sinon.stub(GetConversionsByUserUseCase.prototype, 'execute').throws(new NotFoundError({ code: '001', message: 'error'}))

        const response = await supertest(app).get('/exchange/user')
        
        expect(response.statusCode).to.be.equal(404)
    })

    it('ERROR: Handle with generic error', async () => {
        sinon.stub(GetConversionsByUserUseCase.prototype, 'execute').throws({ code: '001', message: 'error'})

        const response = await supertest(app).get('/exchange/user')
        
        expect(response.statusCode).to.be.equal(500)
    })
})