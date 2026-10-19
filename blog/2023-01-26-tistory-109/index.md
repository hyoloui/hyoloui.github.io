---
title: "Project: Develife - main 구성과 React-Query 적용"
description: "Youtube API 데이터를 React-Query로 가져와 UI와 모달을 구성하고, filter 메서드가 동작하지 않던 문제를 해결한 과정."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

- Youtube API 활용
- (비동기)서버통신 : React-Query 적용 response 로 UI구성

:::

:::warning 🤢 트러블 슈팅

- `filter` 메서드 문제 해결

:::

<!--truncate-->

---

## 1. react query

Youtube API 활용에 있어 서버통신의 생산성을 위해 react-query 적용을 기획했다.

```js title="api.js"
export const getAll = () =>
  fetch(
    `${BaseURL}PL1V8Ky17d9SudCHJb1F2pHBvIMFBlpfad&maxResults=30&key=${API_KEY}`,
  ).then((res) => res.json());
```

`api.js`에서 데이터를 가져오는 함수를 관리하는 **파일**을 따로 **분리**했고 중복되는 url 과 api key는 따로 변수선언을 해주었다.

필요한 component에서 react-query를 연결해 위 함수를 사용하도록 import 했다.

```js
const { data: AllPlayList, isLoading: isLoadingAP } = useQuery('All', getAll);
```

별칭을 붙여 **데이터의 목적을 정확하게 명시**했다.

---

## 2. UI 생성

```jsx
{AllPlayList.items.map((item) => (
  <YoutubeBox key={item.id}>
    <YoutubeImg
      src={`${item.snippet.thumbnails.high.url}`}
      alt={`${item.snippet.title}`}
      onClick={() => clickImg(item.snippet.resourceId.videoId)}
    />
  </YoutubeBox>
))}
```

위에서 react-query로 가져온 `AllPlayList` 라는 배열형 데이터는 `map` 메서드로 하나씩 돌며, 이미지태그의 source를 넣어 주었고 프로젝트 기획상 title을 사용 할 일이 없었지만, **사용성을 고려해 alt에 title**을 넣어주었다.

또 클릭시 모달 컴포넌트가 렌더링이 되는데 미리 **파라미터로 전달**할 **videoId 값**을 넣었다.

왜냐하면, **모달에서 iframe 태그로 src 를 넣어줄 때** **해당 비디오의 고유 아이디값이 필요**하기 때문이다.

\+ 위 과정에서 `filter`를 활용해 배열의 첫번째 데이터를 제외해야 하는 로직을 구성해야했다.

하지만 데이터가 아무런 변화가 생기지 않아 시간소요가 있었다..ㅠㅠ 아래 참조 `트러블 슈팅`

---

## 3. modal

```js
const [releaseModal, setReleaseModal] = useState(false);
const [modalPlayId, setModalPlayId] = useState('');

const clickImg = (id) => {
  setReleaseModal(true);
  document.body.style.overflow = 'hidden';
  setModalPlayId(id);
};

const closeReleasePopup = () => {
  setReleaseModal(false);
  setModalPlayId('');
  document.body.style.overflow = 'unset';
};
```

modal의 토글 사용을 위한 state를 만들어 주었고, 비교적 간단한 내용인 id를 props로 전달하기 위한 **`modalPlayId`** state를 생성해 주었다.

---

## 4. iframe (player)

```jsx
<iframe
  id="ytplayer"
  type="text/html"
  width="720"
  height="405"
  src={`https://www.youtube.com/embed/${modalPlayId}`}
  frameborder="0"
  allowfullscreen
/>
```

위처럼 prop으로 가져온 id값을 지정하여 모달마다 src URI주소가 다르게 구성했다.

---

## + 트러블 슈팅

```js
.filter((item) => item !== item[0])
```

위 코드를 콘솔에 출력해봐도 데이터가 변함없이 **똑같은 내용**이였다..

하지만 구조를 잘 살펴보자

```json
"items": [
  {
    "kind": "youtube#playlistItem",
    "etag": "...",
    "id": "...",
    "snippet": { ... } // 11 items
  },
  {
    "kind": "youtube#playlistItem",
    "etag": "...",
    "id": "...",
    "snippet": { ... } // 11 items
  },
  ...
]
```

`filter` 해야 할 대상은 array 이다

**`[`** `{}, {}, ...{}` **`]`**

하지만 `filter`가 바라보는 대상은 객체였다.

`[` **`{}`**`,` **`{}`**`, ...`**`{}`** `]`

또 배열 내부의 범위이기 때문에 **2가지 조건**이 필요했다.

- item의 고유값인 **id로 비교**가 필요.
- **item(객체)을 벗어난 비교대상**이 필요.

```js
.filter((item) => item.id !== ItItemPlayList.items[0].id)
```

이로써, 데이터는 객체의 고유값인 id와 다른 데이터를 가져갈 것이고, 비교하는 데이터(`ItItemPlayList`)의 **첫번째 id의 객체를 `filter`** 할 수 있게 되었다

---

:::tip 최종 정리

1. react-query 사용 시 별칭을 붙여 **데이터의 목적을 정확하게 명시.**
2. **배열 메서드 사용** 시 데이터의 구조를 잘 살펴야 한다(오류 발생 >> 해결).
3. modal 에는 prop으로 클릭한 **video ID 값 전달**
4. 모달이 생길 때 전달받은 **video ID 값**을 활용해 iframe src 변화

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/109)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-26 */}
