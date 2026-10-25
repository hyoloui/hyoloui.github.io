# 메인 페이지 리뉴얼 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** hyoloui.github.io 메인(`/`)을 채용 담당자용 소개 페이지로 바꾸고, yceffort.kr 모션을 입히고, 푸터의 Docusaurus 기본값을 정리한다.

**Architecture:** 문구·링크는 `content.ts` 한 곳에 데이터로 둔다. 화면은 `Hero.tsx`와 `Sections.tsx`(나머지 5개 섹션)로 나눈다. 모션은 계산 함수(`motion.ts`, 단위 테스트)와 이벤트 연결 훅(`useHomeMotion.ts`)으로 나눈다. "2년+"는 빌드 시각을 `customFields.buildDate`로 넘겨 SSR과 클라이언트가 같은 값을 쓴다.

**Tech Stack:** Docusaurus 3.6 (classic), React 18, TypeScript, CSS Modules, Node 24 내장 `node --test`(새 의존성 없음).

**Spec:** `specs/2026-10-22-main-hero-design.md` — 문구는 spec의 "문구" 절, 모션 값은 "모션·인터랙션" 표에서 그대로 가져온다.

## Global Constraints

- 새 npm 의존성 추가 금지. `package.json`에는 `test` 스크립트만 추가한다.
- 문구는 spec "문구" 절과 글자 단위로 같게 쓴다. 숫자·날짜를 새로 만들지 않는다. 전화번호는 넣지 않는다.
- 한국어 줄바꿈: `word-break: keep-all`, 단어 중간에서 끊기면 안 된다.
- 색: 보라 `#7c5cff`, 분홍 `#ff5c9a`, 배경 번짐 `#a78bfa`·`#f9a8d4`, 카드 테두리 `#e9e9e9`, 태그 배경 `#f1edff`·글자 `#6a4cff`. 다크 모드는 `[data-theme='dark']`를 따른다.
- 외부 링크는 `target="_blank" rel="noopener noreferrer"`.
- 모든 모션은 `prefers-reduced-motion: reduce`에서 끈다. 마우스 효과(패럴랙스·커서 글로우·카드 기울기)는 `(hover:hover) and (pointer:fine)`에서만 켠다.
- `window`·`matchMedia`는 `useEffect` 안에서만 쓴다(Docusaurus SSR 빌드).
- 작업 브랜치: `feat/main-hero`. main 병합과 push는 사용자가 요청할 때만 한다.

## Review Focus

1. **375px 폭:** 긴 Work 행, 이메일, 숫자 3개가 가로 스크롤을 만들지 않아야 한다. Task 3에서 375px 스크린샷으로 확인한다.
2. **다크 모드:** 그라디언트 글자, 카드, 배경 번짐이 어두운 배경에서도 읽혀야 한다. Task 3에서 다크 스크린샷으로 확인한다.
3. **SSR 하이드레이션:** "2년+"가 서버 HTML과 클라이언트에서 같아야 한다. Task 1에서 `buildDate`를 config로 넘기고, Task 3에서 `build/index.html`에 `2년+`가 있는지 확인한다.
4. **동작 줄이기·터치:** 이 조건에서는 리스너를 붙이지 않아야 한다. Task 4에서 `--force-prefers-reduced-motion` 스크린샷과 콘솔 오류 0건으로 확인한다.
5. **키보드:** 버튼과 링크에 포커스 링이 보여야 한다. 카드 기울기가 포커스를 가로채면 안 된다. Task 5의 impeccable 점검 항목에 넣는다.

---

### Task 1: 준비 — 브랜치, gitignore, test 스크립트, 푸터 정리, buildDate

**Files:**
- Modify: `.gitignore` (끝에 `.superpowers/` 추가)
- Modify: `package.json` (`scripts.test`)
- Modify: `docusaurus.config.ts` (`customFields`, `themeConfig.image`, `footer`)

**Interfaces:**
- Produces: `siteConfig.customFields.buildDate: string` (ISO 문자열, 빌드 시각)

- [ ] **Step 1:** `git checkout -b feat/main-hero`
- [ ] **Step 2:** `.gitignore`에 `.superpowers/`를 추가한다. `package.json`에 `"test": "node --test 'src/**/*.test.mjs'"`를 추가한다.
- [ ] **Step 3:** `docusaurus.config.ts`를 고친다.
  - `customFields: { buildDate: new Date().toISOString() }`를 추가한다.
  - `themeConfig.image` 줄을 지운다.
  - footer `links`에서 `title: "Community"` 묶음을 지운다.
  - `copyright`를 `` `Copyright © ${new Date().getFullYear()} Hyoloui(이승효)` ``로 바꾼다.
- [ ] **Step 4:** `npm run typecheck && npm run build`
  - Expected: 둘 다 성공한다.
  - `grep -c "Stack Overflow\|My Project" build/index.html` → `0`
- [ ] **Step 5:** 커밋

```bash
git add .gitignore package.json docusaurus.config.ts
git commit -m "chore: 푸터 기본값 정리, buildDate·test 스크립트 추가"
```

### Task 2: 계산 함수 (TDD)

