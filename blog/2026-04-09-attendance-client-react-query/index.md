---
title: "출석 페이지를 클라이언트 조회로 옮기기"
description: "날짜와 탭이 바뀔 때마다 서버에서 다시 그리던 출석 페이지를 React Query와 nuqs 기반 클라이언트 조회로 옮기고, moment를 date-fns로 바꾼 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

CRM 출석 페이지는 월간 달력과 일별 목록으로 되어 있다. 달을 넘기거나 탭을 바꿀 때마다 화면 전체가 멈칫하는 게 계속 거슬려서 데이터를 가져오는 방식을 바꿨다.

<!--truncate-->

기존 `CalendarContainer`는 async 서버 컴포넌트였다. searchParams로 받은 `date`와 `tab`에 맞는 월간 데이터를 서버에서 조회해 그렸다. URL이 바뀌면 서버 컴포넌트가 다시 렌더링될 때까지 기다려야 했고, 방금 본 달로 돌아가도 같은 요청을 또 보냈다.

그래서 달력과 일별 상세(입장, 그룹 수업, 개인 레슨, 상담)를 클라이언트 컴포넌트로 바꾸고 조회는 React Query 훅으로 뺐다. URL 상태는 nuqs의 `useQueryState`로 읽고, 페이지는 `centerId`만 내려준다.

```ts
return useQuery({
  queryKey: ['dailyEntrances', centerId, date],
  queryFn: () => getDailyEntrancesClient(accessToken!, centerId, date),
  enabled: !!accessToken,
  placeholderData: (prev) => prev,
  staleTime: 30 * 1000,
});
```

`placeholderData`로 이전 달 데이터를 띄워 둔 채 새 데이터를 받는다. 그 사이 달력은 흐리게 처리하고, 처음 들어올 때만 스켈레톤을 보여준다. 출석은 실시간으로 쌓이는 데이터라 `staleTime`은 30초로 짧게 잡았다. 한 번 본 달은 캐시에서 바로 나온다.

처음엔 `useQueryState('date')`를 그대로 읽고 값이 없을 때를 곳곳에서 처리했는데, `parseAsString.withDefault`와 `parseAsStringEnum`으로 기본값과 허용 탭을 파서에 넣어 정리했다. 컴포넌트를 감싸던 Suspense도 클라이언트 조회로 바뀌면서 의미가 없어져 걷어냈다. 쓰는 곳이 사라진 서버용 출석 API 파일은 지웠다.

다음 날에는 출석 컴포넌트들의 moment를 date-fns로 바꿨다. date-fns는 필요한 함수만 가져다 쓰고 원본 날짜를 바꾸지 않아서 계산 흐름이 읽기 편하다. 프로젝트 전체를 한 번에 바꾸지는 않고, 이번처럼 손대는 화면부터 옮기기로 했다.

이 작업은 Claude Code와 같이 했다. 첫 상세 컴포넌트에서 훅 모양과 로딩 처리를 정하고, 나머지 상세 컴포넌트는 같은 패턴으로 옮긴 뒤 화면을 하나씩 확인했다.
