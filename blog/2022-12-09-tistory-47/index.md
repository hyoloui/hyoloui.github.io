---
title: "리액트 - component, props, state"
description: "리액트의 컴포넌트(함수형·클래스형), 부모에서 자식으로 내려주는 props, 컴포넌트 내부 동적 데이터인 state 개념 정리."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## Component : 컴포넌트

- 컴포넌트는 UI를 재사용이 가능하도록 개별적인 여러 조각으로 나눈다.
- 컴포넌트는 개념적으로 'JavaScript - 함수'와 유사하다. 'props'라는 입력을 받아, 화면에 어떻게 표시되는지 기술하는 React Element를 반환한다.
- Element는 일반 객체(plain object)로 React 앱의 가장 작은 단위이며, 컴포넌트의 '구성 요소'다.
- 컴포넌트를 선언하는 방식에는 우리가 주로 사용하는 **함수형 컴포넌트, 클래스형 컴포넌트**가 있다.

### 함수형 컴포넌트 : function component

```jsx
function isComponentName(props) {
  let javascriptArea;

  return <div>JSX area!</div>;
}
```

- 함수형 컴포넌트에 받을 객체 파라미터(변수명)는 일반적으로 props로 정의한다.
- return 뒤에는 html과 유사한 형태를 가진 JSX문법으로 구현할 UI 를 반환한다.

### 클래스형 컴포넌트 : class component

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

## props - 프롭스

위에서 확인한 것처럼 '함수형 컴포넌트'는 데이터를 가진 하나의 'props' 객체 인자를 받은 후 React 엘리먼트를 반환한다. 이 때 props는 속성을 나타내는 데이터이다.

props는 컴포넌트에서 컴포넌트로 전달하는 데이터이다. 컴포넌트 속성으로, 해당하는 컴포넌트를 불러와 사용하는 **부모 컴포넌트에서만 설정이 가능**하다.

ex) app.jsx 의 자식 요소로 main.jsx 가 있다면 app.jsx 에서 가진 데이터를 main.jsx 에 내려주기만 가능하다. 자식에서 부모로 전달하거나 형제 요소끼리 데이터를 주고받는 것은 불가능하다. **이러한 문제로 redux가 탄생**하게 되었다.

### props 할당

```jsx
// <ComponentName prop1={propValue1} prop2={propValue2} ... /> 형태

<Cat name="Navi" age={4} />
<Cat name="Yaong" age={7} />
```

위 코드에서는 Cat 컴포넌트에 name 이라는 props 와 age 라는 props 두 가지를 전달했다.

같은 타입의 컴포넌트에 다른 props 값을 주어, 패턴이 반복되는 형태로 컴포넌트의 효율적 재사용이 가능하다. props에서 boolean, number, array 등 다양한 형태의 데이터를 담을 수 있고, 공백 구분으로 여러 개를 담을 수 있다.

:::note

props에 있는 데이터는 문자열인 경우를 제외하면 모두 중괄호(`{}`)로 값을 감싸야 한다.

:::

### props 받기

- **props를 받는 컴포넌트에 파라미터를 정의하면, props를 속성으로 가지는 객체 Object가 해당 인자로 전달 된다.** 컴포넌트 내부에서 사용 시, 객체에 존재하는 값을 가져오듯 `.` 연산자를 사용해 해당하는 props를 꺼내 사용할 수 있고, 중괄호로 감싸 `{[파라미터 이름].[props 이름]}` 형태로 사용한다.
- **props는 읽기 전용** 이므로 컴포넌트의 내부에서 props를 수정하면 안된다. 입력값을 수정하지 않는 함수를 순수 함수라고 부르며, 모든 React 컴포넌트는 자신의 props를 다룰 때, 순수 함수처럼 동작해야 한다.

```jsx
// 객체 파라미터를 통해 props 받아오기
function Cat(props) {
  return (
    <main>
      <div>{props.name}</div>
      <div>{props.age}</div>
    </main>
  );
}
```

