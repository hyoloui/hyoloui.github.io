---
title: "미들웨어에서 리프레시 토큰으로 액세스 토큰 갱신하기"
description: "액세스 토큰 쿠키가 만료되면 Next.js 미들웨어에서 리프레시 토큰으로 재발급받아 응답 쿠키에 다시 심도록 만든 기록."
authors: [hyoloui]
tags: [nextjs, auth]
---

1월에 쿠키로 로그인을 만들 때는 액세스 토큰이 만료되면 그냥 로그인 화면으로 보냈다. 이번 주에 로그아웃 기능을 붙이면서, 미뤄 두었던 토큰 갱신도 같이 처리했다.

<!--truncate-->

## 어디서 갱신할까

후보는 API 요청 함수와 미들웨어였다. API 함수에서 401을 받고 재발급하는 방식은 요청 함수가 열 개 넘는 파일에 흩어져 있어서 손댈 곳이 많았다. 그리고 우리 API 호출은 대부분 서버 컴포넌트에서 일어나는데, 서버 컴포넌트 렌더링 중에는 쿠키를 쓸 수 없다.

미들웨어는 페이지 요청마다 먼저 실행되고 응답 쿠키를 바꿀 수 있다. 액세스 토큰 쿠키는 리프레시 토큰보다 만료일을 짧게 잡아 두었으니, 액세스 토큰 쿠키가 사라지고 리프레시 토큰만 남은 상태를 갱신 시점으로 보면 된다.

```ts
const accessToken = request.cookies.get('_accessToken')?.value;
const refreshToken = request.cookies.get('_refreshToken')?.value;

if (!accessToken && refreshToken) {
  const response = NextResponse.next();
  await postRefreshToken(response);
  return response;
}
```

`postRefreshToken`은 재발급 API를 호출하고, 받은 토큰을 인자로 받은 `NextResponse`의 쿠키에 만료일과 함께 다시 넣는다. 그 뒤 로그인 여부 판단도 `accessToken || refreshToken`을 기준으로 바꿨다.

테스트할 때는 만료일을 21일 대신 10초, 20초로 줄여 놓고 쿠키가 사라졌다가 다시 생기는지 확인했다.

로그아웃은 `@modal/logout` 확인 모달에서 처리한다. 서버 액션에서 `_accessToken`, `_refreshToken`, `_employeeId` 쿠키를 지우고 로그인 페이지로 보낸다.
