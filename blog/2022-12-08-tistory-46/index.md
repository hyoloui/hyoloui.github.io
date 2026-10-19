---
title: "리액트 - 구조 분해 할당(js 문법)"
description: "배열과 객체의 구조 분해 할당 문법과, 리액트의 useState·props·함수 컴포넌트 인자에서 구조 분해 할당을 쓰는 방법 정리."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## 구조 분해 할당 - 자바스크립트 표현식

> 구조 분해 할당 구문은 배열이나 객체의 속성을 해체하여
> 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식입니다.
>
> (출처: MDN)

### 구문

```js
var a, b, rest;
[a, b] = [10, 20];
console.log(a); // 10
console.log(b); // 20

[a, b, ...rest] = [10, 20, 30, 40, 50];
console.log(a); // 10
console.log(b); // 20
console.log(rest); // [30, 40, 50]

({ a, b } = { a: 10, b: 20 });
console.log(a); // 10
console.log(b); // 20

// Stage 4(finished) proposal
({ a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 });
console.log(a); // 10
console.log(b); // 20
console.log(rest); // {c: 30, d: 40}
```

위처럼 배열이나 객체를 쪼개 필드 값을 변수에 담을 수 있다.

### 배열 구조 분해

```js
const 과일 = ['사과', '바나나', '배'];
const [one, two, three] = 과일;
console.log(one, two, three);
// 사과, 바나나, 배

const 나이 = [26, 24, 52];
const [나, 동생] = 나이;
console.log(나, 동생);
// 26, 24
```

분리된 선언도 구조 분해가 가능하다.

```js
let me, sister;

[me, sister] = [26, 24];

console.log(me); // 26
console.log(sister); // 24
```

### 객체 구조 분해

React에서의 props 형태가 객체이기 때문에 우리가 구조 분해를 사용할 수 있다.

```js
const 사과 = {
  종류: 'fruit',
  색: 'red',
  모양: 'circle',
};

const { 종류, 색, 모양 } = 사과;
console.log(종류, 색, 모양); // 'fruit', 'red', 'circle'
```

다만 for 문을 이용하여 args 를 하나씩 돌아 넘겨줘야 합니다!

### (\*\*kwargs)

매개변수를 딕셔너리 형태로 받을 수 있습니다!

```python
# 딕셔너리 반환
# 키워드 인수를 여러 개 받는 방법!

def get_kwargs(**kwargs):
    print(kwargs)

get_kwargs(name='bob') # {'name': 'bob'}
get_kwargs(name='john', age='27') # {'name': 'john', 'age': '27'}
```

## 구조 분해 할당 - React 표현식

### useState

```jsx
function Login() {
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });
  // useState 에 들어갈 객체

  const { email, password } = inputValue;
  // 구조 분해 할당식

  const handleInput = (event) => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  return (
    <form className="loginInput">
      <input name="email" onChange={handleInput} />
      <input name="password" onChange={handleInput} />
    </form>
  );
}
```

### 함수 컴포넌트 안에서의 구조 분해 할당

**본문 안에서의 구조 분해 할당**

```jsx title="TodoList.jsx"
const TodoList = () => {
  // 오늘 할 일
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: '환기 시키기',
      content: '오늘 17시에 빨래하고 18시에 널기',
      done: true,
    },
  ]);

  // 제목, 내용 빈값(빈칸)
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 오늘 할 일 + 새로운 할 일
  const addTodoHandler = () => {
    const newTodo = {
      id: todo.length + 1,
      title: title,
      content: content,
      done: false,
    };
    setTodo([...todo, newTodo]);
  };

  return (
    <Layout>
      <Header
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        addTodoHandler={addTodoHandler}
      />
      {/* 이 부분에서 props로 넘겨주고 있다 */}

      <List todo={todo} setTodo={setTodo} />
    </Layout>
  );
};
```

```jsx title="Header.jsx"
const Header = (props) => {
  const { title, setTitle, content, setContent, addTodoHandler } = props;
  // 헤더에서 받아온 props를 함수 컴포넌트 안에서 구조 분해 할당으로 가져왔다
  return (
    <header>
      <label> 제목 </label>
      <input
        value={title} // title
        placeholder="오늘의 할 일 입력해주세요"
        // 인풋 이벤트로 들어온 입력 값을 name의 값으로 업데이트
        onChange={(e) => setTitle(e.target.value)} // setTitle
      />
      <label> 내용 </label>
      <input
        value={content} // content
        placeholder="상세 내용을 입력해주세요"
        // 인풋 이벤트로 들어온 입력 값을 age의 값으로 업데이트
        onChange={(e) => setContent(e.target.value)} // setContent
      />
      <CustomButton color="green" onClick={addTodoHandler}>
        {/* addTodoHandler */}
        추가하기
      </CustomButton>
    </header>
  );
};
```

**인자 안에서 구조 분해 할당**

```jsx
function Components({ elements }) {
  // elements
  return (
    <>
      <li className="message-list-box">
        <div>
          <span className="message-list-id">ex id</span>
          <span className="message-list-content">{elements}</span>
          {/* elements */}
        </div>
        <button className="message-list-delete-button">X</button>
      </li>
    </>
  );
}
```

:::tip 최종 정리

1. 구조 분해 할당 : 배열을 해체하여 순차적으로 개별 변수에 담는 것
2. 리액트에서는 함수 컴포넌트 안에서 구조 분해 할당을 사용한다
3. [인자 안에서, 본문 안에서] 구조 분해 할당 할 수 있다
4. 나는 인자가 너무 길어지는 것이 불편해서, 본문 안에서 구조 분해 할당을 사용한다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/46)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-08 */}
