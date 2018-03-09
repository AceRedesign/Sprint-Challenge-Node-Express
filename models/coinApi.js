const fetch = require("node-fetch");

const recentPrice = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const previousPrice =
  "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

function coinApiCurrent() {
  fetch(recentPrice)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.send(json);
    })
    .catch(err => {
      res.json({ error: err });
    });
}

function coinApiPrevious() {
  fetch(previousPrice)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      res.send(json);
    })
    .catch(err => {
      res.json({ error: err });
    });
}

function coinApiCompare() {
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
          if (compared < 0) {
            res.json({ decreasedBy: compared });
          } else {
            res.json({ increasedBy: compared });
          }
        });
    })
    .catch(err => {
      res.send({ error: err });
    })
    .catch(err => {
      res.send({ error: err });
    });
}

module.exports = { coinApiCurrent, coinApiPrevious, coinApiCompare };
