---
title: "helprogrammers 프로젝트 - useRef(리액트 훅)"
description: "유효성 검사 실패 시 input에 auto focus를 주려다, DOM 직접 조작 대신 useRef 훅으로 해결한 과정과 custom hook 인자 전달 실수 기록."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## 문제 내용

게시글 작성, 수정 중 유효성 검사를 통과하지 못했을 때 (작성자, 비밀번호 미입력 등) 해당하는 input 박스를 auto focus 하는 기능 추가 과정 중 document 가져오기.

## 시도한 방법

### 1. useFocus라는 Custom hook 생성 후, dom 요소 직접 조작

문제점 - React 에서 document를 직접 조작하는 것은 추후 원인이 불분명한 오류를 유발할 수 있다!

<details>
<summary>실행 결과 (컴파일 에러)</summary>

```bash
Compiled with problems:

ERROR

[eslint]
src\components\Detail.jsx
  Line 40:7:  React Hook "useFocus" is called in function "deleteButton" that is neither a React function component nor a custom React Hook function. React component names must start with an uppercase letter. React Hook names must start with the word "use"  react-hooks/rules-of-hooks

Search for the keywords to learn more about each error.
```

</details>

위 오류를 해결하면서 알게 된 점은, custom hook 을 일반 컴포넌트와 같은 개념으로 props 를 넘겨줘야 된다고 생각해서 `{props}` 와 같은 방식으로 넘겨줬다..

하지만 내가 사용하려고 하는 custom hook 은 jsx 문법을 반환하는 component가 아닌 함수를 작성했기 때문에 인자와 파라미터를 일반 함수처럼 넘겨줘야 했다.

useFocus에서 발생한 에러를 해결하고 `document.querySelector`로 돔 요소 가져왔으나 null이 출력되어 (알림창에 "(이름)작성자를 입력해주세요!"가 뜨고, 콘솔에는 `null`이 두 번 출력되었다) 공부한 결과 **리액트에서 직접적인 Dom 요소 조작은 추후 걷잡을 수 없는 에러투성이가 된다**고 한다.

```jsx title="index.js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/config/configStore';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
```

7번째 줄에 보이는 것처럼 최상위 js 파일인 index.js에서 직접적으로 dom 요소를 조작하고 우리는 가상환경의 dom을 만들고 있으니 말이다!

### 2. custom hook에서 useRef() hook 사용하기

useRef 라는 훅을 통해 html에서 사용하는 id, class 처럼 직접 요소를 가져와 동작할 수 있다는 것을 알게 되어 customhook인 useFocus.jsx를 구성하려고 했으나,

지금까지 input창을 수정할 때 사용한 useState처럼 `onChange` → 함수 생성 → `setState(event.target.value)` → `input value={state}` 복잡하게 생각하지 않아도 되었다!

왜냐면 useRef를 사용하는 시점에는 onChange가 이루어지는 것도 아니고, state를 업데이트 할 필요도 없기 때문이다.

그래서 컴포넌트에서 직접 useRef() 훅을 사용하기로 한다.

## 문제 해결 방법 : 솔루션

### 3. component에서 직접 useRef() hook 사용하기

```jsx
import React, { useRef } from 'react';
```

우선 useRef() 훅은 react 훅이기 때문에 import를 한다.

```jsx
const focusWriter = useRef();
```

`useRef()` 를 사용하여 Ref 객체를 만들고,

```jsx
<input
  type="text"
  placeholder="이름 입력"
  ref={focusWriter} // <<<<<<<<<<<<
  onChange={onChangeWriter}
></input>
```

이 객체를 하고 싶은 DOM 에 `ref` 값으로 설정해준다.

```jsx
if (writer.replace(/ /g, '') === '') {
  alert('이름을 입력해주세요!');
  focusWriter.current.focus(); // <<<<<<<<<<<<
  return;
}
```

Ref 객체의 `.current` 값은 우리가 원하는 DOM 을 가져올 수 있다. `focus()` DOM API 를 호출했다.

:::tip 알게 된 것

jsx를 return하지 않는 함수형 컴포넌트를 만들 때에는 props를 구조 분해 할당했던 것과 달리 일반 함수처럼 파라미터를 주고받을 수 있다.

리액트에서 직접적인 dom 조작은 권장하지 않는다. querySelector, getElementBy ~ 등등. 그래서 나는 useRef라는 리액트 훅을 공부하게 되었다.

Ref 객체의 `.current` 값은 우리가 원하는 DOM 을 가져올 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/76)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-27 */}
