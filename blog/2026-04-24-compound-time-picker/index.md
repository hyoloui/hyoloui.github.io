---
title: "시간 선택 컴포넌트를 컴파운드 패턴으로 만들기"
description: "화면마다 따로 있던 시간 선택기를 단일·범위 두 종류의 공용 컴포넌트로 만들고, react-hook-form과 붙이는 방법을 세 가지로 정리한 기록."
authors: [hyoloui]
tags: [react, date-time]
---

CRM에는 시간 선택기가 화면마다 따로 있었다. 공통 폴더에 하나, 결제 모달 쪽에 또 하나. 동작도 조금씩 달랐다. 공용 컴포넌트 폴더(`ui/stable`)에 단일 시간과 범위 시간 선택기를 새로 만들었다.

<!--truncate-->

## 구조

처음엔 컴포넌트 하나로 시작했는데, 라벨과 에러 문구의 배치를 화면마다 바꿀 수 있어야 해서 컴파운드 패턴으로 나눴다. `Root`가 상태와 Context를 갖고, 하위 조각은 필요한 것만 골라 배치한다.

```tsx
<StSingleTimePickerNS.Root {...rootProps}>
  <StSingleTimePickerNS.Field hasError={!!displayError}>
    <StSingleTimePickerNS.Anchor>
      <StSingleTimePickerNS.Input />
    </StSingleTimePickerNS.Anchor>
    <StSingleTimePickerNS.Popover>
      <StSingleTimePickerNS.List />
    </StSingleTimePickerNS.Popover>
  </StSingleTimePickerNS.Field>
</StSingleTimePickerNS.Root>
```

네이티브 form 제출을 위한 `HiddenInput`도 따로 뒀다. controlled(`value`, `onChange`)와 uncontrolled(`defaultValue`)를 둘 다 지원한다. 에러는 `invalidFormat`, `outOfRange` 두 종류이고, 메시지에 함수를 넘기면 `minTime` 같은 값을 받아 문장을 만들 수 있다.

react-hook-form 연결은 세 가지 방법을 열어 뒀다. RHF 없이 쓰는 `useStSingleTimeField`, RHF 폼에 붙이는 `useStSingleTimeFieldWithRHF`, render prop을 받는 `Controller`. 에러를 언제 보여줄지는 폼의 `mode`, `reValidateMode`를 그대로 따르게 했다. 범위 선택기도 같은 구조로 만들었고, 시작·끝 입력 두 개 중 어느 쪽에 포커스가 있는지를 Context에서 추적한다.

## 걸렸던 것들

통합 컴포넌트 `StSingleTimePicker`는 안에 자기 `Root`를 갖고 있다. 이걸 바깥 `Root` 안에 넣으면 Root가 중첩돼 바깥 상태가 안쪽 Context에 덮인다. 사용법 주석 맨 위에 경고로 적어 뒀다.

팝오버를 열 때 선택된 시간으로 목록을 스크롤해야 하는데, 처음엔 `setTimeout(fn, 0)`으로 미뤘다. 기다려야 했던 건 팝오버의 CSS 애니메이션이 끝나 화면에 보이는 순간이었다. `useLayoutEffect`도 검토했지만 그 시점엔 팝오버가 아직 hidden일 수 있어서 쓸 수 없었다. 결국 `requestAnimationFrame`으로 바꿨다. 다음 페인트 직전에 실행되니 의도가 더 분명하고, `cancelAnimationFrame`으로 정리도 명시적으로 할 수 있다.

범위 선택기에서는 화살표 키로 시간을 옮길 때도 범위 검증을 하고, 잘못된 값이면 이전 값으로 되돌리게 했다. 바깥 요소로 포커스가 나가면 팝오버를 닫는다. 공용 훅에는 테스트를 붙였고, 데모 페이지에서 단일·범위·RHF 조합을 한 화면에 모아 확인했다.
