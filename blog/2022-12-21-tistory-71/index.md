---
title: "리액트 - 로컬에서 JSON-server 구축하기"
description: "mock data용 임시 API 서버 json-server를 설치하고 db.json으로 실행해 브라우저에서 GET 응답을 확인하는 방법."
authors: [hyoloui]
tags: [react]
---

TIL : Today I Learned

<!--truncate-->

## JSON-server

> 아주 간단한 DB와 API 서버를 생성해주는 패키지 이다.
> 우리가 json-server를 사용하는 이유는 backend(이하 BE)에서 실제 DB와 API Server가 구축될 때까지 Frontend(이하 FE) 개발에 임시적으로 사용할 mock data를 생성하기 위함이다.
>
> json-server 를 통해서 FE에서는 BE가 하고 있는 작업을 기다리지 않고, FE의 로직과 화면을 구현 할 수 있어 효율적으로 협업이 가능하다.

### json-server 설치하기

CRA로 프로젝트를 새로 생성하고, `yarn` 또는 `npm`을 이용해서 설치한다. 예시에서는 기존에 사용하던 yarn을 사용해서 설치하겠다.

npm 명령어

```bash
npm install json-server
```

yarn 명령어

```bash
yarn add json-server
```

### json-server 실행하기

json-server가 간단한 패키지이긴 하지만, 말 그대로 **서버이다**. 그래서 **리액트와는 별개로 따로 실행을 해줘야 한다.**

다시 말해 리액트도 start 하고, json-server도 start 해야 한다. 그래야 리액트와 json-server가 서로 통신할 수 있다.

아래 명령어를 통해 json-server를 실행한다. 명령어의 대략적인 뜻은 db.json 이라는 것을 db로 삼고, 3001 포트에서 서버를 시작하겠다는 뜻.

```bash
yarn json-server --watch db.json --port 3001
```

이렇게 명령어를 입력하면, 프로젝트 루트에 db.json이 자동으로 생성된다. 이 json 파일을 db로 사용하는 것이다!

```text
prac_json_server/
  node_modules/
  public/
  src/
  .gitignore
  db.json        <- 자동 생성
  package.json
  README.md
  yarn.lock
```

### db.json 수정하기

db.json이 생성되면서 기본값을 넣어주었는데, 난 Todo list를 만들 것이니 `todos` 라고 이름을 지었다. 그리고 데이터 형태는 배열이다. `todo` 1개를 테스트용으로 만들어주었다.

```json title="db.json"
{
  "todos": [
    {
      "id": 1,
      "title": "json-server",
      "content": "json-server를 배워봅시다."
    }
  ]
}
```

### 브라우저에서 db 확인하기

그리고 우리가 만든 API 서버가 잘 작동하고 있는지 확인하자. 브라우저에서 [http://localhost:3001/todos](http://localhost:3001/todos) 로 url 을 입력하면 터미널에는 아래처럼 새로운 상태를 출력한다.

<details>
<summary>실행 결과 (터미널)</summary>

```bash
db.json has changed, reloading...
Done

Resources
http://localhost:3001/todos

Home
http://localhost:3001

GET /todos 200 30.830 ms - 101
```

</details>

누군가 **GET** 요청을 했고 30.830 ms 이 소요됐음을 확인 할 수 있다.

<details>
<summary>실행 결과 (브라우저)</summary>

```json
[
  {
    "id": 1,
    "title": "json-server",
    "content": "json-server를 배워봅시다."
  }
]
```

</details>

브라우저에서는 db의 상태를 확인 할 수 있다!

이렇게 우리가 임시로 db를 활용하여 FE에서도 서버가 구축되기 전부터 개발을 진행할 수 있고, BE에서 db 서버가 완성이 되면 그것과 연결하여 실제 서비스를 구현할 수 있다.

하지만, 우리는 로컬 환경에서 json-server를 **실행시킨 것 뿐**이고 배포하지 않았다. 다음 포스팅에서는 localhost 가 아닌 외부에서도 접근할 수 있도록 간단하게 배포하도록 할 것이다.

:::tip 최종 정리

1. json-server를 통해 임시 API를 구축하고, 서버의 DATA를 mocking 할 수 있다
2. 이것을 통해 선제적으로 FE 개발을 진행할 수 있다
3. heroku를 이용해서 json-server를 배포할 수 있다

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/71)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-21 */}
