---
title: "받는 사람 선택 테이블: 서버 필터링과 가상 스크롤"
description: "메시지 받는 사람 선택 다이얼로그의 클라이언트 필터링을 서버 필터링으로 바꾸고, TanStack Virtual로 가상 스크롤을 적용한 기록."
authors: [hyoloui]
tags: [performance, react]
---

메시지 받는 사람을 고르는 다이얼로그의 성능을 손봤다. 회원이 많은 센터를 생각하면 처음 구조로는 버티기 어려웠다.

<!--truncate-->

처음 구현은 센터 회원 전체를 한 번에 받아서 `useMemo` 안에서 필터링했다. 검색어, 앱 사용 여부, 연령대, 만료일 같은 조건을 하나씩 `filter`로 걸렀다. 조건이 몇 개일 때는 괜찮았는데 필터가 늘수록 이 `useMemo`가 150줄을 넘겼고, 회원 수만큼 데이터를 계속 들고 있어야 했다.

그래서 필터링을 서버로 넘겼다. 필터 Context의 상태 모양을 API query string과 똑같이 맞춰서 상태를 그대로 요청 파라미터로 쓰게 했다. 생일 필터는 연령대 필터로, 서비스 종료일 필터는 만료일 필터로 이름도 API에 맞췄다. 검색은 입력할 때마다 요청이 나가지 않도록 로컬 입력값을 따로 두고 디바운스해서 필터에 반영했다.

서버 필터링을 해도 조건 없이 열면 센터 회원 전체가 결과로 온다. 그 행을 전부 DOM으로 그리면 회원이 많은 센터에서 메모리와 스크롤이 버티지 못한다. 그래서 `@tanstack/react-virtual`로 가상 스크롤을 넣었다.

막힌 곳은 스크롤 요소였다. 사내 UI 라이브러리의 ScrollArea는 바깥 div가 아니라 안쪽 viewport가 실제로 스크롤된다. virtualizer에는 그 viewport를 넘겨야 해서 훅을 하나 만들었다.

```ts
useEffect(() => {
  const viewport = scrollAreaRef.current?.querySelector<HTMLDivElement>(
    '[data-as-scroll-area-viewport]'
  );
  if (viewport) viewportRef.current = viewport;
}, []);

const virtualizer = useVirtualizer({ count, getScrollElement: () => viewportRef.current, estimateSize: () => estimateSize, overscan });
```

`useScrollAreaVirtualizer`는 ScrollArea에 붙일 ref와 virtualizer만 돌려준다. ScrollArea 안에서 긴 목록을 그리는 곳이면 어디서든 쓸 수 있게 공용 hooks 폴더에 두었다.

오늘 이 작업까지 넣고 버전을 2.1.0으로 올렸다.
