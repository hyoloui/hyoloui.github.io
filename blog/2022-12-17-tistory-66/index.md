---
title: "리액트 - React를 Redux로 전역 상태관리를 해보자"
description: "react-redux 설치부터 Provider, configStore, counter 모듈(ducks 패턴), useDispatch·useSelector 사용까지 Redux 기본 세팅 실습."
authors: [hyoloui]
tags: [react, state-management]
---

TIL : Today I Learned

<!--truncate-->

상태관리 도구 redux를 react에서 쉽게 사용할 수 있도록 돕는 도구(라이브러리)가 react-redux 다.

컴포넌트 안에 컴포넌트 안에 컴포넌트 안에 컴포넌트가 있을 때 컴포넌트들 간에 데이터를 주고받을 때 props 로 연결해야 한다. 비유하면, props라는 전선으로 컴포넌트들을 연결한 것이라고 할 수 있다. 컴포넌트들도 블루투스나 와이파이처럼 무선으로 연결할 수 있다면 얼마나 편할까? 이를 위해서는 통신을 중계할 기지국이 필요하다. 리덕스의 스토어를 기지국으로 해서 컴포넌트들을 무선으로 연결할 수 있다면 생산성을 크게 높일 수 있다.

## Redux 설치, 세팅

> react 프로젝트에 사용하는 패키지 npm, yarn 을 이용하여 redux, react-redux 를 설치해야 사용 할 수 있다

```bash
# npm 인 경우
npm install redux react-redux
```

```bash
# yarn 인 경우
yarn add redux react-redux
```

여기서 따로 설치해도 상관 없지만 위에서는 redux 와 react-redux 를 둘 다 설치한다는 명령어이다.

## Redux 구조 만들기

### redux

```text
src/
  redux/
    config/
      configStore.js
    modules/
      counter.js
  App.js
  index.js
```

src 폴더 내부에 redux라는 폴더를 생성하고 (redux 관련 모음 폴더) 그 안에 config와 modules 폴더를 구성했다.

### index.js

```jsx title="index.js"
// 기존에 있던 코드
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// 우리가 추가할 코드
import store from "./redux/config/configStore";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // App을 Provider로 감싸주고, configStore에서 export default 한 store를 넣어줍니다.
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

App 컴포넌트를 Provider 로 감싸주는 이유는 해당 컴포넌트를 redux가 전역 상태관리를 해 주기 위함이다.

처음 실습에 이 부분을 자꾸 놓쳐서 에러가 났다. 또한 Provider 컴포넌트에 기본으로 store 를 연결해야 한다.

그래야 App 컴포넌트 내부의 하위 컴포넌트에서 store 에 접근할 수 있기 때문이다. 이제 store를 만들어 주자.

### config/configStore.js

config 폴더 = redux의 설정과 관련된 파일을 모아놓은 폴더

```js title="configStore.js"
import { createStore } from "redux";
import { combineReducers } from "redux";
import counter from "../modules/counter";

/*
1. createStore()
리덕스의 가장 핵심이 되는 스토어를 만드는 메소드(함수) 입니다.
리덕스는 단일 스토어로 모든 상태 트리를 관리한다고 설명해 드렸죠?
리덕스를 사용할 시 creatorStore를 호출할 일은 한 번밖에 없을 거예요.
*/

/*
2. combineReducers()
리덕스는 action -> dispatch -> reducer 순으로 동작한다고 말씀드렸죠?
이때 애플리케이션이 복잡해지게 되면 reducer 부분을 여러 개로 나눠야 하는 경우가 발생합니다.
combineReducers은 여러 개의 독립적인 reducer의 반환 값을 하나의 상태 객체로 만들어줍니다.
*/

const rootReducer = combineReducers({
  counter: counter,
});
const store = createStore(rootReducer);

export default store;
```

위 코드는 중앙 스테이트 관리소의 역할을 한다.

`import` 로 생성한 모듈을 가져오고, rootReducer 안에 combineReducers 함수를 이용하여 각 모듈을 넣어주어야 한다.

위에서는 counter 만 넣은 상태이므로 각 프로젝트에서는 생성한 모듈을 `counter: counter` 와 같은 식으로 combineReducers 내부에 객체의 형태로 연결해준다.

### modules

필요한 state를 모아놓을 폴더, state 의 그룹 파일

counter.js 라는 파일을 예로 설명 한다.

> reducer로 보내는 action 객체에 어떤 정보를 같이 담아보자 == payload
>
> payload는 action creator 를 생성할 때 매개변수 자리에서 받을 준비를 하고, 반환하는 action 객체에 payload라는 key와 받은 매개변수를 value로 하여 구현을 한다.
>
> reducer에서 payload 를 사용하고자 할 때에는 action.payload 이렇게 사용할 수 있다.
>
> - es6에서 객체를 생성할 때 key와 value가 같다면 축약하여 사용할 수 있다.

```js title="src/redux/modules/counter.js"
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
    case ADD_NUMBER: {
      return {
        number: state.number + action.payload,
      };
    }
    case MINUS_NUMBER: {
      return {
        number: state.number - action.payload,
      };
    }
    default:
      return state;
  }
};

