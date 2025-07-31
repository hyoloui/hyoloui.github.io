---
title: "사내 디자인 시스템에 Chip 컴포넌트를 올렸다"
description: "모노레포 디자인 시스템에 Chip 컴포넌트를 추가하고, 패키지 exports 설정과 배포 Slack 알림, PR 템플릿을 정리했다."
authors: [hyoloui]
tags: [design-system]
---

팀에서 디자인 시스템 저장소를 따로 만들어 운영하기 시작했다. pnpm과 Turborepo로 묶은 모노레포고, primitives, ui, icon 패키지와 Storybook이 들어 있다. 이번 주에 처음으로 여기에 컴포넌트를 하나 올렸다.

<!--truncate-->

맡은 건 Chip이다. 상태 표시나 태그처럼 작은 라벨에 쓰는 컴포넌트다. props는 이렇게 잡았다.

- `variant`: primary, positive, negative 등 9가지 색 조합
- `type`: outline 또는 fill
- `leftIconClass`, `rightIconClass`: 양옆 아이콘
- `asChild`: primitives의 Slot으로 다른 요소에 스타일만 입히기
- `minWidth`, `maxWidth`: 넘치는 글자는 말줄임

처음에는 아이콘을 ReactNode로 받았다. 그런데 icon 패키지는 클래스 이름으로 아이콘을 쓰는 방식이라, Chip만 다른 방식을 쓰면 사용하는 쪽이 헷갈린다. 클래스 이름을 받아 Chip 안에서 `i` 태그로 그리도록 바꿨다. 아이콘 크기와 간격도 Chip 스타일 안에서 정할 수 있게 됐다.

```tsx
<Chip variant="primary" type="fill" leftIconClass="icon-check">
  예약 완료
</Chip>
```

Storybook에는 variant별, 아이콘 유무별 스토리를 만들어 변형을 한 화면에서 비교할 수 있게 했다.

## 패키지 쪽 정리

CRM에서 이 ui 패키지를 의존성으로 받아 쓰고 있다. 그런데 ui 패키지의 `package.json`에는 `main`과 `module`만 있고 `exports`가 없었다. `exports`에 ESM, CJS 각각의 타입과 진입점을 적고, 스타일은 `./styles` 경로로 따로 열었다.

저장소 운영 쪽도 몇 가지 넣었다. PR 템플릿을 추가했고, npm 배포와 Storybook 배포 워크플로 끝에 Slack 알림 단계를 붙였다. 성공이든 실패든 `if: always()`로 결과를 보낸다. Prettier 설정 파일도 추가했다.

디자인 시스템은 여러 프로젝트가 같이 쓰는 코드라 CRM에서 일할 때보다 이름 하나, export 하나에 더 신경이 쓰였다.
