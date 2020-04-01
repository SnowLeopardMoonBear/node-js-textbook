const http = require("http");
const fs = require("fs"); // read by using fs module of node.js

http
  .createServer((req, res) => {
    fs.readFile("./requestedPage.html", (err, data) => {
        //make it robust to errors because node.js is single-threaded and only one error could stop the entire server
      if (err) {
        throw err;
      }
      res.end(data);
    });
  })
  .listen(8082, () => {
    console.log("server using PORT 8082");
  });
