---
title: "반복되던 입력 검증 코드를 공용 함수로"
description: "그룹 수업 폼 곳곳에 흩어진 setCustomValidity 코드를 제네릭 공용 함수로 묶고, 이벤트 객체를 mock해 테스트한 기록."
authors: [hyoloui]
tags: [career, typescript, react]
---

12월 중순부터 그룹 수업 QA가 시작됐다. 인원 설정에 숫자 말고 다른 값이 들어간다, 지급 옵션에 세 자리를 넘겨 입력된다 같은 입력 관련 이슈가 몰려 들어왔다. 고치다 보니 같은 코드를 여러 파일에서 계속 만지고 있었다.

<!--truncate-->

지난달 폼을 나누면서 남겨 둔 숙제가 이거였다. 컴포넌트마다 `onInput`에서 메시지를 지우고, `onInvalid`에서 메시지를 넣는 코드가 반복된다. 이걸 두 함수로 묶었다.

```ts
type InputObj<T> = { [key in keyof T]: { invalidMessage: string } };

export const setInputValidationMessage = <T>(
  e: React.FormEvent<HTMLInputElement>,
  inputObj: InputObj<T>,
  callback?: (target: HTMLInputElement) => void
) => {
  const target = e.target as HTMLInputElement;
  const id = target.id as keyof T;
  if (!inputObj[id]) return console.error(`Invalid id: ${String(id)}`);
  callback?.(target);
  target.setCustomValidity(inputObj[id].invalidMessage);
};
```

input의 id를 key로 메시지 객체에서 문구를 찾는다. 컴포넌트에서는 메시지 객체 하나만 정의하고 `onInvalid`에 이 함수를 넘기면 된다. 메시지를 지우는 `clearInputValidation`도 같은 모양으로 만들었고, 둘 다 메시지 처리 전에 할 추가 작업을 callback으로 받을 수 있다.

공용 함수는 여러 화면이 같이 쓰니까 테스트를 같이 넣었다. 실제 DOM 이벤트 대신 `target`에 `setCustomValidity: jest.fn()`만 가진 객체를 만들어 넘겼다. 메시지가 맞게 들어가는지, 콜백이 target을 받는지, 없는 id가 오면 에러를 찍는지 확인한다.

이번 달에는 비슷한 정리를 몇 가지 더 했다.

- `getProductList(centerId, 'FC')`처럼 문자열로 넘기던 값을 `ProductTabs` enum으로 바꿨다.
- 그룹 수업 화면의 수업 카드, 목차, 토스트 컴포넌트에 렌더링 테스트를 썼다.

QA 이슈를 하나씩 고치는 건 금방 끝난다. 같은 종류의 이슈가 다시 안 나오게 하려면 어디를 고쳐야 하는지 찾는 데 시간이 더 걸렸다.
