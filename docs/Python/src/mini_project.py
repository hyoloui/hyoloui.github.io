import json

def save_plan(plan):
    with open('study_plan.json', 'w') as f:
        json.dump(plan, f)

def load_plan():
    try:
        with open('study_plan.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {}

def input_data():
    subject = input("강의: ")
    week = int(input("현재까지 수강한 강의주차(1 ~ 14): "))
    tasks = int(input("총 과제 수: "))
    completeTasks = int(input("완료한 과제 수: "))
    return subject, week, tasks, completeTasks

def update_data(plan, subject, week, tasks, completeTasks):
    plan[subject] = {
        'week': week,
        'tasks': tasks,
        'completeTasks': completeTasks,
    }

# Create
def add_plan():
    subject, week, tasks, completeTasks = input_data()
    plan = load_plan()
    update_data(plan, subject, week, tasks, completeTasks)
    save_plan(plan)
    print("생성 완료\n")

# Update
def put_plan():
    plan = load_plan()
    for subject in plan:
        print(f"{subject}")
    print("\n위 강의 중 수정할 강의를 입력하세요.")
    subject, week, tasks, completeTasks = input_data()
    update_data(plan, subject, week, tasks, completeTasks)
    save_plan(plan)
    print("수정 완료\n")

# Read
def print_plan():
    plan = load_plan()
    for subject, info in plan.items():
        print(f"{subject}: {info['week']}주차")
        print(f"현재 {info['week']}주차 진행했으며, {14 - info['week']} 강의가 남았습니다.")
        remainingTasks = int(info['tasks'] - info['completeTasks'])
        if remainingTasks <= 0:
            print("해야 할 과제가 없습니다.")
        else:
            print(f"과제는 총 {info['tasks']}개 중 {info['tasks'] - info['completeTasks']}개가 남았습니다.\n")
    print("\n")


# 메인 함수
if __name__ == "__main__":
    while True:
        print("0. 종료")
        print("1. 수강 정보 추가")
        print("2. 수강 정보 보기")
        print("3. 수강 정보 수정")
        choice = int(input("메뉴 선택: "))
        print("\n")

        if choice == 1:
            add_plan()
        elif choice == 2:
            print_plan()
        elif choice == 3:
            put_plan()
        elif choice == 0:
            break
        else:
            print("잘못된 선택입니다.")
