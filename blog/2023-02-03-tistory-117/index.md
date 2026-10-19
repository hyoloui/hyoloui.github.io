---
title: "모던 javascript - strict mode"
description: "암묵적 전역의 문제와 strict mode의 적용 방법, 전역 적용을 피해야 하는 이유, strict mode가 발생시키는 에러와 this·arguments 변화 정리."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

:::note

모던하게 JavaScript 코드를 작성하기 위해서는 strict mode(엄격 모드)

:::

<!--truncate-->

## strict mode

### strict mode란?

```js
function callMyName() {
  me = 'seung hyo';
}
callMyName();

console.log(me); // ?
```

위 코드에서 자바스크립트 엔진은 어떻게 동작할까?

1. 선언하지 않은 `me` 변수에 값 `'seung hyo'`를 할당했다.
2. JS 엔진은 `me`라는 변수가 어디에 선언되었는지 스코프 체인을 통해 검색한다.
3. `callMyName` 함수의 스코프에서 `me` 변수의 선언을 검색한다.
4. 검색에 실패한다.
5. `me` 변수를 검색하기 위해 `callMyName` 함수 컨텍스트의 상위 스코프(전역 스코프)에서 검색한다.
6. 변수의 선언이 어디에도 존재하지 않기 때문에 `ReferenceError`를 발생시킬 것 같지만 암묵적으로 전역 객체에 `me` 프로퍼티를 동적으로 생성한다.

이러한 현상을 **암묵적 전역(implicit global)** 이라고 한다. 개발자의 의도와는 상관없이 발생한 암묵적 전역은 **오류를 발생시키는 원인**이 될 가능성이 크다. 따라서 **반드시 `var`, `let`, `const` 키워드를 사용**해서 변수를 선언해야 한다!

하지만 우리는 오타, 문법 지식으로 인한 실수를 언제나 한다. 근본적인 원인을 해결하기 위해서는, 오류를 발생시키기 어려운 환경을 만들고 그 환경에서 개발하는 것이 해결책이 될 수 있다.

**ES5**부터 strict mode(엄격 모드)가 추가되었으며, 문법을 좀 더 엄격히 적용하고 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 **명시적인 에러를 발생**시킨다.

참고로 **ESLint** 같은 도구를 사용해도 유사한 효과를 얻을 수 있다. Next.js는 설치 시 옵션으로 설치하고, create-react-app은 자동으로 strict mode가 적용된다.

### strict mode의 적용

**전역의 선두에 추가**할 경우: 아래 코드는 전체 적용

```js
'use strict';

function callMyName() {
  me = 'seung hyo'; // ReferenceError : me is not defined
}
callMyName();

console.log(me);
```

**함수 몸체 선두에 추가**할 경우: 해당 함수, 중첩 함수 코드는 전체 적용

```js
function callMyName() {
  'use strict';

  me = 'seung hyo'; // ReferenceError : me is not defined
}
callMyName();
```

**코드의 선두가 아닌** 경우: 제대로 동작하지 않음

```js
function callMyName() {
  me = 'seung hyo'; // 에러 발생하지 않음
  'use strict';
}
callMyName();
```

### 전역에 strict mode를 적용하는 것은 피하자

3개의 스크립트가 있는 예제다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      // 1
      'use strict';
    </script>

    <script>
      // 2
      x = 1;
      console.log(x);
    </script>

    <script>
      // 3
      'use strict';

      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

위 예제처럼 **스크립트 단위**로 strict mode를 적용하면 **다른 스크립트에 영향은 없다**. 하지만 strict mode 스크립트와 non-strict mode **스크립트를 혼용하는 것은 오류를 발생**시킬 수 있다.

특히 외부 서드파티 **라이브러리를 사용하는 경우** 라이브러리가 non-strict mode인 경우도 있기 때문에 전역에 strict mode를 적용하는 것은 바람직하지 않다.

### strict mode가 발생시키는 에러

strict mode를 적용했을 때 에러가 발생하는 대표적인 사례다.

**암묵적 전역**

위 예시 코드와 같다. 선언하지 않은 변수를 참조하면 `ReferenceError`가 발생한다.

```js
(function () {
  'use strict';

  x = 100;
  console.log(x); // ReferenceError : x is not defined
})();
```

**변수, 함수, 매개변수의 삭제**

`delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`가 발생한다.

```js
(function () {
  'use strict';

  var name = 'seung hyo';
  delete name; // SyntaxError : Delete of an unqualified identifier in strict mode.

  function hi(a) {
    delete a; // SyntaxError : Delete of an unqualified identifier in strict mode.
  }
  delete hi; // SyntaxError : Delete of an unqualified identifier in strict mode.
})();
```

**매개변수 이름의 중복**

중복된 매개변수 이름을 사용하면 `SyntaxError`가 발생한다.

```js
(function () {
  'use strict';

  // SyntaxError : Duplicate parameter name not allowed in this context
  function hi(a, a) {
    return a + a;
  }
  console.log(hi(1, 2));
})();
```

**`with` 문의 사용**

`with` 문은 전달된 객체를 스코프 체인에 추가한다. 동일한 객체의 프로퍼티를 반복해서 사용할 때 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만 성능과 가독성이 나빠지는 문제가 있다. 따라서 `with` 문은 사용하지 않는 것이 좋다.

```js
(function () {
  'use strict';

  // SyntaxError : Strict mode code may not include a with statement
  with ({ a: 1 }) {
    console.log(a);
  }
})();
```

### strict mode 적용에 의한 변화

**일반 함수의 `this`**

strict mode에서 함수를 **일반 함수로서 호출하면 `this`에 `undefined`가 바인딩**된다. 생성자 함수가 아닌 일반 함수 내부에서는 `this`를 사용할 필요가 없기 때문이다. 이때 에러는 발생하지 않는다.

```js
(function () {
  'use strict';

  function Hi() {
    console.log(this); // undefined
  }
  Hi();

  function Hello() {
    console.log(this); // Hello
  }
  new Hello();
})();
```

<details>
<summary>실행 결과</summary>

```bash
undefined
Hello {}
```

</details>

원래의 경우 `this`는 `window`이지만, strict mode에서 일반 함수는 `undefined`다.

**`arguments` 객체**

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도 `arguments` 객체에 반영되지 않는다.

```js
(function (a) {
  'use strict';
  // 매개변수에 전달된 인수를 재할당하여 변경
  a = 2;

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
})(1);
```

<details>
<summary>실행 결과 (strict mode 적용 여부 비교)</summary>

```bash
# 'use strict' 적용: 재할당이 반영되지 않는다
Arguments [1, callee: (...), Symbol(Symbol.iterator): ƒ]

# 'use strict' 미적용: 재할당이 반영된다
Arguments [2, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

</details>

만약 `console.log(a)`를 출력했다면, 당연하게도 `2`를 출력한다.

:::tip 최종 정리

1. strict mode는 문제를 일으킬 수 있는 코드에 대해 **명시적인 에러를 발생**시킨다.
2. 적용할 때는 스코프를 반영하기 때문에 **블록문(몸체) 상단**에 선언해야 한다.
3. 라이브러리는 non-strict mode인 경우가 있으니, **전역에 strict mode를 적용하지 않도록** 한다.
4. strict mode가 발생시키는 에러는 4가지가 있다. 이것은 누가 봐도 에러를 일으킬 만한 것들이다.
5. strict mode를 적용하면 일반 함수에서 **`this`는 `undefined`** 이며, **`arguments` 객체는 재할당이 반영되지 않는다**.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/117)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-03 */}
