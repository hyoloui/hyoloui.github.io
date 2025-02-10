---
title: "스케줄 캘린더를 기간 조회로 바꾸기"
description: "일별 조회만 하던 CRM 스케줄 화면에 주간·월간 기간 조회를 붙이고, 일정 생성·수정·삭제 뒤에도 필터가 유지되도록 고쳤다."
authors: [hyoloui]
tags: [career, react, typescript]
---

지난달 CRM 스케줄 화면에 주간·월간 뷰를 붙였는데, 데이터는 여전히 하루 단위로만 가져오고 있었다. 이번에는 조회 방식을 손봤다.

<!--truncate-->

기존 API 함수 이름은 `getSchedules`, `getScheduleSummary`였는데, 기간 조회가 추가되면서 이름만 보고는 어느 쪽인지 알 수 없게 됐다. 그래서 일별 함수는 `getDaySchedules`, `getDayScheduleSummary`로 바꾸고 기간 조회 함수를 따로 뒀다. 날짜 범위 계산은 `momentUtils`에 `getStartAndEndOfWeek`, `getStartAndEndOfMonth`로 모았다.

월간 범위에서 한 번 막혔다. 캘린더(react-big-calendar)의 월간 보기는 첫 주와 마지막 주에 지난달, 다음 달 날짜까지 보여준다. 그 칸이 비어 있으면 어색하다. 그래서 앞뒤로 6일씩 넓혀서 요청하도록 했다.

```ts
export const getStartAndEndOfMonth = (date: string) => {
  const start = moment(date).startOf('month').subtract(6, 'days');
  const end = moment(date).endOf('month').add(6, 'days');
  return [start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD')];
};
```

## 필터 유지

일정을 만들거나 고치면 서버 액션이 끝난 뒤 스케줄 페이지로 redirect한다. 이때 보고 있던 필터(보기 유형, 날짜, 담당 강사)가 날아가는 문제가 있었다. 원래는 업무 종류에 따라 어느 탭으로 보낼지 분기하는 코드가 액션마다 들어 있었다.

이걸 정리했다. 현재 필터를 Recoil atom에 두고, 폼 안에 `FilterParamsInput` 컴포넌트로 hidden input을 그려 넣었다. 서버 쪽에서는 `setFilterParams`라는 공용 함수가 FormData에서 `filter-` 접두사가 붙은 값을 꺼내 searchParams를 다시 만든다. 생성, 수정, 삭제 세 액션이 같은 함수를 쓰게 되면서 분기 코드가 전부 빠졌다.

서버 액션은 클라이언트 상태를 직접 못 읽는다. 폼 데이터에 실어 보내는 게 지금 구조에서는 제일 단순한 방법이었다.
