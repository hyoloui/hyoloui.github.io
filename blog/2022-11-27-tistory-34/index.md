---
title: "자바스크립트 문법 - try, catch() 에러 핸들링"
description: "try...catch...finally의 동작 방식, 런타임·비동기 에러의 한계, 에러 객체와 throw로 직접 에러를 만드는 방법 정리."
authors: [hyoloui]
tags: [javascript, error-handling]
---

❤️‍🔥 TIL : Today I Learned

## try...catch

개발을 하다보면 누구나 에러를 만나고, 또 누구라도 에러가 생기기 마련이다. 이러한 에러로 인해 다른 구문이 실행이 안되는 상황이 생겨, 렌더링을 마무리하지 못하게 된다.

`if/else` 문을 통해 예외 처리를 할 수 있지만 모든 개발자가 수많은 에러를 예측하기 쉽지는 않다. 그래서 우리는 `try...catch` 를 통해 코드가 중단되는 것을 방지하고 에러의 예외처리를 해놓는다면, 더 안정적인 코드를 작성할 수 있다.

<!--truncate-->

`try`(시도) 하여 에러가 발생하면 `catch`(잡는) 문법 이다.

```js
try {
  // 실행될 코드
} catch (error) {
  // 에러 발생 시 실행할 코드
}
```

그래서 `if/else` 를 사용하는 것 처럼 `try` 와 `catch` 라는 두 개의 주요 블록으로 구성된다.

### try...catch 동작 알고리즘

```js
try {
  // 1.
  // 2.
  // .
  // .
  // last
} catch (error) {
  // 1..
  // 2..
}
```

1. 정상적인 코드라면 `try { ... }` 코드가 실행 된다.
2. 에러가 없다면, `try` 안의 1. 2. 부터 마지막 줄까지 실행되며, `catch` 블록은 실행되지 않고 건너 뛴다.
3. 에러가 있다면, `try` 안의 코드 실행이 중단, `catch (error)` 블록으로 넘어가며 변수 `error` 는 무슨 일이 일어났는지에 대한 정보가 담긴 에러 객체를 반환한다.

`try { ... }` 블록 안에서 에러가 발생하더라도 `catch` 문으로 흐름이 넘어가며 에러를 처리하기 때문에 실행중인 코드가 중단되지 않는다.

하지만 모든 에러를 처리하는 것은 아니며, 몇가지 예외가 있다.

### try...catch는 오직 런타임 에러에만 동작한다

`try`와 `catch`는 실행 가능한 코드에서만 동작한다. 문법적인 에러가 있다면 자바스크립트 코드가 실행되지 않을 테니 당연한 구조이다.

```js
try {
  // parse-time error
  {/=234...
} catch (error) {
  console.error(error);
}

// Uncaught SyntaxError: Invalid regular expression: missing /
```

자바스크립트 엔진은 코드를 다 읽고 난 후 코드를 실행한다. 코드를 읽는 도중 발생한 에러는 'parse-time 에러' 라고 부르며, 엔진은 이 코드를 이해할 수 없어 parse-time 에러는 코드 안에서 복구가 불가능하다.

`try...catch` 는 유효한 코드에서 발생하는 에러만 처리할 수 있다. 이러한 에러를 '런타임 에러(runtime error)' 혹은 '예외(exception)'라고 부른다.

### try...catch는 동기적으로 동작한다

`setTimeout` 이나 `Promise` 처럼 비동기적으로 동작하는 코드에서 발생한 에러는 `try...catch` 에서 잡아낼 수 없다.

```js
try {
  setTimeout(() => {
    noSuchVariable;
  }, 1000);
} catch (error) {
  console.log("에러 발생");
}
```

위처럼, `setTimeout` 에 넘겨진 함수는 엔진이 `try...catch` 문을 벗어난 뒤 실행되기 때문에 **비동기적으로 동작하는 코드 내부**에 `try...catch` 문을 구현해야 한다.

```js
// 에러 발생
setTimeout(() => {
  try {
    noSuchVariable;
  } catch (error) {
    console.error("에러 발생");
  }
}, 1000);
```

### 선택적 catch 바인딩

에러에 대한 자세한 정보가 필요하지 않다면 `catch` 에서 이를 생략 할 수 있다.

```js
try {
  // 실행될 코드
} catch {
  // 에러 발생 시 실행할 코드
}
```

### 에러 객체

`try` 블록에서 에러가 발생하면 자바스크립트는 에러에 대한 데이터를 담은 객체를 생성한다. 그리고 `catch` 블록에 이 객체를 인자로 전달한다.

```js
try {
  // 실행될 코드
} catch (error) {
  // <- 생성된 에러 객체, 다른 이름으로도 선언 가능
  // 에러 발생 시 실행할 코드
}
```

내장 에러 전체와 에러 객체는 두 가지 주요 프로퍼티를 가진다.

- `name` : 에러 이름, 정의되지 않은 변수 때문에 발생한 에러라면 `ReferenceError` 가 이름이 된다.
- `message` : 에러 상세 내용을 담고 있는 문자 메시지

