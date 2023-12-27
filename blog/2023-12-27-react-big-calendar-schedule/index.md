---
title: "react-big-calendar로 직원 스케줄 화면 만들기"
description: "직원별 열로 나뉜 일간 캘린더를 react-big-calendar로 구현하고, 일정 추가를 모달 라우트로 연결한 기록."
authors: [hyoloui]
tags: [career, react]
---

CRM에 '스케줄 관리' 화면이 추가됐다. 하루 단위로 직원마다 일정을 세로 열로 보여주고, 빈 칸을 드래그하면 일정을 추가하는 화면이다. 직접 그리기엔 시간 계산이 많아서 `react-big-calendar`를 골랐다.

<!--truncate-->

## 직원을 resource로

react-big-calendar에는 `resources`라는 개념이 있다. 일간 뷰에서 resource마다 열이 하나씩 생기고, 이벤트에 `resourceId`를 주면 해당 열에 들어간다. 직원 목록을 resource로 넘기니 원하던 레이아웃이 거의 그대로 나왔다.

```tsx
const DnDCalendar = withDragAndDrop<Event>(Calendar);

<DnDCalendar
  defaultView={Views.DAY}
  resources={resourceMap}
  onEventDrop={onChangeEventTime}
  onEventResize={onChangeEventTime}
  onSelectSlot={createEvent}
  selectable
  resizable
/>
```

드래그 앤 드롭 애드온을 감싸면 일정을 옮기거나 늘릴 수 있다. 종일 영역에 떨어뜨렸는지는 `isAllDay` 값으로 와서, 그걸 보고 `allDay`를 바꿔 주었다. 직원별 색상은 `eventPropGetter`에서 resource 인덱스로 hsla의 hue 값을 계산해 넣었다.

## 일정 추가는 모달 라우트로

디자인은 팝업이었는데, 기능을 붙이다 보니 팝업 안에 들어갈 폼이 커져서 모달 페이지로 바꿨다. `schedule/@modal/[centerId]/create` 경로에 parallel route를 만들고, 빈 칸을 선택하면 그 경로로 `router.push` 한다.

문제는 선택한 칸의 시작, 종료 시간과 직원 정보를 모달 페이지로 넘기는 방법이었다. URL에 다 싣기엔 값이 많아서 Recoil atom에 `SlotInfo`를 그대로 담고 모달의 폼에서 꺼내 쓰도록 했다.

아직 API가 없어서 더미 데이터로 동작만 맞춰 둔 상태다. 라이브러리 기본 스타일을 디자인에 맞추느라 CSS를 덮어쓰는 시간이 생각보다 길었다.
