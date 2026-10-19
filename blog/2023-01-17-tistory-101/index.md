---
title: "타입스크립트 - Enum (이넘)"
description: "특정 값들의 집합을 나타내는 타입스크립트의 Enum을 숫자형, 문자형, 복합형으로 나누어 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

Type Script 이넘, 정리 및 복습

:::

<!--truncate-->

## 1. Enum (이넘) 이란?

JS에는 없고 TS에만 있는 타입

**특정 값들의 집합**을 의미하는 자료형

쉽게 말해, 타입형 **오브젝트(객체)이다**

## 2. 숫자형 이넘

```ts
// 숫자형 이넘

enum Direction {
  Up = 1, // 시작 number 설정 가능!
  Down,
  Left = 200, // 중도 number 표기시 뒤로 작성한 것들은 (+ 1) 이 된다
  Right,
}
console.log(Direction.Up, Direction.Down, Direction.Left, Direction.Right); // 1, 2, 200, 201

const up: Direction = Direction.Up;
console.log("👉👉  up", up); // 👉👉  up 1

const down: Direction = Direction.Down;
console.log("👉👉  down", down); // 👉👉  down 2

const LeftOrRight: Direction.Left | Direction.Right = Direction.Right;
console.log("👉👉  LeftOrRight", LeftOrRight); // 👉👉  LeftOrRight 201
console.log(Direction[1]); // Up
```

## 3. 문자형 이넘

```ts
// 문자형 이넘

enum Direction2 {
  Up = "up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

console.log(Direction.Down); // 2
```

## 4. 복합형 이넘

**서로 다른 타입**을 이넘에 넣을 수 있다

하지만 권고하지 않는 방법이고, 잘 사용하지 않는다고 한다

```ts
// 복합형 이넘(권고하지 않음)

enum BooleanLikeHeterogeneousEnum {
  No = 0,
  Yes = "yes",
}

console.log(BooleanLikeHeterogeneousEnum.No, BooleanLikeHeterogeneousEnum.Yes); // 0 yes
```

:::tip 최종 정리

1. 이넘은 특정 값들의 집합이고, 타입형 오브젝트라고 생각하면 편하다
2. 숫자형 이넘에서 첫번째 값에 숫자를 넣어주면, 자동으로 뒤에 있는 객체들은 +1씩 더해준다
3. 문자형 이넘은 우리가 객체 사용할 때와 같이 `enum.key` 로 외부에서 사용할 수 있다.
4. 복합형 이넘은 다른 타입을 같이 이넘에 넣은 것이지만, 잘 사용하지 않는다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/101)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-17 */}
