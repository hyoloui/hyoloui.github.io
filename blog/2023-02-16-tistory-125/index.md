---
title: "Project: 🚩codefolio - Toast UI Editor 사진 업로드"
description: "Toast UI Editor에서 이미지 업로드 시 string으로 출력되던 문제를 addImageBlobHook으로 압축, supabase 업로드, url 삽입하도록 개선한 코드."
authors: [hyoloui]
tags: [project]
---

:::note 🎯목적

에디터 기존의 문제점 개선 (사진 업로드 시 뷰어에서 이미지가 string 형식으로 출력되어짐)

개선 : image url과 file name으로 보여질 수 있도록

:::

\*\* 최종 프로젝트 기간 매우 바쁜 관계로 우선 중요 코드만 적어놓았음 \*\*

<!--truncate-->

---

## 1. UI tag

```tsx
<Editor
  ref={editorRef}
  initialValue={postContent ?? null}
  previewStyle="vertical"
  // previewHighlight={false}

  initialEditType="markdown"
  useCommandShortcut
  toolbarItems={toolbarItems}
  language="ko-KR"
  plugins={[colorSyntax]}
  hooks={{
    // @ts-ignore
    addImageBlobHook: addImage,
  }}
  onChange={() => handleOnEditorChange()}
/>
```

`hooks` 사용하여 `addImage` 라는 함수를 커스텀하여 만들어 주었다.

---

## 2. addImage (이미지 생성 전체 과정)

```tsx
const addImage = async (blob: File, dropImage: HookCallback) => {
  const img = await compressImg(blob); // 이미지 압축
  if (!img) return;
  const url = await uploadImage(img); // 업로드된 이미지 서버 url
  if (!url) return;
  dropImage(url, `${blob.name}`); // 에디터에 이미지 추가
};
```

이미지 사이즈가 너무 크면 에러 발생 위험과, 1회성으로 보여줄 내용을 수시로 서버통신하는 데에 부담이 있기 때문에 이미지 압축을 했고, url 에는 서버통신이 된 img를 받고있다.

---

## 3. uploadImage (업로드)

```tsx
// 이미지 업로드
const uploadImage = async (blob: File) => {
  try {
    const imgPath = crypto.randomUUID();
    await supabase.storage.from("post-image").upload(imgPath, blob);

    // 이미지 올리기
    const urlResult = await supabase.storage
      .from("post-image")
      .getPublicUrl(imgPath);
    return urlResult.data.publicUrl;
  } catch (error) {
    console.log(error);
    return false;
  }
};
```

해당 함수는 에디터에서 사용하는 사진을 supabase를 활용하여 데이터형태를 저장해 준다.

---

## 4. compressImg (압축)

```tsx
// 이미지 압축
const compressImg = async (blob: File): Promise<File | void> => {
  const options = {
    maxSize: 1,
    initialQuality: 0.55, // initial 0.7
  };
  const result = await imageCompression(blob, options)
    .then((res) => res)
    .catch((e) => console.log(e, "압축 에러"));
  return result;
};
```

이미지를 압축하려면 `imageCompression`이라는 라이브러리를 import 한 후 사용해야 한다.

---

## 5. handleOnEditorChange

```tsx
const handleOnEditorChange = () => {
  // 유효성 검사
  const editorText = editorRef.current?.getInstance().getMarkdown();
  if (editorText === " " || editorText === "" || editorText === undefined) {
    return;
  }
  // HTML 대신에 Markdown으로 저장합니다.
  setPostContent(editorText);
};
```

유효성 검사는 해당 에디터가 아무런 타이핑 없이 posting 했을 때를 잡아준다. 이후 문제 없다면 state로 `editorText`를 전송한다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/125)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-16 */}
