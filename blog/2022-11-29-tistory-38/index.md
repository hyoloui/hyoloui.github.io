---
title: "fanpick 프로젝트 셀프 코드 리뷰 - CRUD(in R)"
description: "fanpick 프로젝트의 Read API 구현 코드(게시글 목록 조회, 모달 상세 보기, 작성자 확인)를 리뷰하고 고민한 점을 정리한 글."
authors: [hyoloui]
tags: [project, javascript]
---

❤️‍🔥 TIL : Today I Learned

## Read API

게시글을 조회하고, 보여주는 함수이다.

<!--truncate-->

우선은 게시글을 클릭했을 때 우리가 가진 데이터를 보여주려면 id 가 필요했다. id 안에 게시글이 객체형태로 데이터가 들어있기 때문이다.

우선 게시글에 삽입 될 HTML 태그이다.

```html
<div class="content_card_container" id="${fanPickList.id}" onclick="sendId(this.id)">
  <!-- ...innerHTML -->
</div>
```

`fanPickList` 객체가 가지고있는 id 데이터를 태그 id에 넣어주고 onclick 으로 전달되도록 구현했다.

```js
onclick="sendId(${fanPickList.id})"
```

처음에는 위 처럼 해당아이디를 바로 클릭하면 전달 할 수 있게 작성했으나, 레퍼런스 에러가 나서 수정했다.

```js
// 클릭한 카드의 id 받아적는 변수
let selectId = "";
// 함수가 실행 될 때마다, 해당게시글 id 를 update
export function sendId(showId) {
  selectId = "";
  selectId = showId;
}
```

내가 클릭한 카드(게시글)의 고유한 아이디를 받아놓을 변수(`selectId`)에 매번 업데이트 할 수 있는 코드를 미리 구현했다. 왜냐하면, 우리는 게시글을 클릭하면 상세 내용을 띄워줄 모달을 구현해야 했기 때문이다!

메인 화면에 카드형식으로 보여줄 코드이다.

```js
// 뉴스피드 업데이트 = 겟 리스트
export async function getList() {
  const cardList = [];
  // query 를 db에서 받아와 q로 선언
  const q = query(collection(dbService, "fan-pick"), orderBy("시간", "desc"));
  // query 조건에 맞는 documents 데이터를 배열로 받아오기
  const querySnapshot = await getDocs(q);
  // doc.id는 DB가 자체적으로 생성하는 값으로, id도 함께 포함시키기 위해 객체 재구성
  querySnapshot.forEach((doc) => {
    const fanPickList = {
      id: doc.id,
      ...doc.data(),
    };
    cardList.push(fanPickList);
  });
  const newsFeed = document.getElementById("newsFeed");
  newsFeed.innerHTML = ""; // append가 쌓이지 않도록 지워주는 코드

  cardList.forEach((fanPickList) => {
    const temp_html = `<div class="content_card_container" id="${
      fanPickList.id
    }" onclick="sendId(this.id)">
    <div onclick="modalOn(${fanPickList.id})">
        <!--카드이미지-->
        <div class="card_img">
            <img  src="${fanPickList.이미지 ?? no_img}"
                alt="게시글 이미지" />
            <!--글제목,내용 간단히-->
            <div class="card_content">
                <h4 id="title">${fanPickList.제목}</h4>
                <p id="content">${fanPickList.내용}</p>
            </div>
            <!--좋아요
            <div class="card_like">
                <span>162</span> <i class="fa-solid fa-heart"></i>
            </div>-->
            <div class="card_bottom">
                <div class="card_profile">
                <img src="${
                  fanPickList.프로필이미지 ?? no_img
                } " alt="기본이미지">
                </div>
                <div class="card_name"><span>${fanPickList.작성자}</span></div>
                <div class="card_date"><span>
                ${new Date(fanPickList.시간)
                  .toString()
                  .slice(0, 25)}</span></div>
            </div>
        </div>
        </div>
    </div>`;
    const div = document.createElement("div");
    div.classList.add("mycards");
    div.innerHTML = temp_html;

    newsFeed.appendChild(div);
  });
}
```

생소한 함수들 (`addDoc`, `collection`, `orderBy`, `getDocs`) 은 firebase API 이다. 공식 문서에서 참고할 수 있다.

