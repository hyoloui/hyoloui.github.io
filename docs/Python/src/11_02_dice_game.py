# 백만장자 또는 거지 주사위놀이를 만들기위해 다음과 같은 단계를 따를 수 있습니다.

# 게임이 시작될 때 두 주사위의 값을 랜덤으로 생성합니다.
# 두 주사위의 합을 계산합니다.
# 합이 9보다 크면 “백만장자가 되었네요.”를 출력하고 그렇지 않으면 “거지가 될 것 같아요. 슬퍼요.”를 출력합니다. 
# 사용자가 최대 3회 반복하도록 루프를 추가합니다.
# game이 0이되면 “아악... 거지가 되었어요.”를 출력하고 게임을 종료합니다.

# 빨간주사위와 파란주사위 두 개를 던져 그 합이 9보다 크면 백만장자가되고 그렇지않으면 거지가된다. 기회는3번뿐이다

import random

def dice_game():
    game = 1
    end_message = "아악... 거지가 되었어요."
    while game < 4:
        game_start = input("주사위를 던지시겠습니까? (y/n): ")
        if game_start == "n":
            break
        
        red = random.randint(1, 6)
        blue = random.randint(1, 6)
        sum = red + blue
        print(f"빨간 주사위: {red}, 파란 주사위: {blue}")
        if sum > 6:
            end_message = "백만장자가 되었네요."
            
        else:
            print("거지가 될 것 같아요. 슬퍼요.")
        game += 1
        print(f"남은 기회: {4 - game}")
    print(end_message)


if __name__ == "__main__":
    dice_game()

