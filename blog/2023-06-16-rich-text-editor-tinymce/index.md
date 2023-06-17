---
title: "리치 텍스트 에디터를 TinyMCE로 바꾸기까지"
description: "이벤트·공지사항 본문 에디터를 Quill에서 CKEditor를 거쳐 TinyMCE로 옮기고, 이미지 업로드와 미리보기를 붙인 기록."
authors: [hyoloui]
tags: [react, editor]
---

공지사항 페이지까지 만들고 나니 본문 에디터에 HTML 소스를 직접 넣는 기능이 필요해졌다. 그걸 붙이다가 사흘 동안 에디터를 두 번 갈아탔다.

<!--truncate-->

## Quill, CKEditor, TinyMCE

처음엔 쓰던 react-quill에 `quill-html-edit-button` 플러그인을 등록해서 HTML 버튼을 만들었다. 그러면서 툴바 순서와 붙여넣기 옵션도 다시 손봤다.

같은 날 밤에는 CKEditor 5를 온라인 빌더로 만들어서 저장소에 넣어봤다. 빌드 결과물과 언어별 번역 파일이 통째로 따라 들어왔다. 이틀 뒤 TinyMCE로 정했고, react-quill과 CKEditor 빌드 파일을 모두 지웠다.

TinyMCE는 기본 플러그인 목록에 유료 기능이 섞여 있었다. `advcode`, `powerpaste`, `checklist` 같은 것들이다. 하나씩 주석에 "유료"라고 적어두고 빼고, HTML 편집은 무료 `code` 플러그인으로 대신했다.

## 이미지 업로드와 미리보기

기본 이미지 버튼 대신 `custom_image` 버튼을 만들었다. 파일을 고르면 기존 이미지 업로드 API로 올리고, 돌려받은 URL을 커서 위치에 `img` 태그로 넣는다. 업로드 중에는 `toast.promise`로 상태를 보여준다.

미리보기는 컴포넌트를 새로 만들지 않고 `disabled` prop 하나로 해결했다. 같은 에디터를 쓰되 메뉴바와 툴바만 끈다.

```tsx
init={{
  menubar: !disabled,
  toolbar: disabled
    ? false
    : 'undo redo preview | blocks | bold italic backcolor | ...',
}}
```

이번 주에 API 에러 처리도 정리했다. 페이지마다 `try/catch`로 콘솔만 찍던 코드를 걷어내고, 상태 코드별 메시지 객체를 `useHandleResponseError` 훅에 넘기는 방식으로 바꿨다. 토큰이 만료된 응답이면 이 훅에서 토큰을 지우고 로그인 화면으로 보낸다.

에디터를 두 번 되돌리고 나니, 다음 라이브러리는 무료로 쓸 수 있는 범위부터 확인해야겠다고 생각했다.
