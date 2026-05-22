---
title: "Tailwind v4로 올리면서 디자인 시스템 클래스 정리하기"
description: "Next.js 16 마이그레이션 브랜치에서 Tailwind v3를 v4로 올리고, 사내 디자인 시스템 플러그인 클래스와 tailwind-merge 충돌을 정리한 기록."
authors: [hyoloui]
tags: [tailwind, design-system, ui-ux]
---

CRM을 Next.js 16으로 올리는 브랜치에서 Tailwind도 v3에서 v4로 올렸다. 공식 업그레이드 도구 한 번에 295개 파일이 바뀌었고 빌드도 통과했다. 그런데 화면을 보니 조건부 색상 몇 군데가 의도와 다르게 나왔다.

<!--truncate-->

## 무엇이 남았나

우리 화면은 사내 디자인 시스템 패키지의 Tailwind 플러그인이 만드는 `as-*` 클래스를 많이 쓴다. 이 플러그인은 v3의 `addUtilities` API로 만들어져 있어서, v4에서는 `@config` 호환 모드로 겨우 돌아가고 있었다. 빌드는 통과했지만 남은 기술 부채가 꽤 있어서, 문제를 표로 적고 P0부터 P2까지 단계를 나눈 계획 문서를 먼저 썼다. 커밋마다 바꾼 이유, 영향 범위, QA 범위를 적기로 했다.

- v3 문법 `text-[--as-x]`는 v4에서 조용히 무시될 수 있다. v4 문법 `text-(--as-x)`로 통일했다.
- `as-font-h3`에 `font-bold`를 덧붙이는 조합은 cascade 순서에 따라 폰트가 깨질 수 있어서 걷어냈다.
- 테마 토큰이 `tailwind.config.ts`와 CSS 양쪽에 있던 것을 `globals.css`의 `@theme` 하나로 모았다.
- 호환 모드는 minor 업데이트에도 동작이 바뀔 수 있어 tailwindcss 버전을 고정했다.

## 색상이 깨진 진짜 이유

조건부 색상이 깨진 원인은 tailwind-merge였다. `cn()` 안의 tailwind-merge가 `as-text-300` 같은 플러그인 클래스를 모르니 충돌로 처리하지 않았고, 두 클래스가 한 요소에 같이 남았다. 그러면 승자는 CSS에 정의된 순서로 정해진다. `extendTailwindMerge`로 `as-*` 클래스를 속성별 그룹에 등록하니 마지막 클래스가 일관되게 이겼다.

```ts
const twMerge = extendTailwindMerge<'as-font'>({
  extend: {
    classGroups: {
      'text-color': [{ 'as-text': ['100', '200', '300', 'white', 'black'] }],
      'as-font': [{ 'as-font': asFontClasses }],
    },
  },
});
```

다만 이 목록을 앱에서 손으로 관리하면 패키지에 클래스가 추가될 때마다 어긋난다. 그래서 디자인 시스템 저장소에서 tailwind-merge 설정과 v4용 유틸리티를 직접 export하도록 바꾸고 beta 버전을 냈다. 플러그인 경로는 deprecated로 문서에 표시했다.

옛 문법이 다시 들어오지 않게 `[--as-`를 grep하는 스크립트를 만들어 CI 테스트 단계 앞에 넣었다. 조용히 무시되는 종류의 회귀는 리뷰에서 잡기 어려워서 기계에 맡겼다.

다음 단계는 `@config`를 지우고 CSS-first 방식으로 완전히 옮기는 것이다. 디자인 시스템 쪽 export가 먼저 준비돼 있으니 앱 쪽 작업은 크지 않을 것 같다.
