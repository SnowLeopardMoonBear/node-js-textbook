const http = require("http");

//Cookie comes in a string, so we need to parse it into an object!
const parseCookies = (cookie = "") =>
  cookie
    .split(";")
    .map(v => v.split("="))
    .map(([k, ...vs]) => [k, vs.join("=")])
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer((req, res) => {
    // When status code is 200, write cookie in http header. http status code 200 means success. 'Set-Cookie' is a method used for write cookie.
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("Hiya Fucking Cookie");
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.headers, cookies);
  })
  .listen(8082, () => {
    console.log("아 시발 코드 한 번 더럽네... 자스 문법 좀 알려주고나 하지");
    console.log("어차피 npm에서 쿠키파서 쓰면 되니 이번만 넘어감 ㅇㅇ");
  });
