---
title: "상품 폼 다섯 개에서 중복을 걷어냈다"
description: "그룹 수업 상품 폼을 추가하면서, 다섯 개 상품 폼에 복사돼 있던 섹션을 공용 컴포넌트로 빼고 생성·수정 페이지를 설정 객체로 통합했다."
authors: [hyoloui]
tags: [forms, refactoring]
---

상품 제작 화면에 그룹 수업 상품 폼을 추가했다. 기존 폼(회원권, 개인 레슨, 락커, 운동용품)을 복사해서 만들고 나니 같은 블록이 다섯 번 반복되고 있었다. 더 늘어나기 전에 정리하기로 했다.

<!--truncate-->

기준은 단순했다. 다섯 폼에서 마크업과 동작이 완전히 같은 섹션만 뺀다. 상품 유형마다 조금씩 다른 부분은 억지로 props로 분기하지 않고 각 폼에 남겼다.

그렇게 빠진 게 세 개다.

- `PeriodBox`: 이용 기간 입력
- `PauseAndAmount`: 정지 설정과 금액
- `ProductDescription`: 상품 설명

`PauseAndAmount` 하나로 폼마다 75줄씩, 다섯 폼에서 365줄이 빠졌다. 카테고리를 고르는 라디오 컴포넌트도 회원권 전용이었던 걸 없애고, 회원권과 그룹 수업 폼이 같은 로직을 쓰게 했다.

## 생성·수정 페이지

상품 생성과 수정 페이지는 탭에 따라 어떤 폼과 어떤 서버 액션을 쓸지 고르는 조건문이 길게 이어져 있었다. 이걸 설정 객체 하나로 바꿨다.

```ts
const formConfig = {
  fc: { condition: !tab || tab === 'fc', component: FcForm, handleAction: postCreateFc },
  gx: { condition: tab === 'gx', component: GxForm, handleAction: postCreateFc },
  pt: { condition: tab === 'pt', component: PtForm, handleAction: postCreatePt },
  // locker, wears ...
};
```

렌더링은 `Object.entries(formConfig)`를 돌면서 조건이 맞는 폼 하나만 그린다. 상품 유형이 늘면 객체에 한 줄 추가하면 된다.

이름도 맞췄다. 프론트에서는 기간제·횟수제 구분을 `contract`라고 부르고 있었는데, API 필드는 `subscription`이다. 같은 걸 두 이름으로 부르면 매번 머릿속에서 번역해야 한다. 컴포넌트 이름까지 `SubscriptionSegment`로 바꿨다.
