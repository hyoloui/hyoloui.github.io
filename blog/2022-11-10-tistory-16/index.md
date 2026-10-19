---
title: "파이썬 기초 문법(1/2) - 변수, 문자열, 리스트, 딕셔너리"
description: "파이썬의 변수 선언과 자료형, 문자열 다루기, 리스트와 딕셔너리 사용법을 예제로 정리한 TIL."
authors: [hyoloui]
tags: [python]
---

:::note TIL : Today I Learned

파이썬 기초 문법 중 변수, 문자열, 리스트, 딕셔너리를 정리합니다.

:::

<!--truncate-->

## 변수 선언과 자료형

### 변수(variable) 선언

- 파이썬에서 새 변수를 만들 때는 `변수이름 = 값`의 형태로 씁니다.
- 변수는 '값'을 가리키는 것!
- 변수는 '메모리'에 연결되어 있다고 생각하는게 좋습니다!

```python
a = 3        # 3을 a에 넣는다.
print(a)
b = a        # a에 들어 있는 값인 3을 b에 넣는다.
print(b)
a = 5        # a에 5라는 새로운 값을 넣는다.
print(a, b)  # 5 3
```

그런데, 여기서 `c`의 값은 어떻게 나올까?

```python
a = 3
b = a
c = b
a = 5
b = 4

print(c)
```

#### 답은 `3`이다!

:::tip

변수를 대입하는 과정은 우리가 자주 하는 '복사' + '붙여넣기' 과정과 비슷하다! 그래서 최종적으로 `a = 5`, `b = 4`, `c = 3` 이다.

:::

### 숫자형과 자료형

자료형이란 프로그래밍을 할 때 쓰이는 숫자, 문자열 등 자료 형태로 사용하는 모든 것을 뜻합니다! 파이썬에서 어떤 '값'을 쓰는지 알아야 코딩을 할 수 있겠죠?

```python
a = 7
b = 2

a+b   # 9
a-b   # 5
a*b   # 14
a/b   # 3.5

a+3*b         # 13 (동시 연산을 할 경우 사칙연산의 순서대로!)
(a+3)*b       # 20 (소괄호를 이용해 우선 계산할 부분을 표시할 수 있어요!)
```

### Bool 자료형 - True or False

True 와 False / 참과 거짓 (js의 boolean 타입과 같습니다)

```python
a = True
print(a)

a = (3 > 2)
print(a) # True

a = (2 > 3)
print(a) # False

a = (3 == 2)
print(a) # False
```

## 문자열 다루기

문자열은 작은따옴표(`''`), 큰따옴표(`""`) 모두 가능하며, 시작과 끝은 통일합니다!

#### case 1

```python
# 문자 + 문자 = Do it!
first_name = 'Seunghyo'
last_name = 'Lee'

print(first_name, last_name)

a = '2'
b = 'hello'

print(a + b)
```

위처럼, 문자와 문자는 서로 합성이 됩니다.

#### case 2

```python
# 숫자 + 문자 = Don't

a = 2
b = 'hello'

print(a + b)
```

:::warning

오류가 발생해요

:::

#### case 3

```python
# 숫자 + 문자 = Don't

a = 2
b = '2'
print(a + b)
```

:::warning

오류가 발생해요. 이번에도 `a`는 숫자형인 2와, `b`는 문자열인 '2' 이기 때문에 오류 발생!

:::

#### case 4

```python
# 문자 + 문자 = Do it!
# 문자 : 연산이 되지 않고 텍스트를 합침

a = '2'
b = str(2)

print(a+b)
```

### 추가로 알고가기 - `len()`

`len()`이라는 함수인데요~ 유용하고 자주 쓰이는 함수에요.

```python
# len()
# 문자열의 길이(함수) : js Array.length 와 비슷하다

text = 'abcdefghijklmnopqrstuvwxyz'

result = len(text)

print(result)  # 26
```

### 인덱싱과 슬라이싱

