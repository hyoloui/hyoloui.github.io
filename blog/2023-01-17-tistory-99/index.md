---
title: "타입스크립트 - 기본 타입"
description: "string, number, boolean, array, tuple, any, void, undefined, null, never 등 타입스크립트 기본 타입을 예제와 함께 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

Type Script 타입 총정리 및 복습

- String
- Number
- Boolean
- Object
- Array
- Tuple
- Enum
- Any
- Void
- Null
- Undefined
- Never

:::

<!--truncate-->

## 1. String (문자형)

JS와 마찬가지로 **텍스트 데이터 타입**을 `string`으로 표현한다.

작은따옴표(`''`)나 큰따옴표(`""`)로 문자열 데이터를 감싸는데 사용한다

```ts
// string

let str: string = "Typescript";
// str = 1; // Error
// str = true; // Error
// str = undefined; // Error

let fullname: string = "ABC";
let age: number = 14;
let sentence: string = `my name is ${fullname}, ${age} years old!`;
console.log(sentence); // my name is ABC, 14 years old!
```

## 2. Number (숫자형)

JS와 마찬가지로 10진수, 16진수 표현 지원, ECMAScript 2015에서 2진수, 8진수 표현을 TS도 지원한다.

```ts
// Number

let decimal: number = 6; // 10진수
console.log(decimal); // 6

let hex: number = 0x0020; // 16진수 (0x + number)
console.log(hex); // 32

let binary: number = 0b0010; // 2진수 (0b + number)
console.log(binary); // 2

let octal: number = 0o0020; // 8진수 (0o + number)
console.log(octal); // 16
```

## 3. Boolean

boolean 값이고 **참/거짓** (`true`/`false`)

```ts
// Boolean

let istrue: boolean = true;
let isfalse: boolean = false;

//let error1: boolean = 1; // Error
//let error2: boolean = "error"; // Error
```

## 4. Array (배열)

JS와 다르게, TS에서는 어떤 변수가 **배열임을 명시적으로 선언**할 수 있다

`: type[ ]`

```ts
// Array (배열)

let arr: number[] = [1, 2, 3];
// arr = 1 // Error

let str1: string[] = ["a", "b", "c"];
// str1 = "a"; // Error
// str1 = [1, 2, 3]; // Error

let bool: boolean[] = [true, false];
// bool = 12; // Error
// bool = [1, 2]; // Error

let arr2: Array<number> = [1, 2, 3]; // <>: 제네릭
```

## 5. Tuple

요소의 **타입과, 개수, 고정된 배열을 표현**할 수 있다.

\* 단 모든 타입이 같을 필요는 없고, 개수에 제한은 없다.

```ts
// Tuple

let x: [string, number];
x = ["hi", 1];
// x = [1, "hi"]; // Error
// x[2] = "hello"; // Error
```

## 6. Any

JS가 가진 속성으로 동적 타입이 적용된다!

쉽게 말해 **어느 타입이든 가능**하다.

```ts
// Any: javascript의 기본 속성! (어느 타입이든 가능)

let str3: any = "hi";

str3 = 1;
str3 = true;
str3 = ["a", 2];

let num: any = 2;
let any_: any = [1, 2, 3];
console.log("👉👉  any_", any_); // [1, 2, 3]
```

지나가는 이야기로, 타입스크립트를 사용하더라도 애니스크립트가 되지 않게 열심히 하자ㅋㅅㅋ

## 7. Void

**함수(Function)** 에서 리턴(return) **값이 없을 경우**, 변환값의 타입

\* 변수의 타입으로는 사용하지 않고, 함수에서 참고용(명시적인 값)으로 사용한다

```ts
// Void

function c(): void {
  console.log("hello");
}

c(); // hello
```

## 8. Undefined & Null

나는 `undefined` 와 `null` 이 첫 자바스크립트 공부할 때 헷갈릴 때 이렇게 외웠다.

**undefined** == 아무도 찾을수 없는 것

**null** == 누군가 없다고 미리 말해준 것

```ts
// Undefined

let a: undefined = undefined;
console.log("👉👉  a", a); // 👉👉  a undefined

// Null

let b: null = null;
console.log("👉👉  b", b); // 👉👉  b null
```

+ 추가 `|` ( or )

```ts
// or(|)를 사용해 2개 이상의 타입을 가질 수 있음
let uniontype: number | null | string = "three type!!";
console.log("👉👉  uniontype", typeof uniontype); //👉👉  uniontype string
```

## 9. Never

**함수**(function)가 **비정상적으로 종료**되거나, 끝까지 **실행되지 않았을 때**를 의미하는 타입 (거의 활용하지 않음)

```ts
// Never

function nev(): never {
  while (true) {}
}
console.log("👉👉 nev", nev); //👉👉 nev [Function: nev]

function nev2(): never {
  throw new Error("error");
}
console.log("👉👉 nev2", typeof nev2); //👉👉 nev2 function
```

:::tip 최종 정리

1. 포괄적으로 TS안에 JS가 있으므로, js는 안보이지만 any 타입 이였다!
2. 배열은 명시적으로 타입 뒤에 `[ ]` 를 추가해 줄 수 있다.
3. or연산자 `|`로 타입을 여러개로 작성할 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/99)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-17 */}
