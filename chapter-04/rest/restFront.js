function getUser() {// User fetches this function while loading.
  var xhr = new XMLHttpRequest(); //HTTP request로 XML 형식 파일을 주고받는 객체. refresh 없이 url만으로 페이지 업데이트 가능
  if (xhr.status === 200) {
    var users = JSON.parse(xhr.responseText); // response 로 돌아온 텍스트를 user단에 JSON으로 저장
    var list = document.getElementById('list');
    list.innerHTML = '';
    Object.keys(users).map(function (key) {
      var userDiv = document.createElement('div');
      var span = document.createElement('span');
      span.textContent = users[key];
      var edit = document.createElement('button');
      edit.textContent = '내용수정';
      edit.addEventListener('click', function() {
        var name = prompt('바꿀 이름을 입력하세요');
        if (!name) {
          return alert('이름이 뭐요!!');
        }
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log(xhr.responseText);
            getUser();
          } else {
            console.error(xhr.responseText);
          }
        };
        xhr.open('PUT', '/users' + key);
        // 씨발 나머지는 코드가 너무 더러우니 나중에 ㄱ, 익스프레스로 구현하는 것부터 잠깐 보자
      })
    })
  }
}
