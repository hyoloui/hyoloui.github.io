---
title: "회원 목록 필터 상태를 URL로 옮기기"
description: "회원 목록 필터를 nuqs로 URL 상태로 관리하도록 바꾸고, 토큰 로딩을 Suspense 쿼리로 정리한 작업 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

CRM의 회원 목록 화면을 다시 만들고 있다. 이번 주에는 필터 상태를 어디에 둘지 정리했다.

<!--truncate-->

필터가 일곱 종류다. 이용 상태, 가입일, 최근 방문일, 상품 유형, 최종 만료일, 락커 사용 여부, 운동용품 사용 여부. 원래는 필터 컴포넌트마다 `useRouter`, `usePathname`, `useSearchParams`를 불러서 query string을 직접 조립했고, 그걸 돕는 url-builder 파일이 따로 있었다. 필터 하나 추가할 때마다 비슷한 코드가 한 벌씩 늘었다.

그래서 nuqs를 넣었다. 처음엔 필터마다 `useQueryState`로 바꿨는데, 필터끼리 같이 초기화되고 같이 API 파라미터가 돼야 해서 결국 한 곳에 모았다.

```ts
export const memberInfoFiltersSearchParams = {
  productUsageStatus: parseAsStringEnum(Object.values(InfoEnumStatus)),
  joinStartDate: parseAsIsoDate,
  visitedDays: parseAsInteger,
  isUsingLocker: parseAsBoolean,
  // ...
} as const;
export const serializeMemberInfoFilters = createSerializer(memberInfoFiltersSearchParams);
```

이 정의를 `useQueryStates`에 넘기는 `useMemberInfoFilters` 훅을 만들고 `filters`, `setFilters`, `serialize`, `reset`만 밖으로 내보냈다. URL에서 꺼낸 값이 문자열이 아니라 Date, number, boolean으로 들어오니 컴포넌트마다 하던 변환 코드가 사라졌다. 회원 목록 쿼리 키도 필터 객체를 그대로 넣는 형태로 줄었다. 예전엔 파라미터를 하나씩 나열한 배열이었다.

같이 손본 게 액세스 토큰 로딩이다. 토큰을 `useQuery`로 받다 보니 컴포넌트마다 `isTokenLoading`과 데이터 로딩을 합쳐서 분기하고 있었다. `useSuspenseQuery`로 감싼 `useAccessTokenSuspense`를 추가하니 토큰은 항상 있다고 보고 코드를 쓸 수 있게 됐다.

URL이 상태의 원본이 되니 새로고침이나 뒤로 가기를 해도 필터가 그대로 남는다. 필터 상태를 따로 동기화할 곳이 없어서 마음이 편하다.
