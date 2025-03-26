const request = require('supertest');
const express = require('express');
const app = express();

// api route for event
const eventRoutes = require('../backendExpress/route/event.routes');
app.use('/api/events', eventRoutes);

describe('GET /api/events', () => {
    it('should return a list of events', (done) => {
        request(app)
        .get('/api/events')
        .expect(200)
        .expect((res) => {
            if (!Array.isArray(res.body)) throw new Error('Response is not an array, expected one.');
        })
        .end(done);
    });
});