**Files:**
- Create: `src/components/home/motion.ts`
- Test: `src/components/home/motion.test.mjs`

**Interfaces:**
- Produces:
  - `yearsSince(start: Date, now: Date): number`: 만 연수, 내림
  - `parallaxOffset(px: number, py: number, index: number): { x: number; y: number }`: `px`·`py`는 -0.5~0.5, 거리 = `(index + 1) * 6`
  - `tiltTransform(x: number, y: number, max?: number): string`: `x`·`y`는 0~1, `max` 기본값 8

- [ ] **Step 1: 실패하는 테스트 작성** (`import { … } from './motion.ts'`)

```js
test('yearsSince floors full years', () => {
  const start = new Date('2024-08-09');
  assert.equal(yearsSince(start, new Date('2026-10-22')), 2);
  assert.equal(yearsSince(start, new Date('2027-08-08')), 2);
  assert.equal(yearsSince(start, new Date('2027-08-09')), 3);
});
test('parallaxOffset scales by line index', () => {
  assert.deepEqual(parallaxOffset(0.5, -0.5, 0), { x: 3, y: -3 });
  assert.deepEqual(parallaxOffset(0.5, -0.5, 1), { x: 6, y: -6 });
});
test('tiltTransform', () => {
  assert.equal(tiltTransform(0.5, 0.5), 'perspective(1200px) rotateX(0deg) rotateY(0deg)');
  assert.equal(tiltTransform(1, 0), 'perspective(1200px) rotateX(4deg) rotateY(4deg)');
});
```

- [ ] **Step 2:** `npm test` → FAIL (모듈 없음)
- [ ] **Step 3:** `motion.ts`에 세 함수를 구현한다. `yearsSince`는 연 차이를 구하고, 기념일 전이면 1을 뺀다.
- [ ] **Step 4:** `npm test` → `pass 3`, `fail 0`. 이어서 `npm run typecheck`도 통과해야 한다.
- [ ] **Step 5:** 커밋 `feat: 메인 모션·기간 계산 함수`

### Task 3: 정적 페이지 (문구, 레이아웃, 다크 모드, 반응형)

**Files:**
- Create: `src/components/home/content.ts`, `src/components/home/Hero.tsx`, `src/components/home/Sections.tsx`, `src/components/home/home.module.css`
- Modify: `src/pages/index.tsx` (전체 교체)
- Delete: `src/pages/index.module.css`

**Interfaces:**
- Consumes: `yearsSince` (Task 2), `customFields.buildDate` (Task 1)
- Produces:
  - `content.ts`: `LINKS`(resume, portfolio, intro, github, fitHr, blog=`/blog`, email), `RELEASE_DATE = '2024-08-09'`, `STATS`, `WORK_ROWS`, `AI_CARDS`, `TIMELINE`, `SIDE_PROJECT`
  - `Hero({ buildDate }: { buildDate: string })`
  - `Sections.tsx`: `WorkSection`, `AiSection`, `GrowthSection`, `SideProjectSection`, `ContactSection` (props 없음)
  - 마크업 훅 지점(Task 4에서 씀):
    - 제목 두 줄: `data-parallax-line`
    - 커서 글로우 div: `data-cursor-glow`
    - 카드: `data-tilt`
    - 등장 애니메이션 대상: `styles.enter`, 지연은 `style={{ animationDelay }}`

- [ ] **Step 1:** `content.ts`에 spec "문구" 절의 모든 문자열과 URL을 그대로 옮긴다. 시안 `.superpowers/brainstorm/12099-1792642099/content/full-page.html`이 배치의 기준이다.
- [ ] **Step 2:** `Hero.tsx`, `Sections.tsx`, `home.module.css`를 작성한다.
  - 시안의 클래스 구조를 CSS Module로 옮긴다. h1은 히어로 제목 하나뿐이고, 섹션 제목은 h2다.
  - 히어로 소개의 `<br>` 위치는 spec대로 둔다.
  - 숫자 "2년+"는 `` `${yearsSince(new Date(RELEASE_DATE), new Date(buildDate))}년+` ``이다.
  - 375px 이하에서는 숫자 3개를 한 줄에 두고 줄바꿈을 허용한다. AI 카드 2열은 1열, 타임라인 5열은 세로 목록으로 바꾼다. 좌우 여백은 16px이다.
  - 이메일에는 `overflow-wrap: anywhere`를 준다.
  - 다크 모드: `:global([data-theme='dark'])` 아래에서 배경, 글자, 카드, 테두리 색을 바꾸고 번짐의 opacity를 낮춘다.
