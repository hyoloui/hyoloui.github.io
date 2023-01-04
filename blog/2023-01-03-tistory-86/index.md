---
title: "리액트 네이티브 - CRUD: Delete API (deleteDoc( ) 활용하기), CRUD 최종 완성"
description: "Firestore의 deleteDoc으로 todo를 삭제하고, RN에서 confirm 대신 Alert 버튼을 커스텀해 삭제 확인 창을 만들어 CRUD를 완성한 과정."
authors: [hyoloui]
tags: [react-native, firebase]
---

:::note 목적

CRUD : Delete API 생성, Firebase : firestore data 삭제하기, CRUD 최종 완성

:::

<!--truncate-->

## 1. 삭제 아이콘에 함수 추가

```jsx
{/* 삭제 아이콘 (delete) */}
<TouchableOpacity
  style={styles.once_icon}
  onPress={() => setDelete(todo.id)}
>
  <FontAwesome
    name="trash-o"
    size={30}
    color="black"
  />
</TouchableOpacity>
```

`<TouchableOpacity/>` 태그에 `onPress` 속성으로 `setDelete()`함수를 추가하고 파라미터로 todo의 id를 넘겨줬다.

## 2. create Delete API

```js
// Delete API-------------------------------------------------
const setDelete = async (id) => {
  await deleteDoc(doc(db, "todos", id));
};
```

아주 심플하다. 지금까지 했던 과정을 생각해보자. 서버 통신이 이루어지기 때문에, 비동기 처리를 하고 "todos"라는 폴더에 존재하는 `todo.id`(파라미터로 받아온 것)를 `deleteDoc` 을 사용해서 삭제하면 된다!

## 3. 결과 화면

(원문에는 결과 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

이로써, CRUD 모두 너무나도 잘 구현이 되었다!

하지만 UX를 고려했을 때 실수로 삭제버튼이 눌려진다면 내 소중한 todo가 순식간에 날아가버린다ㅜㅜ 그래서 다시 한번 컨펌을 받아 삭제해주는 작업을 하자.

## 4-1. Alert confirm

RN 에서는 `confirm` API가 없다. 그래서 `Alert` 로 만들어줘야 한다!

```js
// Delete API-------------------------------------------------
const setDelete = async (id) => {
  Alert.alert("안녕");
  // await deleteDoc(doc(db, "todos", id));
};
```

잠시 지우는 것을 주석처리하고 Alert가 어떻게 되는지 확인해보자. 그럼 이렇게 알림창이 잘 뜨는 것을 확인 할 수 있다. 다만 버튼이 2개로 취소 / 삭제가 되어야 한다!

## 4-2. Alert Custom

```js
// Delete API-------------------------------------------------
const setDelete = async (id) => {
  Alert.alert("안녕", "잘가", [{ text: "삭제" }, { text: "진짜삭제?" }]);
  // await deleteDoc(doc(db, "todos", id));
};
```

위처럼 실험을 해 보았다. 버튼이 2개가 생기려면 배열 안에 객체형태로 넣어줘야 한다. 객체가 `text`만 가지고 있으니 당연하게도 아무런 일이 일어나지 않는다.

## 4-3. Alert Button Custom

- `text`: 보여줄 내용(text)
- `style`:
  - `cancel` == 취소 버튼(아무것도 안함)
  - `destructive` == 빨간 버튼(like 경고 메세지)
- `onPress`: 버튼이 클릭되면 실행 (콜백함수)

```js
// Delete API-------------------------------------------------
const setDelete = async (id) => {
  Alert.alert("해당 todo를 삭제합니다", "정말 삭제하시겠습니까?", [
    {
      text: "취소",
      style: "cancel",
      onPress: () => {
        console.log("취소");
      },
    },
    {
      text: "삭제",
      style: "destructive",
      onPress: () => {
        console.log("삭제");
      },
    },
  ]);
  // await deleteDoc(doc(db, "todos", id));
};
```

이런 형태로 custom이 잘 되었다!

<details>
<summary>실행 결과</summary>

```bash
LOG  삭제
LOG  취소
LOG  삭제
LOG  취소
```

</details>

이제 우리가 주석처리 해 두었던 `deleteDoc`을 가져와서 삭제 버튼이 `onPress`가 되면 실행될 함수로 넣어주면 된다! 또한 비동기처리도 내부에서 이루어지도록 `async`와 `await`을 가져오자.

```js
// Delete API-------------------------------------------------
const setDelete = (id) => {
  Alert.alert("해당 todo를 삭제합니다", "정말 삭제하시겠습니까?", [
    {
      text: "취소",
      style: "cancel",
      onPress: () => {
        console.log("취소");
      },
    },
    {
      text: "삭제",
      style: "destructive",
      onPress: async () => {
        await deleteDoc(doc(db, "todos", id));
      },
    },
  ]);
};
```

## 5. CRUD 최종 결과 화면

(원문에는 결과 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

이렇게 '투두리스트 앱'의 CRUD가 모두 완성되었다!

:::tip 최종 정리

1. 삭제 아이콘이 표시되는 태그 `<TouchableOpacity/>`에 `onPress` 로 실행 할 함수 추가
2. 해당 함수에서 `deleteDoc()` API 활용하여 삭제
3. UX를 고려했을 때 다시 한번 confirm
4. `Alert` 내부에 배열 형태의 객체가 들어가면 버튼영역 추가! `[ {버튼1}, {버튼2}, {버튼3}... ]`

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/86)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-03 */}
