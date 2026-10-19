---
title: "타입스크립트 - Union (유니온) 타입"
description: "or 연산자로 둘 이상의 타입을 허용하는 유니온 타입의 사용법과 타입별 분기 처리 방법을 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

Type Script Union 유니온|유니언 타입, 정리 및 복습

:::

<!--truncate-->

## 1. 유니온 타입이란?

타입을 "or 연산자"로 2개 이상 넣을 수 있게 해준다

```ts
// Union (A || B)

const printOut = (input: string | number) => {
  console.log(input);
};

printOut("hi"); // hi
printOut(22); // 22
```

🧪 **나의 실험실**

```ts
// Union (A || B)

const printOut = (input: string | number) => {
  return input;
};

const test_ = typeof printOut("hi"); // hi
console.log("👉👉  test_", test_); //👉👉  test_ string

const test__ = typeof printOut(22); // 22
console.log("👉👉  test__", test__); // 👉👉  test__ number
```

`typeof` 로 실제 타입이 맞는지 콘솔에 출력 해 보았다 ( **정상** )

## 2. 유니온 타입의 장점

하나의 파라미터가 **2가지 타입을 동시**에 소화할 수 있고, 다른 타입은 에러로 거를 수 있다.

```ts
const getAge = (age: number | string) => {
  if (typeof age === "number") {
    age.toFixed();
    return age;
  }
  if (typeof age === "string") {
    return age;
  }
};
console.log(getAge(12), typeof getAge(12)); // 12 number
console.log(getAge("12"), typeof getAge("12")); // 12 string
```

## 3. 타입별로 다른 동작 구현

파라미터에 들어오는 타입을 if문으로 선별하여, **각 다른 동작을 취할 수 있다.**

만약 number가 들어온다면 padding (space) 가 늘어나도록 하고, string이 들어온다면 value 앞으로 string(문자열)이 들어오게 하였다.

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, get ${padding}.`);
}

console.log(padLeft("Hello world", 4)); //    Hello world
console.log(padLeft("Hello world", "!!!")); // !!!Hello world
// console.log(padLeft("Hello world", true));// Error
```

:::tip 최종 정리

1. 유니온은 **타입을 2가지 이상 사용**할 수 있게 만들어 준다
2. **타입과 타입 사이에, or 연산자** `|` 를 사용하면 된다.
3. **타입을 선별하여 각기 다른 동작**을 하도록 만들어 줄 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/102)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-17 */}
