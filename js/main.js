

// 목표 : 우측에 떠있는 badge를 스크롤 내리면 자연스럽게 연해지면서 사라지는 효과
const badgeEl = document.querySelector("header .badges");
// html내에서 querySelector를 이용해 header안에 .badges라는 클래스의 정보를
// badgeEl 이라는 변수에 넣어 만든다
const toTopEl = document.querySelector("#to-top");
//html의 #to-top을 toTopEl에 할당

// window.addEventListener('scroll', function () {
//   console.log('scroll!');
// });
// window 즉 화면(탭)에다가 addEventListener를 걸어서 'scroll'발생시
// console에 'scroll!'이라고 문자데이터가 뜨도록 한다.
// 이렇게 하면 스크롤시 문자데이터가 뜨긴뜨는데 스크롤할때마다 데이터가
// 발생하기 때문에 추후 웹페이지에 내용이 많아지고 무거워질 경우
// 띄워야하는 데이터가 너무너무 많아져서 화면이 버벅거리고 느려지게 된다.
// 그래서 똑같이 스크롤해도 데이터가 띄엄띄엄 발생하도록 조절해주는 역할을
// 하는 js 라이브러리를 html 안에 head에 추가해준다. 그게 바로 lodash.js임

window.addEventListener(
	"scroll",
	_.throttle(function () {
		console.log(window.scrollY);
		/* _.throttle(함수(){}, 시간) -> lodash.js를 추가하면서 사용가능하게 된 메소드이며
window객체에 addEventListener로 이벤트 추가할건데, scroll이 발생하면 
'scroll'문자 데이터를 띄울건데, 0.3초(300밀리세컨즈)단위로
부하를 발생시켜 데이터가 우르르 발생하는걸 방지하고 띄엄띄엄 출력되게함.  */
		if (window.scrollY > 500) {
			// 배지 서서히 숨기기
			// gsap.to(요소, 지속시간, 옵션-대부분객체);
			gsap.to(badgeEl, 1, {
				opacity: 0, // 투명하게 하겠다
				display: "none", // 요소자체를 없애겠다
			});
			// '상단으로' 버튼 보이기
			gsap.to(toTopEl, 0.2, {
				x: 0,
			});
		} else {
			// 배지 서서히 나타내기
			gsap.to(badgeEl, 1, {
				opacity: 1, //불투명하게(나타나게) 하겠다
				display: "block", //요소자체를 나타내겠다
			});
			//'상단으로' 버튼 숨기기
			gsap.to(toTopEl, 0.2, {
				x: 100,
			});
		}
	}, 300)
);

toTopEl.addEventListener("click", function () {
	//toTopEl가 클릭되면
	gsap.to(window, 0.7, {
		//화면내에서 0.7초 동안
		scrollTo: 0, //화면의 위치를 0px지점으로 옮겨준다
	});
});

/* 애니메이션을 담당하는 라이브러리인 gsap을 이용해서 badgeEl를 서서히 숨기고
나타나게 해줬다(opacity). 라이브러리는 외부에서 검색을 통해 코드복사해서 head부분의
main.js 윗줄에 붙여넣기 해야한다.*/

/* 그런데 여기서 문제가 뭐냐면, badgeEl가 사라지긴 했는데 눈에 보이지만 
않을뿐 실제 존재 하기때문에 여기에 링크라도 걸려있다면 사용자가 모르고 
누를수도 있다는 것. 그래서 opacity에 display도 추가해서 요소자체를 있다없다하게 나타냄 */

