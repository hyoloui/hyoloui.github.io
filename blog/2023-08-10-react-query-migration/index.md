---
title: "useEffect 대신 React Query로 옮기기"
description: "어드민의 데이터 요청을 useEffect와 useState에서 React Query로 옮기고, 에러 처리와 클라이언트 컴포넌트 경계를 다시 잡은 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

입사 첫 주에 React Query를 설치해 놓고 석 달 동안 한 번도 쓰지 않았다. 페이지마다 `useEffect` 안에서 API를 부르고 `useState`에 담는 코드가 계속 늘어났다. 이번 주에 그걸 React Query로 옮겼다.

<!--truncate-->

## 회원 관리부터

회원 관리 페이지가 첫 대상이었다. 페이지 번호와 검색 조건을 `queryKey`에 넣으니 페이지를 넘기거나 검색어를 바꿀 때 알아서 다시 요청하고, 갔던 페이지는 캐시에서 바로 나온다. 이벤트 목록, 미리보기, 통계, 당첨자 선정 화면도 차례로 옮겼다.

옮기면서 두 가지를 같이 설정했다. 하나는 React Query Devtools다. 캐시에 뭐가 들어 있는지 눈으로 보니 `queryKey`를 어떻게 잡아야 하는지 감이 왔다. 다른 하나는 `@tanstack/eslint-plugin-query`다. `exhaustive-deps` 규칙이 `queryFn`에서 쓰는 값이 `queryKey`에 빠져 있으면 잡아준다.

## 에러는 한 곳에서

전에는 요청마다 `.catch`에서 상태 코드별 메시지를 띄웠다. 이제는 `QueryCache`의 `onError`에서 한 번에 처리한다.

```tsx
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
    },
  }),
});
```

## page.tsx에서 'use client' 빼기

지금까지는 `page.tsx` 맨 위에 `'use client'`를 붙이고 시작했다. 이번에 페이지마다 `EventClient`, `MemberClient` 같은 클라이언트 컴포넌트를 따로 만들고 `page.tsx`는 그걸 렌더링만 하게 바꿨다. 페이지 자체는 서버 컴포넌트로 남겨두고, 상태와 이벤트 핸들러가 필요한 부분만 클라이언트로 내리려는 의도다.

열흘 전에는 300줄 가까이 되던 이벤트 등록 폼을 `SendingDate`, `WinnerOptions` 같은 작은 컴포넌트로 쪼갰고, 공지사항 폼도 같은 방식으로 나눴다. 한 파일이 짧아지니 어디에 `useQuery`를 넣을지 정하기가 쉬웠다.
