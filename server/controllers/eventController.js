// import { eventList } from '../assets/events.js'
import playwright from 'playwright'
import { getEventInfoFromCard } from '../eventInfoParser.js'
const chromium = playwright.chromium
let eventList = []

const browser = await chromium.launch({
    headless: true, // setting this to true will not run the UI
})

const loadEvents = async (cards) => {
    let loadedEvents = []
    for await (const card of cards) {
        const eventInfo = await getEventInfoFromCard(card)
        loadedEvents.push(eventInfo)
        console.log('Added event: ', eventInfo)
    }
    return loadedEvents
}
export const getEvents = async (req, res) => {
    let { city } = req.body
    if (!city) {
        city = 'Stockholm'
    }
    try {
        console.log('Starting crawl')
        eventList = []

        const page = await browser.newPage()
        await page.goto(
            `https://www.livenation.se/event/allevents?location=${city}&page=1&genres=`
        )
        const cards = await page.$$('section.result-card__wrapper')
        console.log('Current event list: ', eventList)
        console.log('added event info')
        eventList = await loadEvents(cards)
        if (eventList.length === 0) {
            res.status(400).json({ message: 'No events could be found' })
            return
        }
        res.json(eventList)
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: 'Something went wrong',
            error: error.message,
        })
    }
}
