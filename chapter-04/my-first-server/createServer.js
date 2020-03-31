const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>이건 html 없이 response만으로 사용자 브라우저상에 글씨를 띄워줍니다</h1>');
    res.end('물론 사용되는 문법은 HTML이지만요.');
}).listen(8080, () => {
    console.log('listen의 콜백으로 실행되는 함수입니다. 여기선 콘솔에 문장을 띄워주지요.');
});
server.on('listening', () => {
    console.log('이건 이벤트 리스너를 등록한 뒤 listening 이벤트 발생시 콜백으로 콘솔에 출력되는 문장입니다.')
});
server.on('error', () => {
    console.log('에러의 경우에도 error 이벤트가 발생합니다');
});

// node 서버 여는데 성공했습니다. 커스텀 이벤트도 아주 잘 뜨는군요!