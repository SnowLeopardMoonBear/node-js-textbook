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

const session = {};

http.createServer((req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  // When accessing login page via url, show 
  if (req.url.startsWith('/login')) {
    // Put the value named query inside an object named the same. const query = {query:url.parse(req.url)}
    const { query } = url.parse(req.url); //save value of url request querystring
    const { name } = qs.parse(query); // parse querystring of url request
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 5);
    const randomInt = +new Date();
    session[randomInt] = {
      name,
      expires,
    };

    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${randomInt}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
    });
    res.end();
  }
  // Get name from cookie when a name already exists. 
  else if(cookies.session &&[cookies.session].expires > new Date()) {
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(`${session[cookies.session].name}, hi!`);
  } else {
    fs.readFile('./sessionPage.html', (err, data) => {
      if (err) {
        throw err;
      } 
      res.end(data);
    });
  }
})
  .listen(8083, () => {
    console.log('서버를 만든 뒤 마지막으로 8083 포트로 데이터를 쏴주라고 요청합니다')
  });