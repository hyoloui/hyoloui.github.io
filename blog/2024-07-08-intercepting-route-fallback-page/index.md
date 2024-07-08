---
title: "Intercepting Route에 새로고침용 페이지 붙이기"
description: "모달로 띄우던 미수금 화면이 새로고침하면 오류가 나던 문제를 일반 라우트 페이지를 추가해 해결하고, QA 서버에 IP 제한을 건 기록."
authors: [hyoloui]
tags: [career, react, web]
---

QA 기간이라 하루에 고치는 이슈가 열 개를 넘는다. 그중 원인을 제대로 이해하고 고친 게 하나 있어서 적어 둔다.

<!--truncate-->

## 모달은 뜨는데 새로고침하면 깨진다

회원 정보 > 결제 정보에서 미수금을 추가하면 사이드 모달이 열린다. 이 모달은 `@modal` 슬롯(parallel route)과 intercepting route로 만들어져 있다. 목록에서 링크를 눌러 들어가면 문제없이 열린다. 그런데 그 주소에서 새로고침을 하면 오류 페이지가 떴다.

이유는 단순했다. 인터셉트는 클라이언트에서 페이지를 이동할 때만 동작한다. 주소를 직접 열거나 새로고침하면 Next.js는 일반 라우트에서 같은 경로를 찾는데, 그 자리에 `page.tsx`가 없었다.

```
app/
  @modal/.../[paymentId]/(detail)/(payment-history)/unpaid/page.tsx  // 모달
  [franchiseId]/[centerId]/member/[memberId]/[paymentId]/unpaid/page.tsx  // 추가
```

처음에는 미수금 링크를 아예 상품 수정 폼 쪽으로 옮겨 보려 했다. 폼 컴포넌트 다섯 개에 같은 코드를 넣는 방식이었고, 그날 저녁에 되돌렸다. 대신 일반 라우트에 페이지를 하나 만들고, 회원 상세 화면(회원 정보, 이용 상품 카드, 결제 정보)을 그대로 렌더링하게 했다. 직접 들어와도 회원 상세가 보이니 적어도 오류 화면은 안 나온다.

## QA 서버 IP 제한

같은 주에 QA 서버를 사내에서만 열 수 있게 해 달라는 요청이 있었다. 이미 토큰 처리를 하고 있던 middleware 맨 앞에 조건을 하나 넣었다.

```ts
const clientIps = request.headers.get('x-forwarded-for')?.split(', ');
const allowedIp = clientIps?.find((ip) => ip === process.env.NEXT_PUBLIC_ALLOWED_IP);

if (isQAUrl && !allowedIp) {
  return NextResponse.rewrite(`${origin}/not-found`);
}
```

`x-forwarded-for`에는 프록시를 거친 IP가 쉼표로 여러 개 들어올 수 있어서 split 후 하나라도 맞는지 본다. 요즘 퇴근 후에 데이터통신 강의 내용을 docs에 정리하고 있는데, 헤더 하나 읽는 것도 네트워크 구조를 알고 보니 덜 막막했다.
