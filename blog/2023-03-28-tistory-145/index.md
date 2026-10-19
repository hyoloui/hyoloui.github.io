---
title: "parameter와 argument의 차이"
description: "매개변수(parameter)와 인자(argument)의 차이를 함수 선언과 호출 예시로 정리한 TIL."
authors: [hyoloui]
tags: [web]
---

❤️‍🔥 TIL : Today I Learned

:::note

Parameter : 매개변수, Argument : 인자, 둘 다 변수의 한 종류이다.

:::

<!--truncate-->

## Parameter (매개 변수)란?

함수 선언의 일부로 나열되는 변수이며, 호출될 때 **함수에 전달 될 것으로 예상되는 값**을 나타낸다.

## Argument (인수)란?

호출될 때 **함수에 전달되는 실제 값** 이다.

## 예시

```js
function plus(x, y) {
  return x + y;
}

plus(2, 3);
```

`function plus(x, y)`에서 `x`와 `y`는 매개변수 이다. `plus(2, 3)`으로 호출되면 `2`와 `3`은 함수에 전달되는 인수이다.

- 함수가 선언될 때 괄호 안에 하나 이상의 매개변수를 포함 할 수 있다.
- 매개변수는 호출 시 함수에 전달되는 값에 대한 **자리 표시자 역할**을 한다

:::tip 최종 정리

1. Parameter는 함수가 받을 것으로 예상하는 값의 자리 표시자(목욕탕 번호키)
2. Argument는 함수가 호출될 때 함수에 전달되는 실제 값(들어가는 사람)

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/145)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-28 */}
