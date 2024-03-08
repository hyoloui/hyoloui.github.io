---
title: "회원 상세 페이지를 서버와 클라이언트 경계로 나누기"
description: "250줄이 넘던 회원 상세 page.tsx를 데이터 영역과 클라이언트 동작 영역으로 나눠 정리한 기록."
authors: [hyoloui]
tags: [nextjs, refactoring]
---

회원 상세 페이지에 실제 API를 붙이는 차례가 왔다. 그런데 `page.tsx` 하나에 회원 정보, 상품 카드, 결제 내역 테이블이 다 들어 있어서 API를 붙이기 전에 먼저 쪼갰다.

<!--truncate-->

기준은 두 가지였다. 서버에서 데이터를 받아 그리기만 하는 영역과, 버튼 클릭이나 URL 변경 같은 클라이언트 동작이 필요한 영역이다.

먼저 회원 정보 영역을 `MemberDetail` 컴포넌트로 떼어냈다. 페이지에서 회원 상세 조회 API를 호출하고 결과를 넘기기만 하니, `page.tsx`에서 250줄 정도가 빠졌다. 상품 카드들은 `ProductsContainer`로 옮겼다.

결제 내역은 조금 더 고민했다. 원래 테이블 컴포넌트가 '삭제 내역 보기' 버튼과 '목록 추가' 링크가 있는 헤더까지 같이 그리고 있었다. 헤더는 `useSearchParam`으로 URL의 `deleteList` 값을 바꾸고, 테이블은 그 값을 읽어서 목록을 고른다. 한 컴포넌트가 상태를 바꾸는 일과 읽는 일을 같이 하고 있었던 셈이다. 헤더를 `PaymentsHeader`로 분리해 URL을 바꾸는 일만 맡기고, 삭제 내역을 보는 중인지는 서버 컴포넌트인 페이지가 `searchParams`에서 읽어 테이블에 prop으로 내려주게 했다.

```tsx
<PaymentsHeader memberId={memberId} tab={tab} />
<PaymentsContainer
  memberId={memberId}
  pageTab={tab}
  isDeleteListOpen={searchParams.deleteList === 'Y'}
/>
```

같은 날 '회원 등록'과 '회원 상세'가 함께 쓰던 테이블 컴포넌트도 목적에 따라 나눴다. 처음 만들 때는 화면이 비슷해서 공용으로 뒀는데, 상세 쪽에는 결제 정보 API 응답이 들어오고 행을 누르면 상세로 이동해야 해서 props가 계속 늘어나고 있었다. 회원권, 개인 레슨, 락커 결제 컴포넌트를 따로 만들고 나서야 각 테이블에 API 응답을 붙이는 작업이 수월해졌다.

작년 12월에 이 화면을 처음 만들 때는 화면이 디자인대로 나오는지만 봤다. 이번에는 어디까지를 서버에서 그리고 어디부터 클라이언트로 넘길지를 먼저 정하고 시작했다.
