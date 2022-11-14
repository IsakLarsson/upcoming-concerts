export const getEventInfoFromCard = async (card) => {
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
    const city = await card.$eval('.result-info__city', (el) => el.textContent)
    return { title, weekday, date, month, year, city }
}
