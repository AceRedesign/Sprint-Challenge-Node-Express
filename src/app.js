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
  let current = recentPrice;
  let previous = previousPrice;
  fetch(current)
    .then(res => res.json())
    .then(json => {
      currentPrice = json.bpi.USD.rate_float;
      console.log(currentPrice);
      fetch(previous)
        .then(res => res.json())
        .then(result => {
          result = Object.values(result.bpi)[0];
          console.log(result);
          const compared = Number(currentPrice - result);
          console.log(compared);
          res.status(STATUS_SUCCESS);
          if (compared < 0) {
            res.json({ decreased: compared });
          } else {
            res.json({ increased: compared });
          }
        });
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.send({ error: err });
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.send({ error: err });
    });
});

server.listen(PORT, err => {
  if (err) {
    console.log(`Cannot run app ${err}`);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
