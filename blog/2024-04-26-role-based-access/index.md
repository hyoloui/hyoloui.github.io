---
title: "직원 권한에 따라 화면 막기"
description: "프랜차이즈 선택 시 권한을 쿠키에 저장하고, 서버 컴포넌트에서 그 값으로 버튼과 페이지 접근을 함께 막은 기록."
authors: [hyoloui]
tags: [career, react, web]
---

CRM은 한 센터의 대표, 매니저, 팀장, 트레이너가 같이 쓴다. 지금까지는 누가 로그인해도 같은 화면이 보였는데, 이번 주부터 권한에 따라 수정 기능을 막는 작업을 했다.

<!--truncate-->

## 권한을 어디에 둘까

직원의 권한은 계정 하나에 하나가 아니고, 소속마다 `employeeType`이 따로 붙어 있다. 로그인만으로는 어떤 권한으로 화면을 그릴지 정할 수 없고, 사용자가 들어갈 곳을 고른 뒤에야 하나로 정해진다. 그래서 프랜차이즈 선택 화면에서 항목을 누르는 순간에 저장하기로 했다.

프랜차이즈 선택 버튼은 원래 `Link`였다. 여기에 클릭하면 쿠키를 저장하는 동작만 더한 `SaveCookieLink` 컴포넌트를 만들었다.

```tsx
export default function SaveCookieLink({ href, cookieName, cookieValue, expires, children, ...rest }: Props) {
  const onClick = () => setCookie(cookieName, cookieValue, expires);
  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
```

## 버튼만 숨기면 안 된다

센터 정보 페이지에서는 대표가 아니면 '내용 수정' 버튼을 렌더링하지 않는다. 그런데 버튼만 숨기면 수정 페이지 주소를 직접 입력해서 들어올 수 있다. 그래서 수정 페이지에서도 서버 컴포넌트가 `cookies()`로 권한을 읽고, 대표가 아니면 폼 대신 '접근 권한이 없습니다' 안내를 보여주게 했다. 직원 정보 수정 페이지도 같은 방식으로 막았다.

권한 값이 쿠키에 있으니 서버 컴포넌트에서 바로 읽을 수 있고, 별도 API 호출 없이 렌더링 단계에서 분기된다. 클라이언트 상태에 두었다면 새로고침이나 직접 접근 때마다 다시 채워 넣는 처리가 필요했을 것이다.

같은 주에 App Bar에 메뉴 트리도 붙였다. `useSelectedLayoutSegments`로 현재 경로의 segment를 읽고, 메뉴 상수와 맞춰서 상위 메뉴부터 현재 페이지까지의 경로를 보여준다. 상위 메뉴를 누르면 그 페이지로 돌아간다.
