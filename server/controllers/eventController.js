const eventList = require('../assets/events.js')

const { chromium } = require('playwright')
const { getEventInfoFromCard } = require('../eventInfoParser.js')

const getEvents = async (req, res) => {
    try {
        console.log('Starting crawl')
        const browser = await chromium.launch({
            headless: true, // setting this to true will not run the UI
        })

        const page = await browser.newPage()
        await page.goto(
            'https://www.livenation.se/event/allevents?location=Stockholm&page=1&genres='
        )
        // await page.waitForNavigation()
        const cards = await page.$$('section.result-card__wrapper')
        cards.forEach(async (card) => {
            console.log('Adding event')
            const eventInfo = await getEventInfoFromCard(card)
            eventList.push(eventInfo)
        })
        console.log('added event info')
        await page.waitForTimeout(5000) // wait for5 seconds
        await browser.close()
        res.json(eventList)
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong, server prob timed out',
            error: error.message,
        })
    }
}

module.exports = { getEvents }
