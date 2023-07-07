---
title: "첫 배포, Amplify에서 Elastic Beanstalk까지"
description: "어드민을 QA 서버에 처음 배포하면서 AWS Amplify와 next export를 시도하다가 Elastic Beanstalk와 GitHub Actions로 정착한 이틀간의 기록."
authors: [hyoloui]
tags: [deployment]
---

어드민을 QA 환경에 처음 올렸다. 배포는 해본 적이 거의 없어서 이틀 동안 커밋이 70개 가까이 쌓였다. 대부분 "fix: amplify", "fix: next export" 같은 한 줄짜리다.

<!--truncate-->

## Amplify와 next export

처음에는 AWS Amplify로 올리려고 했다. `amplify.yml`을 만들고 빌드 결과 폴더(`baseDirectory`) 경로를 몇 번씩 바꿔가며 돌렸다. 정적 파일로 내보내야 하나 싶어서 `next export`와 `output: 'export'`를 넣었다가 뺐다가 했다. 그러다 "remove: next export"를 되돌리는 커밋을 다시 되돌리는 커밋이 네 겹까지 쌓였다.

어드민은 동적 라우트와 `rewrites`를 쓰고 있어서 정적 export와 계속 부딪혔다. Amplify 설정을 전부 지우고 Node 서버로 띄우는 쪽으로 방향을 틀었다.

## Elastic Beanstalk와 GitHub Actions

Elastic Beanstalk에서는 `next start`로 서버를 띄운다. 여기서도 포트 때문에 한참 헤맸다. 8080, `$PORT`, 3000을 차례로 넣어보고 `engines`에 Node 18을 명시했다. `.ebextensions`로 서버에서 Yarn을 설치하고 빌드하는 방법도 해봤는데, 결국 빌드는 GitHub Actions에서 하고 결과물만 올리기로 했다.

```yaml
on:
  push:
    branches:
      - 'release/**'
# ...
- name: Build QA
  run: yarn build
- name: Generate deployment package
  run: zip ./deploy.zip -r * .[^.]*
```

`release/` 브랜치에 push하면 빌드해서 zip으로 묶고 `beanstalk-deploy` 액션으로 올린다. AWS 키 같은 값은 전부 저장소 secrets에 넣었다. 그렇게 0.0.1 버전이 QA 서버에 올라갔다.

커밋 기록이 지저분해진 건 아쉽다. 배포 설정은 로컬에서 확인할 방법이 없어서 push하고 기다리는 것밖에 할 수 없었다. 다음에는 별도 브랜치에서 실험하고 정리해서 합쳐야겠다.
