---
title: "리액트 - useEffect 핵심 기능"
description: "useEffect는 컴포넌트가 렌더링될 때 실행되는 훅이며, 의존성 배열에 따라 실행 시점이 달라진다는 점을 예제로 정리."
authors: [hyoloui]
tags: [react]
---

useState와 같이 리액트에서 제공하는 hook 이기 때문에 import를 해야 사용이 가능하다.

<!--truncate-->

:::note 핵심 기능

component가 렌더링 될 때 바로 실행이 된다

:::

동작 방식 : 화면에 컴포넌트가 보여졌거나 사라졌을 때 무언가를 실행한다. 정확히는 component가 화면에 mount, unmount 되었을 때 실행이 된다. (react lifecycle)

## import 구문

```jsx
import React, { useState, useEffect } from "react";
```

## 의존성 배열이 비어 있을 때

```jsx
import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("hello useEffect");
  }, []); // 비어있는 의존성 배열

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};

export default App;
```

의존성 배열이 비어 있는 상태라면 value 가 바뀔 때마다(input에 타이핑하여 onChange가 일어날 때) 실행되지 않는다.

## 의존성 배열에 value 를 넣었을 때

```jsx
import React, { useEffect, useState } from "react";

const App = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("hello useEffect");
  }, [value]); // value가 변동될 때마다 "hello useEffect" 출력

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
      />
    </div>
  );
};

export default App;
```

하지만 여기서 배열에 value 를 넣어주면 전과 같이 value가 바뀔 때마다 콘솔에 'hello useEffect' 가 출력된다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/55)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-12 */}
