---
title: "자바스크립트  - 모듈"
description: "script 태그의 type=\"module\"과 defer, async 속성의 차이를 정리한 모던 자바스크립트 스터디 기록."
authors: [hyoloui]
tags: [javascript]
---

❤️‍🔥 TIL : Today I Learned

## 모던 자바스크립트 스터디 주제 : 모듈

리액트 사용, 여러 js를 묶어놓은 `index.js` 등을 html 파일에 연결시킬 때 `script` 태그 안에 작성하는 속성으로 타입을 모듈로 작성해준다.

<!--truncate-->

```html
<script type="module" src="index.js"></script>
```

모듈은 파일의 크기가 커지면 커질수록 사용 가능성이 높으며 프로젝트 간 필수적으로 사용 할 수밖에 없는 기능이다.

모듈 타입은 기본값으로 `defer` 속성이 있다. 즉, html 요소가 모두 파싱이 된 이후 script를 실행한다.

여기서 `defer`와 `async` 의 차이점이 궁금해져 공부했다.

공통점 : 스크립트를 다운로드하는동안 HTML 이 중단되지 않음

- `defer` : html 다 다운받고 나서 dom 조작 가능 할수 있도록! script 가 html 파싱 이후 실행! (위에서부터 아래로 쭉 읽음)
- `async` : html 파싱과 상관없이 html, script 중 먼저 다운로드 된 것부터 실행 됨!

:::tip

- dom 조작 해야하는 script == `defer`
- dom 조작 없이 스크립트 의존성 없는 코드 == `async`

:::

참고 영상 (내가 자주 보고 참고하는 '드림코딩' 채널): [드림코딩 - defer, async](https://youtu.be/tJieVCgGzhs)

스터디그룹에서 `async` 의 응용은 각 광고들에서 재생되는 영상들이 페이지 이용과는 별개로 동작하는 것 이기 때문이지 않을까 라는 추론을 하고 질문 했으나,

튜터님 질문 결과 == ux 서비스페이지. 광고옆에 있음. 메인화면 나오기도 전에 광고 먼저 보임. 고객이탈율 감소. 거부감. 회사 매출 감소. 능력없는 개발자... 였다ㅜㅜ

나중에 `async` 를 사용할 경우가 생긴다면 포스팅 하겠다!

{/* 이 글은 Tistory(https://hyoloui.tistory.com/53)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-12 */}
