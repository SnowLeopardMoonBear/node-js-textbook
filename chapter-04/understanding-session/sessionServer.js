// Note: When writing a comment, describe the role of the code inside a program, not how it works.
// Exception: Explaining new useful grammar or methods.

const http = require("http");
const fs = require("fs");
const url = require("url"); //get url object
const qs = require("querystring"); //get querystring object

//manual cookie parser
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map(v => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

    http.createServer((req, res) => {
      const cookies = parseCookies(req.headers.cookie);
      if (req.url.startsWith('/login')) {
        // Put the value named query inside an object named the same. const query = {query:url.parse(req.url)}
        const { query } = url.parse(req.url); //save value of url request querystring
        const { name } = qs.parse(query); // parse querystring of url request
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 5);
    
        res.writeHead(302, {
          Location: '/',
          'Set-Cookie': `name=${encodeURIComponent(name)};
          Expires=${expires.toGMTstring()}; HttpOnly; Path=/`,
        });
        res.end();
      }
      // Get name from cookie when a name already exists. 
      else if(cookies.name) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(`${cookies.name}, 하이하잉!`);
      }
    })