표준은 아니지만 `name` 과 `message` 이외에 대부분의 호스트 환경에서 지원하는 프로퍼티가 있다. `stack` 은 가장 널리 사용되는 비 표준 프로퍼티중 하나로 현재 호출 스택, 에러를 유발한 중첩 호출들의 순서 정보를 가진 문자열이다. 보통 디버깅 목적으로 사용한다.

### 직접 에러 만들어 던지기

문법이 잘못되지 않았지만, 코드 내에서 직접 에러를 발생시켜줘야 할 상황도 있다.

```js
const json = '{ "이름": "민수" }';

try {
  const 사람 = JSON.parse(json);
  console.log(사람.직업);
} catch (error) {
  console.error("error");
}

// undefined
```

위 코드에서 `JSON.parse` 는 정상적으로 작동 하지만 '사람' 객체에 '직업' 프로퍼티가 없기 때문에 개발자가 의도한 상황이 아니다. 이러한 경우 에러를 발생해야 하지만 `undefined` 를 출력해 에러가 발생되지 않는다.

```js
const json = '{ "이름": "민수" }';

try {
  const 사람 = JSON.parse(json);
  if (!사람.직업) {
    throw new Error("해당 프로퍼티가 존재하지 않습니다.");
  }
  console.log(사람.직업);
} catch (error) {
  console.error(error.message);
}

// 해당 프로퍼티가 존재하지 않습니다.
```

그렇다면 `throw` 연산자를 사용해 직접 에러를 생성할 수 있다. 위 코드는 `사람.직업` 이 없는지 확인해서 `throw` 연산자를 사용해 인자로 넣어준 메세지를 가진 에러를 생성했다.

```js
throw <error object>
```

이론적으로 숫자, 문자열과 같은 원시형 자료를 포함한 어떤 것이든 에러 객체로 사용할 수 있지만 내장 에러와의 호환을 위해 되도록 에러 객체에 `name` 과 `message` 프로퍼티를 넣어주는 것을 권장한다.

자바스크립트는 `Error`, `SyntaxError`, `ReferenceError`, `TypeError` 등의 표준 에러 객체 관련 생성자를 지원한다. 이 생성자를 이용해 아래와 같이 에러 객체를 만들 수 도 있다.

```js
const error = new Error("메세지1");
const syntaxError = new SyntaxError("메세지2");
const referenceError = new ReferenceError();

console.log(referenceError.name); // ReferenceError
console.log(error.message); // '메세지1'
console.log(syntaxError.message); // '메세지2'
console.log(referenceError.message); //
```

위 코드 작성 실험중 신기했던 점은 변수 `referenceError` 를 선언하고 `console.log(referenceError.message)` 를 출력하면 빈칸이 출력된다는 것이다! 에러임을 감지했기 때문에 에러를 출력하지 않는 것인가보다.

## try...catch...finally

에러 핸들링은 `try...catch` 뿐만 아니라 `finally` 라는 코드를 하나 더 가질 수 있다. `finally` 는 `try...catch` 의 에러가 catch 되던 에러없이 `try` 문이 끝나는 것과 상관 없이 무조건 `try...catch` 가 종료 후에 실행되는 블록이다.

```js
try {
  // 실행될 코드
} catch (error) {
  // 에러 발생 시 실행할 코드
} finally {
  // try블록 또는 catch블록 실행 후 무조건 실행
}
```

1. `try { ... }` 안의 코드가 실행된다.
2. 에러가 없다면, `try` 안의 코드가 마지막줄 까지 실행되고, `catch` 를 건너뛰어 `finally` 블록이 실행된다.
3. 에러가 있다면, `try` 안 코드의 실행이 중단되고, `catch (error)` 블록으로 제어 흐름이 넘어가며 변수 `error` 는 에러 객체를 반환한 뒤 `finally` 블록이 실행 된다!

`finally` 는 무언가를 실행하고, 실행 결과에 상관없이 실행을 완료하고 싶을 경우 사용한다. `try`나 `catch` 문에서 `return` 으로 강제로 블록을 종료시킨다고 해도 `finally` 는 실행된다.

`finally` 는 `catch` 절이 없는 `try...finally` 도 유용하게 사용할 수 있다. 에러를 처리하고 싶지 않지만, 시작한 작업이 마무리 되었는지 확실히 하고 싶은 경우 사용한다.

:::tip 최종 정리

1. `try...catch` 문은 얼핏보기에 `if...else` 와 비슷 하지만, 런타임 에러를 핸들링 할 수 있다.
2. `try...catch`는 동기적 동작 이기 때문에 내부에 비동기코드는 사용할 수 없음.
3. `catch ()` 프로퍼티를 사용하여 인자로 전달한 에러를 사용 할 수 있다.
4. `try...catch...finally` - 정상 : `try`가 실행되고 `finally` 실행 / 에러 : `catch`가 실행되고 `finally` 실행

:::

참고 [javascript.info](https://ko.javascript.info/)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/34)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-27 */}
