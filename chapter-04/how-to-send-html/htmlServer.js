const http = require("http");
const fs = require("fs"); // read by using fs module of node.js

http
  .createServer((req, res) => {
    fs.readFile("./requestedPage.html", (err, data) => {
      if (err) {
        throw err;
      }
      res.end(data);
    });
  })
  .listen(8082, () => {
    console.log("server using PORT 8082");
  });
