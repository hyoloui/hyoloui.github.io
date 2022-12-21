---
title: "리액트 - axios (서버통신 라이브러리) 개념과 설치 명령어"
description: "Promise 기반 HTTP 클라이언트 axios의 설치와 json-server를 대상으로 한 GET, POST, DELETE, PATCH 요청 예제 정리."
authors: [hyoloui]
tags: [react, data-fetching]
---

TIL : Today I Learned

<!--truncate-->

## axios (서버통신 라이브러리)

> 공식문서에 따르면 axios 란 node.js와 브라우저를 위한 Promise 기반 http 클라이언트라고 소개하고 있다. 즉 http를 이용해서 서버와 통신하기 위해 사용하는 패키지다.

공식 사이트: [https://axios-http.com/kr/](https://axios-http.com/kr/)

### 설치 명령어와, 실행 명령어

CRA를 통해서 새로운 프로젝트를 생성하고, 터미널에 아래의 명령어를 입력해서 axios를 설치.

npm의 경우

```bash
npm install axios
```

yarn의 경우

```bash
yarn add axios
```

### 우리가 사용하는 json-server API 명세서 확인하기

우리가 Axios를 사용해서 GET 요청 코드를 작성하기에 앞서, **어떤 방식으로 요청 해야 할지는 우리가 사용하는 json-server의 방식**을 알아보아야 한다.

다시 말해, **Axios는 GET 요청을 할 수 있도록 도와주는 패키지일 뿐이지, "어떻게 요청을 해야 하지?" 와 같은 방식에 대한 확인은 우리가 사용할 API 명세서를 보아야 한다는 뜻** 이다.

예를 들어 GET 요청을 할 때 path variable로 해야 할지, query로 보내야 할지는 API를 만든 사람이 하라는 대로 해야 하기 때문.

[요청 Config | Axios Docs](https://axios-http.com/kr/docs/req_config)

[json-server - npm](https://www.npmjs.com/package/json-server)

## GET

get은 서버의 데이터를 **조회할 때 사용한다**. 기본적인 사용 방법은 아래와 같다.

```js
// url에는 서버의 url이 들어가고, config에는 기타 여러 가지 설정을 추가할 수 있습니다.
// config는 axios 공식문서에서 확인하세요.

axios.get(url[, config]) // GET
```

### 예시 코드

```jsx title="src/App.js"
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 합니다.

const App = () => {
  const [todos, setTodos] = useState(null);

  // axios를 통해서 get 요청을 하는 함수를 생성합니다.
  // 비동기처리를 해야하므로 async/await 구문을 통해서 처리합니다.
  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data); // 서버로부터 fetching한 데이터를 useState의 state로 set 합니다.
  };

  // 생성한 함수를 컴포넌트가 mount 됐을 때 실행하기 위해 useEffect를 사용합니다.
  useEffect(() => {
    // effect 구문에 생성한 함수를 넣어 실행합니다.
    fetchTodos();
  }, []);

  // data fetching이 정상적으로 되었는지 콘솔을 통해 확인합니다.
  console.log(todos); // App.js:16
  return <div>App</div>;
};

export default App;
```

콘솔로 결과를 확인하니, 우리가 생성한 **Todos를 정상적으로 서버에서 가져와서 state가 set 한 것을 확인**할 수 있다.

<details>
<summary>실행 결과</summary>

```bash
[{…}]
  0: {title: 'test', id: 1}
  length: 1
  [[Prototype]]: Array(0)
```

</details>

## POST

post는 보통 **서버에 데이터를 추가할 때 사용**한다. 다만 post 요청에 대한 로직은 BE 개발자가 구현하는 것이기 때문에 추가 외에 다른 용도로 사용될 수 있지만, 보통은 클라이언트의 데이터를 body 형태로 서버에 보내고자 할 때 사용된다. GET 에서 본 것과 같이 위에 링크로 첨부한 json-server의 POST 요청 [방식을 확인](https://www.npmjs.com/package/json-server)하길 바란다.

```js
axios.post(url[, data[, config]])   // POST
```

### 예시 코드

```jsx title="src/App.jsx"
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios import 한다.

const App = () => {
  // 새롭게 생성하는 todo를 관리하는 state
  const [todo, setTodo] = useState({
    title: "",
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data);
  };

  const onSubmitHandler = async (todo) => {
    // 1. 이때 todos는 [{투두하나}]임
    await axios.post("http://localhost:3001/todos", todo); // 이때 서버에 있는 todos도 [{투두하나}]임

    // 근데 여기서 서버 요청이 끝나고 서버는 [{투두가},{두개임}]

    setTodos([...todos, todo]); // 2. <-- 만약 이게 없다면, go to useEffect
    // 4. 새로고침해서 진짜 현재 서버 데이터를 받아오기 전에 상태를 똑같이 동기시켜줌
    // 5. 어떻게 보면 유저한테 서버에서 새로 받아온 것처럼 속이는 것
  };

  useEffect(() => {
    fetchTodos(); // 3. 새로고침해서 여기를 다시 실행해줘야 서버값이 새로 들어옴 e.g) [{투두가},{두개임}]
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          // 👇 submit했을 때 브라우저의 새로고침을 방지합니다.
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </>
  );
};

export default App;
```

## DELETE

DELETE는 저장되어 있는 데이터를 삭제하고자 요청을 보낼 때 사용.

```js
axios.delete(url[, config])  // DELETE
```

### 예시 코드

```jsx title="src/App.jsx"
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState({
    title: "",
  });

  const [todos, setTodos] = useState(null);

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data);
  };

  const onSubmitHandler = (todo) => {
    axios.post("http://localhost:3001/todos", todo);
  };

  // 새롭게 추가한 삭제 버튼 이벤트 핸들러
  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {todo.title}
            {/* 삭제 버튼 추가 + id 넘겨주기 */}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
```

DELETE 요청이 성공적으로 이루어졌다면, 브라우저를 새로고침 했을 때 삭제한 Todo가 화면에서 보이지 않는 것을 알 수 있다.

## PATCH

patch는 보통 어떤 데이터를 수정하고자 서버에 요청을 보낼 때 사용하는 메서드. 다만, 이것은 http 환경에서 서로가 한 약속이자 문맥이기 때문에, 수정을 하고자 반드시 patch, put 을 써야만 하는 것은 아니다. BE에 의해서 POST를 통해서 "수정" 이라는 기능은 충분히 만들 수 있기 때문. 다만 이러한 약속들을 대부분의 개발자들이 지키고 있다.

Todo를 수정하기 위해 필요한 데이터는 2개가 있다. **수정하고자 하는 Todo의 id**, 그리고 **수정하고자 하는 값**이다. 수정하고자 하는 값은 기존에 있던 todo라는 state를 사용하면 될 것이고, id는 직접 입력을 해서 url로 넘겨주는 방식으로 구현 할 것이다.

보통은 수정 기능을 만들 때 직접 id를 입력받아 처리하는 방식은 거의 없다. 다만, 이번 예시에서는 아주 간단한 코드로 기능을 구현하는 것이기 때문에 위와 같이 처리하겠다.

### 예시 코드

```jsx title="src/App.jsx"
import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState({
    title: "",
  });
  const [todos, setTodos] = useState(null);

  // patch에서 사용할 id, 수정값의 state를 추가
  const [targetId, setTargetId] = useState(null);
  const [editTodo, setEditTodo] = useState({
    title: "",
  });

  const fetchTodos = async () => {
    const { data } = await axios.get("http://localhost:3001/todos");
    setTodos(data);
  };

  const onSubmitHandler = (todo) => {
    axios.post("http://localhost:3001/todos", todo);
  };

  const onClickDeleteButtonHandler = (todoId) => {
    axios.delete(`http://localhost:3001/todos/${todoId}`);
  };

  // 수정버튼 이벤트 핸들러 추가 👇
  const onClickEditButtonHandler = (todoId, edit) => {
    axios.patch(`http://localhost:3001/todos/${todoId}`, edit);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitHandler(todo);
        }}
      >
        {/* 👇 수정기능에 필요한 id, 수정값 input 2개와 수정하기 버튼을 추가 */}
        <div>
          <input
            type="text"
            placeholder="수정하고싶은 Todo ID"
            onChange={(ev) => {
              setTargetId(ev.target.value);
            }}
          />
          <input
            type="text"
            placeholder="수정값 입력"
            onChange={(ev) => {
              setEditTodo({
                ...editTodo,
                title: ev.target.value,
              });
            }}
          />
          <button
            // type='button' 을 추가해야 form의 영향에서 벗어남
            type="button"
            onClick={() => onClickEditButtonHandler(targetId, editTodo)}
          >
            수정하기
          </button>
        </div>
        <input
          type="text"
          onChange={(ev) => {
            const { value } = ev.target;
            setTodo({
              ...todo,
              title: value,
            });
          }}
        />
        <button>추가하기</button>
      </form>
      <div>
        {todos?.map((todo) => (
          <div key={todo.id}>
            {/* todo의 아이디를 화면에 표시 */}
            {todo.id} :{todo.title}
            <button
              type="button"
              onClick={() => onClickDeleteButtonHandler(todo.id)}
            >
              삭제하기
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
```

:::tip 최종 정리

1. Axios를 이용해서 API 서버와 통신할 수 있다.
2. Axios는 http 통신을 도와주는 패키지이며, 구체적인 명세는 API 명세서를 확인해야 한다.
3. http method, status code와 같은 정보들은 BE 개발자가 구현해주는 부분이며, 약속이자 문맥이므로 BE와 FE 간의 커뮤니케이션이 잘 되어야 한다.
4. 네트워크 통신 이후, 화면을 업데이트 하고자 한다면 별도로 FE에서 추가로 구현해야 한다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/69)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-20 */}
