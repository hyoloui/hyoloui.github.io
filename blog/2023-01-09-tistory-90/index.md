---
title: "리액트 네이티브 - Movies app : React-Query (useQuery) 적용"
description: "서버 상태 관리 라이브러리 React Query의 설정과 useQuery 사용법, 기존 useState 코드를 useQuery로 리팩토링하고 refetchQueries와 isLoading 일괄 처리까지 적용한 과정."
authors: [hyoloui]
tags: [react-native]
---

:::note 목적

React-Query (`useQuery`) 리팩토링 과정 - 서버 스테이트 관리

:::

<!--truncate-->

## 1. 리액트 쿼리 (React Query) 란?

**Server State**, **비동기 데이터를 관리**하기 위한 라이브러리 이며, `useQuery` hook 안에서 **API 요청**을 담당하고, **API 요청 결과 및 다양한 상태들을 바로 사용**할 수 있다. (redux thunk 사용 필요 X)

한 번 API 요청 시 `queryKey` 가 **API 요청결과를 cache 에 저장**하고, caching된 API 요청은 다시 서버에 하지 않고 **cache memory에서 더 빠르게 불러 온다**.

그래서 **불필요한 서버 요청을 알아서 막아주게 된다**!

## 2-1. 프로젝트 세팅

우선 명령어로 install을 진행합니다.

```bash
npm i react-query

# or

yarn add react-query
```

[Installation | TanStack Query Docs](https://react-query-v3.tanstack.com/installation)

## 2-2. Setup App.js

```jsx title="App.js"
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Root />
    </QueryClientProvider>
  );
}
```

1. `queryClient` 변수 선언으로 **`QueryClient()` 함수를 가져온다**. (import 필요)
2. 컴포넌트 안에서 **최상위의 요소에 `<QueryClientProvider/>`** 라는 태그로 감싸준다! (import 필요)
3. `QueryClientProvider` 의 `client` 속성에는 1 에서 만든 변수 **`queryClient` 를 넣어준다.**

## 3. useQuery 사용하기

get, fetch 요청을 할 때, `useQuery`라는 훅을 사용하게 된다. `useQuery` 를 사용하는 컴포넌트 파일에 import가 되어야 하고,

```javascript
const fetcher = () =>
  fetch("https://api.github.com/repos/tannerlinsley/react-query").then((res) =>
    res.json()
  );

const { isLoading, error, data } = useQuery("repoData", fetcher);
```

위 예시와 같이 사용하면 된다. 리엑트 쿼리는 기본적으로 '쿼리 키' 와 fetch를 진행하는 '함수' 이렇게 두 가지 인자만 있으면 되고, 나머지 옵션들도 존재한다.

- **data** : fetch 함수가 받아온 response 값!
- **isLoading** : 서버 스테이트의 상태!
- **error** : 에러 처리를 할 수 있는 객체!

## 4. Refactoring

기존에는 setState로 받아온 데이터들을 클라이언트 state로 받아오고, `isLoading`도 상태변경을 직접 관리했다..

```js
const [nowPlayings, setNowPlayings] = useState([]);
const [topRated, setTopRated] = useState([]);
const [upcoming, setUpcoming] = useState([]);

const [isLoading, setIsLoading] = useState(true);
```

`useQuery`를 사용하면, 이렇게 간단하게 데이터와 로딩상태를 모두 `useState`가 아닌 `useQuery`가 관리하게 만들어 주었다.

```js
const { data, isLoading } = useQuery("NowPlaying", getNowPlaying);
const { data, isLoading } = useQuery("TopRated", getTopRated);
const { data, isLoading } = useQuery("Upcoming", getUpcoming);
```

여기서 우리가 `useQuery`의 데이터와 `isLoading` 상태가 같을 수 없으니 별칭을 넣어줘야 한다.

```js
const {
  data: nowPlayingData,
  isLoading: isLoadingNP,
} = useQuery(["Movies", "NowPlaying"], getNowPlaying);
const {
  data: topRatedData,
  isLoading: isLoadingTR,
} = useQuery(["Movies", "TopRated"], getTopRated);
const {
  data: upComingData,
  isLoading: isLoadingUC,
} = useQuery(["Movies", "Upcoming"], getUpcoming);
```

또한 하나의 키로 3개의 `useQuery`를 불러오기 위해 `Movies`라는 동일한 key값도 만들어줬다. key는 배열의 형태로 **html / css 에서 사용하는 class라고 이해**하면 편하다!

```js
const onRefresh = async () => {
  /* 스크롤 아래로 당겨서 새로고침 */
  setIsRefreshing(true);
  await queryClient.refetchQueries(["Movies"]);
  setIsRefreshing(false);
};
```

그렇게 공용으로 사용하는 key인 `Movies` 를 이용해 전역에서 사용하는 `queryClient`에 접근하여 `refetchQueries`를 진행하면 `Movies` 키를 가지고 있는 `useQuery`들은 refetch가 진행된다.

## 5. 기존에 state 데이터를 받아온 값은?

```jsx
{nowPlayingData.results.map((card) => (
  <Slide key={card.id} card={card} />
))}
```

여기서도 그렇게 복잡하지 않다!

- **기존** : `{state.map()}`
- **리펙토링** : `{data.results.map()}`

`nowPlayingData`라고 할당한 `useQuery`의 서버 데이터를 가지고 있는 녀석은 **`.results`** 라는 곳에서 다 가지고 있다!

## 6. isLoading 일괄 처리

```js
const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;
```

위에서 만들어준 `isLoading`의 별칭을 이용해 셋의 데이터가 로딩이 다 완료되면 보여줄 수 있도록 `isLoading` 변수에 or 연산자를 넣어 일괄처리를 했다.

:::tip 최종 정리

1. Server State, 비동기 데이터를 관리하며 엄청난 퍼포먼스 향상을 위해 `useQuery`를 사용!
2. redux, RTK를 사용할 때와 같이 전역상태관리를 위해 최상단 컴포넌트인 Root 컴포넌트 위에 **`<QueryClientProvider/>`** 태그를 감싸고 `client`에 `QueryClient()` 를 넣는다.
3. 리엑트 쿼리는 기본적으로 '쿼리 키' 와 fetch를 진행하는 '함수' 이렇게 두 가지 인자를 받고, 나머지 옵션들도 존재한다.
4. `useQuery`에 넣는 텍스트 형태의 key는 html에서 사용하는 class 라고 이해하자. 배열형태로 넣을 수 있고, `[고유 key, 통합 key]` 를 할당해서 보다 free하게 사용할 수 있다.
5. `useQuery`를 사용한 data의 response 값은 `data.results` 에 들어있다.
6. `isLoading`은 일괄처리하여 간편하게 사용할 수 있다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/90)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-09 */}
