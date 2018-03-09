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
  coinApiCurrent();
});

router.get("/previous", (req, res) => {
  coinApiPrevious();
});

router.get("/compare", (req, res) => {
  coinApiCompare();
});

module.exports = router;
