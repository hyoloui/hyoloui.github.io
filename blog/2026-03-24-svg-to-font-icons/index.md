---
title: "SVG 아이콘을 폰트 아이콘으로 옮기고 의존성 덜어내기"
description: "CRM의 npm 취약점을 정리하고, SVG 컴포넌트 아이콘을 사내 아이콘 폰트로 전환한 뒤 미사용 SVG와 @svgr/webpack을 제거한 기록."
authors: [hyoloui]
tags: [career, react, web]
---

이번 주는 CRM의 의존성과 정적 자산을 정리했다. 기능 개발 사이에 미뤄 두던 일이다.

<!--truncate-->

어제는 `npm audit fix`부터 돌렸다. 취약점이 24개에서 13개로 줄었다. 남은 것은 심각도별로 나눠서 프로젝트에 실제로 영향이 있는지 보고서로 정리했다. lockfile이 크게 바뀌어서 보안 미들웨어 쪽 회귀 테스트 케이스 문서도 같이 만들었다. QA가 이 변경을 어디까지 확인해야 하는지 알 수 있게 하려는 목적이다.

오늘은 아이콘이다. CRM은 SVG 파일을 `@svgr/webpack`으로 React 컴포넌트로 import해서 쓰고 있었다. 디자인 시스템 쪽에는 이미 아이콘 폰트 패키지가 있어서, 남은 SVG 컴포넌트를 폰트 아이콘으로 옮겼다.

```tsx
// before
<Icon className={cn('fill-[--gray-400] w-5 h-5', active && 'fill-white')} />

// after
<i className={cn(`asi-icon ${icon} as-text-400 text-[20px]`, active && 'as-text-white')} />
```

상수 파일에서 `Icon: SVGComponent`로 컴포넌트를 들고 있던 곳은 `icon: string`으로 클래스 이름만 들게 바꿨다. 폰트에 대응되는 아이콘이 없는 경우는 억지로 비슷한 걸 고르지 않고 TODO 주석으로 남겼다.

작업은 출석, 수업, 회원, 직원, 통계, 스케줄처럼 영역별로 커밋을 나눴다. Claude Code와 같이 진행했는데, 영역을 나눠 맡기고 나는 아이콘 매핑과 화면 결과를 확인했다. QA용으로는 영역별 테스트 케이스를 스프레드시트에 쌓았다.

영역별 전환을 마친 뒤 코드에서 더 이상 참조하지 않는 SVG 93개를 지웠다. 그러고 나니 `@svgr/webpack`이 할 일이 없어서 의존성과 `next.config.js`의 SVG webpack 규칙, svgo 설정 파일까지 제거했다. 패키지가 137개 빠졌다.

아이콘 하나 바꾸는 건 작은 일인데, SVG import가 하나라도 남아 있으면 빌드 설정과 의존성은 그대로 둬야 한다. `<Image>`로 불러오는 SVG처럼 아직 남은 것들은 다음 작업으로 이어서 정리할 생각이다.
