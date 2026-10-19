---
title: "서버 통신? 어렵죠? '한방에 이해 시켜드릴게요'"
description: "음식점 비유로 JSON, GET/POST 요청, Ajax의 개념과 기본 골격을 정리한 서버-클라이언트 통신 입문 글."
authors: [hyoloui]
tags: [javascript]
---

:::note 음식점으로 이해하는 서버 통신

친구가 차린 음식점에 드디어 테이블도 배치하고, 인테리어도 했다. 오~ 밖에서 보니 괜찮아 보인다.

**하지만 껍데기 뿐이다....**

주문을 받을 프론트 직원과, 주방 직원, 심지어 메뉴판 조차 없다.

여기서 설명! 우리는 음식점 마다 **메뉴판 = JSON(문법)** 이 필요하다.

중국집에 가서 메뉴에 없는 초밥을 주문할 수 없는 것 처럼!

JSON 형식에 맞는 키(음식이름) 을 주문해야 밸류(실제 음식)이 나온다.

자, 여기서 더 나아가 우리가 주문 할 때 마다 '주문 하면 가게 밖으로 나갔다 와야한다면' 어떨까? (새로고침)

그래서 **AJAX** 가 생겼다!!! (새로고침 안해도 주문한 것들이 바뀜)

여기서 동기,비동기 처리는 추후에 포스팅하여 설명 해야겠다!

:::

<!--truncate-->

## 서버-클라이언트 통신 이해하기

### 1. 서버 → 클라이언트: "JSON"을 이해하기

서울시 OpenAPI에 접속해보기

- **서울시 미세먼지 OpenAPI**: `http://openapi.seoul.go.kr:8088/6d4d776b466c656533356a4b4b5872/json/RealtimeCityAir/1/99`
- 크롬 익스텐션 JSONView를 설치해볼까요? 그럼 좀 더 예쁘게 JSON을 볼 수 있습니다. [JSONView](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=ko)

JSON은, Key:Value로 이루어져 있습니다. 자료형 Dictionary와 아주 유사하죠.

위 예제에서는 `RealtimeCityAir`라는 키 값에 딕셔너리 형 value가 들어가있고, 그 안에 `row`라는 키 값에는 리스트형 value가 들어가있습니다.

### 2. 클라이언트 → 서버: GET 요청 이해하기

:::tip API는 은행 창구와 같은 것!

같은 예금 창구에서도 개인 고객이냐 기업 고객이냐에 따라 가져와야 하는 것 / 처리해주는 것이 다른 것처럼, 클라이언트가 요청 할 때에도, "타입"이라는 것이 존재합니다.

:::

- **GET** → 통상적으로! 데이터 조회(Read)를 요청할 때. 예) 영화 목록 조회
- **POST** → 통상적으로! 데이터 생성(Create), 변경(Update), 삭제(Delete) 요청 할 때. 예) 회원가입, 회원탈퇴, 비밀번호 수정

**GET**

```
https://movie.naver.com/movie/bi/mi/basic.nhn?code=161967

위 주소는 크게 두 부분으로 쪼개집니다. 바로 "?"가 쪼개지는 지점인데요.
"?" 기준으로 앞부분이 <서버 주소>, 뒷부분이 [영화 번호] 입니다.

* 서버 주소: https://movie.naver.com/movie/bi/mi/basic.nhn
* 영화 정보: code=161967
```

**GET 방식으로 데이터를 전달하는 방법**

- `?` : 여기서부터 전달할 데이터가 작성된다는 의미입니다.
- `&` : 전달할 데이터가 더 있다는 뜻입니다.

예시) `google.com/search?q=아이폰&sourceid=chrome&ie=UTF-8`

위 주소는 google.com의 search 창구에 다음 정보를 전달합니다!

- `q=아이폰` : 검색어
- `sourceid=chrome` : 브라우저 정보
- `ie=UTF-8` : 인코딩 정보

**여기서 잠깐, 그럼 `code`라는 이름으로 영화번호를 주자!는 것은 누가 정하는 것일까요?**

네, 바로 프론트엔드 개발자와 백엔드 개발자가 미리 정해둔 **약속**입니다.

- 프론트엔드: "code라는 이름으로 영화번호를 주면 될까요?"
- 백엔드: "네 그렇게 하시죠. 그럼 code로 영화번호가 들어온다고 생각하고 코딩하고 있을게요"

## Ajax 시작하기

크롬 개발자 도구에 다음과 같이 써보세요.

:::warning 주의

Ajax는 jQuery를 임포트한 페이지에서만 동작 가능합니다.

즉, `http://google.com/` 과 같은 화면에서 개발자도구를 열면, jQuery가 임포트 되어있지 않기 때문에 아래와 같은 에러가 뜹니다.

- `Uncaught TypeError: $.ajax is not a function` → ajax라는 게 없다는 뜻

:::

**미세먼지 OpenAPI**

```
http://spartacodingclub.shop/sparta_api/seoulair
```

**Ajax 기본 골격**

```js
$.ajax({
  type: "GET",
  url: "여기에URL을입력",
  data: {},
  success: function (response) {
    console.log(response);
  },
});
```

**Ajax 코드 해설**

```js
$.ajax({
  type: "GET", // GET 방식으로 요청한다.
  url: "요청할 URL 주소", //ex) https://hyoloui.tistory.com/
  data: {}, // 요청하면서 함께 줄 데이터 (GET 요청시엔 비워두세요)
  success: function (response) {
    // 서버에서 준 결과를 response라는 변수에 담음
    console.log(response); // 서버에서 준 결과를 이용해서 나머지 코드를 작성
  },
});
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/6)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-05 */}
