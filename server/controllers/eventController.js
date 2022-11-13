import { eventList } from '../assets/events.js'
import playwright from 'playwright'
import { getEventInfoFromCard } from '../eventInfoParser.js'
import url from 'url'
const chromium = playwright.chromium

const browser = await chromium.launch({
    headless: true, // setting this to true will not run the UI
})

export const getEvents = async (req, res) => {
    let { city } = req.body
    if (!city) {
        city = 'Gävle'
    }
    try {
        console.log('Starting crawl')

        const page = await browser.newPage()
        await page.goto(
            `https://www.livenation.se/event/allevents?location=${city}&page=1&genres=`
        )
        const cards = await page.$$('section.result-card__wrapper')
        cards.forEach(async (card) => {
            console.log('Adding event')
            const eventInfo = await getEventInfoFromCard(card)
            eventList.push(eventInfo)
        })
        console.log('added event info')
        await page.waitForTimeout(5000) // wait for5 seconds
        await browser.close()
        if (eventList.length === 0) {
            res.status(400).json({ message: 'No events could be found' })
        }
        res.json(eventList)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong, server prob timed out',
            error: error.message,
        })
    }
}
