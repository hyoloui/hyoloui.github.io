---
title: "타입스크립트 - Function (함수) 타입"
description: "타입스크립트에서 함수와 파라미터에 타입을 지정하는 방법과 void, 옵셔널 파라미터, 기본값, Rest 파라미터를 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

Type Script 함수 타입 정리 및 복습

:::

<!--truncate-->

## 1. JS와 비교

JS

```js
// js

function add(n1, n2) {
  return n1 + n2;
}
```

TS

```ts
function add(num1: number, num2: number): number {
  return num1 + num2;
}

console.log("👉👉  add", typeof add(3, 4)); //👉👉  add number
```

🧪 **나의 실험실**

```ts
// 실험

const one1 = add(1, 2);
const two = add(1, "2"); // Error
const three = add(1, 2, 3); // Error
const four = add(1); // Error

// 파라미터에서 return되는 타입이 바뀌는건 불가능
function add_error(num1: number, num2: number): string {
  return num1 + num2;
}

// 타입 선언되지 않은 함수에서는 js와 동일하게 string으로 반환시킨다
const addArrow = (num1: number, num2: string) => {
  return num1 + num2;
};
console.log("👉👉  addArrow", addArrow(3, "4")); //👉👉  addArrow 34
```

## 2. 반환값이 없는 타입 : void

우리가 평소 함수에 **return 없이 어떠한 실행만을 한 경우**가 있을 것이다.

그 때 return이 없어도 되므로 **void를 명시**해 쉽게 알수 있다.

```ts
// 반환값이 없는 타입 : void
function printResult(num: number): void {
  console.log("Result" + num);
}
printResult(5); // Result5
```

## 3. Optional Parameter

파라미터의 **변수명 뒤에 `?`** 를 추가해 주면 (`type: 지정타입 | undefined`)가 들어간다.

```ts
// Optional Parameter

function add2(num1: number, num2?: number): number {
  if (!num2) {
    return num1;
  }
  return num1 + num2;
}

const one = add2(1, 2);
console.log("👉👉  one", one); // 👉👉  one 3

const two = add2(10, 20, 30); // Error
console.log("👉👉  two", two); // Error

const three = add2(10);
console.log("👉👉  three", three); // 👉👉  three 10
```

## 4. Default Parameter ( 파라미터 기본값 )

JS의 특성이라고 할 수 있다. TS에만 있는 기능은 아니다

`: type = default value`

```ts
// Default Parameter

function add3(num1: number, num2: number = 0) {
  return num1 + num2;
}
const a3 = add3(10 + 2);
console.log("👉👉  a3", a3); // 👉👉  a3 12

const b3 = add3(10);
console.log("👉👉  b3", b3); // 👉👉  b3 10
```

위처럼 **인자가 1개만 전달이 되어도** 기본값이 있기 때문에 **에러가 발생하지 않는다.**

## 5. Rest Parameter ( ...params )

JS의 특성이라고 할 수 있다. TS에만 있는 기능은 아니다

파라미터가 수 없이 많다면 상당히 번거롭고 곤란할 것이다.

하지만 es6에서 지원하는 rest parameter로 쉽게 **파라미터를 전부 나열**해 주는 기능을 이용 할 수 있다.

```ts
// Rest Parameter

function add4(num1: number, ...nums: number[]) {
  let totalOfNums = 0;
  for (let key in nums) {
    totalOfNums += nums[key];
  }
  return num1 + totalOfNums;
}

const a4 = add4(10, 20, 30, 40);
console.log("👉👉  a4", a4); // 👉👉  a4 100
```

:::tip 최종 정리

1. **함수, 파라미터 각 type을 지정**해 줄 수 있다.
2. **함수의 타입은** 생략이 가능하고, 추론이 비교적 쉽기 때문에 **주로 생략**한다.
3. return 값이 없을 경우 : **void**
4. 파라미터가 들어오지 않는 경우 파라미터 변수명 뒤에 `?`로 **옵셔널** 지정 가능!
5. 파라미터에 **기본값 설정** 가능 ( `param: number = 3` )
6. 파라미터 마지막에 (`...` 문법) **Rest Parameters 사용해서 파라미터 생략** 가능

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/100)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-17 */}
