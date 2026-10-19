---
title: "Project : helprogrammers - S.A"
description: "알고리즘 질문과 힌트 댓글 커뮤니티 helprogrammers의 아이디어 선정, 필수 요구 사항, 기능 분담, 팀 규칙을 정리한 기획 문서."
authors: [hyoloui]
tags: [project]
---

S.A (Starting Assignments)

## helprogrammers

:::note 프로젝트 소개

💡 프로젝트 제목 : 헬프로그래머스
( 헬프 + 프로그래머스 ), ( 헬 + 프로그래머스 )

프로젝트 간단 설명 : 알고리즘 문제를 어려워하는 내일배움캠프 대원 분들을 위해 질문을 게시하고, 댓글로 힌트를 주고 받을 수 있습니다. 핵심은 댓글이 가려진 상태로 원하는 수준의 힌트만 열어볼 수 있습니다.

:::

<!--truncate-->

## 아이디어 Goal

- 점심메뉴 공유 사이트, 뭐먹지@DRAM
- 프로그래머스, 알고리즘 Q&A @영진 최 ------------------채택🎉
- 자취러 필수템/꿀팁 공유, 커뮤니티 @강익 손

---

## 리액트 A-4조 프로젝트 개요

### 화이트보드

> 💡 여기저기 돌아다닐 필요 없이 프로젝트 내부 자료를 이곳에 모아 한눈에 확인할 수 있습니다.

- 🔁 **다이어그램을 활용한 워크 플로우**
  - [for-real-project.drawio](https://drive.google.com/file/d/163S63H9vtLRTcZDMJt0Yt-6F9jy1ux5Z/view?usp=drivesdk)
- 📝 **브레인 스토밍, 와이어 프레임**
  - [https://www.figma.com/file/5wO5Upht0N3TFJqpcMzVpS/Wireframe?node-id=0%3A1&t=QX9cfB234hLNsK8b-0](https://www.figma.com/file/5wO5Upht0N3TFJqpcMzVpS/Wireframe?node-id=0%3A1&t=QX9cfB234hLNsK8b-0)
- 🎨 **디자인 / 레퍼런스 참조**
  - [Baekjoon Online Judge](https://www.acmicpc.net/)
  - [SW Expert Academy](https://swexpertacademy.com/main/main.do)
  - [프로그래머스](https://programmers.co.kr/)

---

### 필수 요구 사항

- **동적 라우팅을 사용**.
- 1개 이상의 Custom Hook을 구현.
- **Form에 유효성 검증 기능을 적용**. 아래 예시
  - ex: 제목을 10글자 이상 기입하지 않으면, 글을 추가할 수 없도록 제한 → Alert 으로 안내
  - ex: Form에서 모든 input에 값을 입력하지 않으면, 버튼이 비활성화
- 버튼 **컴포넌트 1개로 모든 버튼을 구현**. 모든 스타일과 기능을 버튼을 구현할 수 있는 **만능 버튼**을 만들것.
- development 환경에서만 redux devtool이 활성화 되도록 처리.
- 배포된 결과물에서는 `console.log()` 가 보이지 않도록 처리.
- `.env` 를 이용해서 API 서버의 URL 코드상에서 숨기도록 처리.

💡 **features : 필수로 구현해야 할 기능**

1. **공통**
   - UI 구현하기
   - API 명세서 작성하기
2. **질문 게시글 - CRUD 구현**
   - 질문 리스트 조회 하기(메인 게시글 스레드) - 다영
   - 질문 조회 하기(상세페이지) - 승효, 태언
   - 질문 추가 하기(게시글 작성 페이지) - 태언, 강익
   - 질문 삭제 하기(상세페이지) - 태언, 강익
   - 질문 수정 하기(상세페이지) - 승효, 강익
3. **질문 게시글의 댓글 - CRUD 구현**
   - 댓글 조회 하기 - 영진, 승효, 다영
   - 댓글 추가 하기 - 영진, 승효, 다영
   - 댓글 삭제 하기 - 영진, 승효, 다영
   - 댓글 수정 하기 - 영진, 승효, 다영
4. **배포**
   - json-server 서버 배포 (heroku 사용) - 태언
   - 리액트 프로젝트 배포 (S3, vercel 등)
5. 추가기능
   - 검색기능 - 영진
   - 페이지 모드 변환 - 다영

[API](https://www.notion.so/3204176aff5d4f27be5d74b22d520750)

---

### 🌐 팀 내 문화 (Ground Rule)

1. 무조건 서로를 ~님이라고 호칭하기
2. 서로 존중하자, 상대 입장에서도 한번 생각하기
3. 아침조회는 9시에 ZEP에 접속하기
4. 저녁회의는 7시에 ZEP에 접속하기
5. 작업 중에 막히는 부분(오류, 검색해서 잘 나오지 않는 부분)들을 너무 오래 고민하지말고 1시간 혹은 2번 이상 고려해도 안될 때 → 팀원 혹은 팀장에게 공유해서 빨리 해결할 것 → 공유할 땐 구체적인 문제의 원인, 상황을 설명 할 것
6. 코드 리뷰할 경우 왜? 라는 질문 많이 하기, 기분 나빠하지 않기
7. 팀장에게 작업이 끝나거나 새로운 기능을 추가할 때 현재 상황을 업데이트.

---

:::tip 최종 정리

1. helprogrammers 커뮤니티 서비스 개발
2. Redux-toolkit 으로 프로젝트 개발, json-server를 통해 임시 API를 구축
3. 질문과 댓글 기능이 핵심인 CRUD 기능 개발
4. 프로젝트를 통해 Redux, redux-toolkit, axios, custom-hooks를 사용하여 주특기 숙련

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/72)에서 옮겨 온 글입니다. 원문 작성일: 2022-12-22 */}
