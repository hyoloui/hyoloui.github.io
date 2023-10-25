---
title: "새 프로젝트에서 처음 써본 테스트 코드"
description: "센터용 CRM 웹 프로젝트를 새로 시작하면서 Jest와 React Testing Library로 스냅샷·컴포넌트 테스트를 처음 작성하고, 사이드 프로젝트를 TypeScript로 옮긴 기록."
authors: [hyoloui]
tags: [testing]
---

어드민에 이어 피트니스 센터에서 쓰는 CRM 웹을 새로 만들기 시작했다. 이번에는 처음부터 테스트 코드를 같이 써보기로 했다.

<!--truncate-->

## Jest 세팅

저장소는 8월 말에 만들어 뒀고, 9월 초에 Jest와 React Testing Library를 붙였다. `next/jest`로 설정을 만들고 테스트 환경은 jsdom으로 했다. ESLint에는 testing-library, jest-dom 플러그인을 넣었다.

10월에 레이아웃을 본격적으로 만들면서 테스트도 같이 늘렸다. `(dashboard)` 라우트 그룹 아래에 사이드 네비게이션과 헤더를 두고, 페이지마다 스냅샷 테스트를 하나씩 붙였다. 컴포넌트 테스트는 주석으로 ARRANGE, ACT, ASSERT를 나눠서 썼다. 순서를 지키니 테스트가 무엇을 확인하는지 읽기 쉬웠다. 지금은 사업부 선택, 로그인, 회원가입 모달 같은 화면을 만들고 있다.

## next/image의 src

즐겨찾기 별 아이콘은 마우스를 올리면 이미지가 바뀐다. 이걸 `fireEvent.mouseEnter`로 테스트하는데, `src` 값이 내가 넣은 경로가 아니었다. `next/image`가 최적화 경로로 바꿔서 렌더링하기 때문이다.

```tsx
const starIcon = screen.getByAltText('즐겨찾기');
expect(starIcon).toHaveAttribute(
  'src',
  '/_next/image?url=%2Fnavigation%2FSTAR_ON.png&w=48&q=75'
);
fireEvent.mouseEnter(starIcon);
expect(starIcon).toHaveAttribute(
  'src',
  '/_next/image?url=%2Fnavigation%2FSTAR_OFF.png&w=48&q=75'
);
```

클릭 테스트를 하려고 컴포넌트에 `testFunction`이라는 prop을 추가했는데, 테스트 때문에 실제 코드를 바꾸는 게 맞는지는 아직 잘 모르겠다.

## 퇴근 후에는 TypeScript 전환

쇼핑몰 사이드 프로젝트를 JavaScript에서 TypeScript로 옮겼다. Redux slice마다 state 인터페이스를 만들고 `RootState`로 selector 타입을 잡았다. 컴포넌트, 훅, 페이지 순서로 사흘에 나눠 바꿨다. 같은 주말에는 바닐라 JS로 작은 스프레드시트를 만들었다. 셀을 클래스로 표현하고, 내용을 `Blob`으로 묶어 CSV로 내려받는 데까지 했다.
