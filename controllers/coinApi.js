const express = require("express");
const router = express.Router();

const STATUS_ERROR = 422;
const STATUS_SUCCESS = 200;

const {
  coinApiCurrent,
  coinApiPrevious,
  coinApiCompare
} = require("../models/coinApi.js");

router.get("/current", (req, res) => {
  coinApiCurrent().then(json => {
    res.send(json);
  });
});

router.get("/previous", (req, res) => {
  coinApiPrevious().then(json => {
    res.send(json);
  });
});

router.get("/compare", (req, res) => {
  coinApiCompare().then(json => {
    res.json(json);
  });
});

module.exports = router;

//Working
const dank = "nice";
console.log(nice);
