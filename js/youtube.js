/* 목표 : 외부 유튜브 재생 api인 ifram을 추가해주고 player 요소 안에
스타벅스 동영상 재생되도록 연결시키고 음소거, 반복재생 등을 제어하기*/
var tag = document.createElement('script');
/* script라는 태그 요소를 만들어서 변수인 tag안에 할당한다*/

tag.src = "https://www.youtube.com/iframe_api";
/* tag변수의 속성으로 src(경로)를 추가하여 iframe api주소를 넣는다*/

var firstScriptTag = document.getElementsByTagName('script')[0];
/*여러 script 태그들 중 0번째(첫번째) script태그를 firstScriptTag에 할당*/
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
/* firstScriptTag에 부모요소를 찾아서(parentNode) 앞에서 만든 tag라는 요소를
firstScriptTag의 앞에 삽입(insertBefore)해라 즉, iframe api를 스크립트태그
제일 윗줄에 삽입해라*/

function onYouTubeIframeAPIReady() {
  /*ifame api에서 위 함수명을 찾도록 지정해놓았기 때문에 위 함수명은
  변경하지 말고 그대로 써야한다. */
  new YT.Player('player', {
    /*YT라는 유뷰브 객체의 player라는 메소드가 실행 되는데 실행할 위치는
    html내의 player라고 지정한 id선택임. 그리고 아래와 같이 옵션을 추가한다*/
    videoId: 'An6LvWQuj_8', // <-최초 재생할 영상 id를 확인해서 입력
    playerVars: {
      autoPlay: true,
      loop: true,
      playList: 'An6LvWQuj_8' // 재생을 반복할 영상 id목록 
    },
    events: {
      onReady: function (event) {
        event.target.mute() // 음소거
      }
    }
  });
}
