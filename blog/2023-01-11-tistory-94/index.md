---
title: "Project : MZL - 로그아웃, 마이페이지 이동 시 에러해결"
description: "닉네임 수정과 로그아웃을 구현하고, 로그아웃 후 마이페이지 진입 시 currentUser가 null이라 나던 에러를 useFocusEffect와 return으로 해결한 과정."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

마이페이지에 구현한 로직과 authentication API 복습

:::

:::warning 🤢 오류 해결

- 로그아웃 후 마이페이지, 게시글쓰기 component 이동 시 에러 (`useEffect` 와 `useFocusEffect` 에서 발생한 에러 해결)

:::

<!--truncate-->

---

## 1. 닉네임 수정

```jsx
<UserProfile>
  {onEdit ? (
    <UserNicknameInput
      value={editText}
      onChangeText={setEditText}
    ></UserNicknameInput>
  ) : (
    <UserNickname>{displayName}</UserNickname>
  )}
  {onEdit ? (
    <UserSuccessBtn onPress={() => onSubmitEdit()}>
      <UerEditBtnText>완료</UerEditBtnText>
    </UserSuccessBtn>
  ) : (
    <UserEditBtn onPress={() => onPressUpdate()}>
      <UerEditBtnText>수정</UerEditBtnText>
    </UserEditBtn>
  )}
</UserProfile>
```

```js
const onPressUpdate = () => {
  /* 수정 버튼 */
  setEdit(!onEdit);
};

const onSubmitEdit = async () => {
  /* (수정)완료 버튼 */
  await updateProfile(auth.currentUser, {
    displayName: editText,
  });
  setEdit(!onEdit);
};
```

UI 부분에서 삼항연산자로 수정 버튼이 onPress되어 **`onPressUpdate()`** 함수가 실행이 되면 `setState`가 되어 `onEdit`이라는 state는 불리언타입이며 **토글(true or false)이 된다**!

이후 **`onEdit`의 상태에 따라** false가 된다면 기존에 있는 닉네임을 감싼 태그가 **TextInput**으로 바뀌게 되고 수정버튼도 **완료버튼**으로 바뀌게 된다!

완료버튼이 가진 함수는 **`onSubmitEdit()`** 으로 `updateProfile` API를 실행해 로그인되어있는 **유저의 `displayName`** 을 TextInput에서 받아온 state인 **`editText`로 변경**한다!

```js
const displayName = auth.currentUser?.displayName;
const uid = auth.currentUser?.uid;

const [words, setWords] = useState([]);
const [onEdit, setEdit] = useState(false);
const [editText, setEditText] = useState(displayName);
```

TextInput에서는 value로 **기존값을 유지**하기 위해 state에는 `displayName`이라는 변수를 가르키고 있다

해당 과정에서 **CRUD 의 update부분** 과 크게 다른점이 없어 많이 경험했던 터라, 빠르게 구현할 수 있었다.

---

## 2. 로그아웃

```js
const onPressLogout = () => {
  /* 로그아웃 버튼 */
  auth.signOut();
  // Home 화면으로 이동
  reset({
    index: 0,
    routes: [{ name: 'Tabs', params: { screen: 'Home' } }],
  });
};
```

위에 닉네임 수정의 로직에 비해 로그아웃은 firebase API가 아주 깔끔하게 구성되어 간단하게 구현 할 수 있었다

**`auth`** 라는 변수는 firebase 에서 **`getAuth`함수가 실행되며 export >> import** 하여 가져왔고, **`signOut()`** API 를 호출하면 바로 **로그아웃 상태**로 전환된다

이후 `reset()`함수로 **Tabs의 Home으로 이동**시켜준다

위 과정에서 다시한번 `reset`에 대해 이해할 수 있었다.

---

## 3. 로그아웃 상태에서 마이페이지 접근

```js
if (!auth.currentUser) {
  reset({
    index: 1,
    routes: [
      { name: 'Tabs', params: { screen: 'Home' } },
      { name: 'Stacks', params: { screen: 'Login' } },
    ],
  });
  return;
}
```

위 조건문은 **논리 부정연산자**를 사용한다. 아래 참조 링크를 보면 자세히 공부할 수 있다. auth의 `currentUser`(로그인상태 유저의 정보)가 **false일 경우**, **반대로 true**를 반환하여 **해당 조건문이 실행**되며

`reset`으로 **login screen을 유도**했다

해당 코드로 논리부정연산자를 다시 공부했고, **`return`으로 종료**시켜주지 않은 문제를 통해 에러를 만나 아래 오류 해결에 작성했다

---

## 4. useFocusEffect useCallback

우리가 공부한 React와는 다르게 RN에서는 마운트와 언마운트의 개념이 아니라 새롭게 랜더링이 일어나지 않는다

쉽게 말해 `useEffect`는

- react == 가상돔 마운트, 언마운트
- react-native == 스크린(컴포넌트) 렌더링

그래서 결론은 RN에서는 `useEffect`를 사용하면 1회성으로 한번만 실행하게 되므로 **`useFocusEffect` 를 사용**해야한다

**`useFocusEffect` == 스크린이 포커스(화면에 있거나 없거나)를 감지!**

