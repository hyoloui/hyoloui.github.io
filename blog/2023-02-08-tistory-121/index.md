---
title: "Project: 🚩codefolio - supabase API"
description: "Next.js에서 supabase 키를 .env에 넣었는데 인식되지 않던 문제를 예약어 환경 변수 이름으로 바꿔 해결한 기록."
authors: [hyoloui]
tags: [project]
---

## 🤢 문제 내용

supabase 사용 시 필요한 키를 `.env` 에 입력했으나, 인식을 못하고 에러 발생..

<!--truncate-->

---

## 🎈 문제 해결 방법

기존 `NEXT_PUBLIC_SUPABASE_API_KEY`로 설정되던 값을 예약어인 `NEXT_PUBLIC_SUPABASE_ANON`로 변경해주었습니다.

AS-IS

```shell
# .env.local
NEXT_PUBLIC_SUPABASE_URL=URL
NEXT_PUBLIC_SUPABASE_API_KEY=API_KEY
```

TO-BE

```shell
# .env.local
NEXT_PUBLIC_SUPABASE_URL=URL
NEXT_PUBLIC_SUPABASE_ANON=API_KEY
```

---

## ✨ 알게된 것

:::tip

라이브러리를 사용 할때에는 **예약어**를 기본값으로 가지고 있는지 확인해야 합니다. 또한 사용 전 **공식문서**를 꼼꼼하게 읽어야 하겠습니다.

:::

{/* 이 글은 Tistory(https://hyoloui.tistory.com/121)에서 옮겨 온 글입니다. 원문 작성일: 2023-02-08 */}
