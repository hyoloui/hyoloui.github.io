---
title: "QA와 운영 배포 나누기, 그리고 통계 페이지"
description: "브랜치별 GitHub Actions 워크플로로 QA와 운영 배포를 나누고 환경변수를 주입한 과정, 같은 시기에 만든 통계 차트·엑셀 다운로드·이미지 압축 정리."
authors: [hyoloui]
tags: [deployment]
---

QA 배포가 자리를 잡고 2주 뒤, 어드민을 운영 서버에도 올렸다. 그 사이에 통계 화면과 업로드 기능도 손봤다.

<!--truncate-->

## 워크플로를 브랜치별로

워크플로 파일 하나로 시작했던 걸 브랜치별로 세 개로 나눴다. `dev`와 `release/` 브랜치는 QA로, `main`은 운영으로 간다. 배포 결과는 성공이든 실패든 Slack으로 알림이 오게 했고, 매번 AWS CLI를 새로 받던 단계는 `actions/cache`로 캐시했다.

문제는 환경마다 다른 API 주소였다. `next.config.js`의 `rewrites`가 이 주소를 써야 해서, 워크플로에서 secrets 값을 읽어 `.env` 파일을 만들도록 했다. 코드에 그대로 박혀 있던 에디터 API 키도 이때 같이 옮겼다.

그런데 배포해보니 API 주소가 비어 있었다. 원인은 한 줄이었다.

```js
// 전: 문자열을 구조분해해서 undefined
const { API_URL } = process.env.API_URL;

// 후
destination: `${process.env.API_URL}/api/v1/:path*`,
```

`process.env.API_URL`은 그냥 문자열인데 습관처럼 구조분해를 했다.

## 통계와 엑셀, 이미지 압축

배너와 이벤트 통계 화면에는 Recharts로 연령대, 성별, 시간대별 차트를 그렸다. 같은 데이터를 xlsx로 내려받는 버튼도 만들었다. 응답 키를 "날짜", "클릭 수" 같은 한글 컬럼명으로 바꾼 뒤 `json_to_sheet`로 시트를 만들고, 통계 종류마다 시트를 하나씩 붙였다.

이벤트 배너나 본문 이미지는 browser-image-compression으로 업로드 전에 압축한다. 최대 1MB, 초기 품질 0.7로 맞추고 `Promise.all`로 여러 장을 한 번에 처리한다.

운영 배포가 생기고 나니 push 한 번이 예전보다 무겁게 느껴진다.
