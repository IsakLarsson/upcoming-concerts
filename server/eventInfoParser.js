const eventInfoFields = {
    year: '.event-date__date__year',
    month: '.event-date__date__month',
    day: '.event-date__date__day',
    weekday: '.event-date__date__weekday',
    eventname: '.result-info__eventname',
    city: '.result-info__city',
    headliners: '.result-info__headliners',
    venue: '.result-info__venue',
}

const defaultInfoFields = [
    'year',
    'month',
    'day',
    'weekday',
    'eventname',
    'city',
    'headliners',
    'venue',
]
const getElementTextContent = async (card, eventInfoField) => {
    const content = await card.$eval(eventInfoField, (el) =>
        el.textContent.trim()
    )
    return content
}

export const getEventInfoFromCard = async (
    card,
    fieldsToGet = defaultInfoFields
) => {
    let eventInfo = {}
    eventInfo['href'] = await card.$eval('a', (el) => el.href)
    for (const infoField of fieldsToGet) {
        const content = await getElementTextContent(
            card,
            eventInfoFields[infoField]
        )
        eventInfo[infoField] = content
    }
    return eventInfo
}
