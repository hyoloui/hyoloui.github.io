banknotes = [100, 10, 5, 1]
exchange_rate = 1146

while(True) :
  input_money = input("환전 할 금액을 입력하세요:")
    
  if not input_money.isnumeric():
    print("숫자를 입력해야 합니다")
    continue
  break

total_money = int(input_money)

for note in banknotes:
  count = total_money // (exchange_rate * note)

  if not count:
    continue

  total_money -= exchange_rate * note * count
  print(f"{note} 달러: {count} 장")

print(f"돌려받은 돈: {total_money} 원")

