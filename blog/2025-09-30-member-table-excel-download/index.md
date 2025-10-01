---
title: "회원 목록 테이블과 엑셀 다운로드 정리"
description: "TanStack Table 기반 그리드 테이블과 공통 엑셀 다운로드 훅을 만들고, 회원 목록 QA를 마무리한 기록."
authors: [hyoloui]
tags: [file-export, react]
---

회원 목록 개편 QA를 마무리하고 오늘 v2.0.1로 버전을 올렸다. 9월 후반은 테이블, 엑셀 다운로드, 그리고 QA 이슈 처리로 다 지나갔다.

<!--truncate-->

## 그리드 테이블

회원 목록 테이블은 TanStack Table에 회사에서 쓰는 AsTable 컴포넌트를 붙여서 만들었다. AsTable은 `table` 태그 대신 CSS grid로 그리는 테이블이다. 행은 `display: contents`로 두고 셀이 바로 grid 아이템이 되게 했다. 셀 병합도 지원하는데, spanConfig를 받아 행 데이터에서 rowSpan을 계산하는 훅이 따로 있다.

구조를 이해하는 데 시간이 걸려서 다 읽고 나서 컴포넌트와 훅마다 JSDoc 주석을 달아 뒀다. QA에서 컬럼 너비가 전부 균등하게 나온다는 이슈가 와서 `columnMaxWidths` 옵션도 추가했다.

## 엑셀 다운로드

직원 목록과 회원 목록 둘 다 엑셀 다운로드가 있는데, 각자 토스트 처리, 로딩 상태, 시트 스타일 코드를 따로 갖고 있었다. 공통 부분을 `useExcelDownload` 훅과 엑셀 유틸로 뺐다.

```ts
const handleDownload = async <T>(
  downloadFn: () => Promise<T>,
  processFn: (data: T) => void,
  options?: { loadingMessage?: string; successMessage?: string; errorMessage?: string }
) => { /* 로딩 토스트, try/catch, 상태 정리 */ };
```

데이터를 가져오는 함수와 시트로 만드는 함수만 넘기면 된다. 헤더 병합 범위 계산, 헤더 셀 스타일, 숫자 컬럼 스타일은 `utils/excel.ts`로 옮겼다.

## QA

QA 이슈가 한 주 반 동안 꽤 많이 들어왔다. 대부분 경계값 문제였다. 남은 횟수가 0회일 때 하이픈이 나오는 문제, 만료일이 지난 상품이 '이용 가능 상품'에 섞이는 문제, 회수된 락커가 엑셀에 남는 문제, 미방문 기간 필터에서 큰 값을 고르면 데이터가 안 오는 문제 같은 것들이다. 화면과 엑셀이 같은 데이터를 다르게 가공하고 있으면 한쪽만 고쳐지는 일이 생겨서, 하나 고칠 때마다 양쪽을 같이 확인했다.

퇴근 후에는 운영체제, 자료구조, 머신러닝 강의를 듣고 이 블로그 docs에 정리하고 있다. 회사 일과 속도를 맞추기가 쉽지 않다.