이 때 우리는 props를 구조 분해 할당을 사용하여 참조의 참조, 참조의 참조의 참조.. 등을 간소화 할 수 있다. 구조 분해 할당은 저번 포스팅에 자세하게 다뤘으니 참고하면 좋겠다.

[2022.12.08 - [React.js] - 리액트 - 구조 분해 할당(js 문법)](https://hyoloui.tistory.com/46)

- **클래스형 컴포넌트**에서 props를 사용할 때는 **this.props**로 불러와 사용한다. 클래스형 컴포넌트에서 propTypes나 defaultProps를 사용할 때는, 클래스 내부에서도 지정할 수 있다.

```jsx
// 클래스형 컴포넌트에서 props 사용하기
class Cat extends React.Component {
  static defaultProps = { ... }; // 컴포넌트 props 초기값 지정
  static propTypes = { ... }; // 컴포넌트 props 타입 확인
  render() {
    // 구조 분해 할당으로 props 사용
    const { name, age } = this.props;
    return <div>{name}</div>;
  }
}
```

## state : 스테이트

- state는 컴포넌트 내부 '동적 데이터'를 의미하며, props는 부모 컴포넌트가 설정하는 값으로 컴포넌트 자신은 props를 읽기 전용으로만 사용할 수 있다.
- 함수형 컴포넌트에서는 useState라는 Hook을 통해 사용하고, 클래스형 컴포넌트에서는 컴포넌트 자체가 state를 지니는 방식으로 사용.

```jsx
const [state, setState] = useState(initialState); // 구조 분해 할당

// params : state의 기본값, 초기값.
// return : [상태 값, 상태 설정 함수] 형태의 배열
```

### Function Component에서 state 사용하기

```jsx
const TodoList = () => {
  // 오늘 할 일
  const [todo, setTodo] = useState([
    {
      id: 1,
      title: '환기 시키기',
      content: '오늘 17시에 빨래하고 18시에 널기',
      done: true,
    },
    {
      id: 2,
      title: '아침 산책 하기',
      content: '오늘 21시에 헬스장 가기',
      done: true,
    },
    {
      id: 3,
      title: '헬스장 가기',
      content: '오늘 21시에 헬스장 가기',
      done: false,
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

      <List todo={todo} setTodo={setTodo} />
    </Layout>
  );
};
```

### Class Component에서의 state

- 클래스형 컴포넌트에서 state를 사용할 때는 객체 형식의 `this.state`를 통해 state 객체의 초기값을 설정하고, 조회할 수 있다.
- state 값을 변경할 경우, `this.setState`를 사용하여 새로운 값을 줄 수 있다.

```jsx
class ClassExample extends React.Component {
  constructor(props) {
    super(props);
    // state 초기값 설정
    this.state = {
      count: 0,
    };
  }

  render() {
    const { count } = this.state; // state 조회
    return (
      <div>
        <p>You clicked {count} times</p>
        <button
          onClick={() => {
            this.setState({
              // this.setState를 통해 state 업데이트
              count: count + 1,
            });
          }}
        >
          Click me
        </button>
      </div>
    );
  }
}
```

:::tip 최종 정리

1. React 는 컴포넌트를 여러 조각으로 나누어 복잡한 UI를 구성한다. 결국 블록이며 함수이다.
2. props 는 부모 컴포넌트로 받아온 데이터, component 간의 데이터 교류 시 사용하며 부모 → 자식 방향으로만 props 전달 가능하다.
3. state 는 component 내부에서 바뀔 수 있는 값을 다룬다. const 로 선언하는 이유는 리액트 엔진이 데이터(불변성) 변화를 감지해 리렌더링을 해줘야 하기 때문!
4. useState는 리액트에서만 사용하는 Hook 이다. (hook 종류 다양)

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/47)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-09 */}
