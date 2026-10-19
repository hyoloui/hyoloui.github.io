---
title: "리액트 네이티브 - Movies app : Native Stack & Bottom tabs 적용하여 UI 만들기"
description: "ScrollView horizontal, StyleSheet.absoluteFill, react-native-swiper로 영화 앱 UI를 만들며 알게 된 점을 정리한 글."
authors: [hyoloui]
tags: [react-native]
---

:::note 목적

1. React-navigation 적용 UI 만들기
   - Native-Stack
   - Bottom-tabs
2. `StyleSheet.absoluteFill`
3. Swiper 적용

:::

:::warning 오류 해결

UI 부분이라 오류가 딱히 없었다고 한다..

:::

<!--truncate-->

## 1. User Interface 만들기 / horizontal : 사이드(가로) 스크롤

(원문에는 UI 시연 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

우선 UI는 빠르게 작업을 해 두고, **리팩토링을 하고 나서 스타일을 적용**하겠다!

[Emotion – @emotion/native](https://emotion.sh/docs/@emotion/native)

위 라이브러리를 통해 `styled.component` 스타일을 적용할 예정이라 미리 install을 했다.

web에서는 가로 스크롤을 상당히 어렵게 만들었던 기억이 있었는데..

```jsx
<ScrollView horizontal={true}>{/* 들어갈 내용 */}</ScrollView>
```

RN에서는 아주 심플하게 `<ScrollView/>` 태그에 **`horizontal` 이라는 속성을 `true`로 할당**하면 영상처럼 사이드 스크롤이 가능하다.

세로 스크롤은 RN의 기본값으로 태그마다

- `display: flex`
- `flex-direction: column`

위 스타일이 기본값이므로 **`<ScrollView/>` 태그 내에서는 자동적으로 세로로 스크롤**이 된다!

## 2. StyleSheet.absoluteFill (RN absolute, 엘리먼트 또는 태그 겹치기)

![absoluteFill 적용 전](./img-02.png)

![absoluteFill 적용 후](./img-03.png)

`StyleSheet`는 RN에 있는 기본 라이브러리 이지만 기존에는 ``const 변수명 = StyleSheet.create`~css style~`;`` 이런 식으로 자주 썼지만 **`StyleSheet`에서 제공**하는 **`absoluteFill`** 이라는 속성을 이용하면 번거롭게 포지션을 하나하나 지정해 주지 않고도 위 화면과 같이 바로 겹치게 적용 할 수 있다.

```jsx
<Image
  style={StyleSheet.absoluteFill}
  source={{
    uri: "https://www.themoviedb.org/t/p/w220_and_h330_face/ga8R3OiOMMgSvZ4cOj8x7prUNYZ.jpg",
  }}
/>
<LinearGradient
  style={StyleSheet.absoluteFill}
  colors={["transparent", "black"]}
/>
```

위에서는 **LinearGradient** 라는 라이브러리를 사용하여 **그라데이션 효과**를 넣고, `color: "white"` 적용했다.

## 3. Swiper 적용하기

[GitHub - leecade/react-native-swiper: The best Swiper component for React Native.](https://github.com/leecade/react-native-swiper)

위 Read.me 를 읽고 라이브러리를 설치했다. 적용은 아주 간단하다. 똑같이 Read.me 에 작성되어있는 **import** 구문을 가져오고, 원하는 태그의 상위에 **`<Swiper>` 태그**만 씌워주면 된다.

```jsx
<Swiper height="100%" autoplay loop showsPagination={false}>
  <View>...</View>
  <View>...</View>
  <View>...</View>
</Swiper>
```

> `autoplay` : 자동 슬라이드 효과
> `loop` : 마지막 페이지 >> 첫페이지 (무한반복)
> `showsPagination` : 페이지네이션(파란색 페이지버튼)

여기서 Swiper에 들어가는 `width`와 `height`값이 `flex: 1` 로 들어가게 되어서 의도치 않게, 아래로 쭉 **전체화면**이 되었다...

공식 문서 내용

| Prop   | Default | Type     | Description                                                      |
| ------ | ------- | -------- | ---------------------------------------------------------------- |
| width  | -       | `number` | If no specify default enable fullscreen mode by `flex: 1`.       |
| height | -       | `number` | If no specify default fullscreen mode by `flex: 1`.              |

그래서 **Swiper에는 `height`를 `100%`**로 주고, **자식 태그에 `height`를 따로 작성**해줘야 한다!

조금 번거롭지만 이게 기본값이니 `react-native-swiper`를 사용한다면 어쩔 수 없는 부분이다.

## 4. 적용 UI

(원문에는 적용 UI 영상이 있었으나 동영상 서비스가 종료되어 옮기지 못했습니다.)

:::tip 최종 정리

1. `<ScrollView>` 태그에 `horizontal={true}` 적용 시, **가로(사이드) 스크롤** 적용
2. **`StyleSheet`에서 제공**하는 **`absoluteFill`** 이라는 속성으로 간편하게 엘리먼트 겹치기 가능
3. Swiper에 들어가는 `width`와 `height`값이 `flex: 1`이 기본값 이므로, 따로 사이즈 지정 필요

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/88)에서 옮겨 온 글입니다. 원문 작성일: 2023-01-04 */}
