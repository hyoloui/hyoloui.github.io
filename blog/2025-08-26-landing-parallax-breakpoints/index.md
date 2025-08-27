---
title: "랜딩 메인의 스크롤 애니메이션과 브레이크포인트 훅"
description: "motion으로 랜딩 메인 섹션의 패럴랙스 효과를 세 번 고쳐 만들고, CSS 토큰과 같은 기준을 쓰는 useCurrentWidth 훅을 추가했다."
authors: [hyoloui]
tags: [ui-ux, animation]
---

새 랜딩 페이지에서 메인 페이지를 맡았다. 다른 페이지는 팀원들이 나눠 맡아 release 브랜치로 모으고 있다. 이번 주는 메인 섹션의 스크롤 애니메이션을 마무리하고 반응형 처리를 정리했다.

<!--truncate-->

## 패럴랙스까지 세 번

처음에는 화면 하나를 꽉 채우는 `FullscreenSection`을 scroll-snap으로 넘기는 구조였다. 애니메이션을 넣으려고 `motion` 라이브러리를 추가하고 `MotionScreen`으로 바꿨다. 다음 날 보니 `MotionScreen` 안에서 섹션 종류를 `type` prop으로 다시 나누고 있어서, 그 분기를 지우고 div 하나로 줄였다.

스크롤 위치에 따라 움직임이 달라지게 하고 싶어서 결국 `ParallaxScreen`으로 다시 만들었다. 섹션이 화면에 들어오고 나가는 동안의 스크롤 진행률을 y 이동값으로 바꾼다.

```ts
const { scrollYProgress } = useScroll({
  target: targetRef,
  offset: ['start end', 'center center', 'end start'],
});
const y = useTransform(scrollYProgress, [0, 0.5, 1], [distance, 0, -distance]);
```

섹션이 화면 가운데에 왔을 때 제자리(0)에 있고, 들어올 때와 나갈 때는 반대 방향으로 밀린다. 높이는 모바일 브라우저의 주소창 높이 변화를 고려해 `min-h-svh`로 바꿨다. 스크롤을 유도하는 화살표에는 무한 바운스 keyframe을 Tailwind 유틸리티로 추가했다.

## JS에서도 같은 브레이크포인트

메인 배너는 744px 아래에서 모바일용 이미지 세트로 바꿔 돌려야 했다. CSS 클래스만으로는 처리하기 어려웠다. `useCurrentWidth` 훅을 만들어 창 너비와 현재 브레이크포인트를 같이 돌려주게 했다. 리사이즈 이벤트는 마지막 이벤트 후 100ms가 지나야 반영되도록 타이머로 묶었다.

브레이크포인트 값(393, 430, 744, 1024, 1440, 1920)은 디자인 토큰의 `--breakpoint-*`와 똑같이 맞췄다. 토큰 쪽은 며칠 전에 `max`를 `3xl`로 바꿔둬서 훅의 enum 이름과도 그대로 맞았다. CSS와 JS가 다른 기준으로 화면을 나누면 어느 폭에서 어긋날지 찾기 어렵다.

지난 주말에는 CRM 대시보드의 예전 아이콘과 색 변수를 디자인 시스템 것으로 옮겼다. 그 과정에서 디자인 시스템 색 변수 이름의 `natural` 오타를 `neutral`로 고쳐 0.1.13-beta.0으로 올렸다.
