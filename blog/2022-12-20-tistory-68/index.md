---
title: "리액트 - Redux-Toolkit 개념과 설치"
description: "Redux-Toolkit(RTK)의 개념, 설치 방법, 일반 리덕스와의 코드 비교, createSlice 구조와 configureStore 설정 정리."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## Redux-Toolkit

공식 사이트: [https://redux-toolkit.js.org/](https://redux-toolkit.js.org/)

### 리덕스 툴킷이란?

**리덕스 툴킷은 우리가 이전에 배운 리덕스를 개량한 것으로 생각**하면 된다.

리덕스를 사용하기 위해 작성했던 ducks 패턴의 요소들이 전체적인 코드의 양을 늘린다는 개발자들의 불만이 발생하기 시작했고, 리덕스 팀에서는 이것을 수용하여 **코드는 더 적게, 그리고 리덕스를 더 편하게 쓰기 위한 기능들을 흡수해서 만든 것이 리덕스 툴킷** 이다. 줄여서 RTK 라고도 한다.

### 새로운 것인가? 아니다.

**리덕스 툴킷은 우리가 배웠던 리덕스와 구조나 패러다임이 모두 똑같다.**

**즉 새로운 것이 아니다.** 리덕스의 전체 코드의 양을 줄이기 위해 새로운 API가 추가되었고 우리가 일일이 손으로 만들어 줘야 했던 ducks 패턴의 요소들이 어느 정도 자동화 되었다.

**컴포넌트에서 useSelector를 통해서 사용하는 것은 모두 똑같다. 바뀐 부분은 그저 모듈 파일뿐이다.**

### 툴킷 설치하기

npm 또는 yarn (패키지관리) 중 하나를 이용하여 CRA를 통해 새로운 프로젝트를 생성하고 아래 해당 명령어를 통해 설치한다.

npm 명령어

```bash
npm install react-redux @reduxjs/toolkit
```

yarn 명령어

```bash
yarn add react-redux @reduxjs/toolkit
```

## 일반 리덕스와 코드 비교

아래 코드는 일반 리덕스의 counter 프로그램 모듈이다. Action Value, Action Creator를 별도로 생성해줘야 했다. 그리고 리듀서에서 값을 어떻게 변화시킬 지 만들어줬다.

### count 프로그램 코드 비교

```js
// 일반 리덕스 예시 코드

// Action Value
const ADD_NUMBER = "ADD_NUMBER";
const MINUS_NUMBER = "MINUS_NUMBER";

// Action Creator
export const addNumber = (payload) => {
  return {
    type: ADD_NUMBER,
    payload,
  };
};

export const minusNumber = (payload) => {
  return {
    type: MINUS_NUMBER,
    payload,
  };
};

// Initial State
const initialState = {
  number: 0,
};

// Reducer
const counter = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        number: state.number + action.payload,
      };
    case MINUS_NUMBER:
      return {
        number: state.number - action.payload,
      };
    default:
      return state;
  }
};

// export default reducer
export default counter;
```

아래는 리덕스 툴킷을 사용해서 만든 counter 모듈이다. 일반 리덕스를 사용했을 때보다 확실히 코드의 양이 줄었다.

자세히 살펴보면 **큰 차이점은 Action Value와 Action Creator를 이제 직접 생성해주지 않고, Action Value, Action Creator, Reducer가 하나로 합쳐졌다는 점** 이다.

이제 우리는 Slice 라는 API를 사용한다. 이 슬라이스를 사용하면, 저 3개를 각각 만들어줄 필요 없이 한 번에 3개가 모두 만들어진다.

```js title="src/redux/modules/counterSlice.js"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  number: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addNumber: (state, action) => {
      state.number = state.number + action.payload;
    },

    minusNumber: (state, action) => {
      state.number = state.number - action.payload;
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { addNumber, minusNumber } = counterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 해준다.
export default counterSlice.reducer;
```

## 리덕스 툴킷 코드구조

### 슬라이스 구조

슬라이스는 createSlice 라는 API를 통해 만들 수 있다. 그리고 그 인자로 설정정보를 객체로 받는데, 그 안에 우리가 필수로 작성해줘야 하는 값은 `name`, `initialState`, `reducers`가 있다.

```js
// createSlice API 뼈대

import { createSlice } from "@reduxjs/toolkit"; // createSlice를 import한다

const counterSlice = createSlice({
  name: '', // 이 모듈의 이름
  initialState: {}, // 이 모듈의 초기상태 값
  reducers: {}, // 이 모듈의 Reducer 로직
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const { } = counterSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default counterSlice.reducer;
```

### configStore

`configStore`에서도 아래와 같이 작성하면 되며, 크게 달라지는 점은 없다. 아래 코드처럼 여러 개의 모듈을 store에 등록해보자.

```js title="src/redux/config/configStore.js"
import { configureStore } from "@reduxjs/toolkit";
/**
 * import 해온 것은 slice.reducer 이다.
 */
import counter from "../modules/counterSlice";
import todos from "../modules/todosSlice";

/**
 * 모듈(Slice)이 여러 개인 경우
 * 추가할 때마다 reducer 안에 각 모듈의 slice.reducer를 추가해줘야 한다.
 *
 * 아래 예시는 하나의 프로젝트 안에서 counter 기능과 todos 기능이 모두 있고,
 * 이것을 각각 모듈로 구현한 다음에 아래 코드로 2개의 모듈을 스토어에 연결해준 것 입니다.
 */
const store = configureStore({
  reducer: { counter: counter, todos: todos },
});

export default store;
```

### App.jsx

`App.jsx`에서는 툴킷을 사용해서 만든 모듈을 조회할 수 있다. 방식은 일반 리덕스를 사용했을 때와 동일하다. 아래 코드를 작성하여, 리덕스 모듈들이 잘 연결되었는지 확인한다.

```jsx title="src/App.js"
import React from "react";
import { useSelector } from "react-redux";

const App = () => {
  // Store에 있는 todos 모듈 state 조회하기
  const todos = useSelector((state) => state.todos);

  // Store에 있는 counter 모듈 state 조회하기
  const counter = useSelector((state) => state.counter);

  return <div>App</div>;
};

export default App;
```

### 폴더 구조

우리가 위에서 작성한 파일들의 구조다. modules 안에 있는 파일의 이름은 임의로 하면 된다. `counter.js`, `todos.js`로 하는 개발자도 있고, `counterSlice.js`, `todosSlice.js`로 하는 개발자도 있다. 이건 선택이다. 아래 파일 구조와 동일한지 확인해보자.

```text
src/
  redux/
    config/
      configStore.js
    modules/
      counterSlice.js
      todosSlice.js
  App.jsx
  index.js
```

:::tip 최종 정리

1. 코드는 더 적게, 그리고 리덕스를 더 편하게 쓰기 위한 기능들을 흡수해서 만든 것이 **리덕스 툴킷** 이다
2. slice를 이용하면, Reducer, Action Value, Action Creator를 한 번에 구현할 수 있다.
3. 슬라이스에 필수로 작성해줘야 하는 값은 `name`, `initialState`, `reducers`가 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/68)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-20 */}
