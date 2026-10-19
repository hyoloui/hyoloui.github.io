---
title: "JS indexOf findIndex 차이 (find)"
description: "배열 메서드 indexOf, findIndex, find의 차이와 각각을 사용하는 경우를 예제로 정리한 글."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

:::note

알고리즘 문제를 풀며 제가 문제를 푼 방식은 `findIndex`였지만, 다른 문제 풀이 방식에서 `indexOf`로 푼 해답을 보고 차이점이 궁금해서 공부하며 TIL을 작성합니다.

배열 메서드인 `indexOf`와 고차 함수인 `findIndex`의 차이점을 설명합니다.

아래 설명하는 메서드는 배열에서만 사용이 가능합니다.

:::

<!--truncate-->

## indexOf / findIndex

### Array.prototype.indexOf()

`arr.indexOf(searchElement[, fromIndex])`

`indexOf()` 메서드는 배열에서 지정된 요소를 찾을 수 있는 **첫 번째 인덱스를 반환**하고 존재하지 않으면 `-1`을 반환합니다.

알고리즘 문제를 풀며 많이 사용하는 `indexOf`는 배열의 인자를 콕 집어 해당 배열의 index를 반환합니다.

```js
const fruits = ['사과', '바나나', '레몬', '오렌지', '망고'];

const appleIndex = fruits.indexOf('사과');
const lemonIndex = fruits.indexOf('레몬');
const mangoIndex = fruits.indexOf('망고');
const pearIndex = fruits.indexOf('배');

console.log(appleIndex); // 0
console.log(lemonIndex); // 2
console.log(mangoIndex); // 4
console.log(pearIndex); // -1 : 배열에서 없을 때
```

**`includes`를 사용하는 것보다 가독성을 위해 `indexOf`를 활용해 해당 배열에서의 존재 여부를 활용할 수 있었습니다.** (truthy한 값이 반환되기 때문)

### Array.prototype.findIndex()

`arr.findIndex(callback(element[, index[, array]])[, thisArg])`

메서드는 주어진 **판별 함수를 만족하는** 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 만족하는 요소가 없으면 `-1`을 반환합니다.

`indexOf`와 큰 차이점은 콜백 함수(고차 함수)를 인자로 전달해야 하며, 배열의 요소와 완전 일치하는지 판별하는 것과 다르게 배열 안의 **내용물이 객체일 때도 가능**하고 **객체가 배열 안에서 몇 번째에 있는지 반환**합니다. 그래서 객체의 index를 검색하기에 적절한 메서드입니다.

```js
const todos = [
  {
    id: 1,
    text: '빨래',
    done: true,
  },
  {
    id: 2,
    text: '숙제',
    done: true,
  },
  {
    id: 3,
    text: '개밥주기',
    done: false,
  },
];

const 지금할일 = todos.findIndex((todo) => todo.id === 2);
console.log(지금할일); // 1
```

### Array.prototype.find()

`arr.find(callback[, thisArg])`

메서드는 주어진 판별 함수를 만족하는 **첫 번째 요소**의 **값**을 반환합니다. 그런 요소가 없다면 [undefined](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/undefined)를 반환합니다.

```js
const nums = [5, 12, 8, 130, 44];

const tenOver = nums.find((num) => num > 10);
const fiveUnder = nums.find((num) => num < 5);

console.log(tenOver); // 12
console.log(fiveUnder); // undefined
```

알고리즘 문제: [프로그래머스 - 서울에서 김서방 찾기](https://school.programmers.co.kr/learn/courses/30/lessons/12919)

:::tip 요약

1. 배열 요소의 위치를 찾고자 하는 경우 **인덱스**를 반환하는 [Array.prototype.indexOf()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
2. 배열 요소의 내부 객체 내용물과 일치하는 위치를 찾고자 하는 경우는 **인덱스**를 반환하는 [findIndex()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
3. 배열 요소의 내부 객체 내용물과 일치하는 **값**을 찾고자 하는 경우 첫 번째 **값**을 반환하는 [find()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

:::

두 코드 모두 같은 결과를 반환하지만, 코드 스타일과 개발자의 개인적인 취향에 따라 다르게 선택할 수 있습니다. `findIndex` 메서드를 사용한 첫 번째 코드는 새로운 ES6+ 문법을 활용한 현대적인 방식으로 구현되었습니다. `findIndex` 메서드는 콜백 함수를 이용하여 배열에서 첫 번째로 발견되는 요소의 인덱스를 반환합니다. 두 번째 코드는 기본적인 `indexOf` 메서드를 사용하여 문자열에서 "Kim" 문자열을 찾은 다음, 해당 인덱스를 반환합니다. 따라서 두 코드 중 더 나은 코드는 개발자의 취향에 따라 다를 수 있습니다. 그러나 첫 번째 코드는 더욱 현대적이고 선언적으로 코드를 작성할 수 있기 때문에, 일반적으로 더욱 추천되는 방식입니다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/173)에서 옮겨 온 글입니다. 원문 작성일: 2023-04-21 */}
