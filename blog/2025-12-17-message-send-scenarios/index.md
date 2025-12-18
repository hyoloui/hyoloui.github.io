---
title: "앱 알림과 문자, 즉시와 예약: 발송 흐름 네 갈래로 나누기"
description: "메시지 기능에 문자 발송이 붙으면서 한 덩어리였던 확인 다이얼로그를 네 가지 시나리오로 나누고 검증 로직을 훅으로 모은 기록."
authors: [hyoloui]
tags: [react, forms]
---

12월에는 메시지 기능에 문자(SMS) 발송이 붙었다. 앱 알림만 보내던 화면이라 생각보다 바뀌는 곳이 많았다.

<!--truncate-->

문자가 들어오면서 발신번호 선택, 요금표와 잔액 표시, 받는 사람 추가 방식(직접 입력, 상담 회원, 엑셀 업로드)이 새로 생겼다. 받는 사람 다이얼로그는 종류별로 컴포넌트를 나누고, 기존 `userIds`라는 이름도 `recipients`로 바꿨다. 이제는 회원이 아닌 번호도 받는 사람이 될 수 있어서다.

제일 고민한 건 발송 확인 다이얼로그였다. 원래 다이얼로그는 앱 알림을 전제로 만들어져 있었고, 문자를 지원하려면 안쪽에 조건문이 계속 늘어날 상황이었다. 경우를 세어보니 앱 즉시 발송, 앱 예약 발송, 문자 포함 즉시 발송, 문자 포함 예약 발송 네 가지였다. 네 개를 각각 컴포넌트로 만들고, 메시지 유형에 따라 어느 다이얼로그를 띄울지는 Config 컴포넌트 하나가 고르게 했다. 330줄짜리 다이얼로그 하나를 지우고 파일은 늘었지만, 각 파일은 자기 시나리오만 안다.

공통 검증은 훅으로 모았다.

```ts
const validations = [
  { check: validateMessageContent(content, isAdvertisement, centerName), message: '메시지 내용을 입력해 주세요.' },
  { check: validateMessageRecipients(recipients), message: '받는 사람을 추가해 주세요.' },
  { check: !isIncludeSMS || validateMessageSenderPhoneNumber(senderPhoneNumber), message: '발신번호를 선택해 주세요.' },
];
validations.forEach(({ check, message }) => {
  if (!check) { toast.error(message); isValid = false; }
});
```

처음에는 `some`으로 첫 실패에서 멈췄다. 그러면 사용자가 하나 고치고 다시 누르고, 또 하나 고치고 다시 눌러야 한다. 같은 날 `forEach`로 바꿔서 빠진 항목을 한 번에 다 보여주도록 했다.

광고성 메시지는 정보통신망법 때문에 밤 9시부터 다음 날 오전 8시까지 보낼 수 없다. 기준 시각을 받아(없으면 현재 시각) 그 시간대인지 검사하는 `useValidateAdvertisementTime` 훅을 만들고, 발송 다이얼로그를 열기 전에 이 검사를 거치게 했다.
