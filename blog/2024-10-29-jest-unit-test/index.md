---
title: "CRM에 테스트 코드 붙이기"
description: "Jest 환경을 정리하고 Next.js 모듈을 mock한 뒤, 대시보드와 날짜 유틸 함수에 테스트를 쓰면서 함수의 빈틈을 찾은 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

2주 동안 틈틈이 CRM에 테스트 코드를 붙였다. 테스트 파일 몇 개보다 테스트가 돌아가는 환경을 만드는 데 시간이 더 들었다.

<!--truncate-->

## 환경 먼저

Jest 버전을 올리고 `next/font`를 mock했다. 로그인 페이지 스냅샷 테스트는 `useFormState`, `useFormStatus`를 mock해야 렌더링이 됐다.

그다음 막힌 건 App Router의 `next/navigation`이었다. 컴포넌트 곳곳에서 `useRouter`, `usePathname`, `useSearchParams`를 쓰고 있어서 `jest.setup.js`에서 한꺼번에 mock했다. `next-router-mock`의 router를 가져와 pathname과 query를 꺼내 주는 식이다. svg import와 `@sentry/nextjs`도 같은 파일에서 막았다.

## 대시보드와 날짜 함수

대시보드에서는 통계 응답을 화면용으로 가공하는 함수와 날짜 이동 컴포넌트를 테스트했다. 컴포넌트는 렌더링과 버튼 클릭 후 상태가 바뀌는지를 봤다.

날짜 유틸 함수 테스트를 쓰다가 빈틈을 하나 찾았다. `getYearMonthDay`는 `YYYY-MM-DD`만 받는다고 생각하고 만든 함수인데, 서버에서 오는 값은 `T`가 붙은 date-time 문자열인 경우가 많다.

```ts
it('result 테스트', () => {
  expect(getYearMonthDay('2023-10-05')).toEqual({ year: 2023, month: 10, day: 5 });
  expect(getYearMonthDay('2023-10-05T08:30:395Z')).toEqual({ year: 2023, month: 10, day: 5 });
});

it('날짜 형식 에러', () => {
  expect(() => getYearMonthDay('2023-10-xx')).toThrow('날짜 형식이 잘못되었습니다');
});
```

두 번째 케이스를 넣자마자 실패했다. 함수에서 `split('T')[0]`로 날짜 부분만 먼저 떼도록 고쳤다. 오전·오후를 붙여 주는 `formatToKoreanDateAndAmPm`에는 날짜나 시간 부분이 없을 때 throw하는 분기를 넣었다.

테스트를 쓰려면 이 함수가 어떤 입력을 받는지 먼저 적어야 한다. 그 목록을 적는 순간 처음 만들 때 생각 안 한 입력이 보였다.
