---
title: "리액트 네이티브 - 'Todo-List' 수정 버튼 클릭 시 이전값이 계속 나오는 오류"
description: "수정 버튼을 눌렀을 때 이전에 수정했던 값이 다른 투두에도 남아 있던 문제를 TextInput의 value 대신 defaultValue로 해결한 TIL."
authors: [hyoloui]
tags: [react-native, troubleshooting]
---

:::note TIL : Today I Learned

리액트 네이티브 Todo-List에서 수정 input에 이전 값이 남는 문제를 `defaultValue`로 해결한 기록

:::

<!--truncate-->

## 🤢 문제 내용

수정 버튼을 클릭하고 수정을 한 후, 다른 투두에서도 이전에 수정했던 내용이 고스란히 남아있는 문제였다.

## 🎈 문제 해결 과정

우선 코드부터 보자. 수정 버튼을 클릭했을 때 나타나는 태그이다.

```jsx
<TextInput
  value={editText}
  style={{
    flex: 1,
    backgroundColor: "white",
    fontSize: 20,
  }}
  onChangeText={setEditText}
  onSubmitEditing={() => updateTodo(todo.id)}
/>
```

저 값에서 `value`가 `editText` 라는 state를 가지고 있었다..

`onSubmitEditing` 속성의 `updateTodo`라는 함수 안에서 `editText`를 다시 setState로 바뀐 값으로 넘겨줄 수 있었다. 하지만, 더 간단하게 `defaultValue` 라는 것을 통해 처음 보여줄 값만 정해줬다. 수정하는 역할의 특성상 보여질 텍스트는 1회성이기 때문이다.

```jsx
<TextInput
  defaultValue={todo.text}
  style={{
    flex: 1,
    backgroundColor: "white",
    fontSize: 20,
  }}
  onChangeText={setEditText}
  onSubmitEditing={() => updateTodo(todo.id)}
/>
```

input 태그에 기본값으로 가지고 있는 속성으로 붙여줬고, `editText`를 다시 건들여줘야 하는 불편함 때문에 `todo.text`를 넘기는 방식을 사용했다. 왜냐, 어차피 `updateTodo` 함수가 실행되면 todo의 text값이 변하기 때문에 훨씬 간결해지고 효율적으로 코드를 작성할 수 있었다.

## ✨ 알게된 것

- state로 받지 않아도 되는, 고정값이 되는 부분은 데이터의 내용으로 채워주는 게 효과적이다

:::tip value와 defaultValue의 차이점

- **defaultValue**: input tag에서 처음 보여줄 값
- **value**: input tag에서 계속 보여줄 값

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/83)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-02 */}
