---
title: "휴강 등록 화면에서 Recoil을 걷어냈다"
description: "그룹 수업 휴강 등록의 날짜 선택 상태를 전역 atom에서 컨테이너 컴포넌트의 useState로 옮기고, 운영 요일에 맞춰 선택 가능한 날짜를 제한했다."
authors: [hyoloui]
tags: [career, react, typescript]
---

그룹 수업에 휴강을 등록하는 화면을 만들었다. 날짜 범위를 고르는 단계와 메모를 적고 등록하는 단계, 두 단계로 나뉜다.

<!--truncate-->

날짜 선택은 react-datepicker의 범위 선택을 두 달씩 보여주는 방식으로 했다. 수업 기간 밖은 고를 수 없고, 운영하지 않는 요일은 시작일이나 종료일로 잡을 수 없게 막았다. 월·수·금 수업이라면 화요일부터 휴강을 시작할 이유가 없다.

```ts
for (let m = moment(start); m.isSameOrBefore(moment(end), 'day'); m.add(1, 'day')) {
  const dayKey = DAY_KEYS[m.day() === 0 ? 6 : m.day() - 1];
  if (!operationDays.includes(dayKey)) excludeDates.push(m.toDate());
}
```

종료일이 없는 수업은 시작일부터 2년까지만 계산하도록 기본값을 줬다.

## 상태를 어디에 둘지

처음에는 두 단계가 선택한 날짜를 같이 봐야 해서 Recoil atom에 넣었다. 만들고 보니 이 상태를 쓰는 곳은 휴강 등록 흐름 안의 컴포넌트 몇 개뿐이었다. 전역에 둘 이유가 없었다.

그래서 `DayOffContainer`를 만들고 거기서 `useState`로 들고 있게 했다. 단계에 따라 `DayOffSelect`나 `DayOffCreate`를 그리고, 상태와 setter를 props로 내려준다. "2025년 7월 7일 (월) ~ ..." 같은 표시용 문자열과 휴강 일수도 컨테이너에서 한 번만 계산해서 넘긴다. 전에는 두 단계가 각자 계산하고 있었다.

atom 파일은 지웠다. props가 한 단계 늘었지만 데이터가 어디서 오는지 컨테이너 하나만 보면 알 수 있다. 등록 단계의 폼은 react-hook-form으로 바꿨고, 같은 날 수업 목록 쪽에 연도별 휴강 내역 탭도 붙였다.
