---
title: "API 호출 공통화, 설계 문서부터 리뷰 받기"
description: "미뤄 뒀던 authFetch 연결을 다시 시작하면서 설계 문서를 먼저 쓰고 여러 차례 리뷰로 다듬은 기록. 탭 간 refresh 경합, transient 실패, 로그아웃 이후 캐시 복원 같은 경계 사례를 다뤘다."
authors: [hyoloui]
tags: [architecture, data-fetching, auth]
---

7월에 다음 릴리스로 미뤄 둔 `authFetch` 연결 작업을 다시 잡았다. 예전 브랜치는 원격에서 지워지고 커밋만 남아 있었는데, 그사이 develop과 여섯 파일이 충돌했다. 브랜치를 되살리는 대신 설계부터 다시 쓰고 파일 단위로 복원하기로 했다.

<!--truncate-->

## 설계 문서

모든 도메인의 API 호출 방식을 바꾸는 일이라 코드보다 문서를 먼저 썼다. httpOnly 쿠키와 `authFetch` 인터셉터 구조는 유지하고, access 토큰을 메모리에 들고 있는 안은 버렸다. 최종 목적지는 BFF로 정했다. 401과 403을 공통으로 처리하고, 요청 추적 ID와 로깅을 끼울 자리를 미리 뒀다. 작은 도메인 하나를 파일럿으로 먼저 옮기고, 나머지는 하위 작업 20개로 쪼갰다. 단계 사이에 게이트를 두고 운영 환경에서 확인할 시나리오도 적었다.

설계는 시니어, 보안, 리스크, QA 관점으로 나눠 검토했고 이후 리뷰를 몇 차례 더 받아 고쳤다.

## 경계 사례들

백엔드에 물어보니 refresh 토큰은 쓰는 즉시 무효화되고 유예 시간이 없었다. 쿠키는 탭끼리 공유되니, 한 탭이 refresh를 먼저 하면 다른 탭이 들고 있던 refresh는 거부된다. 그걸 세션 만료로 처리하면 탭 하나 때문에 모든 탭이 로그아웃된다. 그래서 refresh 결과를 `invalid`와 `transient`로 나눴다. 네트워크 오류나 5xx 같은 transient에서는 절대 로그아웃하지 않는다. invalid여도 캐시를 무시하고 토큰을 다시 읽어 바뀌었으면 재시도하고, 같을 때만 로그아웃한다.

탭 간 경합은 Web Locks API로 막았다. refresh 전 과정을 lock으로 감싸서 B 탭은 A 탭의 Set-Cookie가 반영될 때까지 기다린다. lock을 얻은 직후 토큰을 다시 읽어서, 이미 다른 탭이 바꿨으면 refresh를 건너뛴다.

```ts
return await navigator.locks.request(REFRESH_LOCK, { signal }, async () => {
  const fresh = await refetchToken();
  if ('token' in fresh && fresh.token !== staleToken) {
    return { token: fresh.token };
  }
  return requestRefresh();
});
```

이 밖에도 몇 가지를 막았다. 로그아웃은 진행 중 Promise를 공유해 동시 401이 몇 번 와도 한 번만 실행된다. 로그아웃 뒤 늦게 끝난 토큰 조회가 캐시를 옛 토큰으로 되돌리지 않게 세대(epoch) 번호를 둬서, 로그아웃 이후 결과는 버린다. 페이지 로드 때 토큰 조회가 세 번씩 나가던 것도 진행 중 Promise를 공유해 한 번으로 줄였다. refresh 타임아웃은 Safari 15.4~15.6에 없는 `AbortSignal.timeout` 대신 `AbortController`로 직접 만들었다.

브랜치 전략도 문서에 정했다. 하위 작업은 develop에서 평평하게 분기하고, 정말 앞 작업에 의존하는 것만 쌓은 뒤 `rebase --onto`로 옮긴다.
