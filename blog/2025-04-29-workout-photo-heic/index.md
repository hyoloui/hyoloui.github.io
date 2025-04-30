---
title: "오늘의 운동 기능과 HEIC 사진 업로드"
description: "CRM 수업 화면에 오늘의 운동 탭을 만들고, 아이폰 사진(HEIC)을 압축 전에 JPEG로 바꾸는 처리를 넣었다."
authors: [hyoloui]
tags: [react, image]
---

CRM 수업 화면에 '오늘의 운동' 탭을 새로 만들었다. 센터가 그날 진행하는 운동을 날짜별로 사진과 함께 등록하는 기능이다.

<!--truncate-->

구조는 익숙한 패턴을 그대로 따랐다. 탭을 열면 캘린더에서 기간 단위로 운동 목록을 조회하고, 등록·수정·삭제는 각각 별도 라우트의 폼과 서버 액션으로 처리한다. 수업 페이지 테스트에도 새 탭을 열었을 때 컨테이너가 렌더링되는지 확인하는 케이스를 추가했다.

시간이 걸린 건 사진 업로드였다. CRM에는 이미 `browser-image-compression`으로 이미지를 1MB 아래로 줄이는 `compressImage` 함수가 있다. 한 번에 안 줄면 재귀로 다시 압축한다. 그런데 아이폰에서 찍은 사진은 HEIC 형식이라 이 흐름에 그대로 태울 수 없었다.

그래서 압축 전에 HEIC 파일만 골라 JPEG로 바꾸는 단계를 넣었다. `heic2any`를 썼다.

```ts
if (file.type !== 'image/heic') return file;

const jpg = await heic2any({ blob: file, toType: 'image/jpeg' });
const blob = Array.isArray(jpg) ? jpg[0] : jpg;
return new File([blob], `convert_${idx}.jpeg`, { type: 'image/jpeg' });
```

`heic2any`는 Blob을 돌려줄 때도 있고 Blob 배열을 돌려줄 때도 있다. 타입을 보고 나서야 알았다. 업로드 쪽은 File을 기대하니 이름과 타입을 붙여 File로 다시 감쌌다.

변환은 바로 끝나지 않는다. 사용자가 멈춘 줄 알지 않도록 `toast.promise`로 변환 중, 완료, 실패 상태를 보여줬다. 압축 전체도 try/catch로 감싸서 실패하면 토스트를 띄우고 빈 배열을 돌려주게 했다. 이미지 하나 때문에 폼 전체가 멈추면 안 된다고 생각했다.
