---
title: "회원가입·내 정보 수정 폼을 React Hook Form과 Zod로 다시 쓰기"
description: "useFormState와 서버 액션으로 만들어진 CRM 인증 폼을 React Hook Form, Zod, React Query 조합으로 옮기고 오래된 UI 컴포넌트를 정리한 기록."
authors: [hyoloui]
tags: [forms]
---

CRM 직원 회원가입과 내 정보 수정 폼을 다시 썼다. 닉네임 필드를 새로 추가해야 했는데, 기능을 얹기 전에 폼 구조부터 바꿨다.

<!--truncate-->

기존 회원가입 폼은 `useFormState`에 서버 액션을 물린 구조였다. 검증 결과는 서버 액션이 돌려주는 메시지 문자열과 입력 컴포넌트의 validation prop에 나뉘어 있었고, 날짜 처리는 moment로 하고 있었다. 필드 하나를 추가하려 해도 어디서 검증되는지 찾는 데 시간이 걸렸다.

먼저 Zod 스키마를 파일로 분리했다. 비밀번호와 닉네임처럼 두 폼이 같이 쓰는 규칙은 공통 스키마로 두고, 폼마다 조합한다.

```ts
export const signUpFormSchema = z
  .object({ password: passwordSchema, passwordConfirm: z.string().min(1), nickname: nicknameSchema, nicknameConfirmed: z.boolean() /* ... */ })
  .refine((d) => d.password === d.passwordConfirm, { message: '비밀번호가 일치하지 않아요!', path: ['passwordConfirm'] })
  .refine((d) => d.nicknameConfirmed === true, { message: '커뮤니티 닉네임 중복확인을 해주세요!', path: ['nicknameConfirmed'] });
```

닉네임 중복확인 여부도 폼 값으로 두고 `refine`으로 막으니, 중복확인 버튼을 누르지 않은 채 제출하는 경우를 따로 처리할 필요가 없어졌다.

폼은 `FormProvider`로 감싸고, 주소 입력이나 닉네임 확인 같은 하위 필드는 `useFormContext`로 폼에 붙였다. 제출은 서버 액션 대신 클라이언트 API 함수와 `useSignUpMutation`, `useUpdateMyInfoMutation` 훅으로 바꿨다. 날짜 처리도 이 김에 moment를 걷어냈다.

오래된 UI 컴포넌트도 정리했다. 배지, 숫자 입력, 텍스트 필드, 토글 컴포넌트에 `@deprecated` 주석을 달고 대신 쓸 디자인 시스템 컴포넌트 이름을 적었다. 한 번에 지우면 영향 범위가 너무 커서, 새 코드에서는 쓰지 않도록 표시만 해 두고 손대는 화면마다 바꿔 나갈 생각이다. 이번에는 직원 정보 폼과 주소 입력의 텍스트 필드부터 새 입력 컴포넌트로 바꿨다.

오늘은 마무리로 휴대폰 번호 중복 가입 처리를 바꿨다. 원래는 중복이면 별도 모달 라우트 페이지로 이동했는데, 폼 안의 확인 다이얼로그로 대신하고 그 페이지를 지웠다. 폼 상태가 한 곳에 모이니 이런 흐름을 폼 밖으로 보낼 이유가 없었다.
