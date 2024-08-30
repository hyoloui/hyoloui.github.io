---
title: "router.refresh() 대신 revalidateTag"
description: "기타 매출 관리에서 저장 후 화면 갱신을 router.refresh()에서 캐시 태그 무효화로 바꾸고, 반복 코드와 불필요한 state를 정리한 기록."
authors: [hyoloui]
tags: [career, react, web]
---

기타 매출 관리 화면을 사흘 동안 정리했다. 기능을 더한 건 없고, 저장한 뒤 목록이 갱신되는 방식을 바꿨다.

<!--truncate-->

기타 매출 관리는 표 안에서 바로 행을 추가하고 수정하고 삭제한다. 저장은 서버 액션으로 하고, 끝나면 클라이언트에서 `router.refresh()`를 불러 목록을 다시 받아 왔다. 서버 액션 안에서는 redirect도 하고 있었다. 저장 한 번에 갱신이 두 번 일어나는 셈이었다.

목록을 가져오는 fetch에는 이미 `next.tags`가 붙어 있었다. 그래서 서버 액션이 끝날 때 그 태그만 무효화하도록 바꿨다.

```ts
// 서버 액션 (추가, 수정, 삭제 공통)
await handleError(response);
revalidateTag(`etc-sales-list-${centerId}`);
```

클라이언트 쪽에서는 `useRouter`와 `router.refresh()`가 전부 빠졌고, useCallback 의존성 배열에서도 router가 사라졌다.

정리하다 보니 태그 이름이 이상했다. 목록용은 `etcsales-`, 엑셀 다운로드용은 `etc-sales-`로 하이픈 하나 차이였다. 오타처럼 보인다. `etc-sales-list-`와 `etc-sales-all-`로 나눠서 무엇을 무효화하는지 이름에서 보이게 했다.

같은 컴포넌트에서 한 일이 두 가지 더 있다.

- 입력 필드마다 같은 모양으로 반복되던 코드를 상수 배열과 map으로 바꿨다.
- props로 받은 매출 데이터를 다시 useState에 복사해 쓰던 걸 지우고 props를 그대로 읽게 했다.

두 번째는 처음 짤 때 습관처럼 넣었던 코드다. 복사본을 두면 서버 데이터가 바뀌어도 화면이 따라오지 않을 수 있다. 같은 데이터를 두 군데서 들고 있을 이유가 없었다. 마지막으로 공통 `handleError`에 응답 오류를 콘솔에 남기는 줄을 한 줄 추가했다.
