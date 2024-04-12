---
title: "에러 처리 공용 함수, Sentry, 배포 알림"
description: "API 에러 처리를 공용 함수로 모으고, Sentry 연동과 GitHub Actions 배포 알림을 붙인 2주의 기록."
authors: [hyoloui]
tags: [error-handling, deployment]
---

QA 서버에 배포가 돌기 시작하면서 기능 말고 운영 쪽 작업이 늘었다. 이번 2주 동안은 에러가 났을 때 어디서 잡히고 누가 알 수 있는지를 정리했다.

<!--truncate-->

## handleError

API 요청 함수마다 에러 처리가 제각각이었다. 어떤 함수는 401, 403을 직접 분기해서 메시지를 만들고, 어떤 함수는 catch에서 '불러오는데 실패했습니다' 같은 고정 문구로 다시 던졌다. 그러다 보니 서버가 보내준 에러 메시지는 화면까지 오지 못했다.

응답을 받는 부분을 함수 하나로 모았다.

```ts
export default async function handleError(response: Response) {
  if (response.ok) return response.json();
  return response.json().then((res) => {
    if (!res.data) throw new Error(JSON.stringify(res));
    throw new Error(res.data);
  });
}
```

요청 함수에서는 `const res = await handleError(response)` 한 줄만 쓰고, catch에서는 로그만 남기고 그대로 다시 던진다. 던진 에러는 라우트의 `error.tsx`가 받아서 화면에 보여준다. 13개 API 파일에 적용하니 코드가 180줄 넘게 줄었다.

## Sentry와 Slack 알림

화면에서 보이는 에러는 사용자만 안다. 그래서 `@sentry/nextjs`를 연동했다. client, server, edge 설정 파일을 만들고, 개발 환경에서는 `enabled: process.env.NODE_ENV !== 'development'`로 꺼 두었다. 루트까지 올라온 에러는 `global-error.tsx`에서 `Sentry.captureException`으로 보낸다.

배포 쪽은 GitHub Actions 워크플로를 두 개 만들었다. `release` 브랜치에 push하면 QA용, `main` 브랜치에 push하면 운영용 워크플로가 돈다. 의존성 설치, lint, 환경 변수 주입, 빌드까지 하고 마지막에 `action-slack`으로 성공이든 실패든 결과를 Slack 채널에 보낸다.

기능을 만들 때는 내 화면에서 잘 되면 끝이었다. 배포된 서비스에서는 문제가 생겼을 때 사용자보다 내가 먼저 알아야 한다.
