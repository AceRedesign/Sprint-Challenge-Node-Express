const fetch = require("node-fetch");

const recentPrice = "https://api.coindesk.com/v1/bpi/currentprice/USD.json";
const previousPrice =
  "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday";

function coinApiCurrent() {
  return new Promise((resolve, reject) => {
    fetch(recentPrice)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        resolve(json);
      })
      .catch(err => {
        reject({ error: err });
      });
  });
}

function coinApiPrevious() {
  return new Promise((resolve, reject) => {
    fetch(previousPrice)
      .then(res => res.json())
      .then(json => {
        console.log(json);
        resolve(json);
      })
      .catch(err => {
        reject({ error: err });
      });
  });
}

function coinApiCompare() {
  let current = recentPrice;
  let previous = previousPrice;
  return new Promise((resolve, reject) => {
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
              resolve({ decreasedBy: compared });
            } else {
              resolve({ increasedBy: compared });
            }
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
}

module.exports = { coinApiCurrent, coinApiPrevious, coinApiCompare };
