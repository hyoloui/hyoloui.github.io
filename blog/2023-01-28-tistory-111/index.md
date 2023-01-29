---
title: "Project: Develife - ✨Typescript 리펙토링 과정"
description: "React로 작성된 Develife 프로젝트를 TypeScript로 리팩토링하는 환경 설정, 타입 정의 과정과 Comment 타입 충돌 에러 해결."
authors: [hyoloui]
tags: [project, typescript, refactoring]
---

:::note 🎯목적

타입 스크립트 리펙토링 과정 정리

:::

:::warning 🤢 트러블 슈팅

- `Comment` 타입 overlap 에러

:::

<!--truncate-->

---

## 1. typescript 환경 세팅

Develife 프로젝트는 리액트로 다 작성되어 배포까지 마친 상태였다.

처음 진행 해야하는 작업은 typescript의 패키지를 설치해야 한다

```bash
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

```json
"@types/jest": "^29.4.0",
"@types/node": "^18.11.18",
"@types/react": "^18.0.27",
"@types/react-dom": "^18.0.10",
"typescript": "^4.9.4",
```

dependencies에 설치가 완료 된 후,

```bash
tsc --init
```

명령어로 `tsconfig.json` 파일이 생성되었는지 확인한 후, jsx를 인식 못하는 오류를 방지하기 위해 주석처리 되어있는 16번째 라인의 주석을 해제하며, **`"jsx": "preserve"`** >> **`"jsx": "react"`** 로 바꾼다

```json title="tsconfig.json"
// before
// "jsx": "preserve",           /* Specify what JSX code is generated. */

// after
"jsx": "react-jsx",             /* Specify what JSX code is generated. */
```

마지막으로 Root를 설정하면 초기 리펙토링 환경 세팅은 끝이 난다

```tsx title="index.tsx"
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

항상 HTML의 div element가 들어온다고 명시하는 구문이다.

---

## 2. 데이터 구조

서버 스테이트의 구조를 지정해주어야 해서 조원이 생성한 데이터 구조이다.

아직 타입스크립트에 대한 피드백이나 숙련도가 부족해 이게 맞는건가(?) 하는 부분이 많다.

```ts
export interface Item {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}

export interface Items {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          high: {
            url: string;
          };
          maxres: {
            url: string;
          };
        };
        resourceId: {
          videoId: string;
        };
      };
    },
  ];
}

export interface Snippet {
  title: string;
  description: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
  resourceId: {
    videoId: string;
  };
}
```

위 내용을 사용하는 컴포넌트가 많고, 어차피 다른 컴포넌트에서도 import 해야 하므로, **`index.data.ts`** 라는 파일에 위 3개의 interface를 분리해 주었다.

---

## 3. 유튜브 콘텐트 (한 영상의 썸네일) 컴포넌트

```tsx
interface ItemProps {
  item: Item;
  clickImg(snippet: Snippet): void;
}

const YoutubeContent = ({ item, clickImg }: ItemProps) => {
  return (
    <YoutubeBox key={item.id}>
      <YoutubeImg
        src={`${item.snippet.thumbnails.high.url}`}
        alt={`${item.snippet.title}`}
        onClick={() => clickImg(item.snippet)}
      />
    </YoutubeBox>
  );
};
```

처음 리액트에서 typescript로 작업할 때 당**황스러웠던** **props type**과 **event type**이 있었다

props type은 위처럼 미리 지정한 데이터 타입중 item에 맞는 `하나의 객체 데이터`를 임포트해서 연결하고, 함수는 return 값이 없으므로 `void` type을 지정해주었다.

---

## 4. 각 컴포넌트에서 받아온 props type

컴포넌트 구조는

- YoutubeBoard
  - Training
  - Programing
  - ItItem

으로 나누어 지는데 나누는 기준은 category 라는 state에서 컴포넌트와 일치하는 string이라면 해당 컴포넌트를 return 하는 방식이다

그래서 각 컴포넌트가 받고있는 props 내용은 `~PlayList`를 제외한 나머지는 모두 일치하다

```ts
type CategoryProps = {
  ItItemPlayList: Items;
  clickImg: (value: Snippet) => void;
  releaseModal: boolean;
  modalPlayItem: Snippet | null;
  closeReleasePopup: () => void;
};
```

---

## + 오류 해결

before - 해결 전

```tsx title="ContentsList.tsx"
export type Comment = {
  id: string;
  boardId?: string;
  text?: string;
  isEdit?: boolean;
  userName?: string;
  userId?: string;
};

export default function ContentsList({ modalPlayItem, isLoggedIn }: ListProps) {
  const [contents, setContents] = useState<Comment[]>([]);
  // ...
  return (
    <ContentsScroll>
      {contents.map((item) => {
        if (modalPlayItem?.resourceId.videoId === item.boardId) {
          return <Content key={item.id} item={item} isLoggedIn={isLoggedIn} />;
          // 'Comment' 형식에 'CharacterData' 형식의 data, length, ownerDocument ... 속성이 없습니다
        }
        return null;
      })}
    </ContentsScroll>
  );
}
```

분명 Comment라는 타입을 만들었는데 인식이 안되었다..

왜 안될까 typescript의 **엄청난 꿀팁**은

- 마우스를 올려본다
- Ctrl + 마우스 클릭

으로 **어떤 내용을 참조하고 있는지** 살펴봐야 한다

그렇게 찾아낸 결론은,

```ts title="lib.dom.d.ts"
/** Textual notations within markup; although it is generally not visually shown, such comments are available to be read in the source view. */
interface Comment extends CharacterData {
}

declare var Comment: {
    prototype: Comment;
    new(data?: string): Comment;
};
```

이미 타입스크립트가 **내부**적으로 만들어놓은 **declare**를 참조하고 있었다!!...

그래서 **interface** **이름을 바꿔주고**, 연결된 컴포넌트의 **import 구문도 다시 확인**했다

after - 해결 후

```tsx title="Content.tsx"
import { CommentItem } from './ContentsList';

type ContentProps = {
  item: CommentItem;
  isLoggedIn: boolean;
};
```

```bash
webpack compiled successfully
Files successfully emitted, waiting for typecheck results...
Issues checking in progress...
No issues found.
```

## + 해결

:::tip

typescript 기존에 있는 declare 이름과 겹치는 문제로, 생성한 interface가 제대로 인식되지 않는 문제. 다른 interface 이름을 넣어주며 간단히 해결

:::

---

:::tip 최종 정리

1. js >> ts 리펙토링 시 **typescript의 패키지 설치, `tsc --init`**
2. root 에 **`as HTMLDivElement`** 구문 추가
3. `tsconfig.json` 파일 16번째줄 주석 해제 후 **`"jsx": "preserve"`** >> **`"jsx": "react"`**
4. 함수에 return 값이 없는경우 **void type을 지정**, **parameter에도 type 지정** ex) `function(param: type) {...}`
5. import 가 많은 interface 경우 따로 **파일 분리**!
6. typescript의 **참조값이 어떤 것인지** 마우스를 올려보거나, Ctrl + 클릭해보자

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/111)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-28 */}
