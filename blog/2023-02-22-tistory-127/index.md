---
title: "Project: 🚩codefolio - toast ui Editor(codeSyntaxHighlightPlugin) 적용 중 에러 노트"
description: "Next 프로젝트에서 prismjs 타입 선언을 찾지 못해 vercel 빌드가 실패한 문제를 @types/prismjs를 devDependencies로 옮겨 해결한 과정."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

Next 개발 환경 `devDependencies` 이해하고 기록 남기기

:::

:::warning 🤢 오류 해결

- 모듈 설치 후 생기는 타입 에러, import not found

:::

<!--truncate-->

---

## 1. Vercel Deployment Status Building Error

우리 프로젝트는 vercel을 사용하여 deploy를 한다. 첫 init을 한 후, vercel 에 깃허브가 연동이 되면

친절하게도 vercel은 자동으로 commit에 대한 변동을 인식하고 해당 내용으로 build를 해서 done 이 되는지의 여부를 알려준다.

하지만 오늘 커밋에서 building 에러가 났는데, import를 하는 컴포넌트는 2개 였으나 1개의 컴포넌트에만 에러가 나서 왜 그런지 이해가 안되었다..

서칭 후 typescript 빌딩이 되지 않는 문제였고

```bash
Failed to compile.

Type error: Could not find a declaration file for module 'prismjs'. '/vercel/path0/node_modules/prismjs/prism.js' implicitly has an 'any' type.
  Try `npm i --save-dev @types/prismjs` if it exists or add a new declaration (.d.ts) file containing `declare module 'prismjs';`
```

위 같은 에러를 만들었다

---

## + 오류 : 첫번째 시도 방법

위 에러에 나와있는 방법대로 시도를 했다. 우리는 패키지 매니저로 yarn을 사용하기 때문에

```bash
yarn add @type/prismjs
```

명령어를 입력해 `package.json` 에 추가된 것을 확인 했으나

**AS-IS**

```tsx
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs"; // 모듈 'prismjs'에 대한 선언 파일을 찾을 수 없습니다. ...
```

모듈 'prismjs'에 대한 선언 파일을 찾을 수 없습니다. 라는 메세지와 함께 인식하지 못했다..

---

## + 오류 : 두번째 시도 방법

`tsconfig.json` 파일에 경로 설정을 해주면 문제가 해결될까? 라는 생각에

```json
{
  "compilerOptions": {
    "typeRoots" : ["./@types", "./node_modules/@types"]
  },
}
```

파일에 위 구문을 추가했다.

하지만 아무런 일도 일어나지 않았고, 문제 인식을 했다..

---

## + 오류 : 세번째 시도 방법

문제는 `package.json` 이였다.

next는 dev 환경에서 실행되며, typescript는 컴파일 전의 상태이기 때문에

```json
"dependencies": {
    "prismjs": "^1.29.0"
  },
```

`dependencies` 에 있는 패키지를

```json
"devDependencies": {
    "@types/prismjs": "^1.26.0"
    }
```

`devDependencies` 로 이동해주어야 인식할 수 있는 상태가 된다.

**AS-IS**

```tsx
import Prism from "prismjs"; // 에러: 모듈 'prismjs'에 대한 선언 파일을 찾을 수 없습니다.
```

**TO-BE**

```tsx
import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs"; // 에러 없음
```

---

:::tip 최종 정리

1. next는 dev 환경에서 개발 하고 있다는 것을 항상 인지하자.
2. `devDependencies`에 속한 라이브러리는 다운로드 대상에 포함되지 않고 개발환경, 빌드시 사용된다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/127)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-22 */}
