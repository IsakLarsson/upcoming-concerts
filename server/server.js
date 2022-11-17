import express from 'express'
import routes from './routes/eventRoutes.js'

import { errorHandling } from './middleware/errorHandler.js'
export function createServer() {
    const app = express()
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })
    app.use((req, res, next) => {
        console.log('Request type: ', req.method)
        next()
    })
    app.use(express.json())
    app.use(routes)
    app.use(errorHandling) // Define error handling MW last always
    return app
}
