---
title: "사이드 프로젝트 fit-hr 시작: Next.js 16과 Supabase"
description: "트레이너와 피트니스 센터를 잇는 구인구직 사이드 프로젝트를 Next.js 16, Supabase, Claude Code로 일주일 만에 MVP까지 만든 기록."
authors: [hyoloui]
tags: [career, project, react, typescript]
---

회사 밖에서 혼자 하는 사이드 프로젝트를 시작했다. 이름은 fit-hr. 피트니스 트레이너와 센터를 잇는 구인구직 서비스다. 저장소는 공개로 열었다.

<!--truncate-->

스택은 회사에서 못 써본 것 위주로 골랐다. Next.js 16, React 19, Turbopack, Supabase(Auth, Postgres, RLS), shadcn/ui, React Hook Form, Zod 4. Next.js 16에서는 `middleware.ts`가 `proxy.ts`로 바뀌어서 세션 갱신과 라우트 보호를 거기에 넣었다.

```ts
export async function proxy(request: NextRequest) {
  return await updateSession(request);
}
```

Supabase 클라이언트는 두 가지로 나눴다. 지역, 직무, 고용 형태 같은 상수 테이블은 서버에서만 secret key 클라이언트로 읽고, 사용자 데이터는 publishable key 클라이언트로 읽어서 RLS 정책이 막도록 했다. DB 스키마를 바꾸면 `supabase gen types`로 타입을 다시 뽑는 스크립트도 만들어 두었다.

이번에는 진행 방식을 바꿔봤다. `CLAUDE.md`에 Phase 1부터 Phase 6까지 태스크 체크리스트를 적고, Claude Code와 한 Phase씩 진행했다. 기초 세팅, 인증, 공통 레이아웃, 센터 기능, 트레이너 기능, 마무리 순서다. 큰 작업은 별도 worktree 브랜치에서 돌리고 끝나면 main에 머지했다.

11월 27일에 시작해서 29일에 공고 등록, 지원과 이력서, 좋아요까지 MVP가 돌아갔고 오늘 역할별 대시보드를 붙였다. 혼자 했으면 몇 주는 걸렸을 양이다.

대신 내가 할 일이 달라졌다. 코드를 치는 시간보다 Phase를 어떻게 자를지, RLS를 어디까지 믿을지, 생성된 코드에서 무엇을 버릴지 정하는 시간이 길었다. Select에 빈 문자열 값이 들어가 에러가 나는 것처럼 직접 돌려봐야 보이는 문제도 꽤 있었다.
