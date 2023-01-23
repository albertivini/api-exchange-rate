import Joi from "joi"
import { CURRENCY } from "../constants/Currency"

export const recordConversionRateSchema = Joi.object().keys({
    originValue: Joi.number().strict().required(),
    originCurrency: Joi.string().strict().valid(CURRENCY.BRL, CURRENCY.EUR, CURRENCY.JPY, CURRENCY.USD).required(),
    destinyCurrency: Joi.string().strict().valid(CURRENCY.BRL, CURRENCY.EUR, CURRENCY.JPY, CURRENCY.USD).disallow(Joi.ref('originCurrency')).required(),
    userId: Joi.string().strict().required()
})