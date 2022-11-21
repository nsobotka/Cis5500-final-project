const { expect } = require("@jest/globals");
const supertest = require("supertest");
const { number } = require("yargs");
const results = require("./results.json")
const app = require('../server');

// **********************************
//         BASIC ROUTES TESTS
// **********************************


test("GET /top_artist_count page length", async () => {
    await supertest(app).get("/top_artist_count?page=1&pagesize=5")
      .expect(200)
      .then((response) => {
        // Check text 
        expect(len(response.results)).toBe(5)
      });
});
