---
title: "자바스크립트 - this"
description: "상황에 따라 달라지는 this, 메서드 내부 함수에서 this를 우회하는 방법, call·apply·bind를 이용한 명시적 this 바인딩 정리."
authors: [hyoloui]
tags: [javascript]
---

❤️‍🔥 TIL : Today I Learned

:::note 목차

1. 상황에 따라 달라지는 `this`
2. 메서드 내부 함수에서 `this` 우회
3. 명시적 `this` 바인딩

:::

<!--truncate-->

## 상황에 따라 달라지는 this

`this`는 실행 컨텍스트가 생성될 때 결정(this binding) === `this`는 함수를 호출할 때 결정하며 전역 공간에서 `this === window`

```js
// 전역 공간에서의 this
console.log(this);
console.log(window);
console.log(this === window); // true
```

함수 호출시 `this === window`. ex) `function();`

```js
// 함수와 메서드 호출시 각각 this 는 각각 다르게 할당
var func = function (x) {
  console.log(this, x);
};
func(1); // Window { ... } 1

var obj = {
  method: func,
};
obj.method(2); // { method: f } 2
```

메서드 호출시 `this === 자신을 호출한 대상 객체` (아래에서는 `obj`에 해당한다). ex) `variable.function()`

:::note

메서드 호출의 구분은 메서드 앞에 **`[ ]`** 또는 **`.`** 이 있는지로 한다.

:::

```js
var obj = {
  methodA: function () {
    console.log(this);
  },
  inner: {
    methodB: function () {
      console.log(this);
    },
  },
};

obj.methodA(); // this === obj
obj["methodA"](); // this === obj
obj.inner.methodB(); // this === obj.inner
obj.inner["methodB"](); // this === obj.inner
obj["inner"].methodB(); // this === obj.inner
obj["inner"]["methodB"](); // this === obj.inner
```

메서드 내부함수에서의 `this` : 메서드 내부에서라도 함수를 호출한다면 해당 함수의 `this === window`

```js
var obj1 = {
  outer: function () {
    console.log(this);
    var innerFunc = function () {
      console.log(this);
    };
    innerFunc(); // this === window

    var obj2 = {
      innerMethod: innerFunc,
    };
    obj2.innerMethod(); // this === obj2
  },
};
obj1.outer(); // this === obj1
```

## 메서드 내부 함수에서 this 우회

위 처럼 내부함수에서 `this`를 할당해야 한다면 다음과 같은 방법이 있다.

### 1. 변수 선언

함수 내부에서 변수에 `this` 를 지정하여 넣는 방법이다.

```js
var obj1 = {
  outer: function () {
    console.log(this);
    var innerFunc1 = function () {
      console.log(this);
    };
    innerFunc1();

    var self = this;
    var innerFunc2 = function () {
      console.log(self);
    };
    innerFunc2();
  },
};
obj1.outer();
```

### 2. 화살표 함수 : arrow function

ES6 신문법 으로 화살표 함수는 this binding 을 생략한다!

```js
var obj = {
  outer: function () {
    console.log(this);
    var innerFunc = () => {
      console.log(this);
    };
    innerFunc(); // this === outer
  },
};
obj.outer(); // this === outer
```

### 3. 생성자 함수 내부에서의 this

생성자 함수에서 `this` 는 해당 인스턴스 이다.

```js
var Cat = function (name, age) {
  this.bark = "야옹";
  this.name = name;
  this.age = age;
};

var choco = new Cat("초코", 7); // this : choco
var nabi = new Cat("나비", 5); // this : nabi
```

## 명시적 this 바인딩

1. `call` 메서드 : 호출 주체인 함수를 즉시실행. `call` 메서드에서는 모든 함수에서 사용 가능, `this` 를 특정값으로 지정
2. `apply` 메서드 : `call` 과 매개변수 처리방법만 다르고 동일한 기능을 한다. 배열을 받아 배열을 반환 한다. ex) `...[array]` 비구조화 할당
3. 유사 배열 객체 : 객체지만 배열처럼 동작 가능. 하지만 반드시 `length` 가 필요하다
   - `slice` 메서드로 전체 '유사배열 객체' 를 배열로 반환
   - `arguments` : 함수 내부에서 활용할 수 있는 변수

:::tip 최종 정리

1. 전역공간 `this === window`
2. 함수호출 시 `this === window`
3. 메서드 호출 시 `this === 자신을 호출한 대상 객체`, 메서드 호출은 `[ ]` 또는 `.` 이 앞에 있어야 한다
4. 메서드 내부함수에서 `this` 우회 방법 = 함수내부에 변수 만들어 `this` 할당, ★arrow function
5. `call` 메서드 : 모든함수에서 사용 가능, `this`를 특정값으로 지정
6. `apply` 메서드 : `call` 과 동일한 기능이지만, 배열을 받아 배열을 반환
7. `bind` 메서드 : 함수의 `this` 값을 영구히 바꿀 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/41)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-02 */}
