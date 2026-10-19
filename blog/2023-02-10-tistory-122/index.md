---
title: "Project: 🚩codefolio - ESlint, prettierrc 설정하기 / as-is to-be : 2"
description: "Next.js + TypeScript 프로젝트에 ESLint(airbnb)와 prettier를 초기 설정하고 function declaration, non-null assertion 경고를 해결한 과정."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

코드 컨벤션 유지를 위해 ESLint와 prettier를 사용하여 초기세팅, 과정 기록

:::

:::warning 🤢 오류 해결 (as-is to-be)

- ESLint function declaration
- ESLint 적용시 단언문 (!) 경고 메세지

:::

<!--truncate-->

---

## 1. ESLint

대부분의 개발자들은 eslint를 사용하지 않고, prettier에 의존하여 코드를 작성한다.

eslint 는 코드 퀄리티를 보장하도록 도와준다.

예시로는 react에서 컴포넌트 선언을 arrow function 으로 지정하고, 어떤 파일에서 일반함수로 되어있다면, 에러를 발생시켜 코드 컨벤션이 통일이 되도록 유도한다.

이 과정은 prettier 처럼 '파일 저장' 했을 때와는 다르게 lint 를 run 해야 동작한다.

```bash
npm install -D eslint
# or
yarn add -D eslint
```

위 명령어로 프로젝트 내에 린트를 설치해주고 린트 환경을 세팅해주는 모듈을 작성해줘야 한다.(`.prettierrc` 세팅 처럼)

하지만, 모든 환경(rules)을 설치해주는 번거로움을 줄이기 위해 플러그인을 설치하는게 빠르다.

우리는 타입스크립트를 사용하므로 typescript-eslint를 적용하기로 했다.

[typescript-eslint](https://typescript-eslint.io/)

```shell
npm install -D eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

그리고 가장 핵심이 되는 2가지가 있다.

eslint만 설치했다고 해서 바로 사용할 수 있는 것이 아니라, **eslint extension을 무조건 설치를 해주어야 하고,**

프로젝트 init을 하는 상황이라면, 즉 first commit 이라면 **`.eslintrc.json` 파일에 환경 설정**을 해줘야 한다.

```json title=".eslintrc.json"
{
  "parser": "@typescript-eslint/parser",
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json",
    "createDefaultProgram": true
  },
  "plugins": ["react", "@typescript-eslint", "prettier"],
  "rules": {
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": [
      2,
      { "namedComponents": "arrow-function" }
    ]
  }
}
```

eslint plugin 으로 유명한 airbnb 규칙을 적용해주었고, 종속 패키지 목록들을 같이 넣었다.

또한 rules 에서는 취향에 맞게 규칙을 설정하는데, 우리는 2가지를 적용했다.

`"react/function-component-definition"` 이 부분은 에러로 인해 아래 상세히 기록하겠다. 위 예시에서 설명한 부분처럼 컴포넌트들의 기본 구조인 function 선언 방식을 **arrow-function 으로 지정**해 주었다.

---

## 2. prettier

프리티어 보통 개인 코드에도 많이들 적용하는 extension 이기에 자세한 설명은 생략 하겠다.

우리는 eslint와 prettier를 함께 사용하기에 규칙들이 충돌됨으로 의존성 패키지들을 설치해야 했다.

```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

`.prettierrc.yml` 파일에는

```yaml title=".prettierrc.yml"
arrowParens: "always"
bracketSpacing: true
jsxBracketSameLine: false
jsxSingleQuote: false
printWidth: 80
proseWrap: "always"
quoteProps: "as-needed"
semi: true
doubleQuote: true
tabWidth: 2
trailingComma: "es5"
useTabs: false
```

이러한 형식으로 코드의 스타일을 맞췄다.

---

## + 오류 해결 : Function component is not a function declaration

as-is

```tsx
const DetailPage: NextPage = () => {
  return <div>.</div>;
}; // Function component is not a function declaration

export default DetailPage;
```

```bash
./pages/profile/[[...userId]].tsx
3:31  Error: Function component is not a function declaration  react/function-component-definition

./pages/profile/detail/[id].tsx
3:37  Error: Function component is not a function declaration  react/function-component-definition

./pages/profile/edit-profile/[id].tsx
3:35  Error: Function component is not a function declaration  react/function-component-definition

info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/basic-features/eslint#disabling-rules
error Command failed with exit code 1.
```

위 오류는 eslint의 환경에서 **function 선언이 되지 않았다**는 뜻으로 `.eslintrc.json` 파일의 rules에서 컴포넌트들의 기본 구조인 function 선언 방식을 **arrow-function 으로 지정**해 주어 해결하였다.

to-be

```bash
$ yarn lint
✔ No ESLint warnings or errors
✨  Done in 3.76s.
```

---

## + 오류 해결 : Forbidden non-null assertion

as-is

```ts title="lib/supabase.ts"
import { createClient } from "@supabase/supabase-js";

const options = {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, // Forbidden non-null assertion
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Forbidden non-null assertion
  options
);

export default supabase;
```

```bash
./lib/supabase.ts
12:3  Warning: Forbidden non-null assertion.  @typescript-eslint/no-non-null-assertion
13:3  Warning: Forbidden non-null assertion.  @typescript-eslint/no-non-null-assertion
```

단언 연산자를 사용해 뿜는 경고 메세지이다. 위 부분은 api key 선언으로 인한 에러를 우회할 방법이 딱히 떠오르지 않았으나 간단하게 eslint 구문을 추가해 해당 페이지에서는 eslint를 적용하지 않는 방법으로 해결했다.

to-be

```ts title="lib/supabase.ts"
/* eslint-disable */

import { createClient } from "@supabase/supabase-js";
// ...
```

```bash
$ yarn lint
✔ No ESLint warnings or errors
✨  Done in 3.07s.
```

**무시하고자 하는 파일 맨 윗줄에 `/* eslint-disable */` 추가해 준다. 파일 하나 전체를 무시하고 싶을 때 사용**

```js
/* eslint-disable */
```

---

:::tip 최종 정리

1. eslint는 코드 퀄리티, 코드 컨벤션을 위해 사용
2. prettier는 코드 스타일을 위해 사용(`''` space `;` 줄 맞춤 등 )
3. eslint : function declaration 은 rules 에 `"react/function-component-definition"` 설정하여 해결
4. eslint : 적용 제외할 파일 최 상단에 `/* eslint-disable */` 추가

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/122)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-10 */}
