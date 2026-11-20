---
title: "Docusaurus 모바일 사이드바가 헤더 높이에 갇힌 이유, backdrop-filter"
description: "navbar에 backdrop-filter를 넣은 뒤 Docusaurus 모바일 사이드바가 헤더 높이로만 그려진 문제의 원인을 찾고 CSS 5줄로 고친 기록."
authors: [hyoloui]
tags: [docusaurus, css, troubleshooting]
---

사흘 전 이 블로그의 디자인을 통일하면서 navbar를 반투명하게 바꾸고, 뒤 내용이 흐리게 비치도록 `backdrop-filter`를 넣었다. 그 뒤로 모바일에서 햄버거 메뉴를 열면 사이드바가 헤더 높이만큼만 그려졌다.

<!--truncate-->

## 증상

사이드바는 화면 왼쪽을 위에서 아래까지 덮어야 하는데, 맨 위 한 줄에만 나타났다. 수정 전 상태를 재현해 390×844 화면에서 재 보면 사이드바는 324×63, 뒤를 어둡게 덮는 배경은 390×63이다. navbar 높이가 64px이고 아래 테두리가 1px이니, 둘 다 navbar 안쪽 크기에 정확히 맞춰져 있었다.

## 원인

Docusaurus는 모바일 사이드바를 navbar 안에 그린다. 테마의 `NavbarLayout` 컴포넌트에서 배경과 사이드바가 `nav`의 자식으로 들어간다. 아래는 className을 줄여 적은 것이다.

```jsx
<nav className="navbar navbar--fixed-top">
  {children}
  <NavbarBackdrop onClick={mobileSidebar.toggle} />
  <NavbarMobileSidebar />
</nav>
```

사이드바의 위치와 크기는 Infima CSS가 정한다. 관련된 속성만 옮기면 이렇다.

```css
.navbar-sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  width: var(--ifm-navbar-sidebar-width); /* 83vw */
}
```

`position: fixed`인 요소는 보통 뷰포트를 기준으로 자리를 잡는다. `top: 0`과 `bottom: 0`을 주면 화면 높이를 꽉 채운다. 그런데 조상 중에 `backdrop-filter` 값이 `none`이 아닌 요소가 있으면 그 요소의 padding box가 기준(containing block)이 된다. MDN의 [containing block 문서](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Containing_block)에 `filter`, `transform`, `perspective`와 같은 줄에 적혀 있다.

내가 넣은 CSS가 그 조건에 걸렸다.

```css
.navbar {
  border-bottom: 1px solid var(--hy-line);
  backdrop-filter: saturate(160%) blur(12px);
  -webkit-backdrop-filter: saturate(160%) blur(12px);
}
```

navbar가 사이드바의 기준이 되면서 `top: 0`과 `bottom: 0`이 navbar의 위아래 끝을 가리키게 됐고, 사이드바 높이는 navbar 높이로 줄었다. 배경도 같은 `position: fixed`라 같이 갇혔다.

## 수정

Docusaurus는 사이드바가 열리면 navbar에 `navbar-sidebar--show` 클래스를 붙인다. 그 클래스가 붙어 있는 동안만 `backdrop-filter`를 껐다.

```css
/* backdrop-filter가 fixed 자식의 기준을 navbar로 바꿔 모바일 사이드바가 navbar 높이에 갇힌다 */
.navbar.navbar-sidebar--show {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}
```

사이드바가 열리면 반투명한 검은 배경이 navbar까지 화면 전체를 덮는다. 블러는 그 밑에서만 꺼진다. 수정 뒤에는 같은 화면에서 사이드바가 324×844, 배경이 390×844로 나온다.

## 같은 문제를 만드는 속성

navbar에 `backdrop-filter` 대신 `filter: blur(0px)`나 `transform: translateZ(0)`을 줘 봐도 사이드바 높이는 똑같이 63px이 된다. 반대로 블러를 navbar의 `::before`로 옮겨 보면 navbar 자체는 기준이 되지 않아서 사이드바가 844px을 유지한다.
