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

const getElementTextContent = async (card, eventInfoField) => {
    const content = await card.$eval(eventInfoField, (el) =>
        el.textContent.trim()
    )
    return content
}
export const getEventInfoFromCard = async (
    card,
    fieldsToGet = eventInfoFields
) => {
    let eventInfo = {}
    for (const key in fieldsToGet) {
        if (fieldsToGet.hasOwnProperty(key)) {
            const content = await getElementTextContent(card, fieldsToGet[key])
            eventInfo[key] = content
        }
    }
    return eventInfo
}
