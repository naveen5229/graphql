const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('Global Test for graphql', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL);
    });

    afterAll(async () => {
        await mongoose.disconnect();
    })
    
    describe('test for /graphql POST update', () => {
        const query = {
            query: `query {
                events{
                    _id
                }
            }`
        }
        test('for get events by query', async () => {
            const res = await request(app).post('/graphql')
            .send(JSON.stringify(query))
            .set('Content-Type','application/json')
            .expect('Content-Type', /json/)
            .expect(200)
        })
    })
})