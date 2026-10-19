---
title: "리액트 네이티브 - CRUD: Read API (useEffect와 onSnapshot 활용하기)"
description: "Firestore의 onSnapshot API를 useEffect 안에서 사용해 todos를 실시간으로 읽어오고, map으로 화면에 그린 뒤 카테고리별로 분류하는 방법."
authors: [hyoloui]
tags: [react-native]
---

:::note TIL : Today I Learned

**목적**: CRUD : Read API 추가, onSnapshot API 활용하기

:::

<!--truncate-->

## 1. Firestore 의 DB 가져오기

저번 포스팅에서 Create API를 만들어 Firestore에 "todos" 라는 db를 넣을 수 있었다. 이번에는 가져와서 보여줘야 한다! firebase API 활용하자!

선택지는 2가지다.

- `getDocs` API
- `onSnapshot` API

`getDocs`로도 가져올 수 있겠지만 우리는 실시간으로 변동이 생기면 다시 데이터를 가져와야 하므로 state 처럼 사용해야 한다. 그래서 `onSnapshot` API 를 활용했다!

```js
// Read API-------------------------------------------------
useEffect(() => {
  const q = query(collection(db, "todos"), orderBy("createAt", "desc"));
  onSnapshot(q, (snapshot) => {
    const newTodos = snapshot.docs.map((doc) => {
      const newTodo = {
        id: doc.id,
        ...doc.data(),
      };
      return newTodo;
    });
    setTodos(newTodos);
  });
}, []);
```

1. `import { onSnapshot }` 으로 api를 가져온다
2. `useEffect`를 사용하여 컴포넌트가 마운트시 곧장 Read API 를 사용할 수 있도록 만들어준다
3. `onSnapshot`은 query를 가져와야 한다!
4. 변수에 쿼리를 넣어주고, snapshot 파라미터로 새로운 todos 안에서 `map`으로 하나씩 돌며 얕은 복사를 하고, todo를 리턴한다
5. 넣어준 `newTodos`를 setState하여 우리가 사용할 state값으로 전달해 준다!

## 2. 가져온 todos 확인하기

<details>
<summary>실행 결과</summary>

```bash
LOG  [{"category": "javascript", "createAt": 1672647910077, "id": 1672647910077, "isDone": false, "isEdit": false, "text": "1h"}, {"category": "javascript", "createAt": 1672647885258, "id": 1672647885258, "isDone": false, "isEdit": false, "text": "1"}, {"category": "javascript", "createAt": 1672646622844, "id": 1672646622844, "isDone": false, "isEdit": false, "text": "ㄱ"}, {"category": "coding-test", "createAt": 1672643131844, "id": "05MaGXAinLrqRvFKJ33S", "isDone": true, "onEdit": false, "text": "코테?"}, {"category": "React", "createAt": 1672643098882, "id": "VUmOMhPQ9U4GK2hjmB1Z", "isDone": false, "onEdit": false, "text": "ㅋㅋㅋ"}, {"category": "javascript", "createAt": 1672641978070, "id": "aGOBTweIuSDmfN3GcjCb", "isDone": true, "onEdit": false, "text": "Hellooo"}, {"category": "javascript", "createAt": 1672641966737, "id": "EPPTSNiK3HknxsFmfJdE", "isDone": false, "text": "Hi"}]
```

</details>

정확하게 잘 가져와주었다! 이제 이 데이터를 활용해서 todo를 하나씩 화면에 그려주자!

## 3. UI로 데이터 하나씩 보여주기

```jsx
{/* 스크롤 영역 */}
<ScrollView style={styles.scroll_area}>
  {todos.map((todo) => {
    return (
      /* 한개의 투두 */
      <View key={todo.id} style={styles.once_todo}>
        {/* 텍스트 */}
        <Text style={{ fontSize: 18, width: "60%" }}>
          {todo.text}
        </Text>
        {/* 아이콘 영역 */}
        <View style={styles.once_icon_area}>
          {/* 체크 아이콘 (isDone) */}
          <TouchableOpacity style={styles.once_icon}>
            <AntDesign name="checksquareo" size={30} color="black" />
          </TouchableOpacity>
          {/* 수정 아이콘 (isEdit) */}
          <TouchableOpacity style={styles.once_icon}>
            <Entypo name="new-message" size={30} color="black" />
          </TouchableOpacity>
          {/* 삭제 아이콘 (delete) */}
          <TouchableOpacity style={styles.once_icon}>
            <FontAwesome name="trash-o" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    );
  })}
</ScrollView>
```

우리가 위에서 `onSnapshot`으로 가져온 데이터를 `todos`라는 스테이트에 넣어줬으니 `todos`를 활용해서 보여줄 차례다. `todos`를 만들 때 처음 배열로 지정해 놓았으니 `map` 메서드를 사용해 하나씩 돌면서 반환할 수 있다.

+ 참고로 `map`은 no mutation 이므로 우리가 직접 수정을 하거나 데이터를 변경하려고 해도 변화하지 않는 게 기본 속성이다.

[Does it mutate?](https://doesitmutate.xyz/)

## 4. 결과 화면

(원문에는 결과 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

## 5. 카테고리 별 분류

```jsx
{/* 스크롤 영역 */}
<ScrollView style={styles.scroll_area}>
  {todos.map((todo) => {
    if (category === todo.category) {
      return (
        /* 한개의 투두 */
        <View key={todo.id} style={styles.once_todo}>
          {/* 텍스트 */}
          <Text
            style={{ fontSize: 18, width: "60%" }}
          >
            {todo.text}
          </Text>
          {/* 아이콘 영역 */}
          <View style={styles.once_icon_area}>
            {/* 체크 아이콘 (isDone) */}
            <TouchableOpacity
              style={styles.once_icon}
            >
              <AntDesign
                name="checksquareo"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            {/* 수정 아이콘 (isEdit) */}
            <TouchableOpacity
              style={styles.once_icon}
            >
              <Entypo
                name="new-message"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            {/* 삭제 아이콘 (delete) */}
            <TouchableOpacity
              style={styles.once_icon}
            >
              <FontAwesome
                name="trash-o"
                size={30}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  })}
</ScrollView>
```

위 부분에서 추가된 부분은 4번째 줄의 `if` 문이다!

로직은

- 버튼 클릭시 `category` state 변경! (현재 카테고리)
- 현재 카테고리 === todos가 가지고 있는 카테고리 변경
- 왜냐 `newTodos`를 넘겨 줄 때도 state인 `category` 값을 가지고 있기 때문에

:::tip 최종 정리

1. `onSnapshot`은 변동사항을 실시간 반영할 수 있는 firebase API 이며, 쿼리를 가져와야 한다
2. 컴포넌트가 마운트 됨과 동시에 반영 될 수 있도록 `useEffect`를 활용하여 안에서 `onSnapshot` API로 작업했다
3. 가져온 데이터를 확인하고 배열메서드인 `map`을 활용해 하나씩 돌면서 ui를 그려줬다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/84)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-02 */}
