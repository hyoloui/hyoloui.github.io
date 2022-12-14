---
title: "리액트 - children 안보임 에러 해결"
description: "에러도 없이 children이 화면에 나오지 않던 원인은 자동완성으로 들어온 대문자 Children이었다. 소문자 children으로 고쳐 해결."
authors: [hyoloui]
tags: [react, troubleshooting]
---

리액트 이 녀석.... 간만에 휴먼 에러를 만났다. 아주 간단한 코드였고, 콘솔에 에러도 안 나고, 문제 없을 리가 없는데 의도한 children 이 나오지를 않았다...

도대체 왜!!!

<!--truncate-->

```jsx title="App.jsx"
import React from "react";
import { v4 as uuid } from "uuid";
import "./App.css";

import Header from "./pages/Header/Header";

const App = () => {
  return (
    <div className="container">
      <Header>seunghyo's todo-list</Header>

    </div>
  );
};
```

```jsx title="Header.jsx"
import React from "react";
import "./style.css";

export default function Header({ Children }) {
  return <h1 className="title">{Children}</h1>;
}
```

도대체 뭐가 문제일까.. 한참을 고민하던 중 수많은 에러를 겪어 많은 내공이 쌓인 '에러개발자' 분께 질문했다.

역시나 겪은 에러였고ㅋㅋㅋㅋㅋㅋㅋ 자동완성으로 children 의 앞글자가 대문자 Children 으로 들어온 문제였다.... 에라잇ㅠㅠ

## 해결 방법

`{ Children }` → `{ children }` 대문자 없이 소문자로!

[dram26 (박다영) - velog](https://velog.io/@dram26)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/56)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-13 */}
