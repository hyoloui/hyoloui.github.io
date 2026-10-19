---
title: "JQuery 로 '자바스크립트 쉽고 빠르게 쓰기'"
description: "jQuery가 무엇인지, Javascript 코드와 어떻게 다른지, CDN으로 임포트해 사용하는 방법을 정리한 글."
authors: [hyoloui]
tags: [javascript]
---

:::note 목적

본문에서 다룰 내용은 jQuery 입니다.

하지만 저는 제이쿼리를 잘 사용하지 않습니다.

왜냐하면, 영어단어도 모르는 왕초보가 영작을 시키면 바로 한마디가 나올 수 있을까요?

개인적으로는 부정적입니다.

개발도 이러한 관점에서 pure 한 개발 언어인, 'vanilla javascript' 의 선 학습이 된 상태에서 라이브러리와, 프레임워크를 써야 한다고 생각합니다.

프론트엔드 개발자에 목적을 두지 않는 수준이라면 빠르고 편리한 라이브러리인것은 확실합니다. 그 만큼 점유율도 상당하기도 하구요.

학습 내용을 정리하고자 포스팅 합니다 :)

:::

<!--truncate-->

jQuery를 이용해 Javascript로 HTML을 쉽게 제어하고, 긴 구문을 간단하게 작성합니다.

## Javascript 잠깐 복습 - 홀짝 판별 onclick 함수 만들어보기

짝/홀수 판단하는 방법은 다음과 같다.

```js
let even = 4;
console.log(even % 2); // 2로 나눈 나머지가 0입니다.
let odd = 5;
console.log(odd % 2); // 2로 나눈 나머지가 1입니다.
```

**짝/홀수 onclick 함수(완성)**

```html
<script>
  let count = 1;
  function hey() {
    if (count % 2 == 0) {
      alert("짝짝짝👏");
    } else {
      alert("홀홀홀🎅");
    }
    count += 1;
  }
</script>
```

Javascript 만으로 충분할까요?

- 예를 들어 버튼의 색깔을 바꾸고 싶다면?
- 예를 들어 div 박스를 하나 감추고 싶다면?
- → 이런 것들 쉽게 해주는 것이, jQuery!

## JQuery 시작하기

### 1. jQuery 란?

HTML의 요소들을 조작하는, 편리한 Javascript를 미리 작성해둔 것. 라이브러리!

Javascript로도 모든 기능(예 - 버튼 글씨 바꾸기 등)을 구현할 수는 있지만, 1) 코드가 복잡하고, 2) 브라우저 간 호환성 문제도 고려해야해서, **j**Query라는 라이브러리가 등장하게 되었답니다.

**jQuery와 Javascript - 코드 비교해보기**

Javascript로 길고 복잡하게 써야 하는 것을

```js
document.getElementById("element").style.display = "none";
```

jQuery로 보다 직관적으로 쓸 수 있어요. 편리하죠? :-)

```js
$("#element").hide();
```

:::tip

jQuery는 Javascript와 다른 특별한 소프트웨어가 아니라 미리 작성된 Javascript 코드입니다. 전문 개발자들이 짜둔 코드를 잘 가져와서 사용하는 것임을 기억해주세요! (그렇기 때문에, 쓰기 전에 "임포트"를 해야합니다!)

:::

### 2. jQuery 사용하기

미리 작성된 Javascript 코드를 가져오는 것을 '임포트'라고 부릅니다.

**jQuery CDN**

[W3Schools - jQuery Get Started](https://www.w3schools.com/jquery/jquery_get_started.asp)

jQuery CDN 부분을 참고해서 임포트합니다. `<head>` 와 `</head>` 사이에 아래를 넣으면 끝!

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
```

**jQuery를 사용하는 방법**

css에서는 선택자로 class를 썼지요? jQuery에서는 id 값을 통해 특정 버튼/인풋박스/div/.. 등을 가리키게 됩니다.

css와 마찬가지로, jQuery를 쓸 때에도 "가리켜야" → 조작할 수 있습니다.

- 예) 특정 인풋박스의 값을 → 가져와줘!
- 예) 특정 div를 → 안보이게 해줘!

{/* 이 글은 Tistory(https://hyoloui.tistory.com/5)에서 옮겨 온 글입니다. 원문 작성일: 2022-11-05 */}
