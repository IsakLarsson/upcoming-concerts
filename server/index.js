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

// async function main() {
//     const browser = await chromium.launch({
//         headless: true, // setting this to true will not run the UI
//     })
//
//     const page = await browser.newPage()
//     await page.goto(
//         'https://www.livenation.se/event/allevents?location=Stockholm&page=1&genres='
//     )
//     // await page.waitForNavigation()
//     const cards = await page.$$('section.result-card__wrapper')
//     cards.forEach(async (card) => {
//         console.log('Adding event')
//         const eventInfo = await getEventInfoFromCard(card)
//         eventList.push(eventInfo)
//     })
//     console.log('added event info')
//     await page.waitForTimeout(5000) // wait for5 seconds
//     await browser.close()
// }
//
// main()
