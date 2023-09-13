---
title: "퇴근 후 사이드 프로젝트, Next.js 쇼핑몰"
description: "회사와 다른 스택인 Redux Toolkit과 Firebase로 Next.js 쇼핑몰을 만들며 장바구니, 필터, 토스페이먼츠 결제까지 붙인 기록."
authors: [hyoloui]
tags: [career, project, react, javascript]
---

7월 말부터 퇴근 후에 쇼핑몰 사이드 프로젝트(nextjs-shop-ing)를 만들고 있다. 회사 어드민에서 안 쓰는 도구를 써보는 게 목표다.

<!--truncate-->

회사에서는 Recoil과 React Query를 쓰니까 여기서는 Redux Toolkit을 썼다. 백엔드는 따로 두지 않고 Firebase Auth와 Firestore로 해결했다. 이메일, 구글 로그인과 비밀번호 재설정까지 Firebase가 맡는다.

## Redux Toolkit으로 나눈 상태

slice를 기능별로 나눴다. `auth`, `product`, `filter`, `cart`, `checkout`, `order` 여섯 개다. 상품 목록은 Firestore에서 가져와 `product` slice에 담고, 카테고리·브랜드·가격 필터는 `filter` slice에서 계산한다. 필터 초기화 버튼과 페이지네이션도 직접 만들었다.

장바구니는 새로고침해도 남아 있어야 해서 초기값을 `localStorage`에서 읽는다. slice 코드는 서버에서도 실행되니까 `typeof window` 검사를 먼저 넣었다. 어드민에서 `sessionStorage` 때문에 빌드가 깨졌던 경험이 여기서 쓸모가 있었다.

## 토스페이먼츠 결제

이번 주에는 결제를 붙였다. 토스페이먼츠 SDK로 결제창을 띄우고, 결제가 끝나면 주문 정보를 Firestore `orders` 컬렉션에 저장한 뒤 장바구니를 비운다.

```js
const tossPayment = await loadTossPayments(clientKey);

tossPayment
  .requestPayment('카드', {
    amount: cartTotalAmount,
    orderId: Math.random().toString(36).slice(2),
    orderName: '주문',
  })
  .then(async (data) => {
    // 결제 승인 요청 후 Firestore에 주문 저장, 장바구니 비우기
  });
```

지금은 결제 승인 요청을 클라이언트에서 시크릿 키로 보내고 있다. 연습용이라 넘어갔지만 실제 서비스라면 이 부분은 서버로 옮겨야 한다.

5월 말에는 solobnb라는 숙소 예약 클론도 시작했었다. Prisma 스키마를 잡고 로컬 로그인까지 만들었는데, 빌드 에러를 잡다가 6월 초 이후로 손을 못 댔다. 이번 쇼핑몰은 주문 내역 페이지까지 이어가고 있다.
