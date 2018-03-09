const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const controllers = require("../controllers/coinApi.js");

const server = express();
server.use(controllers);

const PORT = 3000;

server.listen(PORT, err => {
  if (err) {
    console.log(`Cannot run app ${err}`);
  } else {
    console.log(`Server is running on ${PORT}`);
  }
});
