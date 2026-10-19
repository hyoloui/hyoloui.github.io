---
title: ".require과 import의 차이점 / 배열 또는 객체를 const로 선언 후 요소나 속성을 추가할 수 있는 이유"
description: "CommonJS require와 ES6 import의 차이, 그리고 const로 선언한 배열·객체에 요소를 추가할 수 있는 이유(참조 타입)를 정리한 글."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

> `require`와 `import`의 차이점, 배열·객체를 `const`로 선언 후 요소나 속성을 추가할 수 있는 이유

<!--truncate-->

## require와 import의 차이점과 상황 예시

- **`require`**: CommonJS 키워드. NodeJS가 채택
  - CommonJS: 자바스크립트 언어의 활동 영역을 확장하기 위해 조직된 그룹
  - `module.exports` 객체에 모듈 전체를 내보내고 `require`를 통해 모듈을 불러오는 방식 → 불필요한 모듈 로드 가능성

```text
require : 가져오기
exports : 내보내기
module.exports : 내보내기
```

- **`import`**: ES6 키워드

  ```text
  import : 가져오기
  export : 내보내기
  export default : 내보내기
  ```

  - 파일 시작 부분에서만 호출 가능
  - 모듈 내 정의된 특정 부분만을 불러올 수 있음 → `require`에 비해 성능 우수, 메모리 절약

```js
const example = require('example');
// 외부 파일이나 라이브러리를 불러오는 작업을 수행하는 것은 동일
import example from 'example';
// import 키워드 사용하여 명시적으로 모듈을 불러옴
```

- **`import` 키워드의 한계**: `<script>` 태그 사용 브라우저 환경, NodeJS 환경 → 위와 같이 ES6 사양을 지원하지 않는 환경, Babel과 같은 인터프리터가 없을 때 `require` 사용
  - Babel: ES6 코드 변환 도구

### 결론

- `require`는 Node.js에서 사용되고 있는 CommonJS 키워드이고,
- `import`는 ES6에서 새롭게 도입된 키워드입니다.
- 다른 파일(모듈)의 코드를 불러온다는 동일한 목적을 가지고 있지만 `require`는 `exports` 변수의 속성으로 내보낼 함수를 세팅해야 하고 모듈 전체를 불러옵니다. `import`와 `export`는 ES6 사양을 지원하는 환경에서 동작하며, 모듈 내 필요한 부분만 불러올 수 있습니다.

## 배열, 객체를 const로 선언 후 요소나 속성을 추가할 수 있는 이유

- `const` 키워드: 변수의 재선언 및 재할당 불가 (배열, 객체 이외)
  - `push`, `pop`: 재할당/재선언이 아님

```js
const arr = [1, 2, 3];
arr.pop();
arr[1] = 5; // [1,5]
```

- 배열, 객체는 참조값을 저장하기 때문에 가능 → 메모리 주소를 할당
  - `const` 키워드로 배열, 객체 선언 → 배열의 포인터를 지정
  - `push`, `pop` 등의 메서드는 포인터를 변경하는 것이 아닌 메모리에 접근하여 가리키고 있는 배열, 객체를 수정하는 것

### 결론

배열과 객체는 메모리에 할당될 때 원시 타입이 아닌 참조 타입으로 데이터의 주소값이 할당되게 됩니다. 그래서 가변값을 갖게 되고 해당 주소의 영역이 별도로 존재하여 요소는 변할 수 있습니다.

1. 배열과 객체는 참조값을 저장하기 때문에 요소를 컨트롤할 수 있고, `push`, `pop` 등의 메서드는 포인터를 변경하는 것이 아닌 메모리에 접근하여 가리키고 있는 배열, 객체의 요소를 수정합니다.

:::tip 최종 정리

1. `require`는 Node.js에서 사용되고 있는 CommonJS 키워드이고, `import`는 ES6에서 새롭게 도입된 키워드입니다.
2. 두 키워드는 모두 모듈을 불러오는 것은 동일하지만, Babel과 같은 인터프리터가 없을 때 `require`를 사용하고 `import`는 특정 부분만 불러올 수 있어 성능이 우수하고 메모리 절약에 효과적입니다.
3. 배열과 객체는 메모리에 할당될 때 원시 타입이 아닌 참조 타입으로 데이터의 주소값이 할당되게 됩니다. 그래서 가변값을 갖게 되고 해당 주소의 영역이 별도로 존재하여 요소는 변할 수 있습니다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/160)에서 옮겨 온 글입니다. 원문 작성일: 2023-04-03 */}
