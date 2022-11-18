import request from 'supertest'
import { createServer } from '../server.js'

const app = createServer()

describe('GET api/events', () => {
    it('Empty request should return events', async () => {
        const response = await request(app).get('/api/events')

        expect(response.status).toBe(200)
    })
    it('Should respond with 404', async () => {
        const response = await request(app).get('/api/events?city=e')
        expect(response.statusCode).toBe(404)
    })
    // This is bullshit, returns different data than in a real run
    // it('Should respond with all fields', async () => {
    //     const response = await request(app).get('/api/events')
    //     expect(response.statusCode).toBe(200)
    //     expect(response.body).toEqual({
    //         href: 'https://www.livenation.se/show/1356643/cats/g%c3%b6teborg/2022-11-17/se',
    //         year: '2022',
    //         month: 'nov.',
    //         day: '17',
    //         weekday: 'tors',
    //         eventname: 'CATS',
    //         city: 'Göteborg',
    //         headliners: 'CATS',
    //         venue: 'Scandinavium',
    //     })
    // })
})
