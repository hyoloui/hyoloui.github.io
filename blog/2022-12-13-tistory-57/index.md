---
title: "리액트 - Cannot update a component 에러"
description: "onClick에 함수를 호출식으로 넘기면 렌더링 중 setState가 실행되어 Cannot update a component 에러가 난다. 화살표 함수 콜백으로 해결."
authors: [hyoloui]
tags: [react]
---

작업 중 콘솔에 출력된 에러와 해결 방법을 기록한다.

<!--truncate-->

## 에러 내용

```bash
VM21:1 Warning: Cannot update a component (`App`) while rendering a different component (`TodoList`). To locate the bad setState() call inside `TodoList`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
    at TodoList (http://localhost:3000/static/js/bundle.js:413:5)
    at div
    at App (http://localhost:3000/static/js/bundle.js:38:76)
```

에러 이유 : 컴포넌트에서 호출하고 있는 setState가 렌더링되기 전에 호출되었다.

## 해결 방법

### 해결 전

10, 13 번째 줄 참고

```jsx
<main>
  <section>
    <h2>오늘 할 일</h2>
    {todos.map((todo) => {
      if (!todo.isDone) {
        return (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <span>{todo.content}</span>
            <button onClick={() => successTodo(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
            <button onClick={() => cancelTodo(todo.id)}>
              삭제
            </button>
          </div>
        );
      } else return null;
    })}
    <hr />
  </section>
  <section>
    <h2>오늘 끝낸 일</h2>
    {todos.map((todo) => {
      if (todo.isDone) {
        return (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <span>{todo.content}</span>
            <button onClick={successTodo(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
            <button onClick={cancelTodo(todo.id)}>
              삭제
            </button>
          </div>
        );
      } else return null;
    })}
    <hr />
  </section>
</main>
```

버튼 태그의 onClick 속성에 추가해준 함수가 렌더링 되자마자 실행되면서 발견했다.

jsx 문법이기 때문에 html 처럼 30, 33 번째 줄처럼 작성해 뒀고, 작업 중 30, 33 번째 줄이 안 보여서 놓쳤다...

10, 13번째 줄만 수정해서 아래 있는 함수가 바로 실행된 것이다.

html 문법과 jsx 문법의 생김새가 비슷하다고 하지만 이러한 구문에서 특히 조심해야 한다. js는 함수가 호출되면 바로 실행하기 때문에 onClick 속성에 화살표 함수를 사용해 콜백으로 넘겨줘야 렌더링 시 바로 호출되지 않으며, 에러가 없다!

### 해결

리액트 (return) 렌더링 시 onClick 처럼 어떤 함수를 참조하고 있는 이벤트 속성은 즉시 호출이기 때문에 `() => 함수이름` 을 넣어줘야 한다.

10, 13, 28, 31 번째 줄 onClick

```jsx
<main>
  <section>
    <h2>오늘 할 일</h2>
    {todos.map((todo) => {
      if (!todo.isDone) {
        return (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <span>{todo.content}</span>
            <button onClick={() => successTodo(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
            <button onClick={() => cancelTodo(todo.id)}>삭제</button>
          </div>
        );
      } else return null;
    })}
    <hr />
  </section>
  <section>
    <h2>오늘 끝낸 일</h2>
    {todos.map((todo) => {
      if (todo.isDone) {
        return (
          <div key={todo.id}>
            <h3>{todo.title}</h3>
            <span>{todo.content}</span>
            <button onClick={() => successTodo(todo.id)}>
              {todo.isDone ? "취소" : "완료"}
            </button>
            <button onClick={() => cancelTodo(todo.id)}>삭제</button>
          </div>
        );
      } else return null;
    })}
    <hr />
  </section>
</main>
```

:::tip 최종 정리

1. 리액트 jsx 문법에서는 태그의 onClick 이벤트 속성 안에 콜백 함수를 작성해야 한다.
2. `<button onClick={() => 함수}></button>`

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/57)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-13 */}
