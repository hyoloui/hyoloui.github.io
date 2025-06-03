---
title: "대시보드 통계 변환 함수에 테스트를 붙였다"
description: "문자열 enum의 키와 값을 헷갈린 조회 로직을 역매핑 함수로 고치고, 대시보드 통계 변환 함수를 Jest로 검증했다."
authors: [hyoloui]
tags: [testing, typescript]
---

CRM 대시보드는 API 응답을 `centerStatisticsProcessing`이라는 함수로 한 번 가공해서 화면에 넘긴다. 회원, 매출, 수업 통계가 전부 이 함수를 거친다. 개인 레슨 통계를 고치다가 이 함수에 테스트를 제대로 붙였다.

<!--truncate-->

개인 레슨 상태는 문자열 enum으로 정의돼 있다.

```ts
export enum PtStatusEnum {
  WAIT = '매칭 대기',
  CONFIRM = '매칭 완료',
  // ...
}
```

응답의 `ptBookingStatusMap`은 `CONFIRM`, `WAIT` 같은 키로 온다. 그런데 집계 코드는 `Object.values(PtStatusEnum)`을 돌면서 나온 값('매칭 완료')으로 맵을 찾고 있었다. 키와 값이 다르니 찾을 수가 없다. 원래 코드에 `as unknown as keyof typeof PtStatusEnum` 단언이 붙어 있어서 컴파일러도 아무 말을 안 했다.

값에서 키를 찾는 역매핑 함수를 하나 만들었다.

```ts
export function createReversEnum<T extends Record<string, string>>(enumObj: T) {
  return Object.fromEntries(
    Object.entries(enumObj).map(([key, value]) => [value, key])
  ) as Record<string, keyof T>;
}
```

응답 타입도 손봤다. 그날 해당 상태가 하나도 없으면 키 자체가 빠질 수 있어서 `ptBookingStatusMap`을 `Partial`로 감쌌다. 이제 없는 상태를 꺼낼 때 타입이 먼저 경고한다.

테스트는 실제 응답과 같은 모양의 목 데이터를 만들어 두고, 변환 결과를 회원, 출석, 매출, 상담, 수업 통계로 나눠 `toEqual`로 비교했다. 개인 레슨은 상태별 합계까지 확인한다. 테스트 파일이 500줄 넘게 바뀌었는데 대부분 목 데이터와 기대값이다.

앞으로 `as` 단언이 붙은 줄을 보면 그 부분을 지나는 테스트가 있는지부터 확인하려고 한다.
