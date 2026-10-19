---
title: "타입스크립트 - interface (인터페이스)"
description: "타입스크립트 interface의 기본 사용법과 type과의 차이, 선택 속성, readonly, index 타입, 함수 타입을 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

TS Interface (인터페이스), 정리 및 복습

:::

<!--truncate-->

## 1. 인터페이스란?

앞서 설명한 **타입 얼라이어스와 같이 객체의 형태**로 구성된다

하지만, 둘은 **차이점이 존재**하고 인터페이스는 타입 체크를 위해 변수, 함수, 클래스 등 좀더 **다양한 곳에 사용**할 수 있다.

```ts
// interface

// 기본 속성
interface Person {
  name: string;
  age: number;
}

const person_1: Person = {
  name: "tmdgy",
  age: 14,
};

// Error: interface에서 할당하지 않은 다른 타입을 사용시 에러발생
// const person2:Person = {
//   name: 12,
//   age: 'one'
// }
```

## 2. type vs interface

둘의 **차이점**을 알아보자

- 확장 방법

```ts
// interface 확장 방법 = extends

interface PeopleInterface {
  name: string;
  age: number;
}

interface StudentInterface extends PeopleInterface {
  school: string;
}
```

```ts
// type 확장 방법: newType = prevType & addType

type PeopleType = {
  name: string;
  age: number;
};

type StudentType = PeopleType & {
  school: string;
};
```

- 선언적 확장

```ts
interface teset {
  title: string;
}

interface teset {
  ts: number;
}

// 같은 interface 명으로 teset를 다시 만든다면, 자동으로 확장이 된다.

const text: teset = {
  title: "header",
  ts: 12,
};

console.log("👉👉  text", text); // 👉👉  text { title: 'header', ts: 12 }
```

- type 은 불가능 하다

```ts
type teset = { // Error: 'teset' 식별자가 중복되었습니다.
  title: string;
};

type teset = { // Error: 'teset' 식별자가 중복되었습니다.
  ts: number;
};

const text: teset = {
  title: "header",
  ts: 12, // Error: '{ title: string; ts: number; }' 형식은 'teset' 형식에 할당할 수 없습니다.
};
```

- **computed value**의 사용: type은 가능 , interface는 불가능 (생략)

## 3. '기본 속성'과 '선택 속성'

기본 속성은 할당하는 값을 그대로 넣어줘야 하지만 선택적으로 'Optional chaining' 을 통해 값을 선택적으로 할당할 수 있다.

즉, 넣어도 되고 안넣어도 되는 값을 만들어 줄 수 있다.

```ts
// 기본 속성

interface Person {
  name: string;
  age: number;
}

const person_1: Person = {
  name: "seung hyo",
  age: 14,
};
```

```ts
// 선택 속성

interface Person2 {
  name: string;
  age?: number; // optional chaining
}

const person_2: Person2 = {
  name: "seung hyo",
  // age가 있어도 되고, 없어도 됨
};
```

에러 없이 정상 작동한다!

## 4. Read Only (읽기 전용)

`readonly`를 작성하면 읽기 전용으로 지정해, 수정이 불가능하다

```ts
// Read Only
interface Person3 {
  readonly name: string;
  age?: number;
}

const person_3: Person3 = { name: "js" };
// person_3.name = "her"; // 읽기 전용 속성으로 Error

// ReadOnlyArray
let readOnlyArr: ReadonlyArray<number> = [1, 2, 3];
// readOnlyArr.push(4); // Error
// readOnlyArr[0] = 2; // Error

console.log("👉👉  readOnlyArray", readOnlyArr[0]); //👉👉  readOnlyArray 1
```

## 5. INDEX 타입

**추가 생성되는 객체**의 속성의 **타입을 지정**해 줄 수 있다.

```ts
// INDEX 타입

interface Person4 {
  readonly name: string;
  [key: string]: string | number; // INDEX type
}

const person_4: Person4 = { name: "js", age: 14, birthday: "비밀" };
console.log("👉👉  person_4", person_4); //👉👉  person_4 { name: 'js', age: 14, birthday: '비밀' }
```

## 6. 함수(function) 타입

함수의 **파라미터, return**의 **타입을 지정**해 줄 수 있다.

```ts
// 함수 타입

// interface
interface Person5 {
  (name: string, age: number): string;
}

// type
type Print = (name: string, age: number) => string;

const getName: Person5 = (name, age) => {
  return `name: ${name}, age: ${age}`;
};

const get1 = getName("seung hyo", 12);
console.log("👉👉  get1", get1); // 👉👉  get1 name: seung hyo, age: 12
```

:::tip 최종 정리

1. 타입에 비해, **인터페이스의 활용범위가 넓으며 실제 사용 빈도**가 더 많다
2. **성능을 위해서는 interface**가 좋으나, 프로젝트 전반에 논의가 필요해 보인다(type & interface)
3. TS의 interface에서도 **옵셔널 체이닝**이 가능해, 넣어도 되고 안넣어도 되는 값을 만들어 줄 수 있다
4. `readonly`를 작성하면 읽기 전용으로 **수정이 불가능한 타입**을 만들어 준다.
5. index타입을 활용해 **추가로 생성되는 객체 속성의 타입**을 지정해 줄 수 있다.
6. 함수 타입으로, **파라미터와 리턴의 타입**도 지정해 줄 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/104)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-18 */}
