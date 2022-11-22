import dotenv from 'dotenv'
import { createServer } from './server.js'
dotenv.config()
const PORT = process.env.PORT || 3000

const app = createServer()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
