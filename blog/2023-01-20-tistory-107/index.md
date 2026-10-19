---
title: "타입스크립트 - 타입 추론(Type Inference)"
description: "타입스크립트가 변수와 함수의 타입을 스스로 추론하는 방식과, 필요한 경우에만 타입을 정의하면 되는 이유를 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

TS 타입 추론(Type Inference), 정리 및 복습

:::

<!--truncate-->

## 1. 타입추론 이란?

정적타입 언어를 사용할 때 **단점은** 타입을 정의하는데 시간과 노력이 많이 필요해서 **생산성이 저하**될 수 있다.

TS의 경우 다양한 경우에 대해 **타입추론을 제공**하기 때문에 **꼭 필요한 경우에만 타입을 정의할 수 있다**.

```ts
// Type Inference

let abc = "abc"; // string
let number = 2; // number

// abc = 123; // Error
// number = "abcd"; // Error

const n1 = 123; // number
const n2 = "123"; // string

const array2 = [1, 2, 3]; // Array
const [x1, x2, x3] = array2; // Array
// array2.push('a'); // Error

const obj = { numId: 1, stringId: "1" };
const { numId, stringId } = obj;
console.log("👉👉  obj", numId === stringId); // Error
```

## 2. 함수의 타입추론

함수에서는 파라미터와, 함수의 타입도 추론이 가능하다

```ts
// 함수의 타입 추론
const func1 = (a = 1, b = "b") => {
  return `${a}, ${b}`;
};
// const test_ = func1(3, 5); // Error 타입추론으로 파라미터 b의 타입은 string 이기 때문.
// const test_2: number = func1(3, 5); // Error 타입추론으로 string을 return하기 때문.

//    vv 여기서 return 값이 number | string 을 추론 하고있음.
const func2 = (value: number) => {
  if (value < 10) {
    return value;
  } else {
    return `${value} is big`;
  }
};

const teste1 = func2(9);
console.log("👉👉  teste1", teste1);

const teste2 = func2(11);
// const teste2 = func2("11"); // Error 파라미터에서 받는 값이 number이기 때문에 에러 발생
```

다만 함수에 **default를 지정했을 경우**, 타입이 지정된 것으로 간주해 다른 타입의 데이터가 들어오면 **에러를 발생**시킨다.

:::tip 최종 정리

1. 타입추론은 타입스크립트가 코드를 해석해나가는 동작을 의미
2. 타입을 정의하는데 시간과 노력이 많이 필요해서 **생산성이 저하**
3. **다양한 경우에 대해 타입추론을 제공**하기 때문에 필요한 경우에만 타입을 정의할 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/107)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-20 */}
