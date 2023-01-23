import sinon from "sinon"
import { GetConversionsByUserUseCase } from "../src/useCases/GetConversionsByUserUseCase"
import { TransactionsRepository } from "../src/repositories/TransactionsRepository"
import { expect } from "chai"
import { ITransaction } from "../src/interfaces/ITransaction"

const transactions: ITransaction[] = [
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

const getConversionsByUserUseCase = new GetConversionsByUserUseCase(new TransactionsRepository())

describe('Test Suit  - Get Conversions By User Use Case', async () => {
    beforeEach('Before each test', async () => { 
        sinon.restore()
    })

    it('SUCCESS: Execute', async () => {
        sinon.stub(TransactionsRepository.prototype, 'getTransactions').resolves(transactions)
        const response = await getConversionsByUserUseCase.execute('user')
        expect(response.length).to.be.equal(2)
    })

    it('ERROR: Execution with empty response', async () => {
        sinon.stub(TransactionsRepository.prototype, 'getTransactions').resolves([])
        try {
            await getConversionsByUserUseCase.execute('user')
        } catch (err) {
            expect(err.message).to.be.equal('None exchange has found')
        }
    })
})