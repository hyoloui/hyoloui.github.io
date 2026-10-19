---
title: "리액트 - pathname 에러 (Router)"
description: "Cannot read properties of undefined (reading 'pathname') 에러의 원인은 자동완성으로 잘못 import된 react-router-dom의 Router였다."
authors: [hyoloui]
tags: [react]
---

콘솔에 `Uncaught TypeError: Cannot read properties of undefined (reading 'pathname')` 에러가 발생했다.

<!--truncate-->

## 에러 내용

<details>
<summary>콘솔 에러</summary>

```bash
Download the React DevTools for a better development experience: https://reactjs.org/link/react-devtools
Uncaught TypeError: Cannot read properties of undefined (reading 'pathname')
    at Router (components.tsx:317:1)
    at renderWithHooks (react-dom.development.js:16305:1)
    at mountIndeterminateComponent (react-dom.development.js:20074:1)
    at beginWork (react-dom.development.js:21587:1)
    ...

The above error occurred in the <Router> component:

    at Router (http://localhost:3000/static/js/bundle.js:37646:15)
    at App

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.
```

</details>

## 솔루션 1

VSCode 좌측 상단 search 아이콘을 누르면 검색할 수 있다.

`(reading 'pathname')` 이 출력되어 내가 pathname 설정 했었나? 하고 프로젝트 폴더에서 검색했는데 "No results found." 나오지 않았다..

## 솔루션 2

`(reading 'pathname')` 밑으로 `at Router` 가 출력되어 Router 컴포넌트를 찾아보기로 했다.

```jsx title="Router.jsx"
import React from "react";
// 1. react-router-dom을 사용하기 위해서 아래 API들을 import 합니다.
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Work from "../pages/Work";

// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
// BrowserRouter를 Router로 감싸는 이유는,
// SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="work" element={<Work />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
```

path 를 pathname 으로 변경 해보았고 다시 Routes 와 Route 구문도 구글링하여 다시 작성했으나 효과가 없었다..

그러던 중 export default 가 되고 있으니 import 를 따라가 보자고 생각했고, 그 결과 에러의 원인을 찾을 수 있었다.

문제의 코드

```jsx title="App.jsx"
import './App.css';
import { Router } from 'react-router-dom';

function App() {
  return (
    <Router />
  );
}

export default App;
```

여기서 App.jsx 파일 2번째 줄, import Router가 잘못 들어갔다.

자동완성으로 react-router-dom 을 가져 왔는데 의도대로라면 내가 작성해 놓은 Router 파일을 가져와야 했다... 흑

자동완성은 가장 많은 비중의 휴먼 에러인 오타를 방지할 수 있지만 프로그램 의도와 맞지 않는 부분이 자동완성으로 들어갈 수 있다.

:::warning

자동완성도 너무 맹신하지 말고 다시 한번 코드를 살펴보자!

:::

## 해결 방법

App.jsx 에서 Router 파일 연결!

```jsx title="App.jsx"
import './App.css';
import Router from "./shared/Router"

function App() {
  return (
    <Router />
  );
}

export default App;
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/61)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-15 */}
