---
title: "자료구조, 알고리즘 - (배열)최댓값 찾기"
description: "숫자 배열에서 가장 큰 수를 찾는 문제를 sort, 이중 for문, 변수 대입 비교 세 가지 방법으로 풀어본 기록."
authors: [hyoloui]
tags: [algorithm]
---

❤️‍🔥TIL : Today I Learned

<!--truncate-->

## 최댓값 찾기

- Q. 다음과 같이 숫자로 이루어진 배열이 있을 때, 이 **배열 내에서 가장 큰 수를 반환**하시오.

> `[3, 5, 6, 1, 2, 4]`

```python
def find_max_num(array):
    # 이 부분을 채워보세요!
    return 1

# case.1
print("정답 = 6 / 현재 풀이 값 = ", find_max_num([3, 5, 6, 1, 2, 4]))
# case.2
print("정답 = 6 / 현재 풀이 값 = ", find_max_num([6, 6, 6]))
# case.3
print("정답 = 1888 / 현재 풀이 값 = ", find_max_num([6, 9, 2, 7, 1888]))
```

## 나의 풀이

1. array를 **`sort()`** 함수로 순서대로 정리
2. `array[-1]` 를 출력 (리스트 중 가장 마지막)

```python
input = [3, 5, 6, 1, 2, 4]

def find_max_num(array):
    array.sort() # 배열 숫자 순서대로 정리 [1, 2, 3, 4, 5, 6]
    return array[-1] # 배열[-1]로 마지막 반환 [6]

result = find_max_num(input)
print(result)
```

## 문제 해설

### case 1 : 이중 for문

```python
input = [3, 5, 6, 1, 2, 4]

def find_max_num(array):
    # 이 부분을 채워보세요!
    for num in array: # array에서 하나씩 돌면서 num에 넣기
        for compare_num in array: # 2중 for문으로, num과 비교할 compare_num 지정
            if num < compare_num: # 비교한 값(compare_num)이 더 크다면
                break # for문을 멈춤
        else: # for -> else는 멈춘 값을 반환
            return num # 멈춰있는 num을 그대로 반환

result = find_max_num(input)
print(result)
```

### case 2 : 변수 대입 비교대상 지정

```python
input = [3, 5, 6, 1, 2, 4]

# 풀이
def find_max_num(array):
    max_num = array[0] # max_num 에 array 첫번째 데이터(3) 대입
    for num in array: # array 를 하나씩 돌면서 num에 대입
        if num > max_num: # num 이 첫번째 array(3) 보다 크다면,
            max_num = num # max_num 변수에 num 을 대입(5). for문 이므로 array 를 하나씩 6, 1, 2, 4 돌며 비교

    return max_num # 최종 max_num 에 대입 되어있는 숫자를 반환

result = find_max_num(input)
print(result)
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/24)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-16 */}
