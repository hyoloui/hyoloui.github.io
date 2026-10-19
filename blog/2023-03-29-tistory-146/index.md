---
title: "모던 Javascript - 스프레드 문법"
description: "ES6 스프레드 문법의 사용 대상과 규칙, 함수 인수 목록·배열 리터럴·객체 리터럴 내부에서의 활용법 정리."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

> 하나로 뭉쳐 있는 여러 값들을 개별적인 값들의 목록으로 만든다.

<!--truncate-->

## 스프레드 문법

### 스프레드 문법

- ES6에서 도입된 스프레드 문법(전개 문법) `...`은 하나로 뭉쳐 있는 **여러 값들**의 집합을 펼쳐서(전개, 분산하여, spread) **개별적인 값들의 목록**으로 만든다.

- 스프레드 문법을 사용할 수 있는 대상은 **Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments**와 같이 `for...of` 문으로 순회할 수 있는 이터러블에 한정된다.

```js
console.log(...[1, 2, 3]); // 1 2 3

// 문자열은 이터러블이다.
console.log(...'Hello'); // H e l l o

// Map 과 Set은 이터러블이다.
console.log(
  ...new Map([
    ['a', '1'],
    ['b', '2'],
  ]),
); // ['a', '1'] ['b', '2']
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });

// 스프레드 문법의 결과는 값이 아니다.
const list = ...[1, 2, 3]; // 문법 에러
```

이처럼 스프레드 문법의 결과물은 값으로 사용할 수 없고, 다음과 같이 쉼표로 구분한 값의 목록을 사용하는 문맥에서만 사용할 수 있다.

- 함수 호출문의 인수 목록
- 배열 리터럴의 요소 목록
- 객체 리터럴의 프로퍼티 목록

```js
function myFunction(...params) {
  return params;
}

const myArgs = [10, 'hello', true];

const result = myFunction(...myArgs);

console.log(result); // [10, "hello", true]

const person = {
  name: '승효',
  age: 27,
  city: 'seoul',
};

const employee = {
  ...person,
  isEmployed: true,
  position: 'Developer',
};

console.log(employee);
// {name: '승효', age: 27, city: 'seoul', isEmployed: true, position: 'Developer'}
```

### 함수 호출문의 인수 목록에서 사용하는 경우

스프레드 문법이 제공되기 이전에는 `Function.prototype.apply` 메서드를 사용했다.

```js
const arr = [1, 2, 3];

// apply 메서드
const applyMax = Math.max.apply(null, arr); // 3

// 전개 연산자
const spreadMax = Math.max(...arr); // 3
```

### 배열 리터럴 내부에서 사용하는 경우

**`.concat`**

```js
const concatEx = [1, 2].concat([3, 4]);
console.log(concatEx); // [1, 2, 3, 4];

// 위에서 사용한 concat 메서드를 대신하여 결합할 수 있다.

const spreadEx = [...[1, 2], ...[3, 4]];
console.log(spreadEx); // [1, 2, 3, 4];
```

**`.splice`**

```js
const array1 = [1, 4];
const array2 = [2, 3];

array1.splice(1, 0, array2);

console.log(array1); // [1, [2, 3], 4]
// 위에서 우리가 기대한 값은 [1, 2, 3, 4] 였다.
```

```js
const array3 = [1, 4];

Array.prototype.splice.apply(array3, [1, 0].concat(array2));
console.log(array3); // [1, 2, 3, 4]

// 간결하게 스프레드 문법을 사용해 보자
const array4 = [1, 4];
array4.splice(1, 0, ...array2);
console.log(array4); // [1, 2, 3, 4]
```

**배열 복사 (= 얕은 복사)**

```js
const origin = [1, 2];
const copy = origin.slice();

console.log(copy); // [1, 2];
console.log(copy === origin); // false

const origin2 = [1, 2];
const copy2 = [...origin2];

console.log(copy2); // [1, 2]
console.log(copy2 === origin2); // false
```

**이터러블을 배열로 변환**

```js
function sum1() {
  // 이터러블이면서 유사 배열 객체인 arguments를 배열로 반환
  return [...arguments].reduce((prev, cur) => prev + cur, 0);
}

console.log(sum1(1, 2, 3)); // 6

// 위보다 나은 방법인 Rest 파라미터를 사용하는 것이다.
const sum2 = (...args) => args.reduce((pre, cur) => pre + cur, 0);

console.log(sum2(1, 2, 3)); // 6
```

:::note

이터러블이 아닌 유사 배열 객체는 스프레드 문법의 대상이 될 수 없다. 때문에 `Array.from()` 메서드로 배열을 반환해야 한다.

:::

### 객체 리터럴 내부에서 사용하는 경우

스프레드 문법의 대상은 이터러블이어야 하지만, 스프레드 프로퍼티 제안은 일반 객체를 대상으로도 스프레드 문법의 사용을 허용한다.

```js
const basicObj = { x: 1, y: 2 };
const basicCopy = { ...basicObj };

console.log(basicCopy); // { x: 1, y: 2 }
console.log(basicObj === basicCopy); // false

// 객체 병합
const merged = { ...basicObj, ...{ a: 3, b: 4 } };
console.log(merged); // { x: 1, y: 2, a: 3, b: 4 };

// 특정 프로퍼티 변경
const changed = { ...basicObj, y: 100 };
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = { ...changed, z: 0 };
console.log(added); // { x: 1, y: 100, z: 0 }
```

:::tip 최종 정리

1. **여러 값들**의 집합을 펼쳐 **개별적인 값들의 목록**으로 만든다.
2. 사용 대상: Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), arguments + 일반 객체.
3. 사용 용도: 함수의 인수 목록(**파라미터 정의**)에도 사용되며 **배열**과 **객체** 리터럴 **내부에서도 사용**된다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/146)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-29 */}
