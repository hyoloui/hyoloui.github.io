---
title: "모던 javascript - 프로퍼티 어트리뷰트"
description: "내부 슬롯과 내부 메서드, 프로퍼티 어트리뷰트와 디스크립터, 데이터·접근자 프로퍼티, 프로퍼티 정의와 객체 변경 방지 메서드 정리."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

:::note 사전적 정의

- property : 소유물
- attribute : 속성

:::

<!--truncate-->

## 프로퍼티 어트리뷰트

### 내부 슬롯과 내부 메서드

프로퍼티 어트리뷰트를 이해하기 위해 먼저 내부 슬롯과 내부 메서드의 개념을 알아보자.

ECMAScript 사양에서 사용하는 의사 프로퍼티와 의사 메서드이다. 이중 **대괄호로 감싼 이름들이 내부 슬롯과 내부 메서드**다. (`[[...]]`)

ECMAScript 사양의 "Essential Internal Methods" 표에는 다음과 같은 내부 메서드가 나온다.

| Internal Method | Signature | Description |
| --- | --- | --- |
| `[[GetPrototypeOf]]` | `() → Object \| Null` | 이 객체에 상속 프로퍼티를 제공하는 객체를 결정한다. `null`은 상속 프로퍼티가 없음을 나타낸다. |
| `[[SetPrototypeOf]]` | `(Object \| Null) → Boolean` | 이 객체를 상속 프로퍼티를 제공하는 다른 객체와 연결한다. `null`을 전달하면 상속 프로퍼티가 없음을 나타낸다. 성공하면 `true`, 아니면 `false`를 반환한다. |
| `[[IsExtensible]]` | `() → Boolean` | 이 객체에 프로퍼티를 추가하는 것이 허용되는지 결정한다. |

이들은 자바스크립트 엔진에서 실제로 동작하지만 개발자가 직접 접근할 수 있도록 공개된 객체의 프로퍼티는 아니다. 즉 내부 슬롯과 내부 메서드는 자바스크립트 엔진의 내부 로직이므로 원칙적으로 직접 접근하거나 호출할 수 없다.

그러나 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다. 예를 들어 `[[Prototype]]` 내부 슬롯의 경우, `__proto__`를 통해 간접적으로 접근할 수 있다.

```js
const o = {};

// 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
// 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
o.__proto__ // -> Object.prototype
```

### 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 상태를 나타내는 **프로퍼티 어트리뷰트**를 **자동 정의**한다.

- **프로퍼티의 값 `value`**
- 값의 갱신 가능 여부 `writable`
- 열거 가능 여부 `enumerable`
- 재정의 가능 여부 `configurable`

```js
const person = {
  name: 'Lee',
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: 'Lee', writable: true, enumerable: true, configurable: true}
```

위에서도 알 수 있듯이 `Object.getOwnPropertyDescriptor` 메서드는 프로퍼티 **디스크립터 객체**를 반환한다.

참고로 디스크립터 객체는 프로퍼티 어트리뷰트 정보를 제공하는 객체다.

우리가 직접 생성한 것은 `value`의 `'Lee'`라는 텍스트뿐이었지만, `writable: true`, `enumerable: true`, `configurable: true`가 **자동적으로 생성**되었다.

```js
const person = {
  name: 'Lee',
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: 'Lee', writable: true, enumerable: true, configurable: true}
  age: {value: 20, writable: true, enumerable: true, configurable: true}
}
*/
```

ES8에서 도입된 `Object.getOwnPropertyDescriptors` 메서드는 **모든 프로퍼티**의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

### 데이터 프로퍼티와 접근자 프로퍼티

- 데이터 프로퍼티
  - 키와 값으로 구성된 일반적인 프로퍼티. 지금까지 살펴본 모든 프로퍼티는 데이터 프로퍼티이다.
- 접근자 프로퍼티
  - 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티

**데이터 프로퍼티**

위에서 설명한 것처럼 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값으로 자동 정의된다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 | 설명 |
| --- | --- | --- |
| `[[Value]]` | `value` | 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값이다. 프로퍼티 키를 통해 프로퍼티 값을 변경하면 `[[Value]]`에 값을 재할당한다. 프로퍼티가 없다면 프로퍼티를 동적 생성한다. |
| `[[Writable]]` | `writable` | 프로퍼티 값의 변경 가능 여부를 나타내며 불리언 값을 갖는다. `[[Writable]]`의 값이 `false`인 경우 해당 프로퍼티의 `[[Value]]`의 값을 변경할 수 없는 읽기 전용 프로퍼티가 된다. |
| `[[Enumerable]]` | `enumerable` | 프로퍼티의 열거 가능 여부를 나타내며 불리언 값을 갖는다. `[[Enumerable]]`의 값이 `false`인 경우 해당 프로퍼티는 `for ... in` 문이나 `Object.keys` 메서드 등으로 열거할 수 없다. |
| `[[Configurable]]` | `configurable` | 프로퍼티 재정의 가능 여부를 나타내며 불리언 값을 갖는다. `[[Configurable]]`의 값이 `false`인 경우 프로퍼티의 삭제, 어트리뷰트 값의 변경이 금지된다. |

