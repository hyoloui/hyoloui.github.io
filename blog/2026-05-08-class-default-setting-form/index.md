---
title: "수업 기본 설정 폼: Zod 조건부 검증과 이탈 방지 훅"
description: "그룹 수업 예약 기본값을 정하는 설정 페이지를 react-hook-form과 Zod로 만들고, 페이지 이탈 방지 훅을 서비스에서 쓸 수 있게 고친 기록."
authors: [hyoloui]
tags: [forms]
---

그룹 수업의 예약 오픈 시점, 예약 마감 시점, 폐강 시점을 센터 단위 기본값으로 정해 두는 "수업 기본 설정" 페이지를 만들었다. 수업을 새로 만들 때 이 값이 기본으로 채워진다.

<!--truncate-->

## 조건이 걸린 검증

폼은 react-hook-form에 `zodResolver`를 붙였다. 까다로운 건 조건부 규칙이었다. 예약 마감을 "수업 시작 전 N분"으로 고르면 N은 1 이상이어야 하고, "수업 시작 시"나 "종료 시"를 고르면 N은 상관없다. 필드 단위 규칙으로는 표현이 안 돼서 `superRefine`에서 묶어 검사했다.

```ts
.superRefine((data, ctx) => {
  const isBeforeStart =
    !data.isBookingClosedAtStarted && !data.isBookingClosedAtEnded;
  if (isBeforeStart && data.bookingClosingTime === 0) {
    ctx.addIssue({ code: 'custom', path: ['bookingClosingTime'], message: '1분 이상 입력해 주세요.' });
  }
});
```

스키마 옆에 기본값 객체와 `z.infer` 타입을 같이 두니 폼, 테스트, 생성 화면이 같은 기준을 본다. 생성 화면에서는 설정값을 불러오는 래퍼 컴포넌트를 하나 두고 기존 그룹 수업 폼에 기본값으로 넘겼다.

QA에서 재미있는 버그가 하나 나왔다. 시간 입력은 일·시간·분 칸으로 나뉘어 보이는데, 첫 칸에 `register`의 ref를 연결해 두었더니 RHF가 분 단위 전체 값을 그 칸에 써 버렸다. 보이는 입력칸에서 `register`를 떼고 값은 `setValue`로만 관리하게 바꿨다. 에러 시 포커스 이동도 `form.setFocus` 대신 직접 만든 ref로 처리했다.

## 이탈 방지 훅 손보기

작성 중에 뒤로 가기를 누르면 확인을 받는 `usePreventNavigation` 훅이 이미 있었는데, `window.confirm`을 쓰고 있었고 마운트하자마자 history에 항목을 하나 쌓았다. 서비스의 확인 다이얼로그를 쓰도록 바꾸면서 몇 가지를 고쳤다.

- 다이얼로그가 Promise를 돌려주는 비동기라, 기다리는 동안 popstate가 또 들어와도 무시하도록 막았다.
- history 항목은 폼이 처음 dirty가 될 때만 넣는다.
- popstate 리스너가 오래된 값을 보지 않게 활성 여부와 이전 경로를 ref에 매 렌더 동기화했다.
- 저장에 성공해서 코드로 이동할 때는 막지 않도록 `bypassPreventNavigation`을 돌려준다.

훅 하나 고친 건데 생각보다 경우의 수가 많았다. 다음에 이 훅을 쓰는 사람이 헷갈리지 않게 JSDoc 예제를 새 사용법으로 바꿔 뒀다.
