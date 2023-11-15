---
title: "Next.js 14 공식 코스로 App Router 다시 배우기"
description: "Next.js 14 App Router Course를 따라가며 스트리밍, searchParams 기반 검색, Server Actions, NextAuth를 익히고 회사 프로젝트에 적용해 본 기록."
authors: [hyoloui]
tags: [nextjs]
---

Next.js 14가 나와서 공식 App Router Course를 처음부터 따라가 봤다(learn-next14). 반년 동안 App Router로 어드민을 만들었는데, 돌아보면 거의 모든 걸 클라이언트 컴포넌트에서 처리하고 있었다.

<!--truncate-->

## 서버 컴포넌트에서 데이터 가져오기

코스는 Vercel Postgres에 송장(invoice) 데이터를 넣고 대시보드를 만드는 구성이다. 데이터는 서버 컴포넌트에서 `async` 함수로 바로 가져온다. `useEffect`도 React Query도 없다.

느린 쿼리가 하나 있으면 페이지 전체가 기다리게 된다. 그래서 차트, 최근 송장, 카드를 각각 `Suspense`로 감싸고 스켈레톤을 fallback으로 줬다. 준비된 부분부터 스트리밍으로 내려온다. 정적 렌더링을 동적으로 바꾸는 `unstable_noStore`는 넣었다가 되돌리고 다시 넣었다.

검색과 페이지네이션 상태는 URL의 `searchParams`에 둔다. 입력은 `use-debounce`로 디바운스해서 `router.replace`로 쿼리스트링을 바꾸고, 서버 컴포넌트는 그 값을 props로 받는다. 새로고침해도 검색 상태가 유지된다.

## Server Actions와 NextAuth

송장 생성, 수정, 삭제는 Server Actions로 만들었다. 폼 데이터를 zod로 검증하고, 저장 후 `revalidatePath`로 캐시를 비운 다음 `redirect`한다.

```ts
const validatedFields = CreateInvoice.safeParse({
  customerId: formData.get('customerId'),
  amount: formData.get('amount'),
  status: formData.get('status'),
});

if (!validatedFields.success) {
  return { errors: validatedFields.error.flatten().fieldErrors };
}
```

마지막 장은 NextAuth v5 베타였다. credentials provider로 로그인하고, 미들웨어의 `authorized` 콜백에서 로그인하지 않은 사용자를 대시보드에서 막는다.

회사 CRM 웹에도 바로 써봤다. Next.js를 14로 올리고, 회원가입의 본인인증 버튼이 `'use server'` 함수를 직접 호출해서 인증 URL을 받아오는 예시를 먼저 붙였다. 반대로 스냅샷 테스트는 잠시 멈췄다. 페이지가 `searchParams`를 props로 받게 바뀌면서 기존 테스트가 그 값을 넘기지 못하고 있어서다.
