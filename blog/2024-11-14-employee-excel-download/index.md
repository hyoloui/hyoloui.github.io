---
title: "직원별 엑셀 시트, 셀 타입까지 맞추기"
description: "직원마다 시트를 나눈 담당 회원 엑셀을 xlsx-js-style로 꾸미면서, 숫자와 날짜가 엑셀에서 엉뚱하게 보이는 문제와 시트 정렬을 처리한 기록."
authors: [hyoloui]
tags: [career, javascript]
---

직원 관리에 엑셀 다운로드를 붙였다. 직원 한 명당 시트 하나에 담당 회원 목록이 들어간다. 이번에는 데이터를 넣는 것보다 엑셀에서 어떻게 보이는지가 일이었다.

<!--truncate-->

## 구조

헤더 셀 색, 정렬, 줄무늬 같은 스타일이 필요해서 `xlsx-js-style`을 추가했다. 다운로드 로직은 `ExcelDownloadBtn` 컴포넌트 하나가 책임지고, 헤더 제목과 열 범위, 셀 설명 같은 상수는 따로 파일로 뺐다. API가 나오기 전이라 처음 며칠은 API 함수가 mock 데이터를 돌려주게 해 두고 화면을 먼저 맞췄다.

## 엑셀이 값을 멋대로 해석한다

개인 레슨 수 같은 숫자 열이 날짜로 바뀌어 보이는 셀이 있었다. 커밋 메시지에도 남겼지만 네 자리 이상 숫자에서 생기는 문제였다. 해당 열만 셀 타입을 숫자로 못 박았다.

```ts
if ([10, 11, 12].includes(col)) {
  ws[cellAddress].t = 'n';
  ws[cellAddress].z = '0';
}
```

반대로 날짜 열은 moment로 `YY.MM.DD` 문자열을 만들어 넣고 있었다. 이러면 엑셀에서 정렬이나 필터를 걸 때 그냥 글자로 취급된다. 문자열 대신 `Date` 객체를 넘기도록 바꿨다. 헤더에 붙인 설명 주석은 기본으로 숨겨서 마우스를 올릴 때만 보이게 했다.

## 시트 순서

시트 순서는 직원 id 순이었다. 받는 사람 입장에서는 이름순이 낫다.

```ts
const employeeIds = Object.keys(data).sort((a, b) => {
  const [trainerA, trainerB] = [data[+a][0], data[+b][0]];
  switch (true) {
    case isWithdrawnTrainer(trainerA.trainerName): return 1;
    case isWithdrawnTrainer(trainerB.trainerName): return -1;
    case trainerA.trainerName !== trainerB.trainerName:
      return trainerA.trainerName.localeCompare(trainerB.trainerName);
    default: return trainerA.trainerId - trainerB.trainerId;
  }
});
```

탈퇴한 강사는 맨 뒤로 보내고, 나머지는 가나다순, 이름이 같으면 id로 비교한다. 파일명에는 직원 이름이 들어가게 했다.
