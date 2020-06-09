const app = require("../app");
const expect = require("chai").expect;
const supertest = require("supertest");

/* To test this function we are interested in the shape 
of the object returned as well as the calculations. 
A test using the midpoint between New York City and Los Angeles
 may look like this:  */

describe("GET /midpoint endpoint", () => {
  it("should find midpoint between NY and LA", () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
      lon2: -118.6919221, //LA
    };

    // somewhere near Aurora, Kansas
    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972,
    };

    return supertest(app)
      .get("/midpoint")
      .query(query)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.have.all.keys("lat", "lon");
        expect(res.body).to.eql(expected);
      });
  });
});

/* Two assertions have been included to perform the checks. 
First .all checks that the given list of keys are present, 
then the actual values are verified. 
Before you go on consider what else you might want to test 
and implement a few more tests for this function.

The .any assertion is similar but ensures that at 
least one of the given keys is present. */
