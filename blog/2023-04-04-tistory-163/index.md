---
title: "Cookie의 옵션"
description: "쿠키의 Expires, Max-Age 옵션과 보안을 위한 Secure, HttpOnly, SameSite 권장사항을 정리한 TIL."
authors: [hyoloui]
tags: [web]
---

❤️‍🔥 TIL : Today I Learned

:::note Expires, Max-Age

본 포스팅에서는 프론트엔드 개발자가 알아야 할 가장 중요하다고 생각하는 두 가지 옵션만 설명합니다.

:::

<!--truncate-->

## 쿠키 생성 옵션

쿠키는 생성할 때 몇가지 옵션을 줄 수 있다.

**HTTP 헤더에 들어간 쿠키 옵션 예제**

```http
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
```

- `Set-Cookie` 헤더의 쿠키값 설정 뒤에 `; 옵션1=xx; 옵션2=yy` 형태로 적용이 가능하다.

## Expires=&lt;date&gt;(Optional)

- 쿠키가 언제까지 유효한지 명시한다.
- [HTTP-date timestamp](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Date) 형식에 맞추어야 한다.
  - 자바스크립트 `Date` 객체에서 `toUTCString()` 메서드를 쓴 결과를 이용하면 쉽다.
  - `new Date().toUTCString()` → `'Fri, 27 Jan 2023 10:52:47 GMT'`
- 생략한다면, 세션이 만료될 때 쿠키도 함께 만료된다.
  - 현대 브라우저는 모든 창을 껐다가 다시 켜도 세션을 복구하는 기능이 있어서, 브라우저 창을 끈다고해도 세션이 만료되지 않을 수 있다.
- 쿠키의 만료일자는 클라이언트와 관련 있으며, 서버와는 관련 없다.
  - 서버는 보통 쿠키로 준 세션 값 등을 디비에 저장하다 일정 시간이 지나거나 조건이 충족되면 만료시킬 뿐이다.

## Max-Age=&lt;number&gt;(Optional)

- '초(second)'로 쿠키의 유효기간을 나타낼 때 쓴다. `Expires` 와 동일한 역할을 한다.
- `Expires` 와 함께 쓰면, `Max-Age`의 우선순위가 높아 `Max-Age` 가 적용된다.

## 보안을 위한 쿠키 옵션 권장사항

- 보안을 위해 `Secure` 와 `HttpOnly` 는 항시 적용하는 것이 좋다.
  - `HttpOnly` 를 적용하지 않으면, 자바스크립트를 통해 쿠키가 탈취당한다.
  - `Secure` 를 적용하지 않으면, [Man in the middle](https://developer.mozilla.org/en-US/docs/Glossary/MitM) 공격을 통해 쿠키가 탈취당한다.
- 쿠키는 언제든 엔드 유저에게 보여지며 변경될 수 있는 값이란 것을 명심해야 한다.
  - 중요한 정보를 저장하려면, **JWT 같은 메커니즘을 이용**하는 것이 도움이 된다.
- 인증 정보와 같은 중요한 쿠키엔 반드시 life time 을 명시하는 것이 좋으며, `SameSite` 속성도 `Strict` 혹은 `Lax` 로 설정해두는 것이 좋다.

## 레퍼런스

[Set-Cookie - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)

:::tip 최종 정리

1. `Expires` 는 유효 기간(날짜)을 설정하는 옵션이고
2. `Max-Age` 는 유효 시간(초)를 설정하는 옵션이다.
3. 두 옵션이 같이 할당되면 `Max-Age`의 우선순위가 높아 `Max-Age`가 적용된다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/163)에서 옮겨 온 글입니다. 원문 작성일: 2023-04-04 */}
