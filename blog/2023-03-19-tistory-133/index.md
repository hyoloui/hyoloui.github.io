---
title: "프로그래머스 - 최댓값 만들기 (2)"
description: "배열에서 두 수를 곱해 만들 수 있는 최댓값을 구하는 문제. 음수끼리 곱한 값이 더 큰 경우를 놓쳐 실패한 뒤 해결한 과정."
authors: [hyoloui]
tags: [algorithm]
---

:::note 목적

Javascript로 Algorithm 문제풀이 한 과정을 기록합니다. 나만의 해결방법을 공유합니다.

:::

<!--truncate-->

## 문제

정수 배열 `numbers`가 매개변수로 주어집니다. `numbers`의 원소 중 두 개를 곱해 만들 수 있는 최댓값을 return하도록 `solution` 함수를 완성해주세요.

**제한사항**

- -10,000 ≤ `numbers`의 원소 ≤ 10,000
- 2 ≤ `numbers`의 길이 ≤ 100

**입출력 예**

| numbers                     | result |
| --------------------------- | ------ |
| `[1, 2, -3, 4, -5]`         | 15     |
| `[0, -31, 24, 10, 1, 9]`    | 240    |
| `[10, 20, 30, 5, 5, 20, 5]` | 600    |

- 입출력 예 #1: 두 수의 곱중 최댓값은 -3 \* -5 = 15 입니다.
- 입출력 예 #2: 두 수의 곱중 최댓값은 10 \* 24 = 240 입니다.
- 입출력 예 #3: 두 수의 곱중 최댓값은 20 \* 30 = 600 입니다.

## 풀이

```js title="solution.js"
function solution(numbers) {
  // 내림차순 정렬을 해놓은 변수를 하나 만든다.
  const sortNumbers = numbers.sort((a, b) => b - a);

  // index로 첫번째와 두번째 원소에 접근해 둘을 곱한다.
  return sortNumbers[0] * sortNumbers[1];
}
```

## 결과

<details>
<summary>실행 결과</summary>

```bash
테스트 1
입력값 〉 [1, 2, -3, 4, -5]
기댓값 〉 15
실행 결과 〉 실행한 결괏값 8이 기댓값 15과 다릅니다.

테스트 2
입력값 〉 [0, -31, 24, 10, 1, 9]
기댓값 〉 240
실행 결과 〉 테스트를 통과하였습니다.

테스트 3
입력값 〉 [10, 20, 30, 5, 5, 20, 5]
기댓값 〉 600
실행 결과 〉 테스트를 통과하였습니다.

테스트 결과 (~˘▾˘)~
3개 중 2개 성공
```

</details>

맙소사...

음수의 경우를 생각해서 내림차순으로 정렬을 했는데 음수의 곱이 더 큰 경우를 생각하지 못했다.

1번 문제에서는 `[4, 2, 1, -3, -5]` 순서로 정렬됨.

## 해결 방법

```js title="solution.js"
function solution(numbers) {
  // 내림차순 정렬을 해놓은 변수를 하나 만든다.
  const descendingNumbers = numbers.sort((a, b) => b - a);
  const desMaxValue = descendingNumbers[0] * descendingNumbers[1];
  // 오름차순 정렬을 해놓은 변수도 만든다.
  const ascendingNumbers = numbers.sort((a, b) => a - b);
  const asMaxValue = ascendingNumbers[0] * ascendingNumbers[1];

  // 둘을 비교하여 큰 값을 리턴한다.
  return desMaxValue > asMaxValue ? desMaxValue : asMaxValue;
}
```

내림차순으로 양수의 최댓값을 구하고 오름차순으로 음수의 최댓값을 구했다.

이로써 둘의 값을 삼항연산자로 비교하여 큰 값을 리턴한다.

다른 풀이를 참고하려고 했지만 대부분 이중for문을 사용했다.. 나는 최대한 시간복잡도가 증가하지 않는 방법을 고안해서 선언된 값을 비교하여 리턴하는 방법으로 해결 해 보았다.

:::tip 최종 정리

1. `sort` 함수는 유용하게 쓰인다. 하지만 `a`, `b` 인자를 사용해 정렬해야 우리가 원하는 값을 얻을 수 있다.
2. 삼항연산자는 가독성을 떨어뜨릴 수 있지만 단순하게 비교대상이 2개라면 사용해도 나쁘지 않은 방법이다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/133)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-19 */}
