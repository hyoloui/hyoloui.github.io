---
title: "결제 상세 모달을 layout 하나로 묶기"
description: "상품 유형마다 따로 놀던 결제 상세 페이지를 라우트 그룹과 공통 layout으로 묶고, 사이드 내비게이션을 서버·클라이언트로 나눴다."
authors: [hyoloui]
tags: [nextjs, refactoring]
---

회원 결제 상세는 모달(@modal 병렬 라우트)로 뜬다. 회원권, 개인 레슨, 락커, 운동용품마다 페이지가 따로 있었고, 모달 껍데기와 버튼 영역이 페이지마다 복사돼 있었다. 이번 주에 구조를 다시 잡았다.

<!--truncate-->

먼저 `(detail)` 라우트 그룹을 만들고 그 아래에 `layout.tsx`를 뒀다. layout은 모달, 왼쪽 사이드 내비게이션(LNB), 본문 영역만 그린다. 계약, 이용 정지, 수정 기록, 미수금 같은 하위 화면은 `[category]` 세그먼트 아래로 옮겼다. 그동안 따로 떨어져 있던 '횟수 연장 / 차감' 페이지는 새 구조에 흡수시키고 지웠다.

LNB에는 현재 상품 이름과 유형을 보여줘야 했다. 문제는 layout이 하위 세그먼트의 params를 받지 못한다는 점이었다. 미들웨어가 요청 헤더에 넣어주는 현재 경로에서 카테고리를 꺼내고, 카테고리별 조회 함수를 객체로 매핑했다.

```ts
const fetchData = {
  [ProductTabs.회원권]: getFcDetail,
  [ProductTabs.개인레슨]: getPtDetail,
  [ProductTabs.락커]: getLockerDetail,
  [ProductTabs.운동용품]: getEquipmentDetail,
}[category];

const data = await fetchData(centerId, paymentId);
```

if 문으로 네 번 나누는 것보다 이쪽이 읽기 편했다. 상품 유형이 늘어도 한 줄만 추가하면 된다.

LNB는 데이터를 가져오는 부분과 클릭 같은 상호작용 부분을 나눴다. 조회는 서버 컴포넌트인 `DetailLNB`에서 하고, 메뉴 이동은 `ClientNavigation`이 맡는다. 'use client'가 필요한 범위를 최대한 좁히고 싶었다.

정리하는 김에 중복도 걷어냈다. `InfoWrapper`와 `InfoTitle`은 `InfoChild` 한 파일로, 툴팁 내용은 `TooltipContents`로 합쳤다. 네 페이지에 똑같이 있던 삭제·수정 버튼은 `ViewerPageBottom`으로 뺐다. 커밋 몇 개에 걸쳐 지운 줄이 추가한 줄보다 많았다.
