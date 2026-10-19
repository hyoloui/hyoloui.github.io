---
title: "파이썬 'Python' 이 뭐길래..."
description: "파이썬 설치의 의미, 변수·자료형·함수·조건문·반복문 기초 문법, 패키지와 가상환경 개념을 정리한 글."
authors: [hyoloui]
tags: [python]
---

강의에서 에디터는 PyCharm 을 사용하지만, 저는 vscode를 쓰고 있어 패키지 install 방법이 달랐습니다.

그래서 조금 애를 먹었지만..^^ 저와 같은 문제 먼저 해결하고 포스팅해주신 선배님의 vscode python 환경 세팅 방법으로 잘 적용 되었어요!

포스팅해주신 필자님께 감사드립니다! 링크는 맨 아래 있습니다.

<!--truncate-->

자, 이제 본론으로 들어가겠습니다!!

:::note 파이썬을 설치한다?

일종의 번역팩을 설치한다고 생각하면 됩니다. 컴퓨터는 101010001 과 같은 언어만 알아들을 수 있어요(어셈블리어라고 하죠!)

파이썬 문법으로 된 것을 101010001로 변환해줄 수 있도록, 번역 패키지를 설치하는 것입니다.

:::

- 파이썬 문법을 시작하기에 앞서..
  - 파이썬은 매우 직관적인 언어이고, 할 수 있는 것도 많습니다. 그런데, 개발자들도 모든 문법을 기억하기란 쉽지 않습니다. 오늘 배우는 것 외에 필요한 것들은 구글링해서 찾아보면 됩니다!

## 파이썬 기초공부

### 변수 & 기본연산

```python
a = 3         # 3을 a에 넣는다
b = a         # a를 b에 넣는다
a = a + 1     # a+1을 다시 a에 넣는다

num1 = a*b    # a*b의 값을 num1이라는 변수에 넣는다
num2 = 99     # 99의 값을 num2이라는 변수에 넣는다

# 변수의 이름은 마음대로 지을 수 있음!
# 진짜 "마음대로" 짓는 게 좋을까? var1, var2 이렇게?
```

### 자료형

**숫자, 문자형**

```python
name = 'bob'         # 변수에는 문자열이 들어갈 수도 있고,
num = 12             # 숫자가 들어갈 수도 있고,

is_number = True     # True 또는 False -> "Boolean"형이 들어갈 수도 있습니다.

#########
# 그리고 List, Dictionary 도 들어갈 수도 있죠. 그게 뭔지는 아래에서!
```

**리스트 형 (Javascript의 배열형과 동일)**

```python
a_list = []
a_list.append(1)         # 리스트에 값을 넣는다
a_list.append([2,3])     # 리스트에 [2,3]이라는 리스트를 다시 넣는다

# a_list의 값은? [1,[2,3]]
# a_list[0]의 값은? 1
# a_list[1]의 값은? [2,3]
# a_list[1][0]의 값은? 2
```

**Dictionary 형 (Javascript의 dictionary형과 동일)**

```python
a_dict = {}
a_dict = {'name':'bob','age':21}
a_dict['height'] = 178

# a_dict의 값은? {'name':'bob','age':21, 'height':178}
# a_dict['name']의 값은? 'bob'
# a_dict['age']의 값은? 21
# a_dict['height']의 값은? 178
```

**Dictionary 형과 List형의 조합**

```python
people = [{'name':'bob','age':20},{'name':'carry','age':38}]

# people[0]['name']의 값은? 'bob'
# people[1]['name']의 값은? 'carry'

person = {'name':'john','age':7}
people.append(person)

# people의 값은? [{'name':'bob','age':20},{'name':'carry','age':38},{'name':'john','age':7}]
# people[2]['name']의 값은? 'john'
```

### 함수

**함수의 정의 - 이름은 마음대로 정할 수 있음!**

```python
# 수학문제에서
f(x) = 2*x+3
y = f(2)
y의 값은? 7

# 참고: 자바스크립트에서는
function f(x) {
    return 2*x+3
}

# 파이썬에서
def f(x):
    return 2*x+3

y = f(2)
y의 값은? 7
```

**함수의 응용**

```python
def sum_all(a,b,c):
    return a+b+c

def mul(a,b):
    return a*b

result = sum_all(1,2,3) + mul(10,10)

# result라는 변수의 값은?
```

### 조건문

if / else 로 구성!

```python
def oddeven(num):         # oddeven이라는 이름의 함수를 정의한다. num을 변수로 받는다.
    if num % 2 == 0:      # num을 2로 나눈 나머지가 0이면
        return True       # True (참)을 반환한다.
    else:                 # 아니면,
        return False      # False (거짓)을 반환한다.

result = oddeven(20)
# result의 값은 무엇일까요?
```

