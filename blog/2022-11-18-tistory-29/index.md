---
title: "Project : 팬PicK - S.A (기획)"
description: "팬PicK 프로젝트의 서비스 키워드와 이름 선정, 레퍼런스, 와이어프레임, 필수·선택 기능 분류를 정리한 기획 문서."
authors: [hyoloui]
tags: [project]
---

S.A (Starting Assignments)

#### 💾 Project : 팬PicK

- 제목 ✔
- 와이어프레임 ✔
- 기능 분류 ✔

<!--truncate-->

## 📝 첫 번째 회의 내용

> 프로젝트 서비스 키워드 :
>
> 스터디(채팅)
> 새상품(거래)
> 사이드프로젝트(매칭)
> 반려동물(커뮤니티)
> 챌린저스(매칭)
> 🚩팬(커뮤니티)
>
> \* 투표하여 선정

## 제목

> 프로젝트 네임 :
>
> 홍보팬 팬결고리
> 🚩팬Pick - fix
>
> \* 투표하여 선정

![logo image](./img-01.png)

## 💡 참조 레퍼런스

- [#팬픽 : 스타와 팬이 함께하는 공간](https://shopfanpick.com/)
- [Disquiet\*](https://disquiet.io/)
- [velog](https://velog.io/)

## 와이어 프레임

[https://xd.adobe.com/view/400da440-ac14-4f56-9d0c-c401c6708c34-155e/](https://xd.adobe.com/view/400da440-ac14-4f56-9d0c-c401c6708c34-155e/)

[플로우 1](https://xd.adobe.com/view/400da440-ac14-4f56-9d0c-c401c6708c34-155e/)

## 기능 분류

### 프로젝트 필수 기능

- 로그인, 회원 가입
  - Authentication 에서 제공하는 api를 이용하여 아래 회원 가입, 로그인을 구현해보세요.
    - 아이디(이메일), 패스워드 로그인 및 회원가입
    - 소셜 로그인 (구글, 깃헙)
- CRUD
  - Firestore 에서 제공하는 api를 이용하여 CRUD 데이터베이스 핸들링을 구현해보세요.
  - CUD(등록, 수정, 삭제)가 일어날 때 마다 R(조회)해서 자연스럽게 화면 변경을 해보세요.
- 마이 페이지
  - 내 게시물 보기
    - Authentication 에서 제공하는 uid 를 이용해서 내 게시물을 모아서 조회해 보세요.
  - 프로필 수정 기능
    - Cloud Storage 에서 제공하는 api를 이용하여 이미지 업로드와 다운로드 url 을 받아서 이미지 핸들링을 해보세요.
- 배포하기
  - S3를 이용해서 배포하실 때는, 완성 후에 배포하지 않으셔도 됩니다! 여유가 있을 때 미리 배포해두고 새로운 내용을 반영시키면 프로젝트 마감 시에 조급하게 배포하지 않아도 됩니다.
  - 가비아에서 저렴한 도메인(500원)을 구매하신 후 AWS Route 53(DNS 서버)과 가비아(네임 서버) 설정을 통해 도메인 연결을 해보세요.
- Git을 최대한 활용해보기!
  - Pull Request 활용하기!
    - Merge는 Pull Request를 활용하여 진행한다.
    - 참고: [https://xo.dev/github-collaboration-guide/#pull-request-만들기](https://xo.dev/github-collaboration-guide/#pull-request-만들기)
  - Branch 만들어 작업하기
    - 참고: [https://xo.dev/github-collaboration-guide/#git-브랜치-만들어-작업하기](https://xo.dev/github-collaboration-guide/#git-브랜치-만들어-작업하기), [https://blog.outsider.ne.kr/1505](https://blog.outsider.ne.kr/1505)
  - 코드 리뷰 해보기!
    - 참고: [https://xo.dev/github-collaboration-guide/#코드-리뷰-하기](https://xo.dev/github-collaboration-guide/#코드-리뷰-하기)

### 프로젝트 선택 기능 (우선순위)

1. 즐겨찾기 정렬
   - ◾ 카테고리 별 즐겨찾기 - 카운트 기능
   - ◾ Hot 셀럽 카테고리에 즐겨찾기 카운트 순서로 정렬
2. 게시글 정렬
   - ◾ 최신 순 정렬 (Default)
   - ◾ 좋아요 순 정렬
3. 댓글
   - ◾ 글마다 댓글을 작성할 수 있도록 추가 (좋아요?)
   - ◾ 댓글 수정 및 삭제
4. 검색
   - ◾ 검색 창 생성하여 검색 기능 구현 (카테고리, 글)
5. 좋아요
   - ◾ 게시 글 마다 좋아요 기능 추가
   - ◾ 버튼 누르면 빨간색으로 변하여 좋아요 활성 상태 제공

{/* 이 글은 Tistory(https://hyoloui.tistory.com/29)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-18 */}
