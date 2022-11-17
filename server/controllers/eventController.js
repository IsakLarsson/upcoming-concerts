import playwright from 'playwright'
import { genres, buildGenreString } from '../assets/genreHelpers.js'
import { getEventInfoFromCard } from '../eventInfoParser.js'
import asyncHandler from 'express-async-handler'
const chromium = playwright.chromium

const parseEventInfo = async (eventCards) => {
    let loadedEvents = []
    for await (const card of eventCards) {
        const eventInfo = await getEventInfoFromCard(card)
        loadedEvents.push(eventInfo)
    }
    return loadedEvents
}

const buildSearchURL = (location, genreString) => {
    return `https://www.livenation.se/event/allevents?${location}&page=1&genres=${genreString}`
}

const searchForEvents = async (res, page, location, genreString) => {
    await page.goto(buildSearchURL(location, genreString))
    const noResults = await page.$('p.allevents__noresults')
    if (noResults) {
        res.status(404)
        throw new Error('No events could be found, try a different search')
    }
    const eventCards = await page.$$('li.allevents__eventlistitem')
    return eventCards
}

export const getEvents = asyncHandler(async (req, res) => {
    const browser = await chromium.launch({
        headless: true, // setting this to true will not run the UI
    })
    try {
        const params = req.query
        let { city, genres } = req.query
        const location = city === undefined ? '' : `location=${city}`
        genres = genres === undefined ? '' : genres
        if (typeof genres == 'string') genres = [genres] //ugly fix for single genre
        const page = await browser.newPage()

        const genreString = buildGenreString(genres)
        const eventCards = await searchForEvents(
            res,
            page,
            location,
            genreString
        )
        const eventList = await parseEventInfo(eventCards)
        browser.close()
        res.json(eventList)
    } catch (error) {
        browser.close() //Forgot to close browser on error before and damn near set my laptop on fire
        throw error
    }
})
