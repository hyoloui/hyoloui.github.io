---
title: "모던 Javascript - 배열 고차 함수"
description: "함수를 인수로 받는 배열 고차 함수 sort, forEach, map, filter, reduce, find, findIndex, flatMap의 동작과 예제 정리."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

> 고차 함수는 함수를 인수로 전달받거나 함수를 반환하는 함수

<!--truncate-->

## 배열 고차 함수

### 배열 고차 함수란?

고차 함수는 외부 상태의 변경이나 가변 데이터를 피하고 **불변성을 지향**하는 함수형 프로그래밍에 기반을 두고 있다.

JavaScript에서 고차 함수는 하나 이상의 함수를 인수로 받거나 함수를 결과로 반환하는 함수이다. 이러한 함수를 배열과 함께 사용하면 배열 고차 함수라고 한다.

### Array.prototype.sort

mutates (원본 변경)

원본 배열을 직접 변경하며 정렬된 배열을 반환한다.

```js
const numbers = [3, 1, 2];

numbers.sort();

console.log(numbers); // [1,2,3]
```

`sort` 메서드의 기본 정렬 순서는 **유니코드 포인트의 순서**를 따른다.

```js
['2', '1'].sort(); // ['1', '2']
[2, 1].sort(); // [1, 2]

['2', '10'].sort(); // ['10', '2']
[2, 10].sort(); // [10, 2]
```

때문에 위와 같은 현상이 생긴다. 문자열 `'10'`의 유니코드 포인트가 문자열 `'2'`의 유니코드 포인트보다 앞서므로 `['10', '2']`로 정렬된다. `sort` 메서드는 배열의 요소를 일시적으로 문자열로 변환한 후 정렬하므로 숫자 배열 `[2, 10]`을 `sort` 메서드로 정렬해도 `[10, 2]`로 정렬된다.

따라서 숫자 요소를 정렬할 때는 `sort` 메서드에 정렬 순서를 정의하는 비교 함수를 인수로 전달해야 한다.

```js
const points = [40, 100, 1, 5, 2, 24, 10];

// 오름차순 정렬
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 24, 40, 100]

// 내림차순 정렬
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 24, 10, 5, 2, 1]
```

### Array.prototype.forEach

`forEach` 메서드는 반복문을 추상화한 고차 함수로서 내부에서 반복문을 통해 자신을 호출한 배열을 순회하면서 수행해야 할 처리를 **콜백 함수**로 전달받아 반복 호출한다. `for` 문으로 구현된 예제를 `forEach` 메서드로 구현하면 다음과 같다.

```js
const numbers = [1, 2, 3];
const pows = [];

for (let i = 0; i < numbers.length; i++) {
  pows.push(numbers[i] ** 2);
}
console.log(pows); // [1, 4, 9]

const pows2 = [];
numbers.forEach((item) => pows2.push(item ** 2));
console.log(pows2); // [1, 4, 9]
```

### Array.prototype.map

원래 배열의 모든 요소에서 제공된 함수를 호출한 결과로 새 배열을 반환한다.

```js
const numbers = [1, 4, 9];

const roots = numbers.map((item) => Math.sqrt(item));

// map 메서드는 원본 배열을 변경하지 않는다.
console.log(numbers); // [1, 4, 9]

// map 메서드는 새로운 배열을 반환한다.
console.log(roots); // [1, 2, 3]
```

`map` 메서드가 생성한 새로운 배열의 `length` 프로퍼티 값은 `map` 메서드를 호출한 배열의 `length` 프로퍼티 값과 반드시 일치한다. 즉, `map` 메서드를 호출한 배열과 `map` 메서드가 반환한 배열은 1:1 매핑한다.

### Array.prototype.filter

콜백 함수의 반환값이 `true`인 요소로만 구성된 새로운 배열을 반환한다.

```js
const numbers = [1, 2, 3, 4, 5];

// 홀수인 요소만 필터링
const odds = numbers.filter((item) => item % 2);
console.log(odds); // [1, 3, 5]
```

### Array.prototype.reduce

하나의 결과값을 만들어 반환한다. 콜백 함수에 전달되는 인수는 4개가 있다.

1. 초기값
2. 배열의 요소값
3. 현재 인덱스
4. 배열 자체

```js
const sum = [1, 2, 3, 4].reduce(
  (이전값, 현재값, 인덱스, 배열) => 이전값 + 현재값,
  0,
);

console.log(sum); // 10
```

이를 활용해 평균 구하기, 최댓값 구하기, 요소의 중복 횟수 구하기, 중첩 배열의 평탄화, 중복 요소 제거가 가능하다.

:::warning

`reduce` 메서드를 호출할 때는 언제나 초기값을 전달해야 안전하다.

:::

### Array.prototype.find

`find` 메서드는 콜백 함수의 반환값이 `true`인 첫 번째 요소를 반환하므로 `find`의 결과값은 배열이 아닌 해당 요소값이다.

```js
[1, 2, 2, 3].filter((item) => item === 2); // [2, 2]

// find 메서드는 요소를 반환한다.
[1, 2, 2, 3].find((item) => item === 2); // 2
```

### Array.prototype.findIndex

자신을 호출한 배열의 요소를 순회하며 인수로 전달된 콜백 함수를 호출하여 반환값이 `true`인 첫 번째 요소의 인덱스를 반환, `false`라면 `-1`을 반환한다.

```js
const 성씨 = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' },
];

성씨.findIndex((user) => user.id === 2); // 1

성씨.findIndex((user) => user.name === 'Park'); // 3
```

### Array.prototype.flatMap

`flatMap` 메서드는 `map` 메서드를 통해 생성된 새로운 배열을 평탄화한다. 즉, `map` 메서드와 `flat` 메서드를 순차적으로 실행하는 효과가 있다.

```js
const arr = ['hello', 'world'];

arr.map((x) => x.split('')).flat();
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

arr.flatMap((x) => x.split(''));
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

하지만 중첩 배열의 평탄화 깊이를 지정해야 한다면 `flatMap` 메서드를 사용하지 말고 `map` 메서드와 `flat` 메서드를 각각 호출한다.

:::tip 최종 정리

- `sort()`: 배열의 요소를 제자리에 정렬하고 정렬된 배열을 반환한다.
- `forEach()`: 각 배열 요소에 대해 제공된 함수를 한 번씩 실행한다.
- `map()`: 원래 배열의 모든 요소에서 제공된 함수를 호출한 결과로 새 배열을 반환한다.
- `filter()`: 주어진 테스트(제공된 함수에 의해 지정됨)를 통과하는 원래 배열의 모든 요소를 포함하는 새 배열을 반환한다.
- `reduce()`: 누산기와 배열의 각 요소(왼쪽에서 오른쪽으로)에 대해 함수를 적용하여 단일 값으로 줄인다.
- `find()`: 제공된 테스트 기능을 만족하는 배열의 첫 번째 요소 값을 반환한다.
- `findIndex()`: 제공된 테스트 기능을 만족하는 배열의 인덱스 값을 반환한다.
- `flatMap()`: `map` 메서드를 통해 생성된 새로운 배열을 한 단계만 평탄화한다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/142)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-28 */}
