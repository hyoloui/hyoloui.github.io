---
title: "Sentry를 붙이고 axios 인터셉터를 만들다"
description: "React Query 이전 이후 mutation 캐시 갱신과 불필요한 재요청을 정리하고, Sentry 에러 모니터링과 axios 인터셉터를 도입한 기록."
authors: [hyoloui]
tags: [error-handling, data-fetching]
---

React Query로 옮긴 뒤 남은 일을 정리한 2주였다. 데이터를 바꾸는 쪽을 손보고, 운영에서 나는 에러를 볼 수 있게 했다.

<!--truncate-->

## 삭제 후 목록 갱신

삭제 버튼은 `useDeleteConfirm`이라는 훅 하나로 처리하고 있었다. 확인 toast를 띄우고, 확인을 누르면 삭제 API를 부른다. 여기에 `useMutation`을 넣고, 삭제가 성공하면 넘겨받은 `queryKey`들을 `invalidateQueries`로 무효화하게 바꿨다. 배너, 이벤트, 공지사항 어디서 지워도 목록이 바로 새로 고쳐진다.

이벤트 미리보기 모달을 열 때마다 뒤에 있는 목록이 다시 요청되는 것도 찾았다. 모달이 열려 있는 동안은 `enabled: false`가 되게 하고 `staleTime`을 10초로 늘렸다.

## Sentry

운영 배포 후에는 사용자가 어떤 에러를 만나는지 알 방법이 없었다. `@sentry/nextjs`를 설치하고 `next.config.js`를 `withSentryConfig`로 감쌌다. 클라이언트, 서버, 엣지 설정 파일이 각각 생긴다. 광고 차단기에 막히지 않게 `tunnelRoute`를 쓰고, 소스맵은 업로드만 하고 브라우저에는 숨겼다.

## axios 인터셉터

API 함수마다 첫 줄이 똑같았다. 스토리지에서 토큰을 꺼내 `axios.defaults.headers`에 넣는 코드다. 이걸 인스턴스 하나의 요청 인터셉터로 모았다.

```ts
const api = axios.create();

api.interceptors.request.use((config) => {
  const newConfig = { ...config };
  const accessToken = getAccessToken();
  if (accessToken) newConfig.headers.Authorization = `Bearer ${accessToken}`;
  return newConfig;
});
```

로그아웃이나 토큰 만료 때 지워야 할 값도 정리했다. 토큰과 만료 시간이 따로 저장돼 있어서 둘 다 지우도록 했다. API 함수 스무 개 남짓이 이 인스턴스를 쓰게 바꾸고 나니, 토큰을 붙이는 곳이 한 군데로 줄었다.

이 사이에 회원에게 푸시 알림을 보내는 화면도 만들기 시작했다. 회원 목록 테이블에 체크박스 컬럼을 넣고, 고른 회원에게 보낼 메시지를 모달에서 작성한다.
