---
title: "사이드 내비게이션 메뉴 리팩터링"
description: "서버 컴포넌트에서 가져오던 메뉴 목록을 React Query로 옮기고, 메뉴 아이콘과 prefetch 판단 로직을 정리한 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

CRM에 메시지 페이지가 새로 생기면서 사이드 메뉴를 손봐야 했다. 메뉴 하나 추가하는 김에 메뉴 쪽 코드를 같이 정리했다.

<!--truncate-->

메뉴 데이터에는 아이콘을 그리기 위한 SVG path 문자열과 정렬 순서 값이 들어 있었다. 이걸 아이콘 폰트 클래스 하나로 바꿨다. 메뉴마다 SVG를 그리던 코드가 빠지고 `<i>` 태그에 클래스만 붙이면 된다. 쓰지 않는 SVG 파일도 함께 지웠다.

더 큰 변경은 메뉴 목록을 가져오는 위치다. 원래 `NavigationList`는 서버 컴포넌트였고, 쿠키에서 직원 ID를 읽어 메뉴 API를 호출했다. 문제는 즐겨찾기나 숨김을 누른 뒤였다. 클라이언트에서 API를 호출해도 서버 컴포넌트가 다시 그려지기 전까지 메뉴가 바뀌지 않았다.

그래서 `NavigationList`를 클라이언트 컴포넌트로 바꾸고 `useMenuList` 훅으로 메뉴를 받게 했다. 즐겨찾기와 숨김 처리 뒤에는 해당 쿼리를 `invalidateQueries`로 무효화한다. 직원 ID는 상위 `Navigation`이 쿠키에서 읽어 prop으로 내려준다.

렌더링 안에 있던 prefetch 판단 함수도 밖으로 꺼냈다.

```ts
const getPrefetchStatus = (menu: { isFavorite?: boolean; isHidden?: boolean }) => {
  if (menu.isFavorite) return true;
  if (menu.isHidden) return null;
  return undefined;
};
```

기존 코드는 변수에 값을 덮어쓰는 방식이라 즐겨찾기이면서 숨김인 메뉴는 `null`이 됐다. 함수로 빼면서 우선순위가 코드에 드러나게 했다. 즐겨찾기 메뉴는 항상 prefetch하고, 숨긴 메뉴는 하지 않는다.

메뉴처럼 거의 모든 화면에 걸리는 코드는 건드리기가 조심스럽다. 이번엔 아이콘, 데이터 흐름, prefetch를 각각 다른 커밋으로 나눠 올렸다.
