---
title: "모던 javascript - 배열 메서드"
description: "원본 배열을 변경하는 메서드와 변경하지 않는 메서드를 구분하며 isArray, indexOf, push, splice, slice, flat 등 주요 배열 메서드를 예제로 정리한 글."
authors: [hyoloui]
tags: [javascript]
---

TIL : Today I Learned

> 배열에는 원본 배열을 직접 변경하는 메서드와 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.

[Does it mutate?](https://doesitmutate.xyz/)

<!--truncate-->

## 배열 메서드

### mutator method? accessor method?

예제를 먼저 살펴보자.

```js
const 두시반에만든배열 = [1];

두시반에만든배열.push(2);

console.log(두시반에만든배열); // [1,2]
```

```js
const 세시에만든배열 = 두시반에만든배열.concat(3);

console.log(두시반에만든배열); // [1,2]
console.log(세시에만든배열); // [1,2,3]
```

`.push` 메서드는 `두시반에만든배열`을 직접 변경하여 값이 변하였고, `.concat` 메서드는 `세시에만든배열`을 변경하지 않고 값을 따로 복사해 왔다.

:::warning

원본 배열을 직접 변경하는 메서드는 외부 상태를 직접 변경하는 부수 효과가 있으므로 사용 시 주의해야 한다. 따라서 가급적 **원본 배열을 직접 변경하지 않는 메서드**를 사용하는 편이 좋다.

:::

### isArray (= 너 배열이냐?)

- 배열은 타입으로 나타나지 않고 `object`이기 때문에 `typeof` 연산자를 사용하지 못한다.
- 따라서 `isArray`를 사용하면 boolean으로 구분이 가능하다.

```js
Array.isArray([]); // true
Array.isArray([1, 2]); // true

Array.isArray(); // false
Array.isArray({}); // false
Array.isArray(null); // false
Array.isArray(1); // false
Array.isArray('Array'); // false
```

### indexOf (= 너 몇 번째임?)

요소를 검색하여 인덱스를 반환한다. (너무 좋은 메서드)

```js
const 성적표 = ['윤준호', '이승효'];

성적표.indexOf('이승효'); // 1 (등) ㅋㅋ
```

오렌지가 **없으면 `-1`을 반환**한다. 그래서 `-1`이라면 오렌지를 넣어주도록 만들었다.

```js
const 과일바구니 = ['사과', '바나나'];

if (과일바구니.indexOf('오렌지') === -1) {
  과일바구니.push('오렌지');
}

console.log(과일바구니); // ['사과', '바나나', '오렌지']
```

하지만 **`includes` 메서드**를 사용하면 가독성이 더 좋다.

```js
const 좋아하는색 = ['흰색'];

if (!좋아하는색.includes('검은색')) {
  좋아하는색.push('검은색');
}

console.log(좋아하는색); // ['흰색','검은색']
```

### push (= 배열에 따라 붙어)

mutates (원본 변경)

```js
const 새벽세시에만든배열 = [1, 2];

let 졸면서만든배열 = 새벽세시에만든배열.push(3, 4);
console.log(졸면서만든배열); // 4
// 의도한 것과 다름... 원본 배열의 변경된 length 값을 반환

console.log(새벽세시에만든배열); // [1, 2, 3, 4]
```

### pop (= 넌 빠져..)

mutates (원본 변경)

```js
const 두개짜리배열 = [1, 2];

let 뽑은거 = 두개짜리배열.pop();
console.log(뽑은거); // 2

console.log(두개짜리배열); // [1]
```

### unshift (= 새치기 개꿀잼)

mutates (원본 변경)

```js
const 선착순 = [1, 2];

let 나쁜친구들 = 선착순.unshift(3, 4);

console.log(나쁜친구들); // 4 == push처럼 변경된 length 값을 반환

console.log(선착순); // [3, 4, 1, 2]
```

### shift (= 1등 열외)

mutates (원본 변경)

```js
const 뺑뺑이 = ['윤준호', '이승효', '조희현', '김남규'];

let 일등 = 뺑뺑이.shift();
console.log(일등); // '윤준호'

console.log(뺑뺑이); // ['이승효', '조희현', '김남규']
```

### concat (= 합체)

```js
const num1 = [1, 2, 3];
const num2 = [4, 5, 6];
const num3 = [7, 8, 9];

const numbers = num1.concat(num2, num3);

console.log(numbers);
// results in [1, 2, 3, 4, 5, 6, 7, 8, 9]

const letters = ['a', 'b', 'c'];
const numbers2 = [1, 2, 3];

const alphaNumeric = letters.concat(numbers2);
console.log(alphaNumeric);
// results in ['a', 'b', 'c', 1, 2, 3]
```

참고로 `concat`보다는 전개 연산자(스프레드 문법)로 대체 가능하다.

### splice (= 삽입? 삭제? 수정? 별거 아님ㅋ)

mutates (원본 변경)

```js
// ---------- 삽입 ----------
const fruits = ['수박', '바나나', '망고', '두리안'];

const removed = fruits.splice(2, 0, '딸기', '사과');

console.log(fruits);
// ['수박', '바나나', '딸기', '사과', '망고', '두리안'];

console.log(removed);
// [];

// ---------- 삭제 ----------
const fruits2 = ['수박', '바나나', '망고', '두리안'];

const removed2 = fruits2.splice(2, 1);

console.log(fruits2);
// ['수박', '바나나', '두리안'];

console.log(removed2);
// ['망고'];

// ---------- 수정 ----------
const fruits3 = ['수박', '바나나', '망고', '두리안'];

const removed3 = fruits3.splice(1, 2, '멜론');

console.log(fruits3);
// ['수박', '멜론', '두리안'];

console.log(removed3);
// ['바나나', '망고'];
```

### slice (= 복사)

```js
const numbers = [1, 2, 3, 4, 5];
// 양수 index    0, 1, 2, 3, 4

console.log(numbers.slice()); // index 0부터 추출(0, undefined, null 동일 동작)
// expected : [1, 2, 3, 4, 5] 얕은 복사 가능!!!!!

console.log(numbers.slice(1)); // index 1부터 추출
// expected : [2, 3, 4, 5];

console.log(numbers.slice(-2)); // 마지막 요소부터 마지막에서 두 번째 요소까지 추출
// expected : [4, 5];

console.log(numbers.slice(99)); // 배열의 길이보다 클 경우 빈 배열
// expected : [];

console.log(numbers.slice(1, 4)); // index 1부터 index 4까지(index 4 제외) 추출
// expected : [2, 3, 4];

console.log(numbers.slice(2, -1)); // index 2부터 마지막에서 첫 번째 요소까지(마지막에서 첫 번째 요소 제외) 추출
// expected : [3, 4];

console.log(numbers.slice(2, 99)); // index 2부터 마지막 요소까지 추출(end가 배열의 길이보다 큼)
// expected : [3, 4, 5];
```

### join (= 너와 나의 연결 고리 그건 우리 안의 , )

```js
const 배열입니다 = [1, 2, 3, 4];

배열입니다.join(); // '1,2,3,4';

배열입니다.join(''); // '1234';

배열입니다.join(':'); // '1:2:3:4';
```

### reverse (= 어퍼)

mutates (원본 변경)

```js
const 빠따맞는순서 = [1, 2, 3];
const 형들부터 = 빠따맞는순서.reverse();

console.log(빠따맞는순서); // [3,2,1]
console.log(형들부터); // [3,2,1]
```

### fill (= 필라이트 아니고 필 메서드)

mutates (원본 변경)

```js
const array1 = [1, 2, 3, 4];

// 술 마신 사람 0으로
console.log(array1.fill(0));
// Expected output: Array [0, 0, 0, 0]

console.log(array1.fill(0, 2, 4));
// Expected output: Array [1, 2, 0, 0]

console.log(array1.fill(5, 0));
// Expected output: Array [1, 0, 0, 0]
```

### includes (= 이거 들어있음?)

```js
const 내지갑 = ['오만원', '천원'];

내지갑.includes('오만원'); // true
내지갑.includes('수표'); // false
```

### flat (= 배열 안에 숨어 있는 놈들 나와)

```js
const 좋은말로할때나와1 = [1, 2, [3, 4]];
좋은말로할때나와1.flat();
// [1, 2, 3, 4]

const 좋은말로할때나와2 = [1, 2, [3, 4, [5, 6]]];
좋은말로할때나와2.flat();
// [1, 2, 3, 4, [5, 6]]

const 기회는세번뿐 = [1, 2, [3, 4, [5, 6]]];
기회는세번뿐.flat(2);
// [1, 2, 3, 4, 5, 6]
```

하지만 간편하게 쓸 수 있는 `flat()`은 브라우저에 최적화가 되어 있지 않은 상태이므로 `[].concat()`을 사용하는 것이 속도 면에서 더 유리하다.

:::tip 최종 정리

1. `isArray` = 너 배열이니? / return boolean
2. `indexOf` = 너 몇 번째임? / return index 순번
3. `push` = 배열에 따라 붙어 / return 변경된 배열 length 값
4. `pop` = 배열 마지막 떼어내기 / return 떼어낸 값
5. `unshift` = 배열 맨 앞 새치기 / return 변경된 배열 length 값
6. `shift` = 일등 빠져 / return 배열의 첫 번째 값
7. `concat` = 배열 합치기 / return 합쳐진 새로운 배열
8. `splice` = 삽입, 삭제, 수정 가능 / return 배열에서 떼어낸 값
9. `slice` = 복사 가능 / return 복사한 값
10. `join` = 배열을 문자열로 / return 문자열
11. `reverse` = 배열 거꾸로 / return 거꾸로 된 배열
12. `fill` = 배열 채우기 / return 지정된 값으로 채운 배열
13. `includes` = 배열 요소에 있는지 확인 / return boolean
14. `flat` = 배열 안에 배열 꺼내기 / 기본값은 1 depth

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/138)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-27 */}
