import json
import tkinter as tk
from tkinter import simpledialog, messagebox

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
    subject = simpledialog.askstring("강의 추가", "강의:")
    week = simpledialog.askinteger("강의 추가", "현재까지 수강한 강의주차(1 ~ 14):")
    tasks = simpledialog.askinteger("강의 추가", "총 과제 수:")
    completeTasks = simpledialog.askinteger("강의 추가", "완료한 과제 수:")
    if subject and week and tasks and completeTasks is not None:
        plan = load_plan()
        update_data(plan, subject, week, tasks, completeTasks)
        save_plan(plan)
        messagebox.showinfo("알림", "강의가 추가되었습니다.")
    else:
        messagebox.showwarning("경고", "모든 필드를 입력하세요.")

# Update
def put_plan():
    plan = load_plan()
    subjects = list(plan.keys())
    if not subjects:
        messagebox.showinfo("알림", "수정할 강의가 없습니다.")
        return
    subject = simpledialog.askstring("강의 수정", f"수정할 강의를 입력하세요:\n{', '.join(subjects)}")
    if subject in plan:
        week = simpledialog.askinteger("강의 수정", "현재까지 수강한 강의주차(1 ~ 14):")
        tasks = simpledialog.askinteger("강의 수정", "총 과제 수:")
        completeTasks = simpledialog.askinteger("강의 수정", "완료한 과제 수:")
        if week and tasks and completeTasks is not None:
            update_data(plan, subject, week, tasks, completeTasks)
            save_plan(plan)
            messagebox.showinfo("알림", "강의가 수정되었습니다.")
        else:
            messagebox.showwarning("경고", "모든 필드를 입력하세요.")
    else:
        messagebox.showwarning("경고", "해당 강의가 없습니다.")

# Read
def print_plan():
    plan = load_plan()
    if not plan:
        messagebox.showinfo("알림", "강의가 없습니다.")
        return
    plan_info = ""
    for subject, info in plan.items():
        remainingTasks = int(info['tasks'] - info['completeTasks'])
        plan_info += (f"{subject}: {info['week']}주차\n"
                        f"현재 {info['week']}주차 진행했으며, {14 - info['week']} 강의가 남았습니다.\n"
                        f"과제는 총 {info['tasks']}개 중 {remainingTasks}개가 남았습니다.\n\n")
    messagebox.showinfo("강의 목록", plan_info)

# Delete
def delete_plan():
    plan = load_plan()
    subjects = list(plan.keys())
    if not subjects:
        messagebox.showinfo("알림", "삭제할 강의가 없습니다.")
        return
    subject = simpledialog.askstring("강의 삭제", f"삭제할 강의를 입력하세요:\n{', '.join(subjects)}")
    if subject in plan:
        del plan[subject]
        save_plan(plan)
        messagebox.showinfo("알림", "강의가 삭제되었습니다.")
    else:
        messagebox.showwarning("경고", "해당 강의가 없습니다.")

def main():
    root = tk.Tk()
    root.title("HYCU 학습 관리 프로그램")

    tk.Button(root, text="내 강의 추가", command=add_plan).pack(pady=10)
    tk.Button(root, text="내 강의 보기", command=print_plan).pack(pady=10)
    tk.Button(root, text="내 강의 수정", command=put_plan).pack(pady=10)
    tk.Button(root, text="내 강의 삭제", command=delete_plan).pack(pady=10)
    tk.Button(root, text="종료", command=root.quit).pack(pady=10)

    root.mainloop()

if __name__ == "__main__":
    main()