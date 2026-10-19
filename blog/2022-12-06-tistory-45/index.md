---
title: "자바스크립트 - 자주 쓰이는 배열 메서드[forEach, map, filter, reduce]"
description: "자주 쓰이는 배열 메서드 forEach, map, filter, reduce의 역할과 사용법을 예제와 함께 정리."
authors: [hyoloui]
tags: [javascript]
---

❤️‍🔥 TIL : Today I Learned

:::note 배열 메서드

1. `forEach()`
2. `map()`
3. `filter()`
4. `reduce()`

:::

<!--truncate-->

## forEach()

- 오직 Array 배열에서만 사용 가능한 메서드 (ES6부터는 Map, Set 등에서도 지원)
- `forEach` 구문의 인자로 callback 함수를 등록할 수 있으며, 배열의 각 요소들이 반복될 때 callback 함수가 호출
- callback 함수에서 배열 요소의 인덱스와 값에 접근가능 (아래 코드에서는 `item` 에 해당)
- array의 길이(length)가 5라면 1, 2, 3, 4, 5 까지 순서대로, 하나씩 접근하여 반환

```js
const items = ["사과", "바나나", "복숭아"];

items.forEach(function (item) {
  console.log(item);
});
// 출력 결과:
// 사과
// 바나나
// 복숭아
```

## map()

- 어떤 배열에 있는 모든 요소의 값을 변경하여 새로운 배열로 반환하는 메서드
- `forEach` 와는 다르게 `map`은 하나의 array 를, 또 다른 array로 변환하고자 할 때 사용
- `for` 을 사용하여 배열을 하나씩 도는 것보다 간단하게 사용이 가능하다

```js
let arr = [2, 4, 6, 8];

for (let i = 0; i < arr.length; i++) {
  arr[i] = arr[i] * 3;
}

console.log(arr);
// [6, 12, 18, 24]
```

위 코드는 `for` 문을 이용했으나 뭔가 복잡하고 타이핑이 많다..

```js
let arr = [3, 6, 9, 12];

let trippleArr = arr.map(function (num) {
  return num * 3; // 배열의 요소마다 곱하기 3
});

console.log(trippleArr);

// [9, 18, 27, 36]

// -------------------------------------------------------
// + arrow function 을 사용해 더욱 간결하게 사용이 가능하다
// arr.map(num => num * 3)
```

## filter()

- 해석처럼 걸러주는 역할을 한다
- 특정 조건을 만족하는 배열이 필요할 때 주로 사용한다
- 주의할 점은 특정조건이 성립하는 배열의 요소만 남게된다

```js
const numbers = [1, 2, 3, 4, 5];
const result = numbers.filter(function (number) {
  return number > 3;
}); // 3보다 큰 숫자

console.log(numbers);
// [1, 2, 3, 4, 5];

console.log(result);
// [4, 5]

// -------------------------------------------------------
// + arrow function 을 사용해 더욱 간결하게 사용이 가능하다
// numbers.filter(number => number > 3);
```

이것 또한 위 `map` 예제처럼 `for` 문을 사용하여 구현할 수 있지만 훨씬 간결하고 명확한 목적으로 쓰인다.

```js
const 사장님들 = [
  { name: "김사장님", money: 500000 },
  { name: "이사장님", money: 400000 },
  { name: "박사장님", money: 300000 },
  { name: "최사장님", money: 200000 },
];

const 부자 = 사장님들.filter((man) => man.money > 300000); // 30만원 초과로 있는 사장님만

console.log(부자);
// [{name: "김사장님", money: 500000}]
// [{name: "이사장님", money: 400000}]
```

## reduce()

`reduce()`를 제대로 사용하면 `map()`이나 `filter()` 등도 모두 `reduce()`로 실행이 가능하다.

배열의 각 요소에 대해 실행할 함수. 다음 네 가지 인수를 가짐

- `accumulator` : 누산기. 콜백의 반환값을 누적. 콜백의 이전 반환값 또는, 콜백의 첫 번째 호출이면서 `initialValue`를 제공한 경우에는 `initialValue`의 값임
- `currentValue` : 처리할 현재 요소
- `currentIndex` (Optional) : 처리할 현재 요소의 인덱스. `initialValue`를 제공한 경우 0, 아니면 1부터 시작
- `array` (Optional) : `reduce()`를 호출한 배열

```js
[0, 1, 2, 3, 4].reduce(function (accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
});
// 10
```

여기서 10 이 반환되는 이유는 누적값에 배열이 가지고있는 값을 순차적으로 더했기 때문이다.

```js
[0, 1, 2, 3, 4].reduce((prev, curr) => prev + curr);
// 10
```

arrow function 으로 간편하게 동작 가능하며 각 호출의 반환값은 다음과 같다.

| callback  | accumulator | currentValue | currentIndex | array           | 반환 값 |
| --------- | ----------- | ------------ | ------------ | --------------- | ------- |
| 1번째 호출 | 0           | 1            | 1            | [0, 1, 2, 3, 4] | 1       |
| 2번째 호출 | 1           | 2            | 2            | [0, 1, 2, 3, 4] | 3       |
| 3번째 호출 | 3           | 3            | 3            | [0, 1, 2, 3, 4] | 6       |
| 4번째 호출 | 6           | 4            | 4            | [0, 1, 2, 3, 4] | 10      |

:::tip 최종 정리

1. `forEach` 는 하나씩 출력, `for`문과 유사하다
2. `map` 은 배열의 모든 요소에 동일한 기능을 하고싶을 때, 사용
3. `filter` 는 배열의 특정 조건을 만족하는 배열만 고르는 메서드
4. `reduce` 는 인수를 활용하여 다양한 활용이 가능하다 ex) count, map, filter

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/45)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-06 */}
