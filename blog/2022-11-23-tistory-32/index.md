---
title: "자바스크립트 문법 - forEach()"
description: "배열, Set, Map을 순회하는 forEach()의 문법과 value, index, array 인자 활용법 정리."
authors: [hyoloui]
tags: [javascript]
---

❤️‍🔥 TIL : Today I Learned

`forEach()`는 배열을 순회하며, 인자로 전달한 함수를 호출하는 반복문이다. 배열, Set, Map 에서 사용 가능하다.

<!--truncate-->

1. `forEach()` 문법
2. 배열 순회
3. 배열 순회 - Lambda 식
4. value, index 인자로 받기
5. value, index, array 인자로 받기
6. Set 에서 `forEach()`로 요소 순회하기
7. Map 에서 `forEach()`로 요소 순회하기

## forEach() 문법

```js
arr.forEach(func(value, index, array))
```

- `value` : 현재 돌고있는 데이터
- `index` : 현재 돌고있는 데이터중 index
- `array` : 배열중 하나

:::note

`result = cal(b=2, a=1)` : 매개변수 호출 시 매개변수명을 지정해서 대입한다면 순서는 무관합니다.

:::

## forEach()로 배열 순회

배열을 순회 하며 모든 데이터를 출력합니다. `arr.forEach()` 소괄호 안에 매개변수로 코드를 작성하면 함수의 매개변수로 요소를 하나씩 전달합니다.

```js
const 과일바구니 = ["사과", "키위", "포도", "오렌지"];

function singlyFruit(과일) {
  console.log(과일);
}

과일바구니.forEach(singlyFruit);

// 과일바구니 안에 있는 데이터를 하나씩 과일로 쪼개어 출력

// 출력 =>

// 사과
// 키위
// 포도
// 오렌지
```

## 배열 순회 - Lambda 식

위와 같은 배열 순회식 이지만(같은 결과 값) Lambda 사용이 가능 합니다.

```js
const 과일바구니 = ["사과", "키위", "포도", "오렌지"];

과일바구니.forEach((과일) => {
  console.log(과일);
});

// 과일바구니 안에 있는 데이터를 하나씩 과일로 쪼개어 출력

// 출력 =>

// 사과
// 키위
// 포도
// 오렌지
```

## value, index 인자로 받기

위에서는 `forEach`에 전달되는 함수에서 value(과일)만 받았지만, value, index를 받아 출력할수 있습니다.

```js
const 과일바구니 = ["사과", "키위", "포도", "오렌지"];

과일바구니.forEach((item, index) => {
  console.log("index: " + index + ", item: " + item);
});

// index: 0, item: 사과
// index: 1, item: 키위
// index: 2, item: 포도
// index: 3, item: 오렌지
```

## value, index, array를 인자로 받기

위에서 array 까지 전달받아 출력해 보겠습니다.

```js
const 과일바구니 = ["사과", "키위", "포도", "오렌지"];

과일바구니.forEach((item, index, arr) => {
  console.log(
    "index: " + index + ", item: " + item + ", arr[" + index + "]: " + arr[index]
  );
});

// index: 0, item: 사과, arr[0]: 사과
// index: 1, item: 키위, arr[1]: 키위
// index: 2, item: 포도, arr[2]: 포도
// index: 3, item: 오렌지, arr[3]: 오렌지
```

## Set 에서 forEach()로 요소 순회하기

아래처럼 Set의 모든 요소를 돌면서 출력할 수 있습니다.

```js
const set = new Set(["사과", "바나나", "고구마"]);

set.forEach((item) => console.log(item));

// 사과
// 바나나
// 고구마
```

## Map에서 forEach()로 요소 순회

Map 에서도 가능 합니다!

```js
let map = new Map();
map.set("name", "이친구");
map.set("age", "30");

map.forEach((value) => console.log(value));

// 이친구
// 30
```

:::tip 최종 정리

1. 배열을 순회하며, 인자로 전달한 함수를 호출하는 반복문
2. 람다식 적용도 할 수 있다
3. `Set`과 `Map` 에서도 사용 가능하다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/32)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-23 */}
