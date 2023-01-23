import { expect } from "chai";
import sinon from "sinon"
import { PrismaClient } from "@prisma/client";
import { TransactionsRepository } from "../src/repositories/TransactionsRepository";

const post_payload = {
    userId: 'user',
    originCurrency: 'EUR',
    originValue: 10,
    destinyCurrency: 'BRL',
    destinyValue: 20,
    conversionRate: 2,
    timestamp: new Date()
}

const prisma = new PrismaClient()
const transactionRepository = new TransactionsRepository()

async function deleteObject(id: string) {
    await prisma.transaction.delete({
        where: {
            id
        }
    })
}

async function addObject() {
    await prisma.transaction.create({
        data: post_payload
    })}

describe('Test Suit - Transactions Repository', async () => {
    beforeEach('Before each test', async () => {
        sinon.restore()
    })

    it('SUCCESS: Post Transaction', async () => {
        const response = await transactionRepository.postTransaction(post_payload)
        expect(response).to.exist
        await deleteObject(response)
    })

    it('SUCCESS: Get Transaction', async () => {
        await addObject()
        const response = await transactionRepository.getTransactions('user')
        expect(response.length).to.be.equal(1)
        await deleteObject(response[0].id as string)
    })
})