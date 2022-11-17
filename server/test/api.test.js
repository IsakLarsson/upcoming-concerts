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
    //I dont understand how this works
    // it('Should respond with all fields', async () => {
    //     const response = await request(app).get('/api/events')
    //     expect(response.body).toContain('year')
    // })
})