인덱싱은 문자열의 순서를 나타내요! 또 인덱싱으로 해당 텍스트만 자르기를 할 수도 있어요!

```python
# 문자열[n] : 0부터 수를 센다

text = 'abcdefghijklmnopqrstuvwxyz'

result = text[1] # b - 인덱싱! 한글자!

# 슬라이싱
result = text[3:8] # defgh - 3-8 까지
result = text[3:] # defghijklmnopqrstuvwxyz - 3에서 끝까지
result = text[:8] # abcdefgh - 시작에서 8까지
result = text[:] # abcdefghijklmnopqrstuvwxyz - 처음부터 끝까지
```

### 특정 문자열로 자르기

```python
# 특정 문자열로 자르기
# split('')

myemail = 'abc123@naver.com'

domain = myemail.split('@')[1].split('.')[0]
print(domain) # naver
```

위처럼 우리가 흔히 쓰는 **이메일에서도 활용**이 가능해요!

1. `split`으로 `@` 기준 앞과 뒤를 나누면 `['abc123', 'naver.com']`
2. 인덱싱으로 뒷 배열을 가져오면 `'naver.com'`
3. 이후 또 다시 `split`으로 `.` 기준으로 나눠주면 `['naver', 'com']` 이겠죠?
4. 마지막으로 인덱싱으로 첫번째 배열인 `[0]`을 가져와주면 `naver`

## 리스트와 딕셔너리

### [리스트]

순서가 있는, 다른 자료형 값을 담는 방법입니다. js 와 다른점은 다른 타입도 담겨집니다! 신기하게 **리스트 안에 리스트**도 들어갈 수 있어요.

**리스트에 덧붙이기**

```python
# 리스트

a = [1, 2, 3]

a.append(5) # .append() == 덧붙이기
print(a)  # [1, 2, 3, 5]

# '리스트 안에 리스트'도 넣을 수 있네요
a.append([1, 2])
print(a)  # [1, 2, 3, 5,[1, 2]]

# a.append(6, 7) don't... 그래서
a += [6, 7]
print(a)  # [1, 2, 3, 5, [1, 2], 6, 7]

# + 추가
# 리스트 마지막 출력하기 => [-1]

a_list = [1, 5, 2, 6, 4, 9]

result = a_list[-1]
print(result) # 9
```

**리스트 정렬하기**

```python
# 리스트 정렬하기
a_list.sort()
print(a_list)  # [1, 2, 4, 5, 6, 9]

# 리스트 거꾸로
a_list.sort(reverse=True)
print(a_list)  # [9, 6, 5, 4, 2, 1]

# 요소가 리스트 안에 있는지 알아보기
search = (5 in a_list)
print(search) # True

search = (7 in a_list)
print(search) # False
```

### \{딕셔너리\}

딕셔너리는 **키(key)** 와 **밸류(value)** 의 쌍으로 이루어진 자료의 모임입니다. 영한사전에서 영어 단어를 검색하면 한국어 뜻이 나오는 것처럼요.

```python
# 딕셔너리 이름 = {"키(key)":"밸류(value)"}

a_dick = {'name':'hyo', 'age': 26, 'friend':['성범','민수','유민']}

result = a_dick['name']
print(result) # hyo

result = a_dick['age']
print(result) # 26

result = a_dick['friend']
print(result) # ['성범','민수','유민']

result = a_dick['friend'][1]
print(result) # 민수
```

**딕셔너리 업데이트, 딕셔너리 확인**

```python
# 값을 업데이트하거나 새로운 값을 넣을 수도 있어요!

a_dick['height'] = 180
print(a_dick) # {'name': 'hyo', 'age': 26, 'friend': ['성범', '민수', '유민'], 'height': 180}

# 요소가 딕셔너리에 있는지 확인
search2 = ('height' in a_dick)
search3 = ('weghit' in a_dick)
print(search2) # True
print(search3) # False
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/16)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-10 */}
