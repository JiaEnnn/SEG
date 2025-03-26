require('dotenv').config({ path: './connectDB.env' });
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
            if (!Array.isArray(res.body.data)) throw new Error('Response is not an array, expected one.');
        })
        .end(done);
    });
});

describe('GET /api/events/org', () => {
    it('should return a list of event organisers', (done) => {
        request(app)
        .get('/api/events/org')
        .expect(200)
        .expect((res) => {
            if (!Array.isArray(res.body.data)) throw new Error('Response is not an array, expected one.');
        })
        .end(done);
    });
});

// describe('GET DEFAULT /api/events/findBy', () => {
//     it('should return a list of events', (done) => {
//         request(app)
//         .get('/api/events/findBy')
//         .expect(200)
//         .expect((res) => {
//             if (!Array.isArray(res.body.data)) throw new Error('Response is not an array, expected one.');
//         })
//         .end(done);
//     });
// });
// const event1 = {
//     eventID: 1,
//     userID: null,
//     eventOrgID: null,
//     startDateTime: new Date(),
//     title: 'An Upcoming Event',
//     isVisible: true,
// };

// describe('GET /api/events/1 ', () => {
//     it('Retrieves event with id 1', (done) => {
//         request(app).get('/api/events/1')
//         .expect(200)
//         .expect((res) => {
//             // throw new Error(res.body.data.title);
//             const { data } = res.body;
//             if (!res.body) throw new Error(`Event with this ID don't exist.`);
//             if (data.eventID != 1) throw new Error(`EventID retrieved is ${data.eventID}, expected 1.`);
//         })
//         .end(done);
//         // expect(status).to.equal(200);
//         // expect(data).to.deep.include(event1);
//     });
// });