---
title: "회사 기술 블로그를 Docusaurus로 세팅하기"
description: "Assistfit 기술 블로그를 Docusaurus로 만들면서 블로그 플러그인을 감싸 홈 화면용 데이터를 만들고, footer를 swizzling한 기록."
authors: [hyoloui]
tags: [career, project, react]
---

12월에 회사 기술 블로그를 만들기로 했고, 초기 세팅과 화면 작업을 맡았다. 1월 첫 주에 홈 화면까지 얼추 모양이 나왔다.

<!--truncate-->

## Gatsby에서 Docusaurus로

처음에는 Gatsby 블로그 스타터로 저장소를 만들었다. 다음 날 Docusaurus로 다시 세팅했다. 이 개인 블로그를 Docusaurus로 운영하고 있어서 구조가 익숙했다. docs는 끄고 blog만 쓴다. 배포 워크플로와 첫 글은 같이 작업하는 동료가 맡았다.

## 블로그 플러그인 감싸기

홈 화면에 최근 글 목록을 보여 주고 싶었는데, 기본 블로그 플러그인은 그 데이터를 홈에 넘겨주지 않는다. 그래서 preset의 blog를 끄고, 플러그인을 감싼 로컬 플러그인을 등록했다.

```js
async function blogPluginEnhanced(context, options) {
  const blogPluginInstance = await blogPlugin(context, options);
  return {
    ...blogPluginInstance,
    async contentLoaded({ content, allContent, actions }) {
      await blogPluginInstance.contentLoaded({ content, allContent, actions });
      actions.setGlobalData({ posts: content.blogPosts.slice(0, 10), postNum: content.blogPosts.length });
    },
  };
}
```

원래 플러그인이 하는 일은 그대로 두고, `contentLoaded`에서 글 데이터를 global data로 한 번 더 내보낸다. frontMatter의 `sticky` 값으로 고정 글을 앞으로 정렬하는 처리도 여기에 넣었다. 홈 컴포넌트에서는 `usePluginData`로 꺼내 쓴다.

footer는 swizzling으로 꺼내 회사 SNS 아이콘을 붙였고, 폰트와 다크 모드 스타일을 정리했다. 설정에는 `future.experimental_faster`를 켰다. 3.6부터 들어온 Rspack, SWC 기반 빌드 옵션이다.

프레임워크가 정해 둔 확장 지점을 찾아서 그 안에서 고치는 게 소스를 통째로 복사해 오는 것보다 관리하기 쉽다. 연말에는 리팩터링 책 Five Lines of Code 실습 저장소를 받아 README를 한글로 옮겨 두었다. 이번 달부터 하나씩 따라가 볼 생각이다.
