# Product

<!-- impeccable:product-schema 1 -->

> 2026-10-22 작성. 사용자가 인터뷰 없이 "바로 시작"을 요청해, 이 세션에서 확인된 사실만 적었다. (추정) 표시는 사용자가 직접 확인하지 않은 내용이다.

## Platform

web

## Users

- 채용 담당자(HR)와 프론트엔드 채용 담당자: 메인(`/`)에서 30초 안에 "어떤 일을, 얼마나 오래, 어떤 성과로 했는지"를 판단하고 이력서·포트폴리오·자기소개(Notion)로 넘어간다.
- 개발 학습자와 동료 개발자(추정): 문서(`/docs`, Learn)의 과목별 학습 노트와 블로그(`/blog`) 글을 읽는다.
- 본인: 학습 기록을 쌓는 저자.

## Product Purpose

이승효(프론트엔드 개발자, 2023.05~ 에이피티플레이 어시스트핏 웹 프론트엔드)의 개인 사이트. 채용용 소개 페이지와 학습 노트·블로그 아카이브를 한곳에 둔다. 성공은 채용 담당자가 메인에서 서류 링크로 넘어가고, 학습 기록이 읽기 편하게 쌓이는 것이다.

## Positioning

"불편을 들으면 직접 만들어 보고, 수치로 고르는 프론트엔드 개발자". 숫자에는 기준(누적, 기준일, 측정 범위)을 붙이고, AI 활용은 검증 과정과 함께 보여 준다.

## Operating Context

- Docusaurus 3 classic(docs, blog, pages), TypeScript, React 18. main에 push하면 GitHub Pages로 배포된다(CI Node 18, `npm run build`).
- 문서 15개 과목 폴더(`docs/`), 블로그 글 약 160개(`blog/`, 다수가 Tistory에서 이전).

## Capabilities and Constraints

- 콘텐츠(문서·블로그 본문, 메인 문구)는 수정·삭제하지 않는다.
- 새 npm 의존성은 추가하지 않는다(지금까지의 원칙).
- 전화번호는 공개 페이지에 넣지 않는다.

## Brand Commitments

- 메인 페이지 시안(2026-10-22 승인): 모노 대문자 라벨, 큰 굵은 제목과 그라디언트 강조 구절, 세리프 이탤릭 단어가 섞인 섹션 제목, 알약 버튼, 흐린 배경 번짐, yceffort.kr에서 가져온 모션 값.
- 참조 사이트(yceffort.kr)와 같은 색 코드를 쓰지 않는다(사용자 지시).
- 기존 로고(`static/img/logo.svg`)와 사이트 이름 "Hyoloui"를 유지한다(추정: 교체 지시 없음).

## Evidence on Hand

- 이력서·포트폴리오·자기소개 Notion 공개 페이지, GitHub(hyoloui), Fit HR 저장소. 메인 문구의 출처는 `specs/2026-10-22-main-hero-design.md`.
- 프로필 사진, 추천사, 외부 수상 이미지 같은 자산은 사이트에 없다. 지어내지 않는다.

## Product Principles

1. 숫자와 주장은 원문 근거가 있을 때만 쓴다.
2. 읽는 화면(문서·블로그)은 읽기가 먼저다. 장식은 틀에만 둔다.
3. 한 사이트처럼 보여야 한다. 메인, 헤더, 푸터, 문서, 블로그가 같은 토큰을 쓴다.

## Accessibility & Inclusion

- 본문 대비 WCAG AA, 키보드 포커스 표시, `prefers-reduced-motion` 존중, 한국어는 단어 단위 줄바꿈(`word-break: keep-all`).
