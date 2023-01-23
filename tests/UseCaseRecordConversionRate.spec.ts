import sinon from "sinon"
import { RecordConversionRateUseCase } from "../src/useCases/RecordConversionRateUseCase"
import { ConversionService } from "../src/services/ConversionService"
import { TransactionsRepository } from "../src/repositories/TransactionsRepository"
import { IRecordConversionDTO } from "../src/interfaces/IRecordConversionDTO"
import { expect } from "chai"

const conversion_response = {
	success: true,
	timestamp: 1674500223,
	base: 'EUR',
	date: '2023-01-23',
	rates: {
        BRL: 1.2
    }
}

const recordConversionRateUseCase = new RecordConversionRateUseCase(new TransactionsRepository())

describe('Test Suit  - Record Conversion Rate Use Case', async () => {
    beforeEach('Before each test', async () => { 
        sinon.restore()
    })

    it('SUCCESS: Execute', async () => {
        sinon.stub(ConversionService.prototype, 'getConversionRate').resolves({ data: conversion_response, status: 200 })
        sinon.stub(TransactionsRepository.prototype, 'postTransaction').resolves('uuid')

        const body: IRecordConversionDTO = {
            userId: 'user',
            originValue: 10,
            originCurrency: 'EUR',
            destinyCurrency: 'BRL'
        }

        const response = await recordConversionRateUseCase.execute(body)

        expect(response.destinyValue).to.be.equal(12)
    })

    it('ERROR: Execution with get conversion error response', async () => {
        sinon.stub(ConversionService.prototype, 'getConversionRate').resolves({ data: conversion_response, status: 400 })
        sinon.stub(TransactionsRepository.prototype, 'postTransaction').resolves('uuid')

        const body: IRecordConversionDTO = {
            userId: 'user',
            originValue: 10,
            originCurrency: 'EUR',
            destinyCurrency: 'BRL'
        }

        try {
            await recordConversionRateUseCase.execute(body)
        } catch (err) {
            expect(err.message).to.be.equal('Error calling Conversion Api')
        }
    })

    it('ERROR: Execute with wrong destiny currency', async () => {
        sinon.stub(ConversionService.prototype, 'getConversionRate').resolves({ data: conversion_response, status: 200 })
        sinon.stub(TransactionsRepository.prototype, 'postTransaction').resolves('uuid')

        const body: IRecordConversionDTO = {
            userId: 'user',
            originValue: 10,
            originCurrency: 'EUR',
            destinyCurrency: 'other'
        }

        try {
            await recordConversionRateUseCase.execute(body)
        } catch (err) {
            expect(err.message).to.be.equal('Currency not found')
        }
    })
})