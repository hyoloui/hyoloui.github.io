---
title: "입사 첫 프로젝트, 어드민 Next.js 세팅"
description: "Assistfit 입사 후 첫 업무로 어드민 프로젝트를 Next.js 13 App Router로 세팅하고 로그인 폼까지 만든 기록."
authors: [hyoloui]
tags: [career, project, react, typescript]
---

Assistfit에 입사했다. 첫 업무는 피트니스 센터용 서비스의 어드민 페이지를 Next.js로 새로 만드는 일이었다. 저장소를 처음부터 내가 세팅하게 됐다.

<!--truncate-->

## 세팅부터 하루가 갔다

`create-next-app`으로 Next.js 13.4 App Router 프로젝트를 만들고 첫날은 거의 린트 설정만 했다. airbnb, airbnb-typescript 규칙에 Prettier를 얹었는데 둘이 같은 규칙을 두고 싸워서 `eslint-config-prettier`로 충돌을 막았다. 패키지 매니저는 Yarn으로 바꿨다.

다음 날 Tailwind, React Query, axios, Recoil, react-hot-toast를 설치했다. 혼자 공부할 때는 Provider를 `layout`에 바로 넣었는데 App Router에서는 그게 안 됐다. Provider는 클라이언트 컴포넌트여야 해서 파일을 따로 빼고 `'use client'`를 붙였다.

```tsx
'use client';

const queryClient = new QueryClient();

export default function ReactQuery({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

## 라우팅을 이틀에 세 번 바꿨다

메뉴별 페이지를 `src/app` 아래에 만들었다가, 로그인 후 화면을 `/home` 아래로 묶었다가, 결국 `src` 폴더를 빼고 `app`을 루트로 올렸다. 처음 잡은 구조가 계속 마음에 안 들었다. 아직 App Router의 폴더 규칙이 손에 익지 않았다.

로그인 폼은 react-hook-form으로 만들었다. `register`로 이메일, 비밀번호 검증 규칙을 붙이니 상태를 따로 만들 필요가 없었다. 서버 연동은 아직이라 `onSubmit`에는 TODO만 남겨뒀다.

README에는 기술 스택과 각 라이브러리가 맡는 역할을 한 줄씩 적어뒀다. 혼자 시작한 저장소지만 나중에 들어올 사람이 볼 문서는 있어야 할 것 같았다.
