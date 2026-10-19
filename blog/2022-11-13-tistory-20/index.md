---
title: "파이썬 심화 문법(1/3) - 튜플, 집합, f-string, 예외처리"
description: "파이썬의 튜플과 집합, f-string 문자열 포매팅, try-except 예외처리를 예제로 정리한 TIL."
authors: [hyoloui]
tags: [python]
---

:::note TIL : Today I Learned

파이썬 심화 문법 중 튜플, 집합, f-string, 예외처리를 정리합니다.

:::

<!--truncate-->

## '튜플'과 '집합'

### 튜플 `()`

- 파이썬에서 새 변수를 만들 때는 `변수이름 = 값`의 형태로 씁니다.
- 변수의 형태중에 `변수이름 = [리스트]`가 있고, `변수이름 = {딕셔너리}`가 있었습니다.
- 튜플은 **리스트와 비슷하지만 불변**인 자료형 입니다. 마찬가지로 순서가 존재하구요.

튜플은 소괄호 안에 작성합니다. 예시를 보겠습니다!

```python
# 1 - [리스트] 수정 가능
카페 = ['스타벅스', '이디야', '더리터']

카페[1] = '엔젤리너스'
print(카페) # ['스타벅스', '엔젤리너스', '더리터']


# 2 - (튜플) - 삽입, 추가, 삭제 불가
카페 = ('스타벅스', '이디야', '더리터')

카페[1] = '엔젤리너스' # 이건 안됨
print(카페) # ['스타벅스', '엔젤리너스', '더리터']
```

:::tip

js의 `const` 와 유사하다고 생각하면 되겠네요😄

:::

### 집합 (set)

집합은 아주 편리해요! **중복을 제거하는 함수**입니다!

```python
# 집합 (set) - 중복을 제거한다!
# 1
숫자 = [1, 2, 3, 5, 4, 6, 7, 1, 3, 5, 2]

숫자_셋 = set(숫자)
print(숫자_셋) # {1, 2, 3, 4, 5, 6, 7}
```

응용해서 **합집합**과 **교집합**을 출력할 수도 있어요!

```python
# 2
a = ['사과', '감', '배', '수박', '딸기']
b = ['배', '사과', '포도', '참외', '수박']

a_set = set(a)
b_set = set(b)

# 교집합
print(a_set & b_set) # {'사과', '배', '수박'}
# 합집합
print(a_set | b_set) # {'참외', '수박', '감', '사과', '포도', '배', '딸기'}
```

## f-string

### 문자열 포매팅 (f-string formatting)

js 백틱으로 감싸는 기능과 같다고 할 수 있어요!

```python
# f-string
# 굉장히 자주 쓰임!!! js `${variable}` 과 같은 기능!

scores = [
    {'name': '영수', 'score': 70},
    {'name': '영희', 'score': 65},
    {'name': '기찬', 'score': 75},
    {'name': '희수', 'score': 23},
    {'name': '서경', 'score': 99},
    {'name': '미주', 'score': 100},
    {'name': '병태', 'score': 32}
]

for s in scores:
    name = s['name']
    score = s['score']

# print(name +'의 점수는 '+ str(score) +'점 입니다.')
print(f'{name}의 점수는 {score}점 입니다.')

# 위에는 기존 프린트 방식이고, 아래는 f-string 적용 구문입니다.
```

## 예외처리

### try - except 문

남용하면 무슨 에러가 나는지 모른다.. 그래서 자주 쓰지 않는게 좋아요.

- `try` : 실행할 코드
- `except` : 에러를 대체할 코드

```python
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby'}, # 'age' 삭제
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

for person in people:
  try:
    if person['age'] > 20: # age 가 20보다 크면 출력!
      print(person['name'])
  except:
    print(person['name'],'에러입니다.')

# carry
# ben
# bobby 에러입니다.
# red
# queen
```

이해하기 쉽게, **오류를 처리하는 if 와 else** 라고 생각하시면 좋을 것 같네요 😄

{/* 이 글은 Tistory(https://hyoloui.tistory.com/20)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-13 */}
