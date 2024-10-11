---
title: "Sentry 설정을 instrumentation으로 옮기고 에러 나누기"
description: "흩어져 있던 Sentry 설정을 instrumentation.ts로 모으고, API 실패와 예상하지 못한 오류를 구분해 기록하도록 공통 에러 처리를 고친 기록."
authors: [hyoloui]
tags: [career, react, web]
---

CRM에는 이미 Sentry가 붙어 있다. 이번 주에는 Sentry 설정 파일과, 무엇을 Sentry로 보낼지 정하는 공통 에러 처리 함수를 손봤다.

<!--truncate-->

## 설정 파일 정리

서버용 `sentry.server.config.ts`, 엣지용 `sentry.edge.config.ts`가 따로 있었다. Sentry의 Next.js 가이드가 바뀌어서 `instrumentation.ts`의 `register` 함수에서 런타임별로 초기화하는 방식을 따랐다.

```ts
export default async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      enabled: process.env.NODE_ENV !== 'development',
    });
  }
  // edge 런타임도 같은 방식
}
```

로컬 개발 중에 생기는 오류가 Sentry에 쌓이지 않도록 `enabled` 조건도 넣었다.

## 실패와 오류를 나누기

API 응답은 모두 `handleError`를 거친다. 지금까지는 응답이 정상이 아니면 대부분 같은 로그를 찍고 끝났다. 이걸 세 갈래로 나눴다.

- 서버가 `FAIL` 상태를 돌려주면 화면에서 처리할 수 있는 실패로 보고 그대로 반환한다. 대신 Sentry에 `captureException`으로 남긴다.
- 데이터 없이 알 수 없는 응답이 오면 `Not caught Error`로 로그를 남기고 throw한다.
- 나머지는 서버 메시지로 Error를 던진다.

센터 하위 `error.tsx`는 `useEffect`의 의존성이 빈 배열에 eslint 주석으로 경고를 막아 둔 상태였다. `[error]`로 바꿔서 새 오류가 들어올 때마다 Sentry로 보내도록 했다.

## PR 템플릿

같은 주에 PR 템플릿도 고쳤다. 변경 내용에 이유를 쓰는 칸과 체크리스트를 넣었다. 공용 모듈을 건드렸는지, 로컬에서 lint와 type check를 돌렸는지. 변경 이유를 미리 적어 두면 리뷰 코멘트가 줄어들 거라고 봤다.