[Cloud Firestore 시작하기 | Firebase](https://firebase.google.com/docs/firestore/quickstart?authuser=0)

흔히 알고있는 게시글의 상세페이지를 모달창으로 구현했다.

```js
// 모달 / 해당 게시글 누르면 모달창이 켜지게 하기
export async function modalOn(id) {
  let user = authService.currentUser;
  if (user) {
    // 로그인상태 감지
    const card = [];
    const q = query(collection(dbService, "fan-pick"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // 해당 파이어베이스 문서에 존재하는 id값과 selectId와 동일한 게시글 데이터 가져오기
      if (doc.id === selectId) {
        const commentObj = {
          id: selectId, //게시글 클릭하여 모달창이 선택된 아이디값을 부른다
          ...doc.data(),
        };
        card.push(commentObj);
      }
    });
    //해당 페이지에 id값 부여
    const feedModal = document.getElementById("modal_area");
    const currentUid = authService.currentUser.uid;
    card.forEach((modalCard) => {
      const isOwner = currentUid === modalCard.creatorId;
      const temp_html = `<div class="ceo"  id = "${id.id}"> // 댓글 불러오기 위한 id 할당
      <div id="modal" class="modal-overlay">
          <div class="modal-window">
              <div class="headline1">
                  <div class="profile_wrap">
                  <div class="profile_img_box"><img src="${
                    modalCard.creatorImg ?? no_img
                  }"
                  alt="profileImg" /></div>
                  <div class="profile_name">${modalCard.nickname ?? "익명"}</div>
                  </div>
                  <button id="close-area" class="close-area" onclick="modalOff()">
                  <i class="fa-regular fa-x xBtn"></i>
                  </button>
              </div>

          <div class="headline2">
              <p class="title">${modalCard.title}</p>
          </div>

          <div class="headline3">
              <button onclick="edit_btn(event)"display:inline-block;" : "display:none"
              }" class="btn">수정</button>
              <button onclick="update_content(event)" id="save_edit"
              }" class="btn">완료</button>
              <buttondisplay:inline-block;" : "display:none"
              }" class="btn ml10" id="${
        modalCard.id
      }" onclick="delete_comment(event)">삭제</button>
          </div>

          <div class="contents_area">
              <div class="content_pic">
              <img
                  src="${modalCard.imgUpload}"
                  alt="게시글 이미지"
              />
              </div>
              <p class="content">${modalCard.content}</p>
          </div>

          <div class="comments_area">
              <div class="form-commentInfo">
                  <textarea class="comment-input" placeholder="comment" id="comment"></textarea>
                  <button class="submit" onclick="Post_comment(event)">댓글 저장</button>
              <!-- <div class="profile_img_box"></div> -->
              </div>
              <div class="comments_wrap" >
           </div>
      </div>`;

      const div = document.createElement("div");
      div.classList.add("modal_inner");
      div.innerHTML = temp_html;
      feedModal.appendChild(div);
    });
  } else {
    window.location.replace("#changsun"); // 로그인페이지 유도
    alert("로그인을 해주세요.");
  }
  getCommentList(); // 댓글 불러오기
  selectId = ""; // 게시글 아이디 저장변수 초기화
}
```

함수 도입부 부터 `user`를 조건문으로 하여, `user` 가 아니라면 로그인 페이지로 유도할 의도로 구현했다.

firebase api를 이해하고 나서는 api 를 다루는 create 부분과 비슷했지만 코드를 작성할 당시에는 보이지 않았다... 하지만 `getDocs`로 해당 데이터를 가져오는 api 만 다르고 크게 다른 부분은 별로 없었다.

프로젝트가 얼마 남지 않았을 때 선택기능으로 댓글 기능을 추가로 작업하여 `getCommentList()` 함수도 호출했다.

## 구현하며 어려웠던 점

read api 구현 중 가장 어려웠던 부분은 (수정 > 완료), (삭제) 버튼이였다.

게시글이 가지고있는 `creatorId`와 현재 접속한 user의 id와 동일 했을 때만 update가 가능하도록 삼항연산자를 활용하여 구현했다.

머릿속에서 생각을 끄집어내고 구현하면서 느껴지는 도파민과 성취감은 이루 말할 수 없다ㅜㅜ

CRUD 부분에서 가장 시간을 오래 썼던 것 같다. 모달창 안에서 이루어지는 동적인 요소들을 어떻게 구현할지 오랜 시간동안 고민했고, 생각한 대로 잘 구현되어서 가장 만족스러운 코드였다.

`selectId` 부분에서도 많이 고민하며 오래 참다가 처음으로 튜터님께 질문해서 얻었던 힌트(id를 가지고 와야하는데 id가 어디에 있을까요?)를 듣고 머릿속에 떠오른 생각을 바로 코드로 구현하는데 성공했다.

또한 read API 를 구현하면서 update API 도 쉽지 않겠다는 생각이 들었다...😣

{/* 이 글은 Tistory(https://hyoloui.tistory.com/38)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-29 */}
