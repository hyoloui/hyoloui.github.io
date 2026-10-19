---
title: "타입스크립트 - Generic (제네릭)"
description: "타입을 함수의 파라미터처럼 전달하는 제네릭의 개념과 활용, 타입 변수, extends를 이용한 제약 조건을 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

TS Generic (제네릭), 정리 및 복습

:::

<!--truncate-->

## 1. 제네릭 이란?

제네릭은 **타입**을 마치 **함수의 파라미터처럼** 사용 하는 것이다

말로만 하면 감이 잘 안오고 이해가 안된다.

하지만 파라미터의 생김새와 대조해서 머릿속에 떠올려야 이해가 잘 된다

```ts
// Generic

function generic<T>(any: T): T {
  return any;
}
generic<number>(1); // 1
generic<string>("1"); // "1"
generic<boolean>(true); // true
```

`function 함수명<T>` 여기 `<T>`를 따라서 타입이 전달되고, 파라미터와 함수타입 `: T` 에 전달된다!

## 2. 제네릭 활용

1. `getItemArray` 는 배열(파라미터)에서, index(파라미터)번째에 있는 것을 찾는 함수
2. `pushItemArray` 는 배열(파라미터)에 item(파라미터)로 들어온 값을 추가(push)해주는 함수

```ts
function getItemArray<T>(arr: T[], index: number): T {
  return arr[index];
}
function pushItemArray<T>(arr: T[], item: T): void {
  arr.push(item);
}

const nums = [1, 2, 3, 4];

const techStack = ["js", "react", "redux"];

getItemArray(nums, 3); // 4
pushItemArray(nums, 5); // [1,2,3,4,5]

getItemArray(techStack, 2); // "redux"
pushItemArray(techStack, "RTK"); // ["js", "react", "redux", "RTK"]
```

## 3. 제네릭 타입 변수

2가지 예제를 보며 생각해보자

```ts
// 제네릭 타입 변수

function printout<T>(input: T): T[] {
  console.log(input.length); // Error 파라미터로 들어오는 타입이 array가 아니기 때문에 .length가 활용이 안된다
  return input;
}
```

```ts
function printout<T>(input: T[]): T[] {
  console.log(input.length);
  return input;
}
printout<number>([1, 2, 3, 4]); // 4
```

에러 없이 정상 작동한다!

## 4. 제네릭 제약 조건

```ts
// 제네릭 제약 조건
interface LengthWise {
  length: number;
}
function printOutt<T extends LengthWise>(input: T): T {
  console.log(input.length);
  return input;
}

// printOutt(19); // Error, 숫자 타입에는 `length`가 존재하지 않으므로 오류 발생
const test = printOutt({ length: 4, value: "hi" }); // `input.length` 코드는 객체의 속성 접근과 같이 동작하므로 오류 없음
console.log("👉👉  test", test);

// 4
// 👉👉  test { length: 4, value: 'hi' }
```

:::tip 최종 정리

1. 제네릭을 사용하면 함수의 파라미터 처럼 사용이 가능하다!
2. `<T>`로 전달받아 `T` 에서 활용 가능하다.
3. 제네릭 타입 변수로 `T[ ]` 로 만들면 배열타입이 된다.
4. 제약조건으로 `extends`를 활용해 파라미터 타입을 추가할 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/106)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-19 */}
