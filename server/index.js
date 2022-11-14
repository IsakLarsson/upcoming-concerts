import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT

import routes from './routes/eventRoutes.js'
const app = express()
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})
