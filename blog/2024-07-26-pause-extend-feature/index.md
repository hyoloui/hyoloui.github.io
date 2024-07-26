---
title: "이용 정지·연장 기능과 이름 세 번 바꾼 날"
description: "회원 이용 상품의 정지·연장 사이드 모달을 서버 액션으로 연결하고, API 용어에 맞춰 폴더와 컴포넌트 이름을 정리한 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

회원이 쓰고 있는 상품을 잠시 멈추거나 기간을 늘리는 기능을 만들었다. 기능보다 이름 때문에 더 오래 고민한 한 주였다.

<!--truncate-->

## 화면 구성

이용 중인 상품 카드에서 모달을 열면 위에 segment가 두 개 있다. 정지와 연장이다. 각 segment 안에는 단일 상품용 폼과 결합 상품용 폼이 따로 있다. API는 세 개를 붙였다.

- 정지 가능 정보 조회 (GET)
- 이용 상품 정지 (POST)
- 이용 상품 연장 (PUT)

폼은 `form action`에 서버 액션을 바로 넘겼다. 클라이언트에서 fetch를 따로 부르지 않아도 되니 코드가 짧아졌다.

정지 기간은 DatePicker로 범위를 고르고, 고른 일수가 최소 정지일보다 짧거나 남은 정지 가능일보다 길면 버튼을 막는다.

```tsx
const diffDays = useMemo(
  () => moment(endDate).diff(moment(startDate), 'days'),
  [startDate, endDate]
);

const notAvailable = useMemo(
  () =>
    paymentInfo.pauseMinDate > diffDays + 1 ||
    diffDays + 1 > paymentInfo.availablePauseDate,
  [paymentInfo, diffDays]
);
```

시작일과 종료일이 같은 날이면 diff가 0이 나온다. 정지 일수는 양 끝 날짜를 모두 세야 해서 `+ 1`을 붙였다.

## suspend, pause, extend

처음 폴더 이름은 `suspend-and-extend`였다. 정지를 suspend로 번역했다. 그런데 API 경로를 보니 정지는 `/pause`, 연장은 `/extend`였다.

이름을 맞추려고 바꾸다가 한 번은 잘못된 쪽(extend를 pause로)을 바꿔 버려서 바로 revert했다. 다시 정리해서 `pause-extend`로 맞췄고, 며칠 뒤 API 파일 이름도 `pauseAndExtend.ts`로 바꿨다.

같은 개념을 서버와 프론트가 다른 단어로 부르면 코드를 읽을 때마다 머릿속에서 번역을 해야 한다. 앞으로는 API 문서의 단어를 먼저 확인하고 이름을 짓기로 했다. 커밋 메시지에 남긴 대로, 입력값 검증은 아직 손봐야 한다.
