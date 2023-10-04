---
title: "영업 일지 상세를 PDF로 내려받기"
description: "어드민 영업 일지 메뉴에 @react-pdf/renderer로 PDF 다운로드를 붙이고, 로딩·에러·빈 데이터 화면을 공용 컴포넌트로 정리한 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

9월에는 어드민에 영업 일지 메뉴가 생겼다. 현장에서 작성한 일지를 목록과 상세 모달로 보여주고, 상세 내용은 PDF로 내려받을 수 있게 하는 게 요구사항이었다.

<!--truncate-->

## react-pdf로 다시 그리기

`@react-pdf/renderer`는 화면의 DOM을 찍어내는 방식이 아니다. `Document`, `Page`, `View`, `Text` 같은 자기 컴포넌트로 PDF를 따로 그린다. Tailwind 클래스도 못 쓰고 `StyleSheet.create`로 스타일을 다시 짜야 했다. 그래서 일지 종류마다 화면용 모달과 PDF용 Body 컴포넌트를 한 벌씩 만들었다.

기본 폰트에는 한글 글리프가 없어서 그대로 두면 한글이 나오지 않는다. `Font.register`로 한글 폰트를 등록하고 페이지 스타일의 `fontFamily`로 지정했다.

다운로드 버튼은 `PDFDownloadLink`를 모달 하단 버튼 자리에 넣었다. 렌더 함수로 `loading`과 `error`를 받을 수 있어서 생성 중에는 로더를, 실패하면 toast를 띄운다.

```tsx
<PDFDownloadLink document={pdfBody} fileName={`${title}.pdf`}>
  {({ loading, error }) => {
    if (error) toast.error('PDF 다운로드에 실패했습니다.');
    return loading ? <Loader basic /> : <FaFilePdf size={22} />;
  }}
</PDFDownloadLink>
```

PDF 관련 파일이 늘어나서 `Sales/PDF` 폴더로 모으고 스타일은 `pdfStyles.ts` 하나를 같이 쓰게 했다. 아직 PDF 안의 이미지가 다운로드 시점에 네트워크 문제로 빠지는 경우가 있다. 다음에 볼 일로 남겨뒀다.

## 로딩, 에러, 빈 화면

React Query로 옮긴 뒤 페이지마다 `isLoading`, `isError` 분기를 제각각 그리고 있었다. `Loader`, `ErrorData`, `ZeroData` 세 컴포넌트를 `Common/Response`에 만들고 전부 이걸로 바꿨다. `ErrorData`에는 새로고침 버튼을 달아서, 누르면 `invalidateQueries`로 쿼리를 다시 불러온다.

퇴근 후에는 Firebase로 채팅 앱(nextjs-chat)을 만들어봤다. 구글 로그인 후 사이드바에서 상대를 고르면 `/chat/[id]` 방으로 들어간다. 메시지는 `react-firebase-hooks`의 `useCollectionData`에 `timestamp` 순으로 정렬한 쿼리를 넘겨서 받는다. 쇼핑몰에서는 `onSnapshot`을 직접 감싼 훅을 만들었는데, 이 라이브러리를 쓰니 로딩 상태까지 한 줄로 받을 수 있었다.
