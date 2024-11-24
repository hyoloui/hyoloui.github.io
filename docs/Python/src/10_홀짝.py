import random
game = 3
win = 0
lose = 0

while(game):
  number = random.randint(1, 100)

  while(True):
    input_num = input("정수를 입력하세요.")
    if not input_num.isnumeric():
      print("정수가 아닙니다.")
      continue
    break
  game = game - 1

  you_number = int(input_num)

  if (number % 2 == you_number % 2):
    print("내가 이겼다!")
    win = win + 1
  else:
    print("내가 지다니..")
    lose = lose + 1

  print(f"생성된 랜덤 정수: {number}")

print(f"{win}승 {lose}패")


