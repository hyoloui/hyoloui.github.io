---
title: "Project: 🚩codefolio - recoil, supabase Auth"
description: "supabase Auth의 로그아웃과 getSession으로 로그인 상태를 확인하고, recoil의 atom으로 전역 상태를 관리한 방법."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

Supabase Auth - 로그아웃, 로그인 상태(recoil)

:::

<!--truncate-->

---

## 1. recoil + supabase getSession()

```ts
import { atom } from "recoil";

const userLoginCheck = atom<boolean>({
  key: "userLoginCheck",
  default: false,
});

export default userLoginCheck;
```

전역 상태관리를 위해 프로젝트에서 recoil을 도입했다. 사용법은 다른 전역 상태관리 라이브러리에 비해 너무 간단하다.

`atom`을 import해준 후 `useState`처럼 사용하면 된다.

타입스크립트로 인해 default의 타입을 지정해주고, `atom`에 전달되는 object는 key와 value로 구성되며 key에 선언할 text와 default에는 기본값 즉, 이니셜 데이터가 들어가면 된다.

```ts
import { useSetRecoilState } from "recoil";
import { userLoginCheck } from "@/lib/recoil";

const setUserLogin = useSetRecoilState(userLoginCheck);

const onLogoutButtonClick = async () => {
  const res = await supabase.auth.signOut();
  setUserLogin(false);
  if (res.error) {
    console.log("로그아웃 에러", res.error);
    return;
    throw new Error(res.error.message);
  }
  router.push("/");
  return router.push("/");
};
```

위 코드에서는 첫번째로 recoil 메서드를 import해 주고 아까 만들어놓은 atom선언 함수도 import해 준다.

\+ `useState`와 다른점을 보자

`[state, setState] = useState();` 라고 선언했지만

전역에 있는 recoil을 사용할 때는 여러 메서드가 있다

:::tip

- 기본적으로 위에 설명한 `useState` 처럼 사용하고 싶다면 **`useRecoilState`** 를 사용하고,
- state (value) 에만 접근(불러오기) 하고싶을 때는 **`useRecoilValue`** 를 사용한다,
- SetState (setter) 함수로 state를 업데이트 하기 위해서는 **`useSetRecoilState`** 를 사용하면 된다.

:::

그래서 나는 로그아웃 후 로그아웃 상태를 업데이트하기 위해 `useSetRecoilState`를 사용했다. 이후 다른 컴포넌트에 사용해 보자

```tsx
import { userLoginCheck as recoilUserLoginCheck } from "@/lib/recoil";
import { useRecoilState } from "recoil";

const [userCheck, setUserCheck] = useRecoilState(recoilUserLoginCheck);

const getSessionUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  if (data.session) {
    setUserCheck(true);
  } else {
    setUserCheck(false);
  }
};

<ButtonWrapper
  onClick={() =>
    router.push(userCheck ? "/create-post" : "/auth/login")
  }
>
```

전과 동일하게 사용할 recoil인 `userLoginCheck` 함수를 import 해 오고 `useRecoilState`로 `useState`처럼 가져왔다.

`getSessionUser`라는 함수에서는 비동기로 supabase에 auth(인증) 을 접근하여 세션을 가져오고 있다.

만약 에러가 난다면 먼저 Error를 throw 해 주고, `data.session`이 있다면, recoil로 가져온 `setUserCheck`를 true로 변환, 아니라면 반대. 즉 유저가 있는지 없는지 true / false 로 분류 했다.

글쓰기 아이콘 버튼을 클릭했을 때 위 상태를 감지하고, `userCheck` 가 있으면 로그인상태이므로 글쓰기 페이지로, 아니라면 로그인 페이지로 이동 시켰다.

---

:::tip 최종 정리

1. 기본적으로 위에 설명한 `useState` 처럼 사용하고 싶다면 `useRecoilState`를 사용.
2. state (value) 에만 접근(불러오기) 하고싶을 때는 `useRecoilValue`를 사용.
3. SetState (setter) 함수로 state를 업데이트 하기 위해서는 `useSetRecoilState`를 사용.
4. `const { data, error } = await supabase.auth.getSession();` 으로 유저 세션에 접근 가능.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/126)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-16 */}