// export default reducer
export default counter;
```

저는 위처럼 counter.js 를 만들며 실습을 진행했다. 위 코드는 3단락으로 나누어질 수 있다.

- 각 action에 동작할 type을 설정하고,
- state의 기본값인 `initialState = { number: 0 }` 을 가지고 있으며, 이곳에 다양한 초기 데이터를 설정 할 수 있다
- 변화를 일으키는 함수! reducer에는 위에 선언한 action type 별로 실행하는 기능을 분리했다

> action creator 사용하는 이유 : 상수로 선언하여 '자동완성 기능' 으로 휴먼 에러 방지, action 객체에 같이 담아 보내주는 것 == payload

이러한 모듈의 구조와 패턴을 ducks pattern 이라고 하며, ducks pattern = 리덕스에서 사용되는 기능을 패턴화 한 것, redux module 작성 방법의 정석으로 여겨지고 있다.

1. reducer 함수를 export default 한다
2. action creator 함수들을 export 한다
3. action의 type은 `app/reducer/action-type` 의 형태로 작성한다

### App.jsx

Store, modules, index 파일을 구성했다면 우리의 '플레이그라운드'인 App.jsx 파일에서 어떻게 사용하는지 확인해보자.

```jsx title="src/App.js"
import React from "react";
import { useState } from "react";
// useDispatch = module로 넘겨주어 action을 실행해주는 함수
// useSelector = state를 꺼내오는 함수
import { useDispatch, useSelector } from "react-redux";
// counter 모듈에 만들어 두었던 함수를 가져와 연결
import { addNumber, minusNumber } from "./redux/modules/counter";

const App = () => {
  // redux를 사용한다고 해서 useState를 사용할 수 없는 것은 아니다, 간단한 state가 필요할 때에는 사용해도 좋다
  const [number, setNumber] = useState(0);

  // dispatch 는 액션을 실행 시켜줄 수 있는 함수다
  const dispatch = useDispatch();

  // counter 내부의 number state 의 값
  const globalNumber = useSelector((state) => state.counter.number);

  const onChangeHandler = (event) => {
    const { value } = event.target;
    setNumber(+value);
  };

  const onClickAddNumberHandler = () => {
    // dispatch로 import한 addNumber를 실행 시킨다
    dispatch(addNumber(number));
  };
  const onClickMinusNumberHandler = () => {
    // dispatch로 import한 minusNumber를 실행 시킨다
    dispatch(minusNumber(number));
  };
  console.log(number);
  return (
    <div>
      {globalNumber}
      <input type={number} onChange={onChangeHandler} />
      <button onClick={onClickAddNumberHandler}>더하기</button>
      <button onClick={onClickMinusNumberHandler}>빼기</button>
    </div>
  );
};

export default App;
```

이렇게 counter 하는 함수를 하나 만드는 데도 많은 코드가 작성된다고 느끼겠지만 효율적인 state 관리 구조를 가진 것이다.

왜냐면 규모가 큰 프로젝트, 서비스에 참여 해보면 수많은 개발자들과의 협업으로 유지보수, 관리가 매우 까다롭고 복잡해지지만, 이러한 **전역 상태관리**를 통해 리덕스를 이해한 개발자라면 코드를 해석하는 데 상당 부분의 시간과 에너지를 쏟지 않을 수 있다.

:::tip 최종 정리

1. redux 는 state를 효율적으로 활용할 수 있는, 전역 상태관리 라이브러리다
2. redux를 통해 전역으로 설정하기 위해서는 index.js 에서 Provider 컴포넌트를 가져와 App 컴포넌트를 감싼다
3. config 폴더에는 redux 설정과 관련된 configStore 파일을 만들어준다
4. modules 폴더에는 state를 관리하고 분리하는 역할을 하며, 각종 모듈을 이곳에 저장한다
5. redux를 활용하기 위해서는 필요한 파일에 useDispatch, useSelector 를 연결한다
6. useDispatch는 모듈에 만들어 놓은 action을 수행해 준다
7. useSelector는 모듈에 만들어 놓은 state 값을 가져온다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/66)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-17 */}
