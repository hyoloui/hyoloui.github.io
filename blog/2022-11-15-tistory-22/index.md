---
title: "파이썬 심화 문법(3/3) - 함수(def) 심화, 클래스(class)"
description: "파이썬 함수의 매개변수, 기본값, *args, **kwargs와 클래스로 간단한 몬스터 게임을 만들어 보는 TIL."
authors: [hyoloui]
tags: [python]
---

:::note TIL : Today I Learned

파이썬 심화 문법 중 함수(def) 심화와 클래스(class)를 정리합니다.

:::

<!--truncate-->

## 함수 심화

1. 매개변수
2. 매개변수 기본값
3. `*args`
4. `**kwargs`

### 함수의 매개변수

```python
def cal(a, b): # a와 b의 매개변수가 함수 내부의 a와 b로 전달됩니다!
    return a+2*b

result = cal(1, 2) # a 에는 1, b 에는 2 를 전달합니다!

print(result) # 5
# 1+2*2 = 1+4 = 5 맞게 들어오네요
```

#### `result = cal(b=2, a=1)`

매개변수 호출 시 매개변수명을 지정해서 대입한다면 순서는 무관합니다.

### 함수 선언시 매개변수 기본값 지정

인수를 미리 지정해 놓으면 기본값이 됩니다. 여기서 기본값은 매개변수로 입력받은 값이 없을 경우 **기본적으로 입력될 값**을 말합니다!

```python
def cal2(a, b=2):
    return a+2*b


result = cal2(1, 3)
print(result) # 7

result = cal2(1)
print(result) # 5
```

### `*args`

매개변수를 무한으로 입력 받을 수 있습니다.

```python
# 입력값의 개수를 지정하지 않고 모두 받는 방법!

def call_names(*args):
    for name in args:
        print(f'{name}야 밥먹어라~')

call_names('성범', '민수', '유민', '대호')
```

다만 for 문을 이용하여 `args` 를 하나씩 돌아 넘겨줘야 합니다!

### `**kwargs`

매개변수를 딕셔너리 형태로 받을 수 있습니다!

```python
# 딕셔너리 반환
# 키워드 인수를 여러 개 받는 방법!

def get_kwargs(**kwargs):
    print(kwargs)

get_kwargs(name='bob') # {'name': 'bob'}
get_kwargs(name='john', age='27') # {'name': 'john', 'age': '27'}
```

## 클래스

### `class name()`

각 객체가 가지고 있는 속성을 관리해야 할 때 쓴다!

이번에는 클래스를 이용해 아주 간단한 게임을 하나 만들어 보았는데요, 코드를 보면서 천천히 주석을 따라 해석하시면 편하게끔 작성해 보았습니다!

```python
class Monster():                       # Monster() 클래스 생성
    hp = 100                           # 체력 = 100       (Monster가 가진 기본 속성)
    alive = True                       # 상태 = 살아있음  (Monster가 가진 기본 속성)

    def damage(self, attack):          # 데미지(공격) 함수 생성
        self.hp = self.hp - attack     # 체력(100) - 공격(인수)
        if self.hp <= 0:               # 체력이 0이하이면
            self.alive = False         #  상태 = 죽음

    def status_check(self):            # 상태확인() 함수 생성
        if self.alive:                 # 상태가 true 라면
            print('살아있다')          #  '살아있다' 출력
        else:                          # 아니면(false)
            print('죽었다')            #  '죽었다' 출력


괴물1 = Monster()                      # Monster() 클래스로 괴물1 생성
괴물2 = Monster()                      # Monster() 클래스로 괴물2 생성

괴물1.damage(120)                      # 괴물1 데미지(120) 받음
괴물2.damage(80)                       # 괴물2 데미지(80) 받음

print(괴물1.hp)                        # 괴물1 남은 체력 -20
괴물1.status_check()                   # '죽었다'

print(괴물2.hp)                        # 괴물2 남은 체력 20
괴물2.status_check()                   # '살아있다'
```

:::tip 최종 정리

1. 매개변수는 변수명처럼 임의로 지정이 가능
2. 함수에 직접 (`x='code'`) 기본값 지정이 가능
3. `*args` : 입력값을 무한으로 받는 매개변수
4. `**kwargs` : 입력값을 무한으로 받으며, 딕셔너리로 반환
5. 클래스로 객체를 생성하며, 내부함수로 다양한 기능을 부여할 수 있다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/22)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-15 */}
