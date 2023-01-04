---
title: "리액트 네이티브 - CRUD: Update API (updateDoc( ) 활용하기)"
description: "Firestore의 updateDoc으로 todo의 isDone과 text를 수정하는 Update API를 만들고, indexOf is not a function 오류를 해결한 과정."
authors: [hyoloui]
tags: [react-native, firebase]
---

:::note 목적

CRUD : Update API 생성, Firebase : FireStore data 업데이트

:::

:::warning 오류 해결

`WARN  Possible Unhandled Promise Rejection : TypeError: _n7.indexOf is not a function.`

:::

<!--truncate-->

## 1. setDone (체크아이콘)

체크 아이콘을 누르면 함수가 실행되어 해당하는 todo의 `isDone` 속성을 토글로 변경하고, `isDone`이 `true` 라면 완료했다는 효과(`text-decoration: line-through`)를 주자.

```js
const setDone = async (id) => {
  const find = todos.findIndex((todo) => todo.id === id);
  await updateDoc(doc(db, "todos", id), { isDone: !todos[find].isDone });
};
```

아이콘 클릭 시 실행되는 함수이고, 서버통신을 하는 부분이니 비동기 처리를 해줬다. 또 현재 가지고 있는 `todos`의 `isDone`을 토글해야 했기 때문에 `find` 라는 변수로 지금 가진 `isDone`과 반대로 계속 바꿔주었다.

```jsx
style={{
  fontSize: 18,
  width: "60%",
  textDecorationLine: todo.isDone
    ? "line-through"
    : "none",
}}
```

스타일은 이렇게 3항 연산자로 `isDone`이 `true`라면 삭선을 긋고, `false` 라면 아무것도 하지 않도록 해주었다.

하지만 테스트과정에서 에러가 발생했다. 아래 해결과정이 있으니 참고하자!

## 2. text 업데이트

update의 핵심 기능인 데이터의 text를 update 해 보자. 우선 기능을 2개로 나누었다.

- 수정 아이콘 클릭시 `setEdit()`, `Text` 태그를 `TextInput` 태그로 변경
- `TextInput`에서 엔터(`onSubmitEditing`)되면 `updateDoc()`

### 2-1. setEdit

```js
const setEdit = async (id) => {
  const find = todos.findIndex((todo) => todo.id === id);
  await updateDoc(doc(db, "todos", id), { isEdit: !todos[find].isEdit });
};
```

아이콘 클릭했을 때 실행하는 함수이다. 이것도 역시 서버통신으로 `updateDoc()`이 되기 때문에 비동기 처리를 했고, 위에 있는 `setDone` 함수와 똑같다.

```jsx
{todo.isEdit ? (
  <TextInput
    defaultValue={todo.text}
    style={{
      flex: 1,
      backgroundColor: "white",
    }}
  />
) : (
  <Text
    style={{
      fontSize: 18,
      width: "60%",
      textDecorationLine: todo.isDone
        ? "line-through"
        : "none",
    }}
  >
    {todo.text}
  </Text>
)}
```

이후 todo의 `isEdit` 상태에 따라 삼항연산자로 `TextInput`이 될 것인지, `Text`가 될 것인지 나누었다.

### 2-2. onSubmitEditing

위에 만들어준 `<TextInput/>` 태그에서 사용할 스테이트를 하나 만들어줘야 한다.

```js
const [editText, setEditText] = useState("");
```

```jsx
{todo.isEdit ? (
  <TextInput
    defaultValue={todo.text}
    onChangeText={setEditText}
    onSubmitEditing={() => {
      editTodo(todo.id);
    }}
    style={{
      flex: 1,
      backgroundColor: "white",
      fontSize: 18,
    }}
  />
) : (
  <Text
    style={{
      fontSize: 18,
      width: "60%",
      textDecorationLine: todo.isDone
        ? "line-through"
        : "none",
    }}
  >
    {todo.text}
  </Text>
)}
```

1. 위 스테이트에서 가지고 있는 데이터를 `onChangeText`하여 계속 바꿔주기 위해 setState
2. 엔터, 즉 submit이 되면 실행시킬 함수를 추가해 주고 파라미터로 todo의 id를 넘겨준다

```js
const editTodo = async (id) => {
  await updateDoc(doc(db, "todos", id), {
    text: editText,
    isEdit: false,
  });
};
```

update API 영역에 submit이 되면 실행 될 함수도 추가해 준다. 로직은 위에서 했던 update와 같다. 다만 id가 가지고 있는 text를 방금 전 만들어준 `editText`로 바꿔주고, 열려있는 `TextInput`을 닫아주기 위해 `false`로 변경해 주면 마무리가 된다!

## 3. 결과 화면

(원문에는 결과 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

## + 오류 해결

파이어베이스 `updateDoc`, `getDoc`, `onSnapshot` API 중 에러

`WARN  Possible Unhandled Promise Rejection`

<details>
<summary>에러 로그</summary>

```bash
WARN  Possible Unhandled Promise Rejection (id: 4):
TypeError: _n7.indexOf is not a function. (In '_n7.indexOf("//")', '_n7.indexOf' is undefined)
fromString@http://eztkokg.hyoloui.19000.exp.direct/node_modules%5Cexpo%5CAppEntry.bundle?platform=ios&dev=true&hot=false:119891:26
...
```

</details>

check 아이콘을 클릭하면 todo의 `isDone`을 바꿔주는 함수에서 오류가 났다. 잘 읽어보니 index error 라고 하는 것 같아서, 그 전에는 id를 속성으로 넣어줬는데, firebase에서 자동적으로 id가 생성이 되므로 우리가 따로 추가 할 필요는 없어서 `newTodo` 에서 지워줬던 게 생각이 났다.

**추론: edit 은 되었지만 db를 읽어올 때의 index 내용이 서로 다르다!**

**해결: 우선 동료들의 경우를 보면 오타의 경우가 가장 많았고, 나는 FireStore에 있는 컬렉션 모두 삭제를 했다.**

이렇게 간단히 해결되었다. 느낀점은, 어렵게 생각하지 말고 에러를 잘 읽어보면 힌트가 반드시 있다!

:::tip 최종 정리

1. `findIndex` : 배열 메서드로 배열의 인덱스를 찾아오는 데 아주 간편한 메서드
2. RN 에서는 `onSubmit` 대신 `onSubmitEditing` 으로 사용
3. firebase 사용시 `updateDoc()` 함수로 간편하게 업데이트가 가능하다
4. state를 사용하여 현재 상태를 확인하고 삼항연산자로 `Text`, `TextInput`을 보여주면 간편하게 토글 시 렌더링됨과 동시에 UI를 쉽게 변경할 수 있다
5. firebase 사용 시 `index is not a function` 에러는 오타, 데이터간 key 통일이 안된 경우이거나 type이 맞지 않아서 생기는 오류이다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/85)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-03 */}
