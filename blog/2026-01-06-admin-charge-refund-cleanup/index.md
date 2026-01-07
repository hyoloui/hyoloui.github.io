---
title: "어드민 정비: 충전·환불 관리 화면과 Recoil 걷어내기"
description: "메시지 충전·환불 관리 화면을 어드민에 만들면서 오래된 패턴을 정리하고, 에디터 컴포넌트를 Recoil에서 떼어낸 기록."
authors: [hyoloui]
tags: [refactoring, state-management]
---

CRM에서 문자를 보내려면 센터가 미리 잔액을 충전해 둬야 한다. 그 충전과 환불, 발신번호 심사를 관리하는 화면을 사내 어드민(assistfit-admin-next)에 만들고 있다. 11월 말에 시작해서 이번 주까지 이어졌다.

<!--truncate-->

어드민은 CRM보다 오래된 코드가 많다. 새 화면을 만들면서 주변도 조금씩 정리했다.

- 토스트 라이브러리를 react-hot-toast에서 sonner로 바꾸기 시작했다. 새로 만드는 화면부터 적용했다.
- 프랜차이즈 API 함수가 인자를 순서대로 받던 걸 객체 파라미터로 바꾸고, 호출부는 `useFranchisesList` 같은 쿼리 훅으로 감쌌다.
- 충전 목록에만 있던 페이지네이션 컴포넌트를 `ListPagination`으로 올려서 다른 목록에서도 쓰게 했다.
- 메모 수정이나 충전 요청처럼 query string에 값을 싣던 POST, PUT 요청을 body로 옮겼다.

결제 취소 폼에는 수수료율을 고르면 취소 금액이 자동으로 계산되는 로직이 들어갔다. 금액 계산은 `useMemo`로 파생값으로만 두고, 폼 값은 zod 스키마로 허용하는 수수료율을 리터럴 타입으로 제한했다.

오늘은 에디터 컴포넌트를 손봤다. 공지, 이벤트, 게시판 에디터가 공용 에디터 컴포넌트를 쓰는데, 공용 컴포넌트가 `RecoilState`를 prop으로 받아 안에서 `useRecoilState`를 부르고 있었다.

```tsx
// before
<EditorComponent state={noticeContentState} />

// after
const [content, setContent] = useRecoilState(noticeContentState);
return <EditorComponent value={content} onChange={setContent} />;
```

공용 컴포넌트는 `value`, `onChange`만 받는 제어 컴포넌트가 됐고, 상태를 어디에 둘지는 쓰는 쪽이 정한다. 당장은 바깥에서 여전히 Recoil을 쓰지만, 나중에 폼 라이브러리나 로컬 상태로 바꿀 때 공용 컴포넌트는 손댈 필요가 없다. 쓰지 않는 Recoil atom 정의도 같이 지웠다.

한 번에 다 바꾸고 싶은 마음은 있지만 어드민에는 테스트 코드가 없다. 그래서 이번에 손대는 화면 주변부터 바꾸는 쪽을 택했다.
