---
title: "Amplify 빌드 설정을 저장소로 옮기고 배포 알림 붙이기"
description: "CRM의 Amplify 빌드 과정을 amplify.yml로 코드화하고, 환경별 페이지 제목과 Slack 배포 알림, .env 생성 스크립트를 정리했다."
authors: [hyoloui]
tags: [deployment]
---

CRM은 AWS Amplify로 배포한다. 빌드 설정을 콘솔에서만 관리하고 있어서, 무엇이 어떻게 돌고 있는지 저장소만 봐서는 알 수 없었다. `amplify.yml`을 저장소에 추가해서 빌드 과정을 코드로 옮겼다.

<!--truncate-->

## 환경마다 다른 탭 제목

QA와 운영, PR 미리보기 환경이 브라우저 탭에서 구분되면 좋겠다는 생각이 있었다. 전에는 `layout.tsx`에서 접속 URL을 switch로 비교해 제목을 정했다. 도메인이 코드에 박혀 있는 게 마음에 걸렸다.

이제는 빌드 전에 `.env`에 `META_TITLE`을 써 넣는다.

```bash
if [ -n "$AWS_PULL_REQUEST_ID" ]; then
  # GitHub API로 PR 제목을 가져와 META_TITLE에 넣는다
elif [ "$AWS_BRANCH" = "main" ]; then
  META_TITLE="서비스 이름"
else
  META_TITLE="QA"
fi
```

layout은 `process.env.META_TITLE`만 읽는다. PR 미리보기 탭에는 PR 제목이 뜬다. 여러 PR을 동시에 띄워놓고 볼 때 편하다.

## 배포 알림과 환경 변수

빌드가 실패하면 Slack 웹훅으로 실패 메시지를 보내고 종료 코드를 그대로 돌려준다. 성공하면 postBuild 단계에서 PR 링크, 브랜치, 커밋, 미리보기 주소를 담아 알림을 보낸다. 배포가 끝났는지 콘솔에 들어가서 확인할 일이 줄었다.

환경 변수는 `.env`에 `${NEXT_PUBLIC_BASE_URL}` 같은 자리 표시자만 남겼다. 빌드 때 `generate-env.js`가 Amplify에 등록된 값으로 치환한다. 키 값이 저장소에 올라가지 않고, 어떤 변수가 필요한지는 `.env`만 보면 알 수 있다.

정리하는 김에 root layout에서 `moment-timezone`으로 기본 시간대를 잡던 코드를 빼고, `moment` 한국어 로케일만 불러오게 했다.
