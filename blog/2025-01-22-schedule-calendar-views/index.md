---
title: "스케줄 화면에 주간·월간 뷰 붙이기"
description: "일간만 있던 스케줄 화면에 주간·월간 뷰를 추가하면서 뷰 상태를 URL로 옮기고, props를 복사하던 state를 걷어낸 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

스케줄 관리 화면은 react-big-calendar로 만든 일간 뷰만 있었다. 이번에 주간과 월간을 붙이고 있다. 라이브러리 버전도 1.13에서 1.17로 올렸다.

<!--truncate-->

## 뷰를 어디에 둘까

어떤 뷰를 보고 있는지는 URL 쿼리에 두기로 했다. 날짜와 탭이 이미 searchParams로 관리되고 있었고, 새로고침하거나 주소를 공유해도 같은 화면이 나와야 한다고 생각했다.

```ts
export const viewTypesArray = [
  { id: 'day', name: '일간' },
  { id: 'week', name: '주간' },
  { id: 'month', name: '월간' },
] as const;

// page.tsx
searchParams: { view = viewTypesArray[0].id, ... }
```

목록은 `as const` 배열 하나로 두고, 드롭다운과 props 타입이 모두 여기서 나온다. 페이지가 읽은 view는 컨테이너를 거쳐 캘린더의 `view` prop으로 바로 들어간다. 전에는 `defaultView`와 `views` 설정으로 일간에 고정해 두었는데, 이제 캘린더는 받은 값을 그리기만 한다.

## 복사본 state 걷어내기

캘린더 컴포넌트에는 props로 받은 events를 `useLayoutEffect`로 state에 복사해 쓰는 코드가 있었다. 서버에서 받은 데이터를 그대로 그리는 화면이라 복사본을 둘 이유가 없었다. state와 effect를 지우고 props를 바로 넘겼다.

직원별 열(resources)은 일간에서만 의미가 있어서 일간일 때만 넘기게 했다. 주간·월간에서 직원 수만큼 열이 갈라지면 화면이 읽히지 않는다.

그 밖에 한 일은 이렇다.

- moment 로케일을 `ko`로 설정해 요일과 월 표기를 한국어로 맞췄다.
- 출석 페이지 캘린더도 같은 라이브러리 설정으로 맞춰 스타일을 통일했다.
- 스케줄 카드 레이아웃을 일간·주간·월간·종일로 나눠 만들고, 등록은 사이드 모달로 옮겼다.

예전 같으면 뷰마다 state를 하나씩 만들었을 것 같다. 이번에는 상태를 어디에 하나만 둘지부터 정하고 시작했고, 나머지 코드는 그 값을 받아 그리기만 하게 됐다.
