---
title: "파이썬 기초 문법(2/2) - 조건문, 반복문, 함수"
description: "파이썬의 if 조건문, for 반복문(enumerate, break), 함수 정의와 return을 연습문제와 함께 정리한 TIL."
authors: [hyoloui]
tags: [python]
---

:::note TIL : Today I Learned

파이썬 기초 문법 중 조건문, 반복문, 함수를 정리합니다.

:::

<!--truncate-->

## 조건문

### if 문 (if, elif, else)

조건을 만족했을 때만 특정 코드를 실행하도록 하는 문법입니다.

```python
# 조건문

라면 = 5000

if 라면 > 3800:
  print('국수를 사자')
elif 라면 > 1900:
  print('라면을 사자')
else :
  print('라면을 두개 살 수 있어 >.<')

# 이렇게 머릿속에 한번 떠올리면 쉽게 이해 할 수 있어요!

if : 이게 맞아?
elif : 그럼 이건?
elif : 그럼 이건?
.
.
.
else : 이거라도...
```

그런데, 로직을 구성 할 때 잘 생각해봐야 해요. 1번 조건, 2번 조건, 3번 조건을 모두 통과하는 코드를 짜면 데이터 효율이 떨어지겠죠?

그래서 가장 **신속하게 실행될 수 있는(조건의 확률이 높은) 코드를 우선으로**, 우선순위가 높은 코드는 조건문 상단으로 위치하는게 효율적이죠!

:::warning 들여쓰기

앗! 참고로 파이썬은 들여쓰기가 엄청 중요해요! 자바스크립트와는 다르게 `{}` 가 없어서 들여쓰기에 따라 내용물이 달라지거든요!

:::

## 반복문

### for 문

`for '데이터' in '리스트, 딕셔너리'`

반복문은 쓰이는 일도 많고 중요해서 연습문제가 있습니다!

```python
# 반복문

점심메뉴 = ['신라면', '진라면', '너구리', '짜빠게티', '불닭볶음면']

for 라면 in 점심메뉴:
  print(라면)
# 신라면 진라면 너구리 짜빠게티 불닭볶음면
```

자 여러분이 기다리시던(?) 재미있는(..?) **라면예제** 나갑니다!!!

```python
# 라면예제
라면종류 = [
    {'name': '신라면', 'history': 30},
    {'name': '진라면', 'history': 26},
    {'name': '너구리', 'history': 21},
    {'name': '짜빠게티', 'history': 16},
    {'name': '불닭볶음면', 'history': 9},
    {'name': '삼양라면', 'history': 57},
    {'name': '쇠고기면', 'history': 32},
    {'name': '스낵면', 'history': 11}
]

# 모든 라면 종류별로 다 보여줘
for 라면 in 라면종류:
  name = 라면['name']
  history = 라면['history']
  print(name, history)
```

<details>
<summary>실행 결과</summary>

```bash
신라면 30
진라면 26
너구리 21
짜빠게티 16
불닭볶음면 9
삼양라면 57
쇠고기면 32
스낵면 11
```

</details>

```python
# for문 안에 if문 조합!
# 라면 역사가 20년 이상 된 라면만 보여줘
for 라면 in 라면종류:
  name = 라면['name']
  history = 라면['history']
  if history > 20:
    print(name, history)
```

<details>
<summary>실행 결과</summary>

```bash
신라면 30
진라면 26
너구리 21
삼양라면 57
쇠고기면 32
```

</details>

### enumerate 와 break

이것도 알아두시면 좋아요!

```python
# i, enumerate(), break - for를 돌면서 리스트에 순서를 붙여줌
# 데이터가 많은 작업을 할 때 쓰기 좋음! ex) 라면종류 100000개.. 로딩시간 오래걸림

for i, 라면 in enumerate(라면종류):
    name = 라면['name']
    history = 라면['history']
    print(i, name, history)
    if i > 2:
        break

# 0 신라면 30
# 1 진라면 26
# 2 너구리 21
# 3 짜빠게티 16
```