```js
useFocusEffect(
  useCallback(() => {
    if (!auth.currentUser) {
      reset({
        index: 1,
        routes: [
          { name: 'Tabs', params: { screen: 'Home' } },
          { name: 'Stacks', params: { screen: 'Login' } },
        ],
      });
      return;
    }
    const q = query(
      collection(dbService, 'Words'),
      orderBy('createdAt', 'desc'),
      where('userid', '==', uid),
    );
    const myPosts = onSnapshot(q, (post) => {
      const myPost = post.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('🚀 ~ file: My.js:49 ~ myPost ~ myPost', myPost);
      setWords(myPost);
    });
    return () => {
      myPosts();
    }; // onSnapshot이 언마운트 되면서 없어진다
  }, []),
);
```

위에서 설명한 조건문에 따라 Mypage가 렌더링이되면 우선 조건문으로 **로그아웃 상태부터 감지**한다!

만약 조건에 걸리지 않는다면 바로 쿼리에 유저와, firebase의 DB인 firestore의 `Words`라는 컬렉션에 접근해 `where` API를 통해 유저의 아이디와, 데이터에 있는 **아이디를 대조하여, 같은 데이터만 가져오게** 되어

마이페이지에서 내가 작성한 글 보기가 가능하게 만들었다!

또 **`return` 으로 `myPosts()`** 를 실행한 이유는 `onSnapshot` 함수가 백그라운드에서 계속 쿼리의 변동을 바라보고 있는 함수이기 때문에 실시간으로 데이터를 가져울 수 있는데,

Mypage에서 다른 screen으로 이동 했을 때 **`onSnapshot`이 계속 백그라운드에 남아있다**면, 메모리나 웹 성능이 저하되므로 **`return` 을 사용해 `onSnapshot`을 종료**시켜 주었다

위 과정에서 **로그아웃 상태를 감지하는 조건문**을 사용해 보았고, `where`함수로 **데이터에 조건을 달아** filter와 같은 방식으로 **데이터를 뽑아 올 수 있었다**. 또 **`useFocusEffect`와 `useCallback`** 사용 경험을 쌓았다.

---

## + 오류 해결

before - 해결 전

RN firebase authentication **`signOut()` 함수 실행 후 마이페이지, 포스트 페이지에 접근 시 에러**가 발생했다.

에러 내용은

```bash
Render Error
null is not an object (evaluating
'_firebase.auth.currentUser.displayName')
```

### + 오류 해결

```diff
 useFocusEffect(
   useCallback(() => {
     if (!auth.currentUser) {
       reset({
         index: 1,
         routes: [
           { name: 'Tabs', params: { screen: 'Home' } },
           { name: 'Stacks', params: { screen: 'Login' } },
         ],
       });
+      return;
     }
-    console.log(uid);
     const q = query(
       collection(dbService, 'Words'),
       orderBy('createdAt', 'desc'),
-      where('userid', '==', uid ?? ''),
+      where('userid', '==', uid),
     );
     const myPosts = onSnapshot(q, (post) => {
       const myPost = post.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
       }));
+      console.log('🚀 ~ file: My.js:49 ~ myPost ~ myPost', myPost);
       setWords(myPost);
     });
-    return myPosts;
-  }, [uid]),
+    return () => {
+      myPosts();
+    }; // onSnapshot이 언마운트 되면서 없어진다
+  }, []),
 );
```

로직의 순서를 잘 따라가 보겠다

1. 로그아웃 실행
2. 홈 화면으로 이동
3. 마이페이지 클릭
4. `useEffectFocus` 구문 실행
5. 자바스크립트 엔진이 우선 코드를 읽고 나서 렌더링을 하기 때문에 코드를 읽는 과정에서 **`currentUser`의 정보들이 없다**고 에러 발생

원인파악 하는데 까지 약 2-3시간 이상 소요된 것 같다.

`myPosts`가 가져오는 쿼리에서 먼저 선언해둔 변수인 `uid`(`currentUser.uid`)를 가지고 있어 에러가 발생했다.

해당내용에서 error를 해결하기 위해 **우선적으로 null병합 연산자 이용**하여 에러를 해결했었지만 **근본적 원인이 해결되지 않은 상태**였다.

그래서 우선 `if` 문으로 뒤에 있는 로직이 실행되지 않고 **바로 반환되게끔 `return`** 을 작성해 주었고, `useFocusEffect` 의 내부 **`return`을 사용해 `myPosts`를 넣어 스크린이 바뀐다면, 함수가 종료**되게끔 만들어 주었다!

---

:::tip 최종 정리

1. **회원 정보**를 만들고, 보여주고, 바꿔주고, 삭제하는 부분은 **CRUD와 api만 다를 뿐 로직은 거의 흡사**했다
2. **조건문**으로 다른 페이지를 보여주거나 어떠한 함수를 실행한 후 **return**을 해주어 코드를 종료해 주자
3. **논리부정연산자**로 true와 false 반환
4. RN에서는 `useEffect`가 1회성이므로 **`useFocusEffect`와 `useCallback`을 사용**하자
5. 에러를 간단하게 해결하려는 것 보다 **근본적인 원인을 찾아**야 한다!
6. `useFocusEffect` 내부에서 `return`으로 스크린이 포커스아웃이 될 때를 설정할 수 있다

:::

참조:

- [자바스크립트에서 유용할 수도 있는 연산자들 모음](https://medium.com/오늘의-프로그래밍/자바스크립트에서-유용할-수도-있는-연산자들-모음-3450083838fb)
- [[RN] useFocusEffect의 행동양식](https://velog.io/@chltjdrhd777/RN-useFocusEffect%EC%9D%98-%ED%96%89%EB%8F%99%EC%96%91%EC%8B%9D)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/94)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-11 */}
