const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.get("/quotient", (req, res) => {
  const { a, b } = req.query;

  if (!a) {
    return res.status(400).send("Value for a is needed");
  }

  if (!b) {
    return res.status(400).send("Value for b is needed");
  }

  const numA = parseFloat(a);
  const numB = parseFloat(b);

  if (isNaN(numA)) {
    return res.status(400).send("Value for a must be numeric");
  }

  if (isNaN(numB)) {
    return res.status(400).send("Value for b must be numeric");
  }

  if (numB == 0) {
    return res.status(400).send("Cannot divide by 0");
  }

  const ans = numA / numB;

  res.send(`${a} divided by ${b} is ${ans}`);
});

/* Write a handler function for the endpoint GET /generate that accepts
 a positive integer n and generates an array of n elements containing the 
 numbers from 1 to n in random order. So /generate?n=5 may return the 
 array [4,3,1,5,2] or [3, 5, 2, 1, 4] or any other permutation. */

app.get("/generate", (req, res) => {
  // get n from the query string in the request
  const { n } = req.query;

  // coerce n to a numeric value
  const num = parseInt(n);

  if (isNaN(num)) {
    return res.status(400).send("Invalid request");
  }

  // generate array [1..n]
  const initial = Array(num)
    .fill(1)
    .map((_, i) => i + 1);

  // shuffle the array
  initial.forEach((e, i) => {
    let ran = Math.floor(Math.random() * num);
    let temp = initial[i];
    initial[i] = initial[ran];
    initial[ran] = temp;
  });

  res.json(initial);
});

/* Write an endpoint handler function GET /midpoint that accepts 
the latitude and longitude coordinates for two points on the Earth. 
Calculate the midpoint between these two points and return an 
object { lat: midLat, lon: midLon }. */

function toRadians(deg) {
  return deg * (Math.PI / 180);
}

function toDegrees(rad) {
  return rad * (180 / Math.PI);
}

app.get("/midpoint", (req, res) => {
  const { lat1, lon1, lat2, lon2 } = req.query;

  // for brevity the validation is skipped

  // convert to radians
  const rlat1 = toRadians(lat1);
  const rlon1 = toRadians(lon1);
  const rlat2 = toRadians(lat2);
  const rlon2 = toRadians(lon2);

  const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
  const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);

  const midLat = Math.atan2(
    Math.sin(rlat1) + Math.sin(rlat2),
    Math.sqrt((Math.cos(rlat1) + bx) * (Math.cos(rlat1) + bx) + by * by)
  );
  const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);

  res.json({
    lat: toDegrees(midLat),
    lon: toDegrees(midLon),
  });
});

module.exports = app;