```python
def is_adult(age):
    if age > 20:
        print('성인입니다')    # 조건이 참이면 성인입니다를 출력
    else:
        print('청소년이에요')  # 조건이 거짓이면 청소년이에요를 출력

is_adult(30)
# 무엇이 출력될까요?
```

### 반복문

:::note

파이썬에서의 반복문은, 리스트의 요소들을 하나씩 꺼내쓰는 형태입니다. 즉, 무조건 리스트와 함께 쓰입니다!

:::

```python
fruits = ['사과','배','감','귤']

for fruit in fruits:
    print(fruit)

# 사과, 배, 감, 귤 하나씩 꺼내어 찍힙니다.
```

살짝 응용해볼까요? - 과일 갯수 세기 함수

**리스트 예제**

```python
fruits = ['사과','배','배','감','수박','귤','딸기','사과','배','수박']

count = 0
for fruit in fruits:
    if fruit == '사과':
        count += 1

print(count)

# 사과의 갯수를 세어 보여줍니다.
```

```python
def count_fruits(target):
    count = 0
    for fruit in fruits:
        if fruit == target:
            count += 1
    return count

subak_count = count_fruits('수박')
print(subak_count) # 수박의 갯수

gam_count = count_fruits('감')
print(gam_count) # 감의 갯수
```

다른 예제를 살펴봅시다.

**딕셔너리 예제**

```python
people = [{'name': 'bob', 'age': 20},
          {'name': 'carry', 'age': 38},
          {'name': 'john', 'age': 7},
          {'name': 'smith', 'age': 17},
          {'name': 'ben', 'age': 27}]

# 모든 사람의 이름과 나이를 출력해봅시다.
for person in people:
    print(person['name'], person['age'])

# 이번엔, 반복문과 조건문을 응용한 함수를 만들어봅시다.
# 이름을 받으면, age를 리턴해주는 함수
def get_age(myname):
    for person in people:
        if person['name'] == myname:
            return person['age']
    return '해당하는 이름이 없습니다'

print(get_age('bob'))
print(get_age('kay'))
```

## 파이썬 패키지 설치하기

파이썬 패키지(package)란? 라이브러리와는?

:::note 패키지와 라이브러리

Python 에서 패키지는 모듈(일종의 기능들 묶음)을 모아 놓은 단위입니다. 이런 패키지의 묶음을 라이브러리라고 볼 수 있습니다. 지금 여기서는 외부 라이브러리를 사용하기 위해서 패키지를 설치합니다.

:::

### 가상 환경(virtual environment) 이란? - 프로젝트별로 패키지들을 담을 공구함

:::warning 문제상황

회사에서는 패키지 A, B, C를 설치해서 쓰고, 개인 프로젝트에서는 패키지 B, C, D, E를 설치해서 쓰고 있었어요.

그런데 회사팀장님이 B를 이전 버전인 B' 로 쓰자고 하시네요. 그렇게 되면, 같은 컴퓨터에 깔려 있는 개인 프로젝트에서는 B'로 쓰면 코드를 다 바꿔야 해요 😭

어떻게 하면 좋을까요?

:::

:::tip 해결책

다 담아둘 필요 없이 공구함을 2개 만들어서, 공구함1에 A, B', C를 담아두고, 공구함2에 B, C, D, E를 담아두고 쓰면 관리하기 편하겠죠?

그래서, 가상환경이라는 개념이 등장했습니다. 즉, **프로젝트별 공구함**이에요.

:::

정리하자면, **가상환경(virtual environment)** 은 같은 시스템에서 실행되는 다른 파이썬 응용 프로그램들의 동작에 영향을 주지 않기 위해, 파이썬 배포 패키지들을 설치하거나 업그레이드하는 것을 가능하게 하는 **격리된 실행 환경**입니다.

출처 : [파이썬 공식 용어집 - 가상환경](https://docs.python.org/ko/3/glossary.html#term-virtual-environment)

## vscode python 환경 세팅

강의에서 에디터는 pyCharm 을 사용하지만, 저는 vscode를 쓰고 있어 패키지 install 방법이 달랐습니다.

그래서 조금 애를 먹었지만..^^ 저와 같은 문제 해결하신 선배님의 포스팅으로 vscode python 환경 세팅 잘 해주었네요~~

포스팅해주신 필자님께 감사드립니다!

[velog - 웹개발 종합반 3주차에서 배운 것 1/3](https://velog.io/@matt2550/%EC%9B%B9%EA%B0%9C%EB%B0%9C-%EC%A2%85%ED%95%A9%EB%B0%98-3%EC%A3%BC%EC%B0%A8%EC%97%90%EC%84%9C-%EB%B0%B0%EC%9A%B4-%EA%B2%83-13)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/8)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-06 */}
