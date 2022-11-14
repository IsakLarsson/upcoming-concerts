import express from 'express'
import dotenv from 'dotenv'
import { errorHandling } from './middleware/errorHandler.js'
import routes from './routes/eventRoutes.js'
dotenv.config()
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandling)

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})
