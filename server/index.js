import express from 'express'
import dotenv from 'dotenv'
import { errorHandling } from './middleware/errorHandler.js'
import routes from './routes/eventRoutes.js'
import { createServer } from './server.js'
dotenv.config()
const PORT = process.env.PORT

const app = createServer()

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})
