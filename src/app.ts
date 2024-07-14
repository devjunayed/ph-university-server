/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { notFound } from './app/middlewares/notFound'
import router from './app/routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)
app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})

app.use(globalErrorHandler)

// Not found
app.use(notFound)
export default app
