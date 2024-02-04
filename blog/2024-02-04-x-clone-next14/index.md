---
title: "x-clone으로 Next.js 14 다시 공부하기"
description: "주말과 퇴근 후 X(트위터) 클론을 만들며 parallel/intercepting route, MSW, React Query의 서버 prefetch를 익힌 한 달의 기록."
authors: [hyoloui]
tags: [career, project, react]
---

회사에서 App Router로 CRM을 만들고 있지만, 일정에 쫓기다 보니 이해하지 못한 채 넘어간 부분이 많았다. 1월 한 달은 주말과 퇴근 후에 X(트위터) 클론을 만들면서 Next.js 14를 처음부터 다시 짚었다.

<!--truncate-->

## 라우트 구조

첫날은 화면 뼈대와 라우팅에 썼다. `(beforeLogin)`, `(afterLogin)` 라우트 그룹으로 레이아웃을 나누고, 로그인, 회원가입, 글쓰기는 `@modal` 슬롯 안에 `(.)` intercepting route로 만들고, 사진 보기도 같은 슬롯에 모달로 띄웠다. 모달로 뜨는 화면도 각자 주소를 가지니 링크로 공유하거나 뒤로 가기로 닫는 동작이 자연스럽다. 회사에서 모달 페이지를 만들 때 `default.tsx`가 왜 필요한지 헷갈렸는데, 여기서 슬롯이 매칭되지 않을 때의 기본값이라는 걸 확실히 이해했다.

## MSW와 React Query

백엔드 없이 개발하려고 MSW를 붙였다. 브라우저용 워커와 함께 `@mswjs/http-middleware`로 Express 서버를 띄워서, 서버 컴포넌트의 fetch도 목 데이터를 받게 했다.

데이터는 React Query로 관리했다. 서버 컴포넌트에서 먼저 받아두고 클라이언트에 넘기는 방식이다.

```tsx
const queryClient = new QueryClient();
await queryClient.prefetchInfiniteQuery({
  queryKey: ['posts', 'recommends'],
  queryFn: getPostRecommends,
  initialPageParam: 0,
});
const dehydratedState = dehydrate(queryClient);
```

이걸 `HydrationBoundary`로 감싸면 클라이언트의 `useSuspenseInfiniteQuery`가 같은 키로 캐시를 바로 쓴다. 무한 스크롤은 `react-intersection-observer`로 마지막 요소가 보일 때 `fetchNextPage`를 부르게 했다. `useQuery`를 `useSuspenseQuery`로 바꾸니 로딩과 에러를 `loading.tsx`, `error.tsx`가 맡아서 컴포넌트 안의 분기가 사라졌다.

그 밖에 next-auth v5로 로그인을 붙이고, 게시글 작성을 `useMutation`으로 옮겼다. 지금은 좋아요의 optimistic update를 하기 전에 클릭 이벤트가 게시글까지 전파되는 문제를 막아 둔 상태다.

회사 코드에서는 next-auth를 걷어냈는데, 여기서는 백엔드가 세션 쿠키를 쓰는 구조라 그대로 썼다. 같은 도구라도 서버 구조에 따라 맞고 안 맞고가 갈린다는 걸 두 프로젝트를 동시에 하면서 느꼈다.
