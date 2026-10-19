---
title: "Project : helprogrammers - 소개(초대장)"
description: "알고리즘 질문과 단계별 힌트 댓글 커뮤니티 helprogrammers의 소개, 코드 리뷰, 트러블 슈팅, 프로젝트 회고."
authors: [hyoloui]
tags: [project]
---

## Invitation ✉️

To. **지옥**의 알고리즘을 헤쳐나가는 개발자 여러분!

---

알고리즘을 풀고 계신가요? 도움이 필요하시다고요?!
그렇다면 여러분을 초대합니다. Helprogrammers에서 여러분의 문제를 해결해보세요!

👇 Helprogrammers 바로가기!

[React App](https://helprogrammers-kappa.vercel.app/)

---

From. 당신을 **도와줄** Helprogrammers

<!--truncate-->

## 프로젝트 소개

### Concept

💡 어려운 알고리즘 문제를 공유하고 함께 해결하는, 개발자 커뮤니티 **헬프로그래머스**!

**헬프로그래머스 (Helprogrammers)**

- 헬프 + 프로그래머스 : 개발자들의 알고리즘 문제해결을 돕는다(HELP).
- 헬 + 프로그래머스 : 프로그래밍은 말그대로 헬(HELL) 이다.

---

### Function

🛠 개발자에 의한, 개발자를 위한 기능!

1. 도움을 구하고 싶은 알고리즘 **질문을 게시**하고, **댓글로 힌트**를 주고 받을 수 있습니다.
2. 댓글은 스포의 정도에 따라 **상 중 하**의 레벨로 나누어 작성됩니다.
3. 유저가 보고싶지 않은 수준의 힌트가 스포되지 않도록 댓글은 가려진 상태로 제공되며, **원하는 레벨의 힌트만 열어볼 수 있습니다**.
4. 마크다운 에디터를 통해 게시글 및 댓글 작성시 가독성있는 **코드를 작성**할 수 있습니다.
5. 모든 게시글과 댓글 작성시 **작성자**와 **비밀번호**를 입력해 수정, 삭제 전 유효성검사를 진행합니다.

---

## 시연을 하러 가볼까요?

[👉 Helprogrammers 웹사이트 바로가기!](https://helprogrammers-kappa.vercel.app/)

[https://www.youtube.com/watch?v=cDeqB5vbVzs](https://www.youtube.com/watch?v=cDeqB5vbVzs)

---

## ✨Code Review

**[ edit state 변경 시 컴포넌트 변경 ]**

```jsx title="Question.jsx"
function Question() {
  const dispatch = useDispatch();
  // qeustion state
  const { question } = useSelector((state) => state.detail);
  const [edit, setEdit] = useState(false);

  const questionHints = hints?.filter(
    (hint) => hint.questionId === question.id,
  );

  return (
    <QuestionContainer>
      {/* 상세 페이지 */}
      <Detail setEdit={setEdit} edit={edit} />

      {/* 댓글 */}
      {!edit && (
        <>
          <AddHint question={question} />
          <HintList questionHints={questionHints} key={question.id} />
        </>
      )}
    </QuestionContainer>
  );
}

export default Question;
```

Question 이라는 컴포넌트에서 edit 이라는 state의 기본값으로는 false입니다. 수정버튼이 클릭되면 `setEdit`으로 edit의 상태가 true가 되어 삼항연산자로 감싸주었던 상세페이지 컴포넌트가 변경되고, 댓글 컴포넌트를 지웁니다.

**[ 수정버튼 클릭 ↔ 컴포넌트 변경 ]**

```jsx title="Detail.jsx"
// props로 받은 edit state
const Detail = ({ setEdit, edit }) => {
  // 삭제 버튼
  const deleteButton = (event, id) => {
    event.preventDefault();
    // const reCheck = window.confirm('정말 삭제하시겠습니까?'); // confirm 으로 재확인
    if (writer.replace(/ /g, '') === '') {
      alert('이름을 입력해주세요!');
      focusWriter.current.focus();
      return;
    } else if (question.writer !== writer) {
      alert('이름이 틀렸습니다!');
      return;
    } else if (password.replace(/ /g, '') === '' || password.length !== 4) {
      alert('비밀번호는 4자리 숫자로 입력해주세요!');
      focusPassword.current.focus();
      return;
    } else if (question.password !== Number(password)) {
      alert('비밀번호가 틀렸습니다!');
      return;
    } else if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(__deleteDetail(id)); // DetailSlice >> deleteDetail (action)
      navigation('/'); // main page로 돌아가기
    } else {
      return;
    }
  };

  // 수정 버튼
  const updateButton = (event) => {
    event.preventDefault();
    // 토글 수정, 완료
    if (writer.replace(/ /g, '') === '') {
      alert('이름을 입력해주세요!');
      focusWriter.current.focus();
      return;
    } else if (question.writer !== writer) {
      alert('이름이 틀렸습니다!');
      return;
    } else if (password.replace(/ /g, '') === '' || password.length !== 4) {
      alert('비밀번호는 4자리 숫자로 입력해주세요!');
      focusPassword.current.focus();
      return;
    } else if (question.password !== Number(password)) {
      alert('비밀번호가 틀렸습니다!');
      return;
    }
    setEdit(!edit);
  };

  return (
    <>
      {edit ? (
        <UpdateComponent question={question} setEdit={setEdit} />
      ) : (
        <Wrapper>{/* 컴포넌트 */}</Wrapper>
      )}
    </>
  );
};

export default Detail;
```

props로 넘겨받은 `setEdit` 과 `edit`을 활용해 업데이트(수정 페이지)컴포넌트를 보여주거나, 기본 디테일(상세 페이지)컴포넌트를 보여줄 수 있습니다.

---

## Trouble Shooting 🔥

```jsx title="UpdateComponent.jsx"
import React, { useRef } from 'react';

const UpdateComponent = ({ question, setEdit }) => {
  // ref = focusTitle
  const focusTitle = useRef();

  // 수정 완료(submit)
  const onSubmitEditor = (id, updateQuestion) => {
    if (title.replace(/ /g, '') === '') {
      alert('제목을 입력해주세요!');
      focusTitle.current.focus();
      return;
    } else if (content.replace(/ /g, '') === '') {
      alert('내용을 입력해주세요!');
      focusContent.current.focus();
      return;
    }
    if (window.confirm('수정을 완료하시겠습니까??') === true) {
      dispatch(__updateDetail({ id, updateQuestion }));
      setEdit(false);
    } else {
      return;
    }
  };
  return (
    <InputTitle
      value={title}
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      ref={focusTitle}
      type="text"
      placeholder="제목을 입력해 주세요"
    />
  );
};
```

**어떤 문제가 발생했었나요?**

코드에 직접 dom요소 접근(`querySelector`)하는 문제로, 원인모를 에러

**어떻게 해결했나요?**

`useRef`를 활용하여 요소 접근

1. import `useRef`
2. 변수에 `useRef()` 할당
3. 요소에 `ref={변수명}` 속성 추가
4. 변수명 호출하여 조작

[helprogrammers 프로젝트 - useRef(리액트 훅)](https://hyoloui.tistory.com/76)

---

## Project Review

> 💬 사실은 말이조? **우리는 생각한대로 해내는 사람들이에요!**
>
> 💬 사실은 말이조? **귀여운게 최고입니다.**
>
> 💬 사실은 말이조? **정말 '4'실은 말이조였어요~!**
>
> 💬 사실은 말이조? **디발자와 함께한답니다~**
>
> 💬 사실은 말이조? **소는 아니죠..?? 🐴 🐮**
>
> 💬 사실은 말이조? **계란말이죠??**
>
> 💬 사실은 말이조? **좋은 말이에요~~!**

---

## Interview! 🎙

**어떤 기능을 맡으셨나요?**

1. 👉 **상세 게시글 CRUD** - (게시글 클릭 후)
2. 👉 **CustomButton 컴포넌트** - (만능버튼)

**프로젝트를 진행하면서 느낀점을 말해주세요!**

**사실은 말이조.. 팀 운이 좋았어요** 😅

전 프로젝트와 비교한다면.. React, Redux, Redux-toolkit, thunk 등 배운 스킬이 많아서 어디서 뭘 어떻게 써야할지 너무 막막했지만, 차근차근 하나씩 동작할 때마다 너무 신기했어요! 서로 밤 늦게까지 **코드랑 씨름하면서 도와주신 팀원**들 덕분에 함께 해결할 수 있었습니다. 서로 질문하고 알려주면서 많이 배웠습니다. 아쉬웠던 점은 **thunk를 활용한 서버 통신이 기능**을 구현할 때 기본개념이 부족해서 너무 힘들었습니다.. 그래도 팀원분들이 많이 도와주시고 문제 해결하면서 많이 성장 했습니다!! 그 동안 감사했습니다!

지금까지의 **프로젝트에서는 CRUD 구현**을 맡게되었는데 구현하면서 핵심기능이라는 일념으로 책임감있게 잘 수행했던 것 같아요. 하지만 다른 기능도 구현해 보면서 폭넓게 사고하고, **다양한 문제해결 능력을 기르고 싶어요**!

---

## 우리팀 자랑하기! 👏

**깃헙을 열심히 사용했어요!**

> 프로젝트에 깃을 잘 활용하기 위해 프로젝트 전부터 팀내 라이브코딩을 진행했어요.
> 커밋, PR 및 컨벤션 사용법을 익히고 프로젝트에선 깃모지 컨벤션을 적용했답니다! ⚡️ ♻️ 🔥 ✨ 💄 🎉

**디자인이 너무 예쁘지 않나요?**

> 팀장님을 자랑합니다! 디자인은 감각이 없으면 따라하기도 힘든데..
> 저희 팀장님은 디자인 전공하시고 저희 프로젝트에 재능기부 해주신 격이에요.
>
> 🔥헬모드와 😎다크모드를 조합한 참신한 아이디어와! 디테일하고 센스있는 디자인까지 너무 완벽합니다!

**팀원들간의 커뮤니케이션이 활발해서 좋았어요:D**

> 팀원들 서로서로 정보 공유하고 도와주면서 프로젝트를 진행해서 좋았어요. 커뮤니케이션이 활발하게
> 잘되니까 더 좋은 결과물이 나온것 같아서 팀원들한테 고맙다는 말 하고 싶어요! 👍👏💯

{/* 이 글은 Tistory(https://hyoloui.tistory.com/77)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-28 */}