```js
const person = {
  name: 'Lee',
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: 'Lee', writable: true, enumerable: true, configurable: true}
```

**접근자 프로퍼티**

자체적으로는 **값을 갖지 않고**, **다른 데이터 프로퍼티의 값을 읽거나 저장할 때** 사용하는 접근자 함수로 구성된 프로퍼티다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명 |
| --- | --- | --- |
| `[[Get]]` | `get` | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 접근자 함수. getter 함수가 호출되고 그 결과가 프로퍼티 값으로 반환 |
| `[[Set]]` | `set` | 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 접근자 함수. setter 함수가 호출되고 그 결과가 프로퍼티 값으로 저장 |
| `[[Enumerable]]` | `enumerable` | 데이터 프로퍼티의 `[[Enumerable]]`과 같음 |
| `[[Configurable]]` | `configurable` | 데이터 프로퍼티의 `[[Configurable]]`과 같음 |

**getter / setter** 함수라고도 부른다. 둘 다 정의할 수 있고, 하나만 정의할 수도 있다.

```js
const person = {
  // 데이터 프로퍼티
  firstName: 'seunghyo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.

  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 구조분해 할당
    [this.firstName, this.lastName] = name.split(' ');
  },
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // seunghyo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
person.fullName = 'seunghyo Lee';
console.log(person); // {firstName: 'seunghyo', lastName: 'Lee'}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다
console.log(person.fullName); // seunghyo Lee

// firstName은 데이터 프로퍼티다
// 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
// 프로퍼티 어트리뷰트를 갖는다
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
```

`person` 객체의 `firstName`과 `lastName` 프로퍼티는 일반적인 데이터 프로퍼티다. 메서드 앞에 `get`, `set`이 붙은 메서드가 있는데 이것들이 바로 getter, setter 함수이고 getter/setter 함수의 이름 `fullName`이 **접근자 프로퍼티**다.

접근자 프로퍼티는 자체적으로 값(프로퍼티 어트리뷰트 `[[Value]]`)을 가지지 않으며 다만 **데이터 프로퍼티의 값을 읽거나 저장할 때 관여할 뿐**이다.

내부 슬롯/메서드 관점에서 설명하면 다음과 같다.

1. 프로퍼티 **키가 유효한지 확인**. 키는 문자열 또는 심벌이어야 한다. 예) 프로퍼티 키 `'fullName'`은 문자열이므로 유효한 프로퍼티 키다.
2. 프로토타입 체인에서 **프로퍼티를 검색**한다. (나중에 프로토타입을 다룸) `person` 객체에 `fullName` 프로퍼티가 존재한다.
3. 검색된 `fullName` 프로퍼티가 **데이터 프로퍼티**인지 **접근자 프로퍼티**인지 **확인**한다. `fullName` 프로퍼티는 접근자 프로퍼티다.
4. 접근자 프로퍼티 `fullName`의 프로퍼티 어트리뷰트 `[[Get]]`의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 프로퍼티 `fullName`의 프로퍼티 어트리뷰트 `[[Get]]`의 값은 `Object.getOwnPropertyDescriptor` 메서드가 반환하는 프로퍼티 디스크립터 객체의 `get` 프로퍼티 값과 같다.

접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법

```js
// 일반 객체의 __proto__는 접근자 프로퍼티
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: f, set: f, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티다
Object.getOwnPropertyDescriptor(function () {}, 'prototype');
// {value: {...}, writable: true, enumerable: false, configurable: false}
```

`Object.getOwnPropertyDescriptor` 메서드가 반환한 프로퍼티 어트리뷰트를 객체로 표현한 프로퍼티 디스크립터 객체를 보고 구분한다.

### 프로퍼티 정의

프로퍼티 어트리뷰트를 명시적으로 **정의하거나, 재정의하는 것**을 말한다.

`Object.defineProperty()` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.

인수: 1) 객체의 참조 2) 데이터 프로퍼티의 키인 문자열 3) 프로퍼티 디스크립터 객체

```js
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Yongwook',
  writable: true,
  enumerable: true,
  configurable: true,
});
Object.defineProperty(person, 'lastName', {
  value: 'Lee',
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Yongwook", writable: true, enumerable: true, configurable: true}

// 디스크립터 객체의 프로퍼티를 누락시키면 undefined, false가 기본값이다.
descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// [[Enumerable]]의 값이 false의 경우 for..in 이나 Object.keys 등으로 열거할 수 없다.
console.log(Object.keys(person)); // ["firstName"]

// [[Writable]]의 값이 false의 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없다.
// 이때 값을 변경하면 에러는 발생하지 않고 무시된다.
person.lastName = 'Kim';

// [[Configurable]]의 값이 false의 경우 해당 프로퍼티를 삭제할 수 없다.
// 이때 프로퍼티를 삭제하면 에러는 발생하지 않고 무시된다.
delete person.lastName;

// [[Configurable]]의 값이 false의 경우 해당 프로퍼티를 재정의할 수 없다.
// Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}

// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true,
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: f, set: f, enumerable: true, configurable: true}

person.fullName = 'Pposong I';
console.log(person); // {firstName: "Pposong", lastName: "I"}
```

