---
title: "토큰 만료는 401로 판단한다: authFetch와 토큰 모델 정리"
description: "access 토큰 만료 시 무한 로딩과 오인 로그아웃이 나던 문제를 '쿠키가 있으면 유효하다'는 가정에서 찾아내고, 401 재시도 코어와 토큰 수명 모델을 다시 짠 기록."
authors: [hyoloui]
tags: [career, typescript, web]
---

QA에서 access 토큰 수명을 일부러 짧게 줄여 테스트하자 인증 쪽 문제가 여러 개 튀어나왔다. 자동 로그인을 끈 사용자는 토큰이 만료되면 화면이 무한 로딩에 빠졌고, refresh 토큰까지 만료되면 요청마다 재시도가 반복됐다.

<!--truncate-->

## 뿌리 찾기

증상마다 가설 번호를 붙여 설계 문서에 쌓다 보니 공통점이 보였다. 코드 전체가 "쿠키에 토큰이 있으면 유효하다"고 가정하고 있었다. 백엔드가 401을 돌려줘도 그걸 만료 신호로 다루는 곳이 없었다. 수정도 층을 나눴다. 1차는 401을 받는 공통 fetch와 페이지 에러 처리, 2차는 모든 로그인에 refresh 토큰 발급, 3차는 토큰 수명 조정이다.

공통 fetch인 `authFetch`는 테스트를 먼저 쓰고 만들었다. 401이면 refresh 후 한 번만 재시도하고, refresh가 실패하거나 재시도도 401이면 세션을 끝낸다. 네트워크 오류와 5xx는 로그아웃 없이 그대로 올린다. 동시에 여러 요청이 401을 받아도 refresh는 한 번만 나가도록 진행 중인 Promise를 공유했다.

```ts
const res = await doFetch(url, withAuth(init, token));
if (res.status !== 401) return res;

const newToken = await refreshSingleFlight();
if (!newToken) {
  await onSessionExpired();
  throw new SessionExpiredError();
}
const retry = await doFetch(url, withAuth(init, newToken));
```

`baseUrl`, 토큰 조달, 세션 종료는 밖에서 주입받게 했다. 나중에 BFF로 옮겨도 코어는 그대로 둘 수 있다.

## 핫픽스와 다음 릴리스 나누기

급한 건 무한 로딩이었다. `authFetch`를 실제 API 함수에 연결하는 작업은 다음 릴리스로 나누고, 이번 핫픽스에는 미들웨어 수정과 토큰 모델 변경만 넣었다. 연결되지 않은 `authFetch` 코드는 CI의 미사용 코드 검사에 걸리므로 핫픽스 브랜치에서 빼고, 커밋 목록을 설계 문서에 남겨 다음 릴리스에서 되살리기로 했다.

토큰 모델은 짧은 access와 긴 refresh로 정리했다. refresh는 자동 로그인 여부와 상관없이 항상 발급하고, 자동 로그인이 아니면 브라우저 세션 동안만 유지한다. access 쿠키에 걸어 두던 만료 시간은 오늘 아예 뺐다. 유효성 판단은 백엔드의 401에 맡긴다.

## 레이스 하나

QA에서 자동 로그인 후 access가 만료된 시점에 메뉴를 누르면 로그인 화면으로 튕기는데, 쿠키 토큰은 정상 갱신돼 있는 현상이 나왔다. 한 요청 안에서는 불가능한 조합이라 동시 요청을 의심했다. 메뉴 링크 prefetch 때문에 여러 요청이 동시에 미들웨어의 refresh 분기로 들어가고, 먼저 도착한 요청이 refresh 토큰을 교체하면 나머지는 옛 토큰으로 실패한다. 내가 핫픽스에 넣은 "refresh 실패면 세션 종료" 처리가 이 실패를 진짜 만료로 오인하고 있었다. 미들웨어에서는 refresh가 실패해도 통과시키고, 진짜 만료는 기존 쿠키 가드에 맡기도록 되돌렸다.
