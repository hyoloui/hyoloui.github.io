---
title: "그룹 수업 폼을 쪼개고 검증은 브라우저에 맡기기"
description: "그룹 수업 생성·수정 폼을 항목별 컴포넌트로 나누고, 폼 구조를 상수로 관리하며, 입력 검증을 HTML 기본 기능과 setCustomValidity로 처리한 기록."
authors: [hyoloui]
tags: [career, react, web]
---

11월 내내 그룹 수업 생성·수정 폼을 새로 만들었다. 항목이 많은 폼이라 처음부터 어떻게 나눌지를 먼저 정했다.

<!--truncate-->

## 폼 구조를 상수로

그룹 수업 관련 파일을 `class/form` 폴더로 모으는 것부터 했다. 그리고 폼에 어떤 섹션과 항목이 있는지를 `GROUP_CLASS_FORM_ELEMENTS` 상수 하나에 적었다. 각 항목의 제목과 id가 들어 있다.

왼쪽에 붙는 `FormNavigation`은 이 상수를 읽어 목차를 그린다. 처음에는 클릭하면 요소 위치를 계산해 `window.scrollTo`로 부드럽게 이동하는 핸들러를 달았다. 다음 날 `Link href="#id"` 앵커로 바꿨다. 스크롤 처리가 사라지니 `'use client'`도 지울 수 있었다. 브라우저가 해 주는 걸 굳이 JS로 다시 만들 필요가 없었다.

좌석 관리처럼 모달과 폼이 같이 봐야 하는 값(좌석 수, 이용 불가 좌석)은 Recoil 상태로 뺐다.

## 항목마다 자기 검증을 갖게

마지막 주에는 수업 시간, 수업 진행 기간, 인원 설정, 운영 요일, 좌석 관리를 각각 컴포넌트로 분리했다. 검증 로직도 그 컴포넌트 안으로 들어갔다. `GroupClassForm`에서는 120줄 넘게 빠졌다.

검증은 별도 라이브러리 없이 HTML 기본 기능을 썼다. `required`, `min`, `type="time"`을 걸고 메시지만 한국어로 바꾼다.

```tsx
<input
  required
  type="time"
  id="startTime"
  name="startTime"
  onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
  onInvalid={(e) =>
    (e.target as HTMLInputElement).setCustomValidity('시작 시간을 입력해주세요.')
  }
/>
```

종료 시간 input은 시작 시간이 비어 있으면 disabled이고, `min`을 시작 시간으로 잡아서 더 이른 시간을 고를 수 없게 했다. 수업 이름 입력에는 디바운스와 길이 제한을 넣었다.

컴포넌트를 나눠 놓고 보니 `onInput`, `onInvalid`에서 target을 캐스팅하고 메시지를 넣는 코드가 거의 같은 모양으로 반복된다. 다음 정리 대상이다.
