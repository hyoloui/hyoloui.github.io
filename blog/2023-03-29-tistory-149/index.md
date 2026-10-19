---
title: "원티드 프리온보딩 프론트엔드 챌린지 4월 사전과제"
description: "원티드 프리온보딩 사전과제 질문에 대한 답변. React Lifecycle, React 18 업데이트 기능과 추가된 hook 정리."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## React v18.0

:::note

원티드 프리온보딩 프론트엔드 챌린지 질문에 대한 답변입니다.

:::

## 1. React Lifecycle에 대해 간단히 설명해주세요

React Lifecycle은 컴포넌트 생성, 업데이트, 소멸할 때 일어나는 과정입니다. (Mount - Update - Unmount)

1. Mount: `componentDidMount` : 컴포넌트가 마운트 된 후에 호출됩니다. DOM 노드에 접근하거나 외부 데이터를 가져오는 등의 초기화 작업에 사용됩니다.
2. Update: `componentDidUpdate` : 컴포넌트가 업데이트 된 후에 호출됩니다. 이전과 현재의 props나 state를 비교하여 필요한 업데이트를 수행합니다.
3. Unmount: `componentWillUnmount` : 컴포넌트가 언마운트되기 전에 호출됩니다. 리소스를 정리하거나 이벤트 리스너를 제거하는 등의 작업을 수행합니다.

- Error handling: `componentDidCatch` : 컴포넌트에서 에러 발생 시 호출됩니다.

## 2. React18에서 업데이트 된 기능에 대해 설명해주세요

- automatic batching : 일괄 처리 기능이 생겨서 `setState()` 호출이 한 번에 처리될 수 있습니다.
- Transitions : 긴급한 업데이트(urgent updates), 전환 업데이트(Transition updates) 로 분류하여 전환 업데이트를 명시적으로 구분하여 상태 업데이트를 가능케 합니다. (기존 setTimeout, throttle, debounce 등을 대체 가능)
- Suspense : 작은 유닛으로 나누어 별개의 렌더링을 거칠 수 있습니다. 상대적으로 느린 컴포넌트를 Suspense로 감싸서 선택적 Hydration 을 적용합니다. 또한, fallback 옵션에 대신 노출할 컴포넌트를 설정해서 해당 컴포넌트가 렌더링되기 전에 fallback 컴포넌트를 노출합니다.
  - React.lazy - JS 코드가 거대하고 복잡해서 로드 지연 해결하고, 사용자 친화적 Hydration (우선순위 판단) 합니다.
  - Data Fetching 지연을 해결합니다. 렌더링 비용이 큰 부분을 Suspense로 감싸 별도의 Hydration이 가능합니다.

## 3. React18에서 추가된 hook들에 대해 설명해주세요

**useTransition**: 일부 상태 업데이트를 non-urgent으로 지정하여 하나의 상태 업데이트를 다른 컴포넌트보다 우선시할 수 있다.

**useDeferredValue**: non-urgent 상태 업데이트의 리렌더링(re-rendering)을 연기시킬 수 있다. useTransition hook 와 마찬가지로 concurrency hook 이다. 이 hook를 사용하면 state transition이 일어나는 동안 원래 값을 유지할 수 있다.

**useId**: 고유 id가 필요한 상황에서 사용한다. (list의 key 제외) 주요 목적은 클라이언트와 서버에서 고유하게 유지되는 ID를 생성하여 React 서버 hydration mismatch 에러를 방지하는 것이다.

**useSyncExternalStore**: useTransition 과 useDeferredValue hook은 앱 코드와 함께 작동하는 반면, useSyncExternalStore는 라이브러리와 함께 작동한다. React 앱이 외부 라이브러리를 subscribe하고 데이터를 읽을 수 있게 해준다.

**useInsertionEffect**: 라이브러리와 함께 작동하는 hook이다. 그 중에서도 CSS-in-JS 라이브러리에서 작동한다. 스타일 렌더링 성능 문제를 해결한다. useLayoutEffect hook 에서 레이아웃을 읽기 전에 DOM의 스타일을 지정한다.

## 4. 요즘 관심있는 주제가 있다면 알려주세요

- 에릭 노먼드의 「함수형 코딩」
- jest, cypress 테스팅 라이브러리

{/* 이 글은 Tistory(https://hyoloui.tistory.com/149)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-29 */}
