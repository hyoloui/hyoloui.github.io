---
title: "보호자 등록 기능: 설계 문서부터 쓰고 구현하기"
description: "회원 상세의 보호자 등록 기능을 설계 문서와 구현 계획을 먼저 쓰고 MSW 프로토타입으로 만든 뒤, 기획 변경을 설계 문서로 다시 반영한 기록."
authors: [hyoloui]
tags: [career, react, typescript]
---

CRM 회원 상세에 보호자를 등록하는 기능을 만들고 있다. 이번에는 코드를 쓰기 전에 설계 문서부터 저장소에 남기는 방식으로 진행했다.

<!--truncate-->

API가 아직 없어서 MSW로 mock API를 두고 프로토타입부터 만들기로 했다. 1월 30일에 `docs/plans` 아래 두 문서를 먼저 커밋했다.

설계 문서에는 화면 구조, 보호자와 회원의 관계 규칙, 타입, 에러 코드를 적었다. 관계 규칙이 생각보다 까다로웠다. 보호자 한 명은 여러 회원을 맡을 수 있고, 회원은 센터마다 보호자를 한 명만 가질 수 있고, 두 회원이 서로의 보호자가 되는 건 안 된다. 이걸 글로 먼저 정리해 두니 에러 응답 코드도 자연스럽게 정해졌다.

구현 계획 문서는 태스크 단위로 나눴다. 타입 정의, zod 스키마, API 함수, MSW 핸들러, React Query 훅, 다이얼로그 컴포넌트 순서이고, 태스크마다 만들거나 고칠 파일 경로를 적었다. Claude Code에게는 이 계획을 태스크 하나씩 실행하게 했고, 커밋도 태스크 단위로 남았다. 계획이 구체적이니 생성된 코드를 검토할 때도 계획과 비교하면 됐다.

2월 6일에 기획 수정이 네 가지 들어왔다. 코드를 바로 고치지 않고 수정 사항을 반영한 설계 문서를 하나 더 썼다.

```ts
// 기존: isLinked: boolean
export type GuardianStatus = 'REQUESTED' | 'APPROVED' | 'REJECTED' | 'DELETED';

export interface Guardian {
  guardianId: number;
  guardianName: string;
  status: GuardianStatus;
  // ...
}
```

연결 여부를 boolean 하나로 보던 걸 상태 값으로 바꾸고, 필드 이름은 실제 API 스펙에 맞춰 `guardian` 접두사를 붙였다. 수정 기능은 빼서 등록과 조회만 남겼고, '연결 해제'는 삭제 API로 합쳤다. MSW 핸들러도 실제 API 응답 모양에 맞췄다.

문서를 먼저 쓰면 그날 바로 코드가 나오지는 않는다. 대신 기획이 바뀌었을 때 어디가 바뀌는지를 문서 diff로 먼저 볼 수 있었다.