### 연습 1

```python
# 짝수 출력하기

num_list = [1, 2, 3, 6, 3, 2, 4, 5, 6, 2, 4]
count = 0

for num in num_list:
  if num % 2 == 0:
    count += 1

print(count)
# 7
```

`count`라는 변수를 이용해 2로 나눠지는 수가 나올 때마다 1씩 대입연산 해주는 for문 이에요~

### 연습 2

```python
# 리스트에 있는 모든 숫자 더하기

num_list = [1, 2, 3, 6, 3, 2, 4, 5, 6, 2, 4]
sum = 0

for num in num_list:
    sum += num

print(sum)
# 38
```

이것도 `sum` 변수에 대입연산자 활용하여 리스트를 하나씩 돌면서 `sum`에 대입해주는 문제입니다!

처음부터 어렵게 생각하지 말고 천천히 보다보면 재미있어요~

### 연습 3

```python
# 리스트에 있는 자연수중 가장 큰 숫자 구하기
num_list = [1, 2, 3, 6, 3, 2, 4, 5, 6, 2, 4]

# 내가 푼 식
num_list.sort()
print(num_list[-1])
# 6


# 해설
max = 0
for num in num_list:
    if max < num:
        max = num
print(max)
# 6
```

같은 정답이 나오지만 이렇게 푸는 방식은 **천차만별입니다**! 이래서 **알고리즘** 문제풀이가 재미있어요(..?롸?)

저의 풀이는 `sort()` 함수를 이용했어요!

1. 리스트를 순차적으로 정렬하기
2. 리스트 맨 마지막 인덱스 가져오기

해설은 위에 있는 연습문제들과 같은 유형으로 풀었네요!

1. 0을 가진 변수 `max` 를 만들기
2. for 문을 이용해 리스트를 하나씩 돌기
3. if 문으로 변수와 비교하기
4. 변수 `max` 보다 크다면 그 수를 변수에 대입
5. 이후 나머지 숫자들과 같은 방식으로 반복

## 함수

### def()

반복적으로 사용하는 코드들에 이름을 붙여놓은 것입니다! js 에서는 `function()` 이 있죠~

```python
# 함수
def hello():
  print('안녕!')
  print('좋은 날씨야')

hello()
hello()

# 안녕! 좋은날씨야 안녕! 좋은날씨야
```

### def(): return

```python
# return 을 만나면 해당 "변수는 return 으로 반환" 되어 값이 변환된다!
def sum(a,b):
  return a + b

result = sum(1,2)
print(result) # 3
```

### 함수와 조건문

조건문에 넣을 값을 바꿔가면서 결과를 확인할 때 쓰면 편합니다.

```python
# 함수와 조건문

def bus_rate(age):
  if age > 65:
    print('무료입니다')
  elif age > 20:
    print('성인입니다')
  else :
    print('청소년입니다')

bus_rate(15) # 청소년입니다.
bus_rate(33) # 성인입니다.
```

이제 응용해서 return 값을 반환 할 수도 있어요!

```python
# 함수와 조건문 2

def bus_rate(age):
  if age > 65:
    return 0
  elif age > 20:
    return 1200
  else :
    return 750

my_rate = bus_rate(66)
print(my_rate) # 0

my_rate = bus_rate(40)
print(my_rate) # 1200

my_rate = bus_rate(3)
print(my_rate) # 750
```

마지막 연습문제 입니다!

```python
# quiz 주민등록번호 뒷자리로 성별 판독하기!

def check_gender(pin):
    if int(pin.split('-')[1][0]) % 2 == 0:
        print('여성입니다.')
    else:
        print('남성입니다.')

my_pin = '200101-3012345'
check_gender(my_pin) # 남성입니다.
my_pin = '200101-4012345'
check_gender(my_pin) # 여성입니다.
my_pin = '200101-5012345'
check_gender(my_pin) # 남성입니다.
```

{/* 이 글은 Tistory(https://hyoloui.tistory.com/19)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-11 */}