/* 목표 : 메인화면에 이미지 순차적으로 띄우기 */
// gsap.to(요소, 지속시간(초), 옵션-대부분객체);
const fadeEls = document.querySelectorAll(".visual .fade-in");
// querySelectAll로 .fade-in들을 찾아서 fadeEls에 담겠다
fadeEls.forEach(function (fadeEl, index) {
	// HTML에서 찾아낸 fadeEls의 갯수만큼 forEach에 적은 함수대로 반복 실행 하겠다
	// 찾아낸 각 요소의 이름은 fadeEl이며 반복할 횟수 즉, 찾아낸 숫자는 index라고 칭한다.
	gsap.to(fadeEl, 1, {
		delay: (index + 1) * 0.7, // 0.7s, 1.4s, 2.1s, 2.8s 뒤에 각 요소들 페이드인됨
		opacity: 1,
	});
});
/* gsap.to로 fadeEl 각각에 애니메이션을 줄건데 애니메이션 효과시간은 1초고
각 fadeEl마다 시작하는 시간에 delay를 줄건데 (index+1)*0.7초 만큼 주겠다.
그리고 각 fadeEl의 투명도는 1이니까 투명도는 따로 없다 */

/* 대부분의 경우 반복적으로 한꺼번에 묶어서 처리하는 개념이 많이 쓰인다.
위 같은 경우도 요소별 따로따로 시간을 주는게 아니라 한 코드로 묶어서
시간만 다르게 지정하는 방법을 사용함. 이렇게 효율이고 간결하고 처리해야함 
반복되는 내용을 요소 각각마다 코드로 적는것은 피해야함. 묶어서 한번에 처리하는
방법을 생각할 수 있어야한다*/

// 목표 : swiper 라이브러리를 이용해 공지사항 각 요소를 수직 슬라이딩 하게한다
// new=생성자 Swiper(선택자, 옵션);
new Swiper(".notice-line .swiper-container", {
	/*.notice-line 내의 .swiper-container를 찾아내서 swiper의 기능을 실행(슬라이드)하겠다.
 옵션은 객체데이터로 넣겠다 */
	direction: "vertical", // 수직으로 만들겠다, 기본값:horizontal(수평)
	autoplay: true, // 자동으로 재생하겠다, 자동재생여부
	loop: true, // 마지막 슬라이드에서 다시 첫 슬라이드로 가겠다, 반복재생여부
});

/*목표 : swiper 라이브러리를 이용해 프로모션 각 요소를 수평 슬라이딩 하게한다*/
new Swiper(".promotion .swiper-container", {
	/* .promotion .swiper-conatainer를 찾아서 swiper 기능을 작동시키겠다. 
  어떻게 작동할지는 객체데이터로 쓰겠다 */
	slidesPerView: 3, //한번에 보여줄 슬라이드 개수
	spaceBetween: 10, // 슬라이드 사이 여백
	centeredSlides: true, // 첫 슬라이드가 가운데에서(왼쪽말고) 시작하도록 지정
	loop: true,
	autoplay: {
		delay: 2000, // autoplay의 지연시간 : 2초
	},
	pagination: {
		// 페이지 번호 매기기
		el: ".promotion .swiper-pagination", //  페이지 번호 요소 선택자
		clickable: true, // 사용자의 페이지 번호 요소 클릭(제어)가능 여부
	},
	navigation: {
		// 이전,다음버튼 기능을 지정한다.
		prevEl: ".promotion .swiper-prev", // .swiper-prev를 이전버튼으로 사용
		nextEl: ".promotion .swiper-next", // .swiper-next를 다음버튼으로 사용
	},
});

new Swiper(".awards .swiper-container", {
	slidesPerView: 5,
	spaceBetween: 30,
	autoplay: true,
	loop: true,
	navigation: {
		prevEl: ".awards .swiper-prev",
		nextEl: ".awards .swiper-next",
	},
});

/* 목표 : notice-line 우측의 스타벅스 프로모션 버튼을 눌렀을 때 
밑에 있는 promotion 요소가 사라졌다 나타났다 하는 효과 발생 */
const promotionEl = document.querySelector(".promotion");
// 효과를 적용시키려는 요소인 '.promotion'을 찾아서 변수에 할당한다
const promotionToggleBtn = document.querySelector(".toggle-promotion");
// 효과 적용을 실행하는 버튼 역할인 '.toggle-promotion'을 찾아서 변수 할당한다
let isHidePromotion = false; // -> 변수명 자체를 직관적으로 지음. true/false에 맞춰서 지음
/* promotion이 사라진 상황과 나타난 상황을 구분해야 한다. 그래서
  isHidePromotion이란 이름의 변수를 지정할건데, 처음 웹페이지 열때 promotion이
  나타나 있어야 하기 때문에 값을 false;로 지정했다.(true일 상황은 밑에 작성)*/
