---
title: "@next/third-parties로 GA 붙이고 페이지 메타데이터 정리하기"
description: "Next.js 14.1로 올리면서 @next/third-parties로 Google Analytics를 붙이고, 40개 넘는 페이지에 metadata를 등록한 기록."
authors: [hyoloui]
tags: [nextjs]
---

CRM 웹에 사용 데이터를 쌓기 위해 Google Analytics를 붙였다. 마침 Next.js 14.1에서 `@next/third-parties`가 나와서 그걸 써봤다.

<!--truncate-->

먼저 Next.js를 14.0.4에서 14.1.0으로 올리고 `@next/third-parties`를 설치했다. 처음엔 `GoogleTagManager` 컴포넌트를 넣었는데, 우리가 가진 값은 GA 측정 ID라서 `GoogleAnalytics` 컴포넌트로 바꿨다. 루트 레이아웃에 한 줄이면 끝난다.

```tsx
<GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
```

GA를 붙이고 나니 페이지 제목이 다 'Assistfit CRM'으로 똑같이 찍힐 게 보였다. 그래서 루트 레이아웃의 metadata에 title 템플릿을 넣었다.

```ts
export const metadata: Metadata = {
  title: {
    template: '%s | Assistfit CRM',
    default: 'Assistfit CRM',
  },
};
```

그다음 각 페이지에서 `export const metadata = { title: '직원 퇴사처리' }`처럼 제목만 지정했다. `@modal` 아래의 모달 페이지까지 포함해 42개 파일을 한 번에 손봤다. 브라우저 탭에서도 지금 어느 화면인지 바로 보여서 개발할 때도 편하다.

다음 날에는 `next/image`의 이미지 최적화에 쓰이는 `sharp`도 설치했다. 기능 개발과는 별개로 이런 설정을 하루 이틀씩 챙기는 날이 늘었다.
