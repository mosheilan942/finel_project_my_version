// import request from 'supertest';
// import { expect, test, describe, afterAll, it } from "vitest";
// import { categoryUse } from './server.js';


// describe('GET /categories', () => {

//     it('returns a list of categories', async () => {

//         // Call GET categories route
//         const res = await request(categoryUse).get('/categories');

//         // Assert 200 status code
//         expect(res.statusCode).toEqual(200);

//         // Assert returned data is an array 
//         expect(Array.isArray(res.body)).toBeTruthy();

//         // Assert array has length > 0
//         expect(res.body.length).toBeGreaterThan(0);

//     });

// });