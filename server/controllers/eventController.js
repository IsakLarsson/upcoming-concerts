import playwright from 'playwright'
import { genres, buildGenreString } from '../assets/genreHelpers.js'
import { getEventInfoFromCard } from '../eventInfoParser.js'
import asyncHandler from 'express-async-handler'
const chromium = playwright.chromium

const browser = await chromium.launch({
    headless: true, // setting this to true will not run the UI
})

const loadEvents = async (eventCards) => {
    let loadedEvents = []
    for await (const card of eventCards) {
        const eventInfo = await getEventInfoFromCard(card)
        loadedEvents.push(eventInfo)
    }
    return loadedEvents
}

export const getEvents = asyncHandler(async (req, res) => {
    let eventList = []
    let { city, genres } = req.body
    const location = city === undefined ? '' : `location=${city}`
    genres = genres === undefined ? '' : genres

    const genreString = buildGenreString(genres)

    const page = await browser.newPage()
    await page.goto(
        `https://www.livenation.se/event/allevents?${location}&page=1&genres=${genreString}`
    )
    const noResults = await page.$('p.allevents__noresults')
    if (noResults) {
        res.status(404)
        throw new Error('No events could be found, try a different search')
    }
    const eventCards = await page.$$('section.result-card__wrapper')
    eventList = await loadEvents(eventCards)
    res.json(eventList)
    console.log('found events: ', eventList)
})
