---
title: "타입스크립트 - Type Alias (타입 별칭)"
description: "객체 형태의 타입에 이름을 붙여 재사용하는 타입스크립트의 Type Alias 사용법을 정리한 글."
authors: [hyoloui]
tags: [typescript]
---

:::note 목적

TS Type Alias (타입 별칭), 정리 및 복습

:::

<!--truncate-->

## 1. Type Alias ?

타입을 미리 **객체의 형태**로 선언해 둔 후 필요한 곳에서 **별칭을** **호출**하여 사용할 수 있다.

```ts
// Type Alias

type Hero = {
  name: string;
  power: number;
  height: number;
  gender: "남" | "여";
};
```

`Hero` 라는 타입의 별칭!

## 2. 타입 별칭의 형태

```ts
// Type Alias

type Hero = {
  name: string;
  power: number;
  height: number;
  gender: "남" | "여";
};
```

## 3. 타입 별칭의 적용

```ts
const hero1: Hero = {
  name: "슈퍼맨",
  power: 100,
  height: 100,
  gender: "남",
};
```

🧪 **나의 실험실**

```ts
const hero1: Hero = {
  name: "슈퍼맨",
  power: 100,
  height: 100,
  gender: "남자", // Error: '"남자"' 형식은 '"남" | "여"' 형식에 할당할 수 없습니다.
};
```

gender에 "남" 혹은 "여" 라는 텍스트밖에 들어올 수 없다!

## 4. 타입 별칭의 속성들 호출

```ts
const printHero = (hero: Hero) => {
  console.log(hero.name, hero.power, hero.gender);
};

printHero(hero1); // 슈퍼맨 100 남
```

:::tip 최종 정리

1. 타입 얼라이어스는 **객체의 형태**로 `key: value(type)` 가 저장된다
2. 타입을 한번 정의하고 **필요한 곳에 반복해서 사용**할 수 있다
3. 장점: 작성해야 할 코드 양을 줄일 수 있으며, 코드가 간결하고 유지보수가 쉽다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/103)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-18 */}
