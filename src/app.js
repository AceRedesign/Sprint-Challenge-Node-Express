const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const server = express();

const PORT = 3000;
const STATUS_ERROR = 422;
const STATUS_SUCCESS = 200;

const recentPrice = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const previousPrice =
  "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

server.get("/current", (req, res) => {
  fetch(recentPrice)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.status(STATUS_SUCCESS);
      res.json(json);
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.json({ error: err });
    });
});

server.get("/previous", (req, res) => {
  fetch(previousPrice)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.status(STATUS_SUCCESS);
      res.json(json);
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.json({ error: err });
    });
});

server.get("/compare", (req, res) => {
  let recentPrice = recentPrice;
  let previousPrice = previousPrice;
  fetch(recentPrice)
    .then(res => res.json())
    .then(json => {
      console.log(json);
    });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`Cannot run app ${err}`);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
