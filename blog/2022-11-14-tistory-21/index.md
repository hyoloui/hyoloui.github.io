---
title: "파이썬 심화 문법(2/3) - 파일 불러오기, 한줄의 마법, map과 filter + lambda식"
description: "파이썬의 import로 파일 불러오기, if·for 한 줄 쓰기, map·filter 함수와 lambda 식을 예제로 정리한 TIL."
authors: [hyoloui]
tags: [python]
---

:::note TIL : Today I Learned

파이썬 심화 문법 중 파일 불러오기, 한줄의 마법, map과 filter + lambda식을 정리합니다.

:::

<!--truncate-->

## 파일 불러오기

### `from "file" import "def"`

- `file` = 불러올 **파일**이름
- `def` = 불러올 **함수**이름
- ex) `from main_func import sum` (`main_func` 파일에서 `sum` 함수를 불러와~)

이 방법으로 `main.py` 에서는 **함수 선언이 없지만, 호출이 가능**합니다!

코드로 보시죠.

```python title="main.py"
# 현재파일은 main.py 입니다

from main_func import say_hi_to # main_func 파일에서 say_hi_to 함수 불러오기

say_hi_to('민수')
# '민수님 안녕하세요!'
```

```python title="main_func.py"
# 현재 파일은 main_func.py 입니다

def say_hi_to(name):
  print(f'{name}님 안녕하세요!')
```

그런데, 여기서 함수이름에 `*` (별모양) 을 작성하면, 해당 파일의 모든 함수를 가져옵니다! 또 그만큼 자주 쓰여요.

:::tip

`import` 는 '수입하다' 는 의미를 가지고 있으므로 앞으로 여러 코드를 보시면서 파일 상단에 `import` 구문이 있다면 아 어떤 파일에서 함수를 가져와서 쓰는구나~ 라고 이해하시면 됩니다!

:::

## 한줄의 마법

### if 문

한줄의 마법은 말처럼 if 문을 한줄로 쓴다~ 라는 의미입니다! 편하게 'if문 짧게쓰기', 'if문 최소화' 등으로 생각해 주세요 :)

```python
num = 3

if num % 2 == 0:
    result = '짝수'
else:
    result = '홀수'

print(f'{num}은 {result}입니다.')
# 3은 홀수입니다.
```

if 문이 무려 4줄! 너무 길다.. 줄여보자.

```python
num = 3

result = ('짝수' if num % 2 == 0 else '홀수')  # 한줄의 마법

print(f'{num}은 {result}입니다.')
# 3은 홀수입니다.
```

4줄이 한줄이 되는 마법이에요! 처음에는 가독성이 떨어진다고 생각 하실 수 있겠지만,

혹시 '슈퍼주니어 - 로꾸꺼' 노래 아시나요? '수박이박수', '여보안경안보여', '소주만병만주소'

노래의 가사처럼 양 끝을 보게 되더라구요. 양 끝으로 나눠서 보이면 조금 편하게 보이시나요?

:::tip

짝수 - 홀수 / if - else / `num % 2 == 0`

이것도 어렵다면 순서를 뒤집어서!

`num % 2 == 0` / if - else / 짝수 - 홀수

2로 나눈 숫자가 0 이라면 "짝수" 아니면 "홀수"

:::

### for 문

자 if 문도 줄였는데 for 문 이라고 안될게 있을까요? 위와 동일합니다! 바로 예제 보시죠 :)

`a_list` 가 for 문을 하나씩 돌면서 `b_list` 에 (`append` 함수 활용) 인자 x 2 되어 들어간다는 심플한 코드입니다!

```python
a_list = [1,3,2,5,1,2]
b_list = []

for a in a_list:
  b_list.append(a * 2)

print(b_list)
# [2, 6, 4, 10, 2, 4]
```

change!

```python
a_list = [1,3,2,5,1,2]
b_list = []

b_list = [a*2 for a in a_list]  # 한줄의 마법

print(b_list)
# [2, 6, 4, 10, 2, 4]
```

어떠신가요? 조금 감이 오시나요? 저도 코딩하면서 간단한 코드는 이렇게 작성하지만 **코드가 길어지면 주석으로 설명글을 적는편**이라 주로 위와 같은 코드는 아주 간단한 곳에서 빠르게 쓰곤 합니다.

하지만 여러 코드를 보다보면 가끔씩 등장하곤 합니다! ~~'아니 저게 대체 무슨 코드야?'~~

당황하지 마시고 '한줄의 마법' 을 떠올려 해석해 보세요 😎

## map, filter + lambda 식

### map(a, b)

`map` 함수는 for 문의 업그레이드 버전! 자료형(데이터)을 다룰 때 for 문으로 인자를 하나씩 돌 수 있었죠? 그럴 때 쓰는 자료(리스트, 객체)를 가져와 `a` 함수에 하나씩 대입해주는 함수입니다!

리스트로 작성된 데이터를 예시로 보여드리겠습니다.

```python
# people 에서 성인과 청소년으로 나눠 보겠습니다!
people = [
    {'name': 'bob', 'age': 20},
    {'name': 'carry', 'age': 38},
    {'name': 'john', 'age': 7},
    {'name': 'smith', 'age': 17},
    {'name': 'ben', 'age': 27},
    {'name': 'bobby', 'age': 57},
    {'name': 'red', 'age': 32},
    {'name': 'queen', 'age': 25}
]

def check_adult(person):
    return '성인' if person['age'] >= 20 else '청소년'

result = map(check_adult, people)

print(list(result))
# 위에서 list()로 묶은 이유는 map(check_adult, people)의 함수가
# 아직 데이터(리스트) 형식으로 변환이 안되어 다시 데이터로 변환해야 하기 때문입니다.ex) a => ['a']

# ['성인', '성인', '청소년', '청소년', '성인', '성인', '성인', '성인']
```

### lambda 식

위에서 함수 선언과, `result` 에 `map()` 대입을 한번에 해결할 수 있습니다. `map` 안에 들어올 수 있는 하나의 옵션 이라고 생각할 수 있겠네요 :)

```python
# map + lambda 식
result = map(lambda person: ('성인' if person['age'] >= 20 else '청소년'), people)

print(list(result))
# ['성인', '성인', '청소년', '청소년', '성인', '성인', '성인', '성인']
```

같은 값이 나오죠? 😄

### filter(a, b)

`map` 에서는 변환된 값을 가져오는 함수라면, `filter` 는 원본 그대로의 값 즉, True 인자만 뽑아오는 함수 입니다!

이번에도 lambda 식으로 작성 해 보겠습니다!

```python
# filter(): true 인자들만 뽑아오기
result = filter(lambda x: x['age'] > 20, people)

print(list(result))
```

위에서 배운 `map` 과 마찬가지로 `list` 변환 필요하구요,

lambda 식은 **for 문이랑 같은 성격**을 가졌습니다. `people` 로 받은 데이터를 하나씩 인자(`x`) 로 돌려라!!

하지만 위 `map` 에서는 첫 설명이다보니 가독성을 위해 `person` 으로 작성했지만, 관행적으로 `(lambda x: x, data)` 매개변수는 `x` 를 쓰곤 합니다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/21)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-14 */}
