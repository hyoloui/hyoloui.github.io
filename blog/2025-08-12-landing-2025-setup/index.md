---
title: "새 랜딩 페이지 저장소를 처음부터 세팅했다"
description: "Next.js 15, Tailwind CSS 4로 새 랜딩 페이지 저장소를 만들고, 폴더 구조 원칙과 디자인 토큰, Claude Code와 Figma MCP 규칙을 정리했다."
authors: [hyoloui]
tags: [nextjs, tailwind, ai-agent]
---

회사 랜딩 페이지를 새로 만들게 됐다. 새 저장소로 시작했고, 초기 세팅을 내가 맡았다. 여러 사람이 같이 작업할 저장소라 처음 정하는 규칙이 오래 남을 거라고 생각했다.

<!--truncate-->

스택은 Next.js 15(App Router), React 19, TypeScript strict, Tailwind CSS 4다. ESLint와 Prettier(세미콜론 없음, 작은따옴표)를 넣고 `prettier-plugin-tailwindcss`로 클래스 순서도 자동 정렬되게 했다. 폰트는 Pretendard를 적용했다.

## 폴더 구조 원칙

컴포넌트를 어디에 둘지는 처음부터 기준을 적어뒀다.

- 한 페이지에서만 쓰는 건 그 라우트 아래 `_components`, `_lib`에 둔다.
- 두 군데 이상에서 쓰게 되면 그때 `src/components`, `src/lib`로 올린다.

공통 헤더와 푸터를 쓰는 페이지는 `(default)` 라우트 그룹으로 묶었다. 푸터가 다른 페이지 하나만 그룹 밖으로 뺐다.

## 디자인 토큰

Tailwind 4는 설정 파일 대신 CSS의 `@theme`에서 토큰을 정의한다. 브랜드 색, Figma에 정의된 회색 단계, 브레이크포인트를 여기에 모았다.

```css
@theme {
  --color-orange: #f25200;
  --breakpoint-sm: 393px;
  --breakpoint-md: 430px;
  --breakpoint-lg: 744px;
  --breakpoint-xl: 1024px;
}
```

디자인이 320px 기준이라 모바일 퍼스트로 작성하고, 브레이크포인트는 실제 기기 폭에 맞춰 잡았다.

## CLAUDE.md

이번 저장소에는 `CLAUDE.md`를 처음부터 넣었다. 위 규칙들(명명, import 순서, 폴더 구조, 모바일 퍼스트)을 적어두면 Claude Code가 코드를 만들 때도 같은 규칙을 따른다. Figma Dev Mode MCP 서버도 연결했다. 에셋은 Figma가 주는 것만 쓰고 새 아이콘 패키지는 추가하지 말라는 규칙을 같이 적었다.
