---
title: "디자인 가이드를 공용 컴포넌트로 옮기고 cn 함수로 정리하기"
description: "CRM 웹의 디자인 가이드를 토큰과 UI 컴포넌트로 옮기고, clsx와 tailwind-merge를 묶은 cn 함수로 클래스 충돌을 정리한 기록."
authors: [hyoloui]
tags: [design-system, tailwind, ui-ux]
---

어드민 작업이 일단락되고 피트니스 센터용 CRM 웹 개발로 넘어왔다. 마침 디자인 가이드가 나와서, 화면마다 색과 크기를 그때그때 넣던 방식을 버리고 가이드부터 코드로 옮긴 다음 화면을 그 위에 다시 쌓기로 했다.

<!--truncate-->

## 토큰과 UI 컴포넌트

컬러는 `globals.css`의 CSS 변수로 정의하고 Tailwind에서 `bg-[var(--primary)]`처럼 참조한다. 폰트는 Pretendard 세 가지 굵기를 `next/font/local`로 불러와 루트 레이아웃에 걸었다.

2주 동안 Button, Textfield, Checkbox, Toggle, Badge, Dropdown, Tab, SegmentControl을 만들었다. `components/ui`에 있는 컴포넌트는 가이드에 있는 모양만 책임지고, API 호출이나 페이지 상태는 모르게 했다. 이름도 가이드에 맞춰 `Header`는 `GNB`로, `MainHeader`는 `AppBar`로 바꿨다. 문서와 코드에서 같은 이름을 써야 둘을 오가며 찾기 쉽다.

새 컴포넌트로 로그인, 회원가입, 비밀번호 재설정 화면을 다시 만들었고, 모달로 띄우는 화면은 병렬 라우트 폴더를 `@auth`에서 `@modal`로 바꿔 인터셉팅 라우트로 열리게 정리했다.

## className이 안 덮이는 문제

컴포넌트를 쓰다 보니 밖에서 className을 넘겨도 스타일이 원하는 대로 덮이지 않았다. 기본 클래스 뒤에 `${className}`을 붙이면 될 줄 알았는데, Tailwind의 우선순위는 className에 적은 순서와 상관없이 CSS 파일에 생성된 순서로 정해진다. 밖에서 `px-4`를 넘겨도 안쪽의 다른 padding 클래스가 이기는 경우가 생겼다.

그래서 `clsx`와 `tailwind-merge`를 묶은 함수를 만들었다.

```ts
import { twMerge } from 'tailwind-merge';
import { ClassValue, clsx } from 'clsx';

export default function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

`clsx`가 조건부 클래스를 문자열로 합치고, `twMerge`가 같은 속성끼리 충돌하는 클래스 중 뒤에 온 것만 남긴다. 같은 날 Badge, Card, Checkbox, Tab, SideModal, Textfield까지 전부 적용했다. 한 줄에 길게 늘어져 있던 삼항 연산자가 인자로 나뉘니 읽기도 편해졌다.

입사 초반 어드민에서는 `DefaultButton` 하나에 className을 덧붙여 가며 썼다. 이번에는 가이드에 없는 모양이 필요하면 컴포넌트를 늘리기 전에 가이드부터 확인하고 있다.
