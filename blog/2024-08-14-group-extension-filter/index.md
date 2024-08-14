---
title: "단체 연장 화면과 상수 배열에서 타입 뽑기"
description: "회원 관리에 단체 연장·연장 기록 탭을 만들면서 필터 목록 상수에서 타입을 뽑아 쓰고, 기존 공용 컴포넌트를 넓혀 재사용한 기록."
authors: [hyoloui]
tags: [career, typescript, react]
---

지난달 만든 개인 연장에 이어 여러 회원의 상품을 한 번에 늘리는 단체 연장 화면을 만들고 있다. API가 아직 없어서 화면부터 잡았다.

<!--truncate-->

회원 관리에 탭이 두 개 늘었다. 단체 연장, 연장 기록. 둘 다 async 서버 컴포넌트로 컨테이너를 만들고 그 아래에 테이블과 페이지네이션을 두는 기존 목록 화면 구조를 따랐다. 데이터는 빈 값으로 두고 API가 나오면 바꿀 생각이다.

## 필터 목록에서 타입 만들기

단체 연장은 대상을 고르는 필터가 많다. 성별, 회원권 카테고리, 개인 레슨 카테고리, 용품, 상품 유형, 회원 유형. 목록마다 상수 배열을 두고, 상태 타입은 그 배열에서 꺼내 쓰기로 했다.

```ts
const PRODUCT_TYPE_LIST = [
  { key: 'all', value: '전체' },
  { key: 'period', value: '기간제' },
  { key: 'count', value: '횟수제' },
];
type ProductTypeState = Array<(typeof PRODUCT_TYPE_LIST)[number]['key']>;
```

`(typeof 배열)[number]`로 요소 타입을 꺼내고 거기서 `key`만 다시 뽑는 방식이다. 목록과 타입을 한 곳에서 관리할 수 있다. 다만 배열에 `as const`가 없으면 key가 리터럴 타입으로 좁혀지지 않고 `string`으로 잡힌다. 지금은 그 상태라 타입이 생각만큼 좁지 않다.

## 있는 컴포넌트를 조금 넓히기

검색 input은 회원 목록에서 쓰던 `SearchMemberInput`을 가져왔다. 단체 연장 모달에서는 비활성화가 필요했는데 props에 `disabled`가 없었다. 새로 만들지 않고 나머지 props를 받아 input에 넘기도록 바꿨다.

전달 사항 textarea도 직접 만들었다가, 글자 수를 세는 `CountingMemo` 컴포넌트가 이미 있어서 바꿔 끼웠다. 20줄 정도가 빠졌다.

필터 컴포넌트는 300줄이 넘고 useState가 여섯 개다. 일단 화면은 나왔지만 API를 붙일 때 다시 들여다봐야 할 것 같다.
