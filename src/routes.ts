import { Router } from "express"
import { RecordConversionRateController } from "./controllers/RecordConversionRateController"
import { GetConversionsByUserController } from "./controllers/GetConversionsByUserController"

const routes = Router()

const recordConversionRate = new RecordConversionRateController()
const getConversionsByUserController = new GetConversionsByUserController()

routes.post('/exchange/:userId', recordConversionRate.handle)
routes.get('/exchange/:userId', getConversionsByUserController.handle)

export { routes }