---
title: "이벤트 관리 페이지와 첫 API 연동"
description: "어드민 이벤트 등록·수정 화면을 만들고 API를 붙이면서 만난 한글 검색, CORS, SSR 문제와 자동 로그아웃 구현기."
authors: [hyoloui]
tags: [react, data-fetching, auth]
---

어드민에서 제일 먼저 만들 화면은 이벤트 관리였다. 2주 동안 UI를 만들고, 처음으로 백엔드 API를 붙였다.

<!--truncate-->

## 등록 폼과 검색

이벤트 등록 폼에는 날짜, 시간, 요일 체크박스, 본문 에디터가 들어간다. 다른 페이지에서도 쓸 것 같아서 `Checkbox`, `DateInput`, `TimeInput`을 공용 컴포넌트로 만들었다. 시간 입력은 react-time-picker를 써봤는데 마음에 들지 않아서 같은 날 지웠다. 에디터는 react-quill을 붙였다.

목록 검색은 처음에 `includes`로 제목을 비교했다. 그런데 "이벤ㅌ"처럼 마지막 글자를 조합하는 중에는 아무것도 걸리지 않았다. hangul-js로 검색어와 제목을 둘 다 자모 단위로 분해해서 비교하니 해결됐다.

```ts
const searchTerm = Hangul.disassemble(searchValue).join('');

const filteredAds = _.filter(ads, (ad) => {
  const disassembledTitle = Hangul.disassemble(ad.title).join('');
  return disassembledTitle.includes(searchTerm);
});
```

검색어와 폼 값은 Recoil atom으로 옮겼다. 등록 페이지와 수정 페이지가 같은 폼 컴포넌트를 쓰게 하려는 목적이었다.

## API를 붙이자마자 터진 것들

첫 요청부터 CORS 에러가 났다. `next.config.js`의 `rewrites`로 API 경로를 개발 서버로 넘겨서 브라우저가 같은 출처로 요청하게 만들었다.

빌드에서도 두 번 막혔다. react-quill은 서버에서 렌더링할 수 없어서 `next/dynamic`의 `ssr: false`로 불러와야 했다. 토큰을 `sessionStorage`에 저장했더니 빌드 중에 ReferenceError가 났다. 서버에는 `window`가 없다. 토큰을 읽고 쓰는 함수를 `utils/auth.ts`에 모으고 `typeof window` 검사를 넣었다.

마지막으로 자동 로그아웃을 만들었다. 토큰 만료 시간에 맞춰 로그아웃시키고, 30분 전에 toast로 알려준다. 로그인 상태를 Recoil로 들고 있던 코드는 지우고 `AuthProvider` 하나로 정리했다.
