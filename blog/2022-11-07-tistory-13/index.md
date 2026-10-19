---
title: "자바스크립트 문법 (2/4) - 변수, 타입, 연산자"
description: "라면 비유로 이해하는 변수(let, const), 데이터 타입, 각종 연산자를 예제 코드와 함께 정리한 글."
authors: [hyoloui]
tags: [javascript]
---

❤️‍🔥 TIL : Today I Learned

:::note

자 이번에도 라면이다.. 내 인생.... 라면.....

수돗물에게 '맛있는물' 이라는 이름을 지어줬다.

라면국물에게 '라국' 이라는 이름을 지어줬다.

'맛있는물' + '라국' 이게 되나? 된다! 같은 액체라서 둘은 섞인다!

하지만, 냄비에게 '라면전용냄비' 이름을 붙여준다.

'맛있는물' + '라면전용냄비' 이건 안된다. 물은 액체이고, 냄비는 고체이다. 둘은 성질이 달라서 안섞인다!

내가 이름을 붙인건 '변수'를 설명하기 위함 이고, 섞었는데 안되는건 '타입' 이 다르기 때문이라고 이해 하면 된다.

복잡하게 생각하지 말고 받아들여야 한다. 우리는 컴퓨터에게 하나부터 열까지 설명하고 가르쳐야 하기 때문...

세상의 이치라고 편~하게 받아들이자.

:::

<!--truncate-->

## 변수 (variable)

`let`, `const`

내가 위에서 이름을 붙여준 것 처럼 코드에서는 이름을 변수(variable) 라고 한다. [저장해 놓는 데이터, 일종의 이름표]

난 보통 `const` 로 사용하고, 나중에 데이터가 바뀌는 변수만 `let`으로 바꿔준다!

- `const` = 상수(바뀌지 않는 값)
- `let` = 변수(바뀌는 값)

예전에는 `var` 를 사용했지만 여러 단점이 많아 지금은 사용하지 않는다.

```js
// 변수
let nickName = "Hyo, loui";
console.log(nickName);
// "Hyo, loui" 출력

nickName = "Chris";
console.log(nickName);
// "Chris" 출력

// + 상수
const nickName2 = "Hyo, loui";
console.log(nickName2);
// "Hyo, loui" 출력
// nickName2 = 'Chris' // 주석을 제외하면 이 부분에서 에러가 난다! 실행X
console.log(nickName2);
```

## 데이터 타입 (Data type)

숫자, 문자, boolean, undefined, null

```js
// Number(숫자)
// console.log(10)

let age = 37;
console.log(age);

//-------------------------------------------------------------

// String(문자열)

let firstName = "Seung Hyo";
console.log(firstName);

// -------------------------------------------------------------

// Boolean(true / false)
let isMan = true;
let isWoman = false;

console.log(isMan);
console.log(isWoman);

console.log(true);
console.log(false);

// -------------------------------------------------------------

// null / undefined
let name1 = null;
console.log(name1); // null을 출력

let name2;
console.log(name2); // undefined를 출력
```

수많은 데이터를 [입력 👉 처리 👉 출력] 하는 과정을 컴퓨터가 알아들을 수 있도록 빠르고, 효율적으로 처리하기 위해 프로그래밍 언어가 타입(type)을 구분 해 놓는것이다.

## 연산자 (operator)

문자열, 산술, 증감, 대입, 비교, 논리, 일치

이건 사실 워딩이 어려워서 그렇지 해보면 쉽다. (사실 나도 거부감이 들었다 ㅇㅅㅇ)

```js
// 연산자

// 문자열 이어붙이기
console.log("My" + " car");
console.log("1" + 2);
console.log(1 + 2);

// + 템플릿 리터럴
const shoesPrice = 200000;
console.log("이 신발의 가격은 " + shoesPrice + "원 입니다.");
console.log(`이 신발의 가격은 ${shoesPrice}원 입니다.`); // 이게 템플릿 리터럴 - 위와 같음

// -------------------------------------------------------------

// 산술 연산자 (Numeric operators)
console.log(2 + 1);
console.log(2 - 1);
console.log(2 * 3);
console.log(4 / 2);
console.log(10 % 3);
console.log(10 ** 2);

// -------------------------------------------------------------

// 증감 연산자 (Increment and Decrement operators)
let count = 1;
const preIncrement = ++count;
console.log(`count: ${count}, preIncrement: ${preIncrement}`);

let num = 10;
const postnum = num++;

console.log(`num: ${num}, postCount: ${postnum}`);

// -------------------------------------------------------------

// 대입연산자 (Assignment operators)
const shirtsPrice = 100000;
const pantsPrice = 80000;
let totalPrice = 0;

totalPrice += shirtsPrice; // totalPrice = totalPrice + shirtsPrice 와 동일
console.log(totalPrice);
totalPrice += pantsPrice; // totalPrice = totalPrice + pantsPrice 와 동일
console.log(totalPrice);

totalPrice -= shirtsPrice; // totalPrice = totalPrice - shirtsPrice 와 동일
console.log(totalPrice);

// -------------------------------------------------------------

// 비교연산자 (Comparison operators)

console.log(1 < 2); // 1이 2보다 작은가? true
console.log(2 <= 2); // 2가 2보다 작거나 같은가? true
console.log(1 > 2); // 1이 2보다 큰가? false
console.log(1 >= 2); // 1이 2보다 크거나 같은가? false

// -------------------------------------------------------------

// 논리 연산자 (Logical operators)

let isOnSale = true;
let isDiscountItem = true;

console.log(isOnSale && isDiscountItem); // true && true 이므로 true
console.log(isOnSale || isDiscountItem); // true || true 이므로 true

isOnSale = false;
console.log(isOnSale && isDiscountItem); // false && true 이므로 false
console.log(isOnSale || isDiscountItem); // false || true 이므로 true

isDiscountItem = false;
console.log(isOnSale && isDiscountItem); // false && false 이므로 false
console.log(isOnSale || isDiscountItem); // false || false 이므로 false

console.log(!isOnSale); // !false 이므로 true

// -------------------------------------------------------------

// 일치 연산자 (Equality operators)

console.log(1 === 1); // true
console.log(1 === 2); // false
console.log("Javascript" === "Javascript"); // true
console.log("Javascript" === "javascript"); // 대소문자나 띄어쓰기도 다 정확히 일치해야 해요. 따라서 false

console.log(1 === "1"); // false를 출력
console.log(1 == "1"); // true를 출력

// quiz
const firstPrice = 50000;
const secondPrice = 40000;
let totalPrice = firstPrice + secondPrice;

console.log(`총 ${totalPrice * 0.8}원에 물건을 구입합니다.`);
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/13)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-07 */}
