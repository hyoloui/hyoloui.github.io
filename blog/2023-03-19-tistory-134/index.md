---
title: "프로그래머스 - 직각삼각형 출력하기"
description: "별(*)로 직각 이등변 삼각형을 출력하는 문제를 이중 for문 대신 문자열 repeat 메서드로 푼 과정."
authors: [hyoloui]
tags: [algorithm]
---

:::note 목적

Javascript Algorithm 문제풀이 과정을 기록합니다. 나만의 해결방법을 공유합니다.

:::

<!--truncate-->

## 문제

`"*"`의 높이와 너비를 1이라고 했을 때, `"*"`을 이용해 직각 이등변 삼각형을 그리려고합니다. 정수 `n` 이 주어지면 높이와 너비가 `n` 인 직각 이등변 삼각형을 출력하도록 코드를 작성해보세요.

**제한사항**

- 1 ≤ `n` ≤ 10

**입출력 예**

입력 #1

```
3
```

출력 #1

```
*
**
***
```

`n`이 3이므로 첫째 줄에 `*` 1개, 둘째 줄에 `*` 2개, 셋째 줄에 `*` 3개를 출력합니다.

## 풀이

```js title="solution.js"
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input = line.split(' ');
}).on('close', function () {
  // n으로 받은 값 저장
  // for문으로 n까지 반복
  // 내부에서 repeat 메서드 활용하여 "*"을 i만큼 반복
});
```

## 결과

<details>
<summary>실행 결과</summary>

```bash
테스트 1
입력값 〉 "3"
기댓값 〉 "*
          **
          ***"
실행 결과 〉 테스트를 통과하였습니다.
출력 〉
*
**
***

테스트 결과 (~˘▾˘)~
1개 중 1개 성공
```

</details>

## 해결 방법

```js title="solution.js"
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input = line.split(' ');
}).on('close', function () {
  // n으로 받은 값 저장
  const n = Number(input[0]);
  // for문으로 n까지 반복
  for (let i = 1; i <= n; i++) {
    // 내부에서 repeat 메서드 활용하여 "*" i만큼 반복
    console.log("*".repeat(i));
  }
});
```

`n`은 입력받은 값 3이 출력되었다. 이것을 활용하여 1, 2, 3 ... `n` 만큼 반복해서 출력해줘야 한다.

```
1
---
2
---
3
```

그래서 `for`문을 사용했고, `i`는 증가연산자로 `n`까지 증가하기 때문에 해당하는 라인의 숫자를 기억할 수 있다.

하지만 `i` 만큼 `"*"`를 출력하기 위해 다른 대부분의 풀이에서는 또 `for`문이 등장하여 이중포문의 형태로 문제풀이가 되었다.

나는 이중포문을 좋아하지 않기 때문에 분명 number만큼 반복하는 내부함수 있을 것 같아 바로 구글링을 통해 `repeat`라는 함수를 활용했고 원하는 결과값을 얻을 수 있었다.

:::tip 최종 정리

1. `repeat` 함수를 이용해 number만큼 입력한 문자열을 반복할 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/134)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-19 */}
