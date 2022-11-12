const { chromium } = require('playwright')

const getEventInfoFromCard = async (card) => {
    const title = await card.$eval('.result-info__eventname', (el) =>
        el.textContent.trim()
    )

    const weekday = await card.$eval(
        '.event-date__date__weekday',
        (el) => el.textContent
    )
    const date = await card.$eval(
        '.event-date__date__day',
        (el) => el.textContent
    )
    const month = await card.$eval(
        '.event-date__date__month',
        (el) => el.textContent
    )
    const year = await card.$eval(
        '.event-date__date__year',
        (el) => el.textContent
    )
    return { title, weekday, date, month, year }
}

async function main() {
    const browser = await chromium.launch({
        headless: true, // setting this to true will not run the UI
    })

    const page = await browser.newPage()
    await page.goto(
        'https://www.livenation.se/event/allevents?location=Stockholm&page=1&genres='
    )
    // await page.waitForNavigation()
    const eventList = []
    const cards = await page.$$('section.result-card__wrapper')
    eventList.push(
        cards.forEach((card) => {
            const eventInfo = getEventInfoFromCard(card)
            console.log('eventInfo  :', eventInfo)
        })
    )
    await page.waitForTimeout(5000) // wait for5 seconds
    await browser.close()
}

main()
