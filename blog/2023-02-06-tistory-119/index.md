---
title: "Project:  🚩codefoliol S.A (최종 프로젝트)"
description: "포트폴리오 공유 사이트 codefolio의 개요, 와이어프레임, 주차별 구현 기능, 컨벤션, 그라운드 룰을 정리한 최종 프로젝트 S.A 문서."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

프로젝트 S.A - 첫 회의 결정사항 정리

:::

<!--truncate-->

---

## 1. 프로젝트 개요

> 💡 포트폴리오가 필요한 직군을 위한 포트폴리오 공유 사이트

---

## 2. 프로젝트 와이어프레임

- 개발팀 와이어프레임
- [Figma](https://www.figma.com/file/tmnp8NbXbZhnVFD1DeYYdc/Untitled?node-id=0%3A1&t=cOmM5hYm6OYmRpgV-1)

---

## 3. 주차별 구현 기능

### 1차 구현 기능 (23.02.11 달성)

#### 1.0.0 배포

- Auth
  - 회원 기본 정보
    - 이름
    - 성별
    - 이메일
    - 출생년도
    - 자기 소개
    - 프로필 사진
  - 업무 관련 정보
    - 포지션
    - 경력
      - 비공개 가능 연봉 정보
    - contact가능한 연락처
    - 사용 가능한 기술 스택?
    - 프로젝트
      - github 프로젝트 참여비율표시 (+)알파 기능으로 생각해 본다면 github api 사용…?
    - 자격증
    - 수상내역
    - 링크 & 파일 : 개발자 → github, 디자이너 등 → 비핸스… 등 링크 추가 할 수 있는 공간
    - 희망 연봉
    - 구직 의향 (구직 준비 중 / 제안만 받음 / 생각 없음)
- MyPage
  - 본인의 포트폴리오 모아보기
  - 개인정보 수정
- 포트폴리오 게시글(메인 기능)
  - 블로그 작성 라이브러리 활용
  - 사진 + 링크
  - 기술스택 tag로 추가
  - 마이 페이지에서 본인 것 접근
  - 조회수 & 좋아요 & 댓글
    - (+) 비속어 필터 (토스 오픈 라이브러리) (이월가능)
- Main page
  - 최신 게시글 불러오기 (뉴스피드)
    - (+) 큐레이션 또는 추천 알고리즘 적용하기 (이월가능)
- Common Page
  - 404, 500, Modal

### 2차 구현 기능 (23.02.18 달성)

#### 유저 피드백 시작, 로깅 라이브러리 추가, 비즈니스 로직 고도화

- Auth
  - Social login(Kakao, Naver, Google, (+)Github)
  - 비밀번호 찾기
- MyPage
  - 프로필 카드 생성 기능
  - (+) 스킬 카드 생성 기능
  - 회원탈퇴 기능
  - (+) 회원 경력 관리 고도화
  - 이력서 PDF Print
- MainPage
  - 큐레이션 추천 알고리즘
  - 필터 & 태그
- 포트폴리오 게시글
- 문서 에디터 추가(1주차 구현 실패 시)
- 웹바이탈 고도화

### 3차 구현기능 (23.02.25 달성)

- 리크루팅후보군 분류
- 스와이프([https://youtu.be/brHOqLmWpJ0](https://youtu.be/brHOqLmWpJ0))
- 리크루터로 회원가입?

#### 성능 최적화 및 코드 리팩토링. 로그 및 유져 피드백

- MainPage
- 프로젝트 탐색
- 유저 피드백 분석 & 반영
- 웹바이탈 고도화

### 최종 구현 기능

- 유저 피드백과 관련 기능추가
- 유동적으로 진행
- 버그 픽스
- custom hook의 유닛 테스트부터 E2E 테스트까지
- 디자인 디펙 처리 및 최종 테스트최종 발표 전까지 상시 테스트
- 디자인 완성도 높이기 위한 디펙 처리 작업

---

## 4. 컨벤션

### git

- 1.0은 git-flow
- ~~1.1부터 trunk based development~~
  - ~~→ 운영 경험 쌓기~~
- 핵심 비즈니스 로직이 완성된 이후 trunk based development로 전환

[개인용 commit](https://www.notion.so/commit-11286833eec741e5887563d4d83eed65)

- PR, Issue는 템플릿을 활용한다.
- branch명 컨벤션
  - main → production level
  - dev → development level
  - feat/OOOOO
  - refac/OOOOO
  - hotfix/#issuenum
  - doc/OOOOO - README.md 수정용

[https://github.com/MiryangJung/google-calendar-weekly-clone](https://github.com/MiryangJung/google-calendar-weekly-clone) README.md 참조용

### code

- 패키지 관리자: yarn
- `prettier.config.js` or `.prettierrc.yml` 활용
  - 탭 대신 스페이스(탭1 = 스페이스2)
- hooks와 utils, 재사용 가능한 컴포넌트들은 jsdoc을 적극 활용해 문서화 시킨다.
- typescript
  - `FC<>` 대신 `ComponentNameProps`
  - type or interface → object 외엔 다 type.
  - 파스칼 케이스
  - Type, Props 접미어
  - 상속금지(하면 문서화) 1depth만 가능
  - 3번 이상 반복되는 type은 declare화하기
  - `.d.ts`
    - fetch type (초반 작성)
    - 3번 이상 반복되는 type
    - `styled.d.ts`
      - ⇒ styled-components themeProvider의 변수 자동 완성 위해서
- 함수 **하나당 하나의 기능**만 담도록 하기

→ 잘못된 예시

```ts
const handleSubmit = () => {
	e.perasdf...

	const obj1 = {

	}

	axios.post()
}
```

→ 좋은 예시

```ts
const postData = () => {
  axios.post(...)
}

const handleSubmit = () => {
	e.perasdf...

	postData(obj1)

	setEmail("")
  ...
}
```

- 매직리터럴, 매직넘버 금지
- `const ADULT_AGE = 19` `const BASE_URL = ""` `if (age === ADULT_AGE) { // }`
- 줄임말 금지
  - for문 예외
  - idx 예외
- px 금지 → rem 사용
  - px to rem & rpx & vw (cssrem)
  - border등 1px단위를 사용해야하는 경우는 예외

### git 프로젝트

1. **Backlog** : 추가 기능 / 논의 중인 기능 작업
2. **Issue** : 해야할 작업
3. **In Progress** : 브랜치를 생성 후 작업 중인 것들 // 디자이너님: 작업중인 컴포넌트?
4. **In review** : PR 올린 작업
5. **Done** : 끝난 작업

어드민 계정 1개(auth sevice 정해지는 것에 따라 변동 가능)

---

## 5. 그라운드 룰

1. 리뷰시간 정하고, PR에 리뷰하기
   - 노션 켜고 이슈 작성(필요하면 문서화)
   - as-is / to-be
   - 무분별한 LGTM 금지
2. 디자이너님 참여하여 팀 전체 다같이 회의 **주 3회** (단, 전달은 1명만)
3. 이슈 문제 시
   - 깃헙 이슈 생성
   - 리뷰 시간에 이슈 공유하기(다른 의견들 더 받고 피드백 받고 싶은 경우)

{/* 이 글은 Tistory(https://hyoloui.tistory.com/119)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-06 */}
