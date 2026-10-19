---
title: "순수 함수 ( + 불변성, 사이드 이펙트)"
description: "순수 함수의 정의와 특징인 불변성, 사이드 이펙트 부재를 예제 코드로 설명한 글."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

> 순수 함수를 설명하고, 불변성과 사이드 이펙트를 부가적으로 설명합니다.

<!--truncate-->

## 순수 함수

### 순수 함수란?

:::note

자바스크립트에서 **순수 함수(Pure Function)** 는 입력값에 대해 항상 동일한 결과값을 반환하고, 함수 내부에서 외부에 영향을 주는 부작용(Side Effect)이 없는 함수를 말합니다. 즉, 함수의 실행에 어떤 외부 환경도 영향을 주지 않으며, 실행 결과도 항상 일정합니다.

:::

순수 함수의 특징은 **불변성(Immutability)과 사이드 이펙트 부재(Side Effect-Free)** 가 있습니다.

### 불변성 (immutability)

순수 함수는 입력이나 함수 내부의 상태를 변경하지 않습니다. 함수가 실행되는 동안에는 함수 내부의 값들이 변하지 않고, 입력으로 받은 값들에도 아무런 변화가 없습니다. 이로 인해 예측 가능하고 안정적인 동작을 보장할 수 있습니다.

```js
// 1. 객체 생성
const me = {
  name: 'Lee',
  age: 27,
};

// 2. 객체 프로퍼티 변경
me.age = 32;

// 3. 새로운 객체 생성
const newPerson = {
  ...me,
  age: 31,
};
```

1. 객체를 생성했습니다. 객체 타입은 참조 타입입니다.
2. 객체 프로퍼티의 주소값에 접근하여 직접 값을 변경했습니다. 이렇게 직접 변경하는 것은 **불변성을 위반**하며, 예측할 수 없는 결과를 초래할 수 있습니다. 따라서 불변성을 유지하기 위해 새로운 객체 생성 후 필요한 부분만 수정하는 것이 좋습니다.
3. 이렇게 하면 `me` 객체의 불변성을 유지하면서, 새로운 객체를 생성하고 필요한 값을 변경할 수 있습니다. 이렇게 하면 함수형 프로그래밍에서 **순수 함수를 작성할 때 예측 가능한 동작과 코드의 안정성을 보장**할 수 있습니다.

### 사이드 이펙트

Side Effect의 대표적인 예시로는 아래와 같은 것들이 있습니다.

- 인자를 직접 수정하는 것
- DOM을 직접 조작하는 것
- Logging (예: `console.log`)
- 비동기 처리

```js
function findUser(users, item) {
  const reversedUsers = users.reverse(); // 원본 데이터 users도 reverse 됨.
  const found = reversedUsers.find((user) => {
    return user === item;
  });

  document.getElementById('user-found').innerText = found; // DOM 조작
}
```

위 함수는 순수 함수가 아닙니다.

1. 인자를 직접 변경하고 있습니다. (만약 함수 내에서 해당 인자를 다시 사용하는 로직을 추가한다면 영향을 받을 것입니다.)
2. DOM을 조작하고 있습니다. (외부 상태를 변경하고 있습니다.)

함수를 호출하는 입장에서 이 함수가 데이터 혹은 DOM을 조작하는지 전혀 알 방법이 없습니다. 순수 함수에 비해 함수의 작동을 예측하기 훨씬 어렵습니다.

```js
function findUser(users, item) {
  // 인자로 받은 배열의 사본을 만들고 거꾸로 순서 변환
  const reversedUsers = [...users].reverse();

  // 순서가 거꾸로 된 데이터에서 요소 찾기
  const found = reversedUsers.find((user) => {
    return user === item;
  });

  // 결과를 반환
  return found;
}
```

인자를 직접 변경하지 않고, 인자를 다루는 로직이 추가되어도 영향을 받지 않게 되었습니다. 또한 외부 상태를 변경하지 않고 예측 가능한 결과를 반환하게 되었습니다.

참조: [What are Pure Functions and Side Effects in JavaScript?](https://blog.greenroots.info/what-are-pure-functions-and-side-effects-in-javascript)

:::tip 최종 정리

1. 순수 함수는 외부 상태를 변경하지 않으면서 동일 인자를 넘겨받았을 때 동일한 결과를 반환한다.
2. 순수 함수는 불변성을 유지한다.
3. 순수 함수는 사이드 이펙트(Side Effect)가 없다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/165)에서 옮겨 온 글입니다. 원문 작성일: 2023-04-05 */}
