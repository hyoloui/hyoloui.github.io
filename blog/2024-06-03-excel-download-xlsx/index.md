---
title: "xlsx로 통계 엑셀 다운로드 만들기"
description: "개인 레슨 관리와 통계 화면의 데이터를 SheetJS(xlsx)로 브라우저에서 엑셀 파일로 만들어 내려받게 한 기록."
authors: [hyoloui]
tags: [career, javascript]
---

개인 레슨 관리와 통계 화면에 '엑셀 다운로드' 버튼을 붙였다. 파일은 서버에서 만들지 않고, 엑셀용 데이터 조회 API의 JSON을 받아 브라우저에서 `xlsx` 라이브러리로 만든다.

<!--truncate-->

## 한 화면에서 먼저

개인 레슨 관리 화면에서 먼저 흐름을 잡았다. API 응답 배열을 엑셀의 한 행이 될 객체 배열로 바꾸고, 시트로 만들어 파일로 쓴다. 객체의 키가 그대로 엑셀 헤더가 되기 때문에 키를 한글로 적었다.

```ts
const rows = data.ptClasses.map((pt, index) => ({
  순서: index + 1,
  트레이너명: pt.trainerName,
  연락처: parseMobileNumber(pt.mobileNumber),
  '승인 처리': pt.bookingStatus === 'COMPLETED' ? 'O' : 'X',
}));
const wb = utils.book_new();
utils.book_append_sheet(wb, utils.json_to_sheet(rows), `${year}년 ${month}월`);
writeFile(wb, `${date}_개인레슨관리.xlsx`);
```

`json_to_sheet`가 객체 배열을 시트로 바꿔 주고, `writeFile`이 다운로드까지 처리한다. 마지막 행에는 `총 인원`을 넣었다. 버튼을 누르면 `toast.promise`로 '엑셀 다운로드 중...'을 띄우고, API 응답이 오면 파일을 만든 뒤 성공 토스트로 바꾼다.

## 통계 탭 세 개로 넓히기

통계 화면에는 결제 내역, 보유 회원, 상담자 탭이 있고 탭마다 엑셀 데이터 API와 컬럼이 다르다. `StatisticsExcelDownload` 컴포넌트 하나가 현재 탭을 prop으로 받아 맞는 API를 호출하고, 탭별 변환 함수로 행을 만든다. 상품 카테고리나 등록 유형처럼 enum으로 오는 값은 타입 파일에 만들어 둔 한글 매핑 객체로 바꿔서 넣었다. 보유 회원 탭은 남녀 수치에 합계 컬럼을 하나씩 더해 엑셀에서 따로 계산하지 않아도 되게 했다.

데이터가 비어 있으면 버튼이 있는 하단 영역 자체를 렌더링하지 않는다. 빈 파일을 내려받게 하는 것보다 그게 낫다고 판단했다.

화면에 보여주는 데이터와 파일로 내보내는 데이터의 형태가 다르다는 점이 이번 작업에서 가장 손이 많이 간 부분이었다. 화면은 카드와 표로 보기 좋게, 엑셀은 한 행에 정보가 다 있어야 필터와 정렬이 된다.
