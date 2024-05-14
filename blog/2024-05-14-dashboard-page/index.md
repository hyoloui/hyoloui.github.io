---
title: "CRM 대시보드 페이지 만들기"
description: "센터 선택 후 첫 화면인 대시보드를 서버 컴포넌트와 searchParams 기반 날짜 이동으로 만든 기록."
authors: [hyoloui]
tags: [career, react]
---

로그인하고 센터를 고르면 지금까지는 센터 정보 페이지로 들어갔다. 이번에 그 자리에 대시보드를 만들었다. 날짜별로 가입 고객, 이용 고객, 매출, 개인 레슨 현황을 한 화면에 모아 보여주는 페이지다.

<!--truncate-->

## 경로부터

대시보드는 `/[franchiseId]/[centerId]` 바로 아래 `page.tsx`에 두었다. 센터 하위 메뉴들이 모두 이 경로를 공유하니, 센터의 첫 화면이 이 주소인 게 자연스러웠다. 센터 선택 버튼의 이동 경로도 여기로 바꿨다.

## 날짜는 URL로

날짜는 상태로 들고 있지 않고 `?date=` query string으로 받는다. 페이지는 서버 컴포넌트로 두고, `searchParams`에서 날짜를 읽어 일별 통계 API를 바로 호출한다.

```tsx
export default async function DashboardPage({ params, searchParams }: Props) {
  const date = searchParams?.date || moment(new Date()).format('YYYY-MM-DD');
  const data = await getMainStatistics(+params.centerId, date);
  // ...
}
```

날짜 이동 UI는 스케줄 관리에서 쓰던 `DayNavigation` 컴포넌트를 그대로 가져왔다. 대시보드에서는 아직 오지 않은 날짜를 볼 이유가 없어서 `notAllowNext` prop을 추가하고, 오늘이거나 그 이후면 다음 버튼을 숨기도록 했다. 화살표를 누르면 URL만 바뀌고, 서버 컴포넌트가 새 날짜로 다시 그린다. 클라이언트에는 fetch 코드가 한 줄도 없다.

API 응답은 남녀 수치가 필드로 나뉘어 와서, 페이지에서 합계를 계산해 카드 컴포넌트에 넘긴다. 매출 합계는 키에 `Revenue`가 들어간 필드만 `reduce`로 더했다. 처음에 page 하나에 다 쓰고 보니 300줄이 넘어서, 카드와 표 같은 표현용 컴포넌트는 `DashboardComponents` 파일로 빼고 페이지에는 데이터 가공만 남겼다. 값이 0인 영역은 빈 표 대신 '보여드릴 항목이 없어요' 안내를 띄운다.

같은 날 대표 권한일 때만 보이는 메뉴도 내비게이션에 추가했다. 지난달 쿠키에 저장해 둔 권한 값을 그대로 쓸 수 있었다.
