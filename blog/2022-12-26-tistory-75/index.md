---
title: "Project : helprogrammers - 상세 페이지"
description: "상세 페이지 구현 중 새로고침하면 state가 사라지는 문제를 useParams와 createAsyncThunk로 해결한 과정."
authors: [hyoloui]
tags: [project]
---

❤️‍🔥TIL : Today I Learned

<!--truncate-->

## 🤢 문제 내용

문제 참 많았다... 정리해 보자면

나는 게시글을 클릭 했을 때, router 가 변하며 해당 라우터에서 **상세 내용(제목,내용,시간 등..)** 을 보여주는 페이지의 crud 기능 구현을 맡게 되었다.

문제는 이렇게 흘러갔다

1. 해당 컴포넌트 렌더링 될 때 **useLocation** 사용하여 `axios.get` 요청
   문제점 - 다른 액션 발생할 때(delete, update) 추후 데이터 수정의 어려움을 깨닫게 됨
2. thunk를 사용하여 `detailSlice.js` 생성하여 부모컴포넌트에서 onClick이 이루어 질 때 `dispatch(__getDetail)`
   문제점 - 상세페이지에서 새로고침 하면 state 값이 리셋되어 결국 새로고침을 하면 상세페이지 내용 없어짐
3. 1번에서 가져온 방식보다 더 깔끔하게 `useParams` 사용하여 쉽게 id 가져와 `dispatch(__getDetail(id))`
   해결

---

## 🔨 시도한 방법 (코드 변천사)

1. 해당 컴포넌트 렌더링 될 때 `useLocation` 사용하여 `axios.get` 요청

```jsx title="Question.jsx"
const location = useLocation();
const dispatch = useDispatch();

// state 값
const [questionState, setQuestionState] = useState('');

// useEfect로 컴포넌트 렌더링 시 axios 데이터 받아오기
useEffect(() => {
  const getData = async () => {
    const { data } = await axios.get(
      `http://localhost:3001/questions${location.pathname}`,
    );
    // 받은데이터 state로 업로드
    setQuestionState(data);
  };
  getData();
}, []);
```

2. thunk를 사용하여 `detailSlice.js` 생성

```jsx title="ListCard.jsx"
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { __getDetail } from '../redux/module/DetailSlice';

const ListCard = ({ question }) => {
  const dispatch = useDispatch();

  const onClickEvent = (id) => {
    dispatch(__getDetail(id));
  };
  return (
    <QuestionLink to={`/${question.id}`}>  // Detail.jsx 컴포넌트 이동
      <Thread onClick={() => onClickEvent(question.id)}>
  );
}
```

---

## 🎈 문제 해결 방법

3. `useParams` 사용하여 쉽게 id 가져온 후, `dispatch(__getDetail(id))`

```jsx title="Detail.jsx"
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { __deleteDetail, __getDetail } from '../redux/module/DetailSlice';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const dispatch = useDispatch();

  // 구조분해 할당
  const { isLoading, error, question } = useSelector((state) => state.detail);
  const { id } = useParams();

  // component mount 즉시 코드 실행
  useEffect(() => {
    dispatch(__getDetail(id));
  }, []);

  if (isLoading) {
    return <div>로딩 중..</div>;
  }
  if (error) {
    return <div>존재하지 않는 페이지 입니다..</div>;
  }

  return <div>이하 생략..</div>;
};
```

```js title="detailSlice.js"
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const serverUrl = 'http://localhost:3001/questions';

// question 이라는 state 생성
const initialState = {
  question: [],
  isLoading: false,
  error: null,
};

export const __getDetail = createAsyncThunk(
  'GET_DETAIL',
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${serverUrl}/${payload}`, // payload로 전달 받은 id 값 가져오기
      );
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {},
  extraReducers: {
    // read
    [__getDetail.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경합니다.
    },
    [__getDetail.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경합니다.
      state.question = action.payload; // question state에 payload로 받은 id값 저장
    },
    [__getDetail.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경합니다.
      state.error = action.payload; // catch 된 error 객체를 state.error에 넣습니다.
    },
  },
});

export const detail = detailSlice.actions;
export default detailSlice.reducer;
```

---

## ✨ 알게된 것

여기서 보면 question 이라는 state에 업데이트를 하는 것을 알 수 있다. state는 임시 저장과 같은 원리라서 새로고침이 된다면 state에 있는 데이터는 다 날아간다..

그래서 상세페이지(`Detail.jsx`) 컴포넌트가 mount 될 때 `useParams()` 함수로 가져온 아이디를 `useEffect`를 활용해 바로 `__getDetail( id )`을 실행해서 해당 state를 업데이트 할 수 있도록 업데이트 해줬다

그래서 새로고침이 되더라도 `useEffect` 는 실행이 되므로 state는 업데이트가 되어있는 상태로 표시되어

:::tip 해결

새로고침시 아무것도 안남게 되는 문제를 해결했다!

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/75)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-26 */}
