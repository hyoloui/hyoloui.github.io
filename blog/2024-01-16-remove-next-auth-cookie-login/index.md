---
title: "next-auth를 걷어내고 쿠키로 로그인 처리하기"
description: "CRM 웹에 붙였던 next-auth를 2주 만에 제거하고, 서버 액션과 쿠키, 미들웨어로 로그인을 다시 구성한 기록."
authors: [hyoloui]
tags: [nextjs, auth]
---

CRM 웹에 실제 API를 붙이기 시작하면서 로그인부터 손댔다. 처음에는 next-auth를 세팅했는데, 2주 정도 쓰다가 결국 지웠다.

<!--truncate-->

1월 초에 next-auth v5를 설치하고 `auth.ts`, `[...nextauth]` 라우트, 세션 프로바이더, 미들웨어까지 세팅했다. 그런데 우리 서비스는 로그인 API가 액세스 토큰과 리프레시 토큰을 내려주고, 프론트는 그걸 들고 다니기만 하면 된다. 토큰을 next-auth 세션에 넣고 다시 꺼내는 코드가 따로 필요했고, 결국 "과분한 라이브러리"라고 커밋에 남기고 제거했다.

대신 로그인을 서버 액션으로 처리했다. `useFormState`에 `postLogin` 액션을 넘기고, 액션 안에서 API를 호출한 뒤 `cookies()`로 토큰을 저장한다.

```ts
const { accessToken, refreshToken } = data.token;
if (formData.get('auto-login')) {
  cookies().set('_accessToken', accessToken, { expires: expires21 });
  cookies().set('_refreshToken', refreshToken, { expires: expires30 });
} else {
  cookies().set('_accessToken', accessToken);
  cookies().set('_refreshToken', refreshToken);
}
```

'자동 로그인'을 체크하면 만료일을 주고, 아니면 세션 쿠키로 둔다. 실패하면 에러 메시지를 상태로 돌려주고, 성공하면 폼 쪽에서 프랜차이즈 선택 페이지로 이동한다.

접근 제어는 미들웨어가 맡는다. 토큰 쿠키가 없는데 로그인, 회원가입, 비밀번호 재설정, 본인인증 외의 경로로 들어오면 로그인 페이지로 보내고, 토큰이 있는데 로그인 페이지에 오면 프랜차이즈 선택으로 보낸다. 처음엔 `redirect`를 썼다가 `rewrite`로 바꿨다. 원래 가려던 경로를 유지한 채 로그인 화면을 보여줄 수 있어서, 로그인 후에 그 경로로 돌려보내기 편했다.

라이브러리를 먼저 깔고 우리 인증 구조를 거기에 맞추려 한 게 순서가 틀렸다. 다음부터는 서버가 주는 인증 방식부터 보고 고르려고 한다.
