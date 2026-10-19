---
title: "Project: 🚩codefoliol - 라이브러리 선정"
description: "codefolio 프로젝트의 텍스트 에디터, Next.js, 스타일링, DB, 상태 관리, 데이트 피커 등 라이브러리 선정 과정과 장단점 비교."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

프로젝트 - 라이브러리 결정사항 정리

:::

<!--truncate-->

---

## 라이브러리 선정

### 1. Text Editor

📌 TOAST UI

- 결정 과정
  - **TOAST**
    - 데모
      - [https://ui.toast.com/tui-editor](https://ui.toast.com/tui-editor)
    - 장점
      - 역사와 전통이 있고 다른 사람의 자료를 참고할 수 있습니다.
      - 한국 커뮤니티가 발달되어 있습니다.
    - 단점
      - react-**editor** wrapper의 react 18 미지원
      - SSR 미지원 → Next.js의 장점을… [Advanced Features: Dynamic Import | Next.js](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr)
      - [Next.js 에 toast ui Editor 을 같이 사용하는 방법 (짱쉬움)](https://yoon-dumbo.tistory.com/entry/Nextjs-%EC%97%90-toast-ui-Editor-%EC%9D%84-%EA%B0%99%EC%9D%B4-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95-%EC%A7%B1%EC%89%AC%EC%9B%80)
      - 글자 크기 상세 조정 미지원
      - 이미지 사이즈 선택 불가
  - ~~**TINY**~~
    - ~~단점 : 유료~~
  - ~~**react-quill**~~
    - 데모
      - [https://quilljs.com/](https://quilljs.com/)
    - 장점
      - 글로벌 커뮤니티가 방대합니다.
    - 단점
      - [https://velog.io/@rlaclgns321/웹-에디터-React-quill#크로스-사이드-스크립트](https://velog.io/@rlaclgns321/웹-에디터-React-quill#크로스-사이드-스크립트)
      - 에디터에 사용할 모듈을 직접 설정해줘야 합니다.
  - ~~[https://editorjs.io/](https://editorjs.io/)~~
    - 데모: [https://codesandbox.io/s/54qwjr78lp](https://codesandbox.io/s/54qwjr78lp)
    - 장점
      - JSON으로 Output을 받을 수 있습니다.
      - 상단탭이 없어 ui가 깔끔합니다.
    - 단점
      - 문법에 class가 등장합니다.
        - this 바인딩 복습이 필요합니다.
      - 상단탭이 없어 editor 인지…

---

### 2. Next.js 적용 여부

📌 Next.js 적용

- 결정 과정
  - 사용자가 인터렉션을 진행하는 시간 보다, 정적으로 텍스트를 읽는 시간이 더 길 것 같다는 의견.
  - SEO 적용에 유리하다.
  - 정적인 페이지에서 손쉽게 SSR을 활용할 수 있다.
  - 간편한 Route 설계로 확장에 유리하다.

---

### 3. 스타일링

📌 styled-components

- 결정 과정
  - **styled-components**
    - 장점
      - 개발팀 전원에게 익숙한 문법.
      - Sass문법을 지원함.
      - 관심사를 분리해 독립적인 컴포넌트를 생성 가능.
    - 단점
      - 스타일링을 위해서는 컴포넌트화가 필수적이다.
  - **emotion**
    - 장점
      - styled-componenets와 동일
    - 단점
      - 로고가 못생겼어요
      - pragma line을 파일 최상단에 추가해주어야 함
  - **tail-wind**
    - 장점
      - 간편한 퍼블리싱 가능
      - 모듈 base css라 성능이 가장 우수함
    - 단점
      - 인라인 코드가 지저분해지고, 유지보수가 어려워짐
      - 사전 학습이 어느정도 필요..
  - **SCSS + CSS-Module**
    - 장점
      - 직관적이다.
    - 단점
      - 개발 경험이 좋지 못하다.
        - 파일 하나 더 파야함 ㅎ.ㅎ

---

### 4. DB

📌 **supabase**

→ 유져와 포트폴리오, 유져와 유져간의 관계를 명확하게 하기 위해 SQL DB를 사용한다.

→ Back-end단의 코드 집중보다, Front-end단의 코드에 더 집중하기 위해 BaaS인 Supabase 및 Supabase-Auth를 사용한다.

- 결정 과정
  - SQL
    - 장점
      - 정규화를 해 놓으면 서버 리소스를 줄일 수 있다.
      - 관계를 명확하게 정의할 수 있다.
    - 단점
      - 엄격하다.
      - 사용 경험이 적다.
  - NoSQL
    - 장점
      - 검색
      - 유연성
      - 확장성이 좋다.
      - 기본적으로 다들 써봄
    - 단점
      - 유연성으로 인해 데이터 구조 결정을 미루게 될 수 있음
      - 데이터 중복을 계속 업데이트 해야 함
      - 데이터가 여러 컬렉션에 중복되어 있기 때문에 수정 시 모든 컬렉션에서 수행해야 함 (SQL에서는 중복 데이터가 없으므로 한번만 수행이 가능)

|      | SQL                         | NoSQL                  |
| ---- | --------------------------- | ---------------------- |
| BaaS | **Supabase**                | firebase               |
| DB   | RDS(MySQL, Oracle….)        | MongoDB, ElasticSearch |

#### 4.5. Auth

- 📌 supabase-auth
  - OAuth
  - Next-Auth
  - Supabase-Auth → supabase를 사용함으로써 auth도 자동적으로 해결됨!
  - ~~Firebase-Auth~~

---

### 5. 로컬 상태 관리

📌 **recoil**

- 결정 과정

  ~~Context API~~

  - ~~장점 : 라이브러리 설치할 필요가 없음~~
  - ~~단점 : 리덕스 다음으로 보일러 플레이트가 많습니다.~~

  Redux Tool Kit

  - 장점
    - 회사에서 많이 쓴다. 공개된 자료를 활용할 수 있습니다.
    - 디버깅 툴이 강력하다.
    - 팀원들 모두 사용 해 보았다.
  - 단점
    - 보일러 플레이트로 작은 실수가 큰 버그를 만들어 낼 수 있습니다. 읽을 코드가 많아 디버깅 절차가 길어질 수 있습니다.

  **Recoil**

  - 장점
    - 쉽다!
    - 회사에서 많이 쓴다. 리덕스 다음으로 많은 자료를 활용할 수 있습니다.
    - atom 단위로 상태 관리 가능
  - 단점
    - 개발자 도구가 완벽하지 않다. 디버깅 및 스냅샷 테스트를 하는데 있어 신뢰성이 부족하다.
    - 모든 API들이 높은 신뢰성을 보장하지 않는다.
    - 디버깅 툴이 없다.

  Jotai

  - 장점
    - 쉽다!
    - SSR에도 활용할 수 있는 부분이 있습니다. [https://jotai.org/docs/guides/nextjs](https://jotai.org/docs/guides/nextjs)
  - 단점
    - 신생 기술이다.
    - 타 라이브러리에 비해 아직 자료가 많지는 않습니다.

  Zustand

  - 장점
    - 쉽다!
    - 기존 리덕스 지식이 일부 적용되어 있습니다.
    - 리덕스의 디버깅툴을 사용할 수 있습니다.
  - 단점
    - Jotai 문서화가 덜 되어 있고 커뮤니티도 작습니다.
    - 신생 기술이다.

  Xstate

  - 장점
    - [https://xstate.js.org/](https://xstate.js.org/)
    - 복잡성이 높을 때 무한한 대응이 가능합니다.
  - 단점
    - 리덕스보다 복잡성이 더 큽니다.

---

### 6. 서버 상태 관리

📌 **react-query**

- 결정 과정

  **React-query**

  - 장점
    - 커뮤니티
    - 많은 기능 지원
    - prefetching
  - 단점
    - 무거움

  ~~Redux-query~~

  - ~~장점~~
    - ~~[https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering](https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering)~~
  - ~~단점~~
    - ~~[https://redux-toolkit.js.org/rtk-query/comparison](https://redux-toolkit.js.org/rtk-query/comparison)~~
    - ~~무한 스크롤 없음~~

  SWR

  - 장점
    - Next.js와 동일한 곳에서 개발했습니다. [https://swr.vercel.app/ko/docs/with-nextjs](https://swr.vercel.app/ko/docs/with-nextjs)
    - 번들사이즈 작습니다.
    - pagination 지원 (`useSWRInfinite`)
  - 단점
    - 리액트 쿼리보다 커뮤니티가 작습니다.
    - 학습이 필요합니다.

---

### 7. 데이트 피커

📌 react-datepicker

- 결정 과정: 년-달 까지 날짜 픽 가능해야 함
  1. **react-datepicker** ([https://www.npmjs.com/package/react-datepicker](https://www.npmjs.com/package/react-datepicker)) → date-fns 응용 → 다양한 props와 커스텀 스타일 가능
     - → 패키지 사이즈 526kb로 상대적으로 큼
     - → 달까지 픽 가능. 여러 종류 가능. ([https://reactdatepicker.com/](https://reactdatepicker.com/))
  2. material ui date picker ([https://mui.com/x/react-date-pickers/date-picker/](https://mui.com/x/react-date-pickers/date-picker/)) → input만 전달 가능(custom icon 사용 불가)
     - → UI가 독선적
  3. toast ui date picker ([https://nhn.github.io/tui.date-picker/latest/](https://nhn.github.io/tui.date-picker/latest/))
     - → 사용 자료가 너무 적음

참고 자료 : [React에서 활용 가능한 DatePicker Library 정리](https://velog.io/@seeh_h/React에서-활용-가능한-DatePicker-Library)

---

### 8. 기타

- **axios** 사용 (깃헙API, (+)ChatGPT(OpenAI))
- **lodash** 사용
  - lodash date (+)date-fns 사용 (날짜 쉽게 가능. n일 전 지원. 시간 차이 계산 가능)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/120)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-07 */}
