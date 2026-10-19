---
title: "리액트 - useState 동작 2가지(일반형, 함수형)"
description: "useState의 일반 업데이트는 batch 처리되어 1회만 반영되고, 함수형 업데이트는 순차 실행되어 누적된다는 차이 정리."
authors: [hyoloui]
tags: [react]
---

useState 동작 방식을 일반 업데이트와 함수형 업데이트로 나누어 비교한다.

<!--truncate-->

## useState 동작 방식

### 1. 일반 업데이트 방식

```jsx
import React, { useState } from "react";

export default function Update() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      {/* 버튼을 누르면 1씩 플러스 된다. */}
      <div>{number}</div>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
      </button>
    </div>
  );
}
```

onClick 을 실행했을 때 setNumber가 각각 4번 실행하지 않고, batch 처리되어 1회만 실행함.

리액트에서는 명령을 하나로 모아 최종적으로 1회만 실행한다.

→ 버튼 누를 때마다 0, 1, 2, 3, 4...

### 2. 함수형 업데이트 방식

```jsx
import React, { useState } from "react";

export default function Update() {
  const [number, setNumber] = useState(0);
  return (
    <div>
      {/* 버튼을 누르면 1씩 플러스 된다. */}
      <div>{number}</div>
      <button
        onClick={() => {
          setNumber((previousState) => previousState + 1);
          setNumber((previousState) => previousState + 1);
          setNumber((previousState) => previousState + 1);
          setNumber((previousState) => previousState + 1);
        }}
      >
      </button>
    </div>
  );
}
```

명령을 모아 순차적으로 각각 한 번씩 실행 시킨다. setNumber가 4번 함수형으로 실행되어 최종적으로 4회를 실행 시킨다.

→ 버튼 누를 때마다 0, 4, 8, 12, 16...

:::warning

useState 로 원시 데이터가 아닌 데이터를 변경해야 할 때는 불변성을 유지해야 함

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/54)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-12 */}
