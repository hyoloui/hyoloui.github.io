---
title: "메시지 발송 기능 만들기: 작성, 예약, 발송 내역"
description: "센터가 회원에게 알림 메시지를 보내는 기능을 작성 폼부터 예약 발송, 발송 내역과 예약 취소까지 구현한 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

10월은 CRM의 새 메시지 페이지를 만들었다. 센터가 회원에게 앱 알림 메시지를 보내는 기능이다. 작성 폼, 받는 사람 선택, 즉시/예약 발송, 발송 내역까지 한 달 안에 기본 흐름을 다 붙였다.

<!--truncate-->

새 기능이라 파일 위치부터 정했다. 메시지 라우트 폴더 아래에 `_components`, `_hooks`, `_apis`를 두고 이 페이지에서만 쓰는 코드는 전부 그 안에 넣었다. 언더스코어로 시작하는 폴더는 라우트로 잡히지 않는다.

작성 폼에서 시간이 걸린 건 특수문자 삽입이었다. 버튼으로 특수문자를 고르면 커서가 있던 자리에 들어가야 한다. textarea의 `selectionStart`를 클릭, 키 입력, 포커스 때마다 저장해 두고 그 위치에 문자열을 끼워 넣었다.

```ts
const newContent =
  currentContent.slice(0, cursorPosition) + char + currentContent.slice(cursorPosition);

if (getByteLength(newContent) <= 2000) {
  setValue('content', newContent);
  setCursorPosition(cursorPosition + 1);
}
```

본문 제한이 글자 수가 아니라 바이트라서 `new Blob([str]).size`로 길이를 쟀다.

예약 발송을 붙이면서 제출 방식을 바꿨다. 처음에는 폼 바깥의 버튼이 form id로 submit하는 구조였는데, 확인 다이얼로그 안에서 예약 시간을 고르고 검증하는 흐름이 생기니 그 상태를 바깥 버튼에서 다루기 어려웠다. submit 책임을 다이얼로그 쪽으로 내리고, 발송은 `useSendMessage` mutation 훅으로 감쌌다.

발송 내역은 TanStack Table로 그렸다. 정렬은 서버가 정해서 내려주기 때문에 API 함수에 있던 정렬 옵션은 지웠다. 예약 상태인 메시지는 내역에서 바로 취소할 수 있게 DELETE 요청과 취소 확인 다이얼로그를 붙였다.

기능 하나를 처음부터 끝까지 맡으니, 작성한 메시지가 어디서 검증되고 어디서 보내지고 어디서 다시 보이는지를 계속 따라가며 작업하게 됐다.