- [ ] **Step 3:** `index.tsx`는 `<Layout title="이승효 · 프론트엔드 개발자" description="2023년 5월부터 피트니스 SaaS 어시스트핏의 웹 프론트엔드를 맡고 있는 이승효입니다.">` 안에 Hero와 섹션 5개를 차례로 둔다. `buildDate`는 `useDocusaurusContext().siteConfig.customFields.buildDate as string`에서 받는다.
- [ ] **Step 4:** `npm run typecheck && npm run build` → 둘 다 성공한다.
- [ ] **Step 5:** `build/index.html`에서 아래 항목을 하나씩 grep한다. 모두 1건 이상 나와야 한다.
  - 문구: `수치로 고르는`, `에이피티플레이에서`, `1,036`, `2년+`, `2026.10 기준`, `392ms`, `로그아웃 설계 결함 3건`, `QA 진행 중`, `범위 넓히기`, `Fit HR`, `tmdgy9272@gmail.com`
  - 링크: `3fe090ed651a80dd8373e083e9ad75de`, `bd288977a9b340508f9653610b63449a`, `297bab7539a34df9b162763f85e69090`, `github.com/hyoloui/fit-hr`, `href="/blog"`
  - 없어야 하는 것: `010-` → 0건
- [ ] **Step 6:** `npm run serve -- --port 3010`을 백그라운드로 띄우고 Chrome headless로 네 장을 찍는다(`--window-size=1100,2400`, `375,3200`).
  - 라이트·다크 각각 찍는다. 다크는 `localStorage.theme`을 쓸 수 없으니 `?docusaurus-theme=dark` 쿼리를 쓴다. 안 되면 `--force-dark-mode`를 쓴다.
  - Expected: 가로 스크롤, 잘린 글자, 단어 중간 줄바꿈이 없다.
- [ ] **Step 7:** 커밋 `feat: 채용용 메인 페이지로 교체`

### Task 4: 모션·인터랙션

**Files:**
- Create: `src/components/home/useHomeMotion.ts`
- Modify: `src/components/home/home.module.css`, `src/components/home/Hero.tsx`, `src/pages/index.tsx`

**Interfaces:**
- Consumes: `parallaxOffset`, `tiltTransform` (Task 2), Task 3의 `data-*` 지점
- Produces: `useHomeMotion(rootRef: React.RefObject<HTMLElement | null>): void`

- [ ] **Step 1:** CSS 모션을 넣는다. 값은 spec "모션·인터랙션" 표 1, 2, 3, 6(테두리·그림자·스포트라이트 `::after`), 7, 8 그대로다.
  - 등장 지연: 아이브로우 0s, 제목 .06s, 소개·숫자 .12s
  - `@media (prefers-reduced-motion: reduce)`에서 애니메이션과 트랜지션을 모두 끈다.
  - `@media (hover:none), (pointer:coarse)`에서 글로우를 숨긴다.
- [ ] **Step 2:** `useHomeMotion`을 구현한다.
  - `useEffect` 안에서 `matchMedia('(prefers-reduced-motion: reduce)')`가 맞거나, `(hover:hover) and (pointer:fine)`가 맞지 않으면 바로 return한다.
  - `window`에 `pointermove`를 `{ passive: true }`로 등록한다. rAF 하나로 묶어서 패럴랙스(`parallaxOffset`, `translate3d`)와 글로우 `left`·`top`을 갱신한다. 글로우는 `position: fixed`라 clientX/Y를 그대로 쓴다.
  - 각 `[data-tilt]`에 `pointermove`(transform = `tiltTransform`, `--mx`·`--my` = %)와 `pointerleave`(0deg로 복귀)를 단다.
  - cleanup에서 리스너를 모두 떼고 rAF를 취소한다.
- [ ] **Step 3:** `index.tsx`의 루트 `<main ref>`에 `useHomeMotion(ref)`을 연결하고, 글로우 div를 루트에 둔다.
- [ ] **Step 4:** `npm test && npm run typecheck && npm run build`가 모두 통과해야 한다.
- [ ] **Step 5:** 서버를 띄우고 두 가지를 확인한다.
  - `--force-prefers-reduced-motion`을 켠 headless 스크린샷이 Task 3과 같아 보여야 한다(등장 애니메이션이 끝난 상태와 같아야 함).
  - `--enable-logging=stderr`로 콘솔 오류가 0건이어야 한다.
  - 마우스 효과(패럴랙스·글로우·기울기)는 실제 Chrome에서 직접 확인하고, 결과를 사용자에게 보고한다.
- [ ] **Step 6:** 커밋 `feat: 메인 모션·인터랙션 (yceffort 기준)`

### Task 5: `/impeccable` 다듬기와 최종 확인

**Files:**
- Modify: `src/components/home/home.module.css`, 필요하면 `Hero.tsx`·`Sections.tsx`

- [ ] **Step 1:** `/impeccable`로 Task 4 결과를 점검·수정한다.
  - 범위: 간격, 대비(그라디언트 글자 포함 WCAG AA), 타이포 위계, 반응형, 다크 모드, 포커스 링, 터치 영역.
  - spec의 시각 요소(그라디언트, 번짐, 모노 라벨, 알약 버튼, 세리프 이탤릭)를 바꾸자는 제안은 적용하지 말고 사용자에게 보고한다.
- [ ] **Step 2:** spec "완료 기준" 1~6을 차례로 다시 돌린다. 명령과 확인 방법은 Task 1·3·4의 검증 단계와 같다.
- [ ] **Step 3:** 커밋 `style: 메인 페이지 디자인 다듬기`. push하지 않고 사용자에게 결과와 스크린샷을 보고한다.
