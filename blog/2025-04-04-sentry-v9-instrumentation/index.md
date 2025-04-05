---
title: "Sentry 9로 올리면서 instrumentation 파일로 옮기기"
description: "어드민과 CRM의 @sentry/nextjs를 8에서 9로 올리고, 설정을 Next.js instrumentation 구조로 옮겼다."
authors: [hyoloui]
tags: [error-handling, nextjs]
---

어드민과 CRM 두 저장소의 `@sentry/nextjs`를 8에서 9로 올렸다. 버전만 바꾸면 끝날 줄 알았는데 설정 파일 위치부터 달라졌다.

<!--truncate-->

기존에는 루트에 `sentry.client.config.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts` 세 개가 있었다. 9에서는 클라이언트 초기화를 `src/instrumentation-client.ts`로 옮기고, 서버와 엣지는 Next.js의 `instrumentation.ts`에서 런타임에 맞게 불러온다.

```ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('../sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('../sentry.edge.config');
  }
}

export const onRequestError = Sentry.captureRequestError;
```

`onRequestError`를 내보내면 서버 컴포넌트나 라우트 핸들러에서 난 요청 에러도 Sentry가 받는다. 9 버전 가이드에서 권장하는 형태라 그대로 따랐다.

작업하면서 클라이언트 설정에 DSN이 문자열로 박혀 있던 것도 환경 변수로 뺐다. 순서는 어드민 먼저였다. 오전에 어드민을 바꾸고, 같은 구조를 저녁에 CRM으로 옮겼다. 어드민에는 App Router용 `global-error.tsx`도 추가했다.

같은 주에 CRM에 디자인 시스템 아이콘 SVG도 넣었다. filled, outline, component, system으로 폴더를 나눴고, 색은 `fill` 속성을 넘겨서 바꾸도록 했다. 기존 화면의 이미지 아이콘은 하나씩 이걸로 바꿔갈 예정이다.
