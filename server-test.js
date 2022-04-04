const request = require('supertest');
const app = require('./server');

describe('GET /quotes', () => {
    it('return JSON object containing all quotes', async () => {
        const response = request(app)
            .get('/quotes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

    });
});

