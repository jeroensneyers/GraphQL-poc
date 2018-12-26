const express = require("./express");

// listen for requests
const port = process.env.PORT || 3000;
const server = express().listen(port, () => {
  console.log(`Express server listening on port: http://localhost:${server.address().port}`);
});
