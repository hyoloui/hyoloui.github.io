---
title: "fanpick 프로젝트 셀프 코드 리뷰 - CRUD(in C)"
description: "fanpick 프로젝트에서 Firebase addDoc으로 게시글을 생성하는 Create API 코드를 리뷰하고 수정한 점을 정리한 글."
authors: [hyoloui]
tags: [project, javascript]
---

❤️‍🔥 TIL : Today I Learned

## Create API

게시글을 생성하는 함수이다.

<!--truncate-->

```js
// Create API
// fan-pick 라는 이름의 collection에 객체 형태의 Document를 신규 등록
export const save_fanpick = async (event) => {
  event.preventDefault();
  const title = document.querySelector(".title2");
  const content = document.querySelector(".content2");
  let modalImage = await save_img();

  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "fan-pick"), {
      creatorId: uid,
      creatorImg: photoURL,
      nickname: displayName,
      title: title.value,
      content: content.value,
      time: Date.now(),
      imgUpload: modalImage ?? no_img,
    });
    title.value = "";
    content.value = "";
    localStorage.removeItem("imgDataUrl2");
    document.getElementById("modalUpImg").value = "";
    getList();
    modalOff2();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};
```

우선 spa 이기 때문에 `main.js` 에서도 import 하여 전역함수로 만들기 위해 `export` 로 함수를 외부에서 가져갈 수 있도록 선언한다.

`save_fanpick` 이라는 함수는 버튼을 onclick 했을 때 실행되는 함수 이므로 `event` 를 인수로 하여 `preventDefault();` 를 넣어주어야 페이지가 리로딩이 되거나 다른 기본 동작을 초기화 해줄 수 있다.

이후에 input 박스에 적혀진 value 를 가져오기 위해 dom을 집도록 변수를 선언해준다 (`title`, `content`). 또 다른 변수에 미리 작성해 둔 `save_img()` 함수를 받은 상태에서 비동기가 되도록 `await` 도 할당해 준다.

firebase 에 authentication 을 활용 하기 위해 각 키값도 받아오며 변수로 지정해 준다.

포스팅했던 [자바스크립트 문법 - try, catch() 에러 핸들링](https://hyoloui.tistory.com/34) 의 `try...catch`문을 사용하며, 에러를 핸들링 해줄 수 있도록 구현해보았다.

`try`문 안에서 사용하는 `addDoc` 이라는 firebase API 도 비동기처리를 해주며 `fan-pick` 이라는 데이터베이스 컬렉션안에 넣을 수 있도록 key 를 지정해주고 `: 변수`를 붙여준다. 안에서 작동하는 `modalImage ?? no_img` 부분은 `modalImage` 가 없을때 `??` 뒷 부분이 들어오게 된다. `no_img`는 미리 기본 이미지로 넣어두었다.

이후에 비동기로 작동하는 `addDoc` 이 실행된 이후 사용자가 input 에 작성한 제목과, 내용, 로컬스토리지, 파일(사진) 업로드 박스가 빈칸이 될 수 있도록 `.value` 를 빈칸으로 다시 지워준다 (남아있다면 다음 작성시에 불편 하기에).

이후 `getList()` == 작성한 list(게시글)을 다시 보여줄 수 있도록 함수를 실행 해 주고, 열려있는 게시글 작성 모달창도 off 상태가 되도록 함수를 실행시켜주며 마무리 했다.

`catch(error)`에는 `alert` 함수로 `addDoc` 에서 에러가 발생했다는 알림과 동시에 다른 코드를 읽는 것 까지 멈추지 않도록 해줬다.

## 고친 부분, 해결 내용

### 1. 키값 할당 재작성

처음에 작성했던 코드는 내가 생각했을 때, 협업이 편하도록 한글로 작성해주면 좋겠다는 마음에 아래처럼 키값을 할당 했다.

```js
addDoc(collection(dbService, "fan-pick"), {
  유저아이디: uid,
  프로필이미지: photoURL,
  닉네임: displayName,
  제목: title.value,
  내용: content.value,
  시간: Date.now(),
  게시글사진: modalImage ?? no_img,
});
```

하지만 이렇게 하면 코드에 에러 발생확률이 올라가고 코드 일관성이 떨어지게된다는 피드백을 받아 수정하게 되었다.

### 2. input 박스 초기화

내가 `event.preventDefault();` 로 리로딩이 없도록 코드를 넣어주었기 때문에 input 태그에서 받은 value 가 그대로 남아있게 되었다.. 오류인줄 알았으나 이런 경우 키값을 넘겨주는 작업이 끝나게 된 후 빈칸으로 만들어야 게시글을 재작성 할 때에 사용자들이 남아있는 value 를 마주하게 되는 현상이 없어진다.

{/* 이 글은 Tistory(https://hyoloui.tistory.com/37)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-28 */}
