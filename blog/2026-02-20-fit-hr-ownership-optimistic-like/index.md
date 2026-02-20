---
title: "fit-hr: 역할 대신 소유로 권한 보기, 좋아요는 Optimistic Update로"
description: "사이드 프로젝트 fit-hr의 계정 구조를 역할 기반에서 센터 소유 기반으로 바꾸고, 위치를 지도 좌표로 옮기고, 좋아요에 TanStack Query Optimistic Update를 적용한 기록."
authors: [hyoloui]
tags: [career, project, react, typescript]
---

한동안 손을 놓았던 fit-hr을 다시 잡았다. 열흘 남짓 동안 계정 구조, 위치 정보, 좋아요 반응 속도를 차례로 바꿨다.

<!--truncate-->

## 역할에서 소유로

MVP에서는 가입할 때 트레이너인지 센터인지 고르게 했다. 라우트 그룹도 `(trainer)`와 `(center)`로 나뉘어 있었다. 그런데 한 사람이 트레이너이면서 센터 운영자일 수도 있다. 가입할 때 역할 하나를 고정하면 그 경우를 담을 수 없었다.

역할 선택을 없애고 라우트를 `(app)` 하나로 합쳤다. 센터 관리 기능은 `centers.owner_id`가 내 계정인지로 판단한다. 센터 관리 페이지들은 `center/(managed)` 아래로 모으고, 그 레이아웃에서 소유 여부를 한 번만 확인해서 센터가 없으면 센터 등록 페이지로 보낸다. 페이지마다 하던 role 체크가 레이아웃 하나로 줄었다.

## 지역 코드에서 좌표로

공고 위치는 시/도 단위 지역 코드였다. 이걸 지우고 주소와 위도, 경도를 저장하도록 바꿨다. 주소를 입력하면 네이버 지도 geocoder로 좌표를 얻고 지도에 바로 표시한다. 테이블 컬럼이 바뀌어서 Supabase 타입을 다시 생성하고, region을 쓰던 화면을 전부 address로 바꿨다.

## 좋아요

좋아요 버튼은 서버 액션 결과를 기다렸다가 하트를 바꿨다. 누르고 나서 잠깐 멈추는 게 느껴졌다. TanStack Query를 처음 이 프로젝트에 넣고 Optimistic Update로 바꿨다.

```ts
onMutate: async () => {
  await queryClient.cancelQueries({ queryKey });
  const previousLiked = queryClient.getQueryData<boolean>(queryKey);
  queryClient.setQueryData(queryKey, !previousLiked);
  return { previousLiked };
},
onError: (_err, _vars, context) => queryClient.setQueryData(queryKey, context?.previousLiked),
onSettled: () => queryClient.invalidateQueries({ queryKey }),
```

진행 중인 refetch를 먼저 취소해야 늦게 도착한 응답이 방금 바꾼 값을 덮어쓰지 않는다. 실패하면 스냅샷으로 되돌리고, 끝나면 서버 값으로 다시 맞춘다.

이번에도 설계 문서와 구현 계획을 먼저 커밋하고 Claude Code와 진행했다. 계획 문서에 커밋 단위까지 적어 두니 히스토리가 계획과 그대로 맞는다.