promotionToggleBtn.addEventListener("click", function () {
	// promotionToggleBtn를 클릭하면 함수 실행 할건데 그게 뭐냐면..
	isHidePromotion = !isHidePromotion; // -> !=뒤에 오는 값의 반대값! 즉 여기선 true!
	// false의 반대값인 true를 isHidePromotion에 할당해라.
	if (isHidePromotion) {
		// -> 여기의 isHidePromotion의 값은 true임. 왜? 이미 위에서 클릭 되어있으니까!
		// 만약 ()안에 true값이 들어오면..
		promotionEl.classList.add("hide");
		// promotionEl에 hide라는 클래스를 추가해라. 사라지는 효과 자체는 css에서 처리
	} else {
		promotionEl.classList.remove("hide");
	}
});

/* 목표: youtube 영상 위로 떠다니는 이미지 요소 넣고 애니메이션 효과 적용*/

/* 아래 함수는 랜덤한 숫자를 생성하는 함수로서, 아직 이해하기엔 어려우니 
차후에 JS시간에 배우기로 함. */
function random(min, max) {
	// `.toFixed()`를 통해 반환된 문자 데이터를,
	// `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
	return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function floatingObject(selector, delay, size) {
	/* 선택자(selector)를 매겨변수로 하는 floatingObject라는 함수 생성*/
	// gsap.to(요소, 지속시간, {옵션-대부분객체});
	gsap.to(
		selector, // -> 선택자(.floating1 ~ 3까지 각각 선택됨)
		random(1, 2), // -> 애니메이션 동작 시간(1초~2초사이 랜덤)
		{
			y: size, // -> 수직으로 이동(10혹은20혹은15px)
			repeat: -1, // -> 반복횟수 무한(-1), 여기까지 하면 애니메이션이 어색함
			yoyo: true, // -> 재생했던 애니메이션을 역재생 한다, 좀더 부드러운 효과
			ease: Power1.easeInOut,
			/* greensock.com의 easing함수를 가져와서 통통튀는 효과를 아예 제거함*/
			delay: random(0, delay), // -> 지연시간 (0초~1혹은1.5혹은0.5초)
		}
	);
}
floatingObject(".floating1", 1, 10); // -> 함수 실행, 인수(넣을 선택자)는 .floating
floatingObject(".floating2", 1.5, 20); // -> 함수 실행, 인수(넣을 선택자)는 .floating
floatingObject(".floating3", 0.5, 15); // -> 함수 실행, 인수(넣을 선택자)는 .floating

/* 목표 : 스크롤로 내리다가 해당 섹션에 도착했을때 숨겨져있던 요소들이 등장*/

const spyEls = document.querySelectorAll("section.scroll-spy");
// .selection.scroll-spy 요소들을 찾아서 spyEls 변수로 할당
spyEls.forEach(function (spyEl) {
	// 각각의 spyEl들에게 아래 함수를 명령함
	new ScrollMagic.Scene({
		triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정(트리거 대상 요소)
		triggerHook: 0.8, // 뷰포트 상단(0)과 하단(1)의 사잇값으로 트리거 위치를 지정
	}) // spyEl이 트리거에 걸리면 아래의 메소드가 실행 된다.
		.setClassToggle(spyEl, "show") // sptEl에 show라는 클래스를 넣었다 뺐다 할거다
		.addTo(new ScrollMagic.Controller()); // 위의 옵션들을 컨트롤러에 할당해서 동작하게 하겠다.
});
