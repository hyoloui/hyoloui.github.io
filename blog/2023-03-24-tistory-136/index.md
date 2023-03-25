---
title: "Project: 🚩codefolio - 이미지 최적화, 성능 개선"
description: "browser-image-compression으로 업로드 이미지를 약 80% 압축해 서버 부하를 줄이고, 폰트와 에디터 최적화로 Lighthouse 성능 점수를 74점에서 99점으로 개선한 기록."
authors: [hyoloui]
tags: [project, image, performance]
---

:::note 🎯목적

이미지 파일 압축 업로드 기능 구현, 최종 성능 개선에 대한 기록

:::

### 목차

1. 문제점 발견
2. 두번째 솔루션 (이미지 압축 라이브러리 적용)
3. 파일 사이즈 비교
4. 얻어진 결과 (Chrome LightHouse 점수)

<!--truncate-->

---

## 1. 문제점 발견

게시글이 post가 되어 detail 페이지에서 사용자가 작성한 글이 보여지게 된다

codefolio 프로젝트 특성상 다량의 이미지가 들어가게 됨에 따라 editor의 번들 사이즈도 적지 않은데, 거기에 더 사이즈가 큰 이미지가 여러개 보여지게 되면서 **detail 페이지의 로딩속도가 이미지의 사이즈와 수량에 따라 비례하게 증가**했다.

기존의 **static한 이미지**는 프론트에서 **next image를 사용**하여 **이미지 최적화를 하면서 빠르게 로딩** 되었지만

**뷰어**에서 보여주는 이미지는 개별적으로 최적화 할 수 없었다. 또한 supabase를 사용하고 있는 우리 프로젝트는 **서버비용이 늘어남에 따라 서비스 제한이 생길 수 있다는 우려**가 있었고,

기존에 프로젝트를 진행하면서 firebase에서 겪은 바와 같이 (일일 할당 용량 초과 시 서버 다운..) 서버 비용을 무시할 수 없었다.

그렇게 여러 솔루션을 찾던 도중 **3가지 방안**을 찾았다.

1. 이미지 **크기** 조정 = 유저의 수고가 필요
2. 이미지 **압축** = 개발 필요
3. **레이지 로딩** = 뷰어 내부에서의 적용은 제한

위 셋중 서버 비용을 줄이는데 관심사를 둔 솔루션은 **이미지 사이즈를 압축하는 방법**이였고 그렇게 압축 라이브러리를 찾았다,

v1.0.0 버전이 deploy 된 상황에서 서버가 다운된다면 정말 최악이다..

지체 할 이유가 없었고 바로 팀원들과 현 상황을 공유하고 빠르게 적용해보겠다는 뜻을 공유했다.

---

## 2. 두번째 솔루션 (이미지 압축 라이브러리 적용)

[browser-image-compression](https://www.npmjs.com/package/browser-image-compression)

```tsx
import imageCompression from "browser-image-compression";

const options = {
  maxSizeMB: 1,
  initialQuality: 0.55, // initial 0.7
};

const compressImg = async (blob: File): Promise<File | void> => {
  const result = await imageCompression(blob, options)
    .then((res) => res)
    .catch((e) => console.log(e, "압축 에러"));
  return result;
};

export default compressImg;
```

`common` 폴더에 만들어두고 다른 팀원들도 사용할 수 있게 만들어 두었다.

```tsx
files.map(async (file) => {
  const fileId = uuidv4();

  const compressedFile = await compressImg(file);
  if (!compressedFile) return;

  const uploadResult = await uploadImage(
    compressedFile,
    "post-image",
    `${isPostId}/${fileId}`
  );
  if (!uploadResult) return;

  const insertString = `![${file.name}](${uploadResult})`;
  const resultString = insertToTextArea(insertString);

  setPostContent(resultString || "");
});
```

4,5 번째 줄에 적용한 모습이다.

쉽게 적용할 수 있었고 다른 이미지 업로드 부분에서도 전부 적용했다.

---

## 3. 파일 사이즈 비교

| 구분                  | 파일 크기 |
| --------------------- | --------- |
| TO-BE (압축 적용 후)  | 1.21 KB   |
| AS-IS (압축 적용 전)  | 6.17 KB   |

- 클라이언트가 전송하는 모든 이미지는 다음과 같이 파일크기를 약 80% 압축하여 서버 부하를 줄일 수 있었다.
- 아래는 압축 적용 전의 사이즈이고, 위가 압축 적용 후 사이즈. (supabase storage 버킷 화면 기준)

---

## 4. 얻어진 결과(Chrome LightHouse 점수)

폰트, 이미지 최적화, 에디터 변경을 통한 성능 개선

Chrome LightHouse 점수 측정 후 개선점을 발견하였다.

**개선 전**

| 성능 | 접근성 | 권장사항 | 검색엔진 최적화 |
| ---- | ------ | -------- | --------------- |
| 74   | 95     | 92       | 100             |

Lighthouse는 "네트워크 페이로드가 커지지 않도록 관리하기" (총 크기 4,701KiB)를 지적했고, 가장 큰 항목은 fonts.gstatic.com의 Noto Sans KR 폰트 파일(3,647.5 KiB)이었다. 그 다음이 supabase에 올라간 이미지(255.6 KiB)였다.

**개선 후**

| 성능 | 접근성 | 권장사항 | 검색엔진 최적화 |
| ---- | ------ | -------- | --------------- |
| 99   | 98     | 92       | 100             |

이를 통해 Chrome LightHouse 성능점수를 기존 74점에서 99점으로 개선할 수 있었습니다.

---

:::tip 최종 정리

1. 이미지 최적화를 위한 여러 솔루션을 찾던 도중 **3가지 방안**을 찾았다.
2. 그중 우리에게 필요한 서버비용을 줄일 수 있는 솔루션인 **browser-image-compression 라이브러리 적용**.
3. 사용자가 업로드하는 **이미지 크기를 약 80% 압축**하여 서버 부하를 줄일 수 있었다.
4. 폰트 최적화, 이미지 최적화, 에디터 변경을 통해 **LightHouse 점수를 99점으로 개선**했다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/136)에서 옮겨 온 글입니다. 원문 작성일: 2023-03-24 */}
