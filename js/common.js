// 목표 : search클래스 전체, 즉 input요소와 아이콘 둘 다에 focus효과를 부여하는 것
// 지금은 input요소에만 focus효과 적용되어 있어 아이콘을 눌러도 focus효과가 없음
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
//목표 해결을 위해 먼저 해당하는 클래스와 태그를 js파일 내에서 찾아서 지정해주는 변수를 만든다.
//위에서 searchInputEl 변수선언시 문서 전체범위인 document가 아니라 이미 찾아놓은 searchEl에서
// 찾는 것으로 명령하면 효율적인 명령이 가능해짐. document전체에서 또 찾을 필요가 없으니까.

searchEl.addEventListener("click", function () {
	searchInputEl.focus();
});
// searchEl에 addEventListner메소드를 추가하여 search요소의 어디든지 클릭했을때
// searchInputEl에 걸려있는 focus 효과가 동작하도록 명령 지정(이렇게 하면 search요소
// 안에 있는 아이콘도 focus 적용 범위에 들어가게됨)

// 목표 : searchInputEl에 focus가 동작하면 focused라는 클래스 추가하고
// 반대로 focus해제 되면 추가한 클래스 없어지도록 해야함 그리고
// focus 동작하면 '통합검색'이라는 문자 보이도록 placeholder 추가해야함.
searchInputEl.addEventListener("focus", function () {
	searchEl.classList.add("focused");
	searchInputEl.setAttribute("placeholder", "통합검색");
});
// searchInputEl에서 focus 동작시
// addEventListner 메소드를 이용해 'focused'라는 class가 추가 되는 명령과
// setAttribue 메소드를 이용해 searchInputEl의 html파일에 'placeholder'라는 속성추가해서 '통합검색'이라는
// 텍스트 메세지 뜨는 명령 지정함.

searchInputEl.addEventListener("blur", function () {
	searchEl.classList.remove("focused");
	searchInputEl.setAttribute("placeholder", "");
});
// searchInputEl에서 focus 비동작시=blur일시 *****
// addEventListner 메소드를 이용해 'focused'라는 class가 제거 되는 명령과
// 'placeholder'에 아무 텍스트도 뜨지 않도록 명령 지정함.


/* 목표 : footer내 년도 표시를 자동으로 바뀌도록 하는 함수 설정 */
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear(); //2021
/* thisYear변수에 글자내용을 지정(혹은 선택)할건데(textContent)
Data라는 생성자의 getFullYear에서 현재 년도를 뽑아내서 thisYear변수에 할당하고
html의 .this-year요소에 나타나게 하겠다. */
