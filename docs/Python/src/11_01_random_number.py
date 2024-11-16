# 랜덤 숫자 맞추기
# 1. 게임이 시작될 때 1 ~ 10 사이의 랜덤 숫자가 정해집니다.
# 2. 사용자가 숫자를 입력할 수 있습니다.
# 3. 사용자가 입력한 숫자가 랜덤 숫자보다 크면 "DOWN"을 출력하고, 작으면 "UP"을 출력합니다.
# 4. 사용자가 랜덤 숫자를 맞추면 "정답"을 출력하고, 게임이 종료됩니다.
# 5. 몇 번만에 맞췄는지 출력합니다.

import random

def guess_number():
    random_number = random.randint(1, 10)
    count = 0

    while True:
      user_number = int(input("숫자를 입력하세요: "))
      count += 1

      if user_number > random_number:
        print("입력한 숫자가 더 큽니다.")
      elif user_number < random_number:
        print("입력한 숫자가 더 작습니다.")
      else:
        print("정답입니다.")
        print(f"{count}번 만에 맞췄습니다.")
        break

guess_number();
