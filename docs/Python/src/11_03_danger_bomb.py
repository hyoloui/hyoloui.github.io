# 3의배수폭탄피하기주사위놀이를만들기위해다음과같은단계를따를수있습니다.

# 1단계주사위의값을랜덤으로생성합니다.
# 주사위의합을계산합니다.
# 합의값이3의배수일경우“아악,폭탄이다.”를출력하고game을0으로합니다.
# 사용자가최대3회반복하도록루프를추가합니다.
# sum 값이20보다클경우“미션성공!”을출력한후게임을종료합니다.

# 주사위를던져나온눈의수만큼전진한다. 함정은3의배수에설치되어있다.19를넘어무사히공주를구할수있을까?

import random

def danger_bomb():
    game = 3
    sum = 0

    while game > 0:
      input('주사위를 굴리려면 엔터를 누르세요.')
      dice1 = random.randint(1, 6)
      dice2 = random.randint(1, 6)
      totalDice = dice1 + dice2
      sum += totalDice
      print(f'주사위: {totalDice}, 합계: {sum}')
      if sum % 3 == 0:
        print('아악, 폭탄이다.')
        game = 0
      else:
        print('통과!')
        game -= 1
      
        
    if sum > 15:
      print('미션 성공!')
    else: 
      print('미션 실패!')

if __name__ == "__main__":
  danger_bomb()