`Object.defineProperty` 메서드로 프로퍼티를 정의할 때, 디스크립터 객체의 프로퍼티를 일부 생략할 수 있다. **생략했을 때의 기본값**은 다음 표와 같다.

| 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 생략했을 때의 기본값 |
| --- | --- | --- |
| `value` | `[[Value]]` | `undefined` |
| `get` | `[[Get]]` | `undefined` |
| `set` | `[[Set]]` | `undefined` |
| `writable` | `[[Writable]]` | `false` |
| `enumerable` | `[[Enumerable]]` | `false` |
| `configurable` | `[[Configurable]]` | `false` |

`Object.defineProperties` 메서드를 사용하면 여러 개의 프로퍼티를 한 번에 정의할 수 있다.

```js
const person = {};

Object.defineProperties(person, {
  // 데이터 프로퍼티 정의
  firstName: {
    value: 'Yongwook',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  lastName: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: true,
  },
  // 접근자 프로퍼티 정의
  fullName: {
    // getter 함수
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true,
  },
});

person.fullName = 'Pposong I';
console.log(person); // {firstName: "Pposong", lastName: "I"}
```

## 객체 변경 방지

자바스크립트는 객체의 변경을 방지하는 다양한 메서드를 제공한다. 객체 변경 방지 메서드들은 객체의 변경을 금지하는 강도가 다르다.

| 구분 | 메서드 | property 추가 | property 삭제 | property 값 읽기 | property 값 쓰기 | property attribute 재정의 |
| --- | --- | --- | --- | --- | --- | --- |
| 객체 확장 금지 | `Object.preventExtensions` | X | O | O | O | O |
| 객체 밀봉 | `Object.seal` | X | X | O | O | X |
| 객체 동결 | `Object.freeze` | X | X | O | X | X |

**1. 객체 확장 금지 = `Object.preventExtensions()`**

- `Object.isExtensible`: 확장 가능한 객체인지 확인

```js
const person = {
  firstName: 'junho',
};
console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person);
console.log(Object.isExtensible(person)); // false

// property 추가 금지 but strict mode 아니면 에러 X
person.lastName = 'yun';
console.log(person); // {firstName: 'junho'}
```

**2. 객체 밀봉 = `Object.seal()`**

- `Object.isSealed`: 밀봉된 객체인지 확인

```js
const person = {
  firstName: 'jisoo',
};
console.log(Object.isSealed(person)); // false

Object.seal(person);
console.log(Object.isSealed(person)); // true
console.log(Object.getOwnPropertyDescriptors(person));
// {
//     "firstName": {
//         "value": "jisoo",
//         "writable": true,
//         "enumerable": true,
//         "configurable": false
//     }
// }

// property 값 읽기/쓰기 가능
person.firstName = 'Heehyon';
console.log(person.firstName); // Heehyon

// property 추가 금지 but strict mode 아니면 에러 X
person.lastName = 'namgyu';
console.log(person); // {firstName: 'Heehyon'}

// property 삭제 금지 but strict mode 아니면 에러 X
delete person.firstName;
console.log(person); // {firstName: 'Heehyon'}

// property attribute 재정의 금지
Object.defineProperty(person, 'firstName', {
  configurable: true,
}); // Uncaught TypeError: Cannot redefine property: firstName
```

**3. 객체 동결 = `Object.freeze()`**

- `Object.isFrozen`: 동결된 객체인지 확인

```js
const person = {
  name: 'namgyu',
};
console.log(Object.isFrozen(person)); // false

Object.freeze(person);
console.log(Object.isFrozen(person)); // true
console.log(Object.getOwnPropertyDescriptor(person, 'name')); // {value: 'namgyu', writable: false, enumerable: true, configurable: false}

// property 값 쓰기 금지 but strict mode 아니면 에러 X
person.name = 'Heehyun';
console.log(person.name); // namgyu
```

:::tip 최종 정리

1. JS 엔진이 property 생성 시, **property attribute**를 기본값으로 자동 정의한다.
2. 키와 값으로 구성된 **데이터 프로퍼티**, 값이 아닌 접근자 함수로 구성된 **접근자 프로퍼티**가 있다.
3. `Object.defineProperty` / `defineProperties` 메서드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.
4. **객체 변경 금지**는 3가지가 있다.
   1. 객체 확장 금지 `Object.preventExtensions`
   2. 객체 밀봉 `Object.seal`
   3. 객체 동결 `Object.freeze`

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/116)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-02 */}
