# Tistory → Docusaurus 블로그 이전

원본: Tistory 글(`https://<blog>.tistory.com/<id>`). 결과물: 글 1개당 `blog/YYYY-MM-DD-tistory-<id>/index.md` 1개, 커밋 1개.
기준 예시는 `blog/2023-04-24-tistory-176/index.md`다. 형식이 애매하면 이 글을 따른다.

스크립트는 `scripts/tistory-migrate/fetch_tistory.py`다. 작업 폴더(`<work>`)는 세션 scratchpad를 쓴다.

## 블로그 전체를 받은 경우

1. `python3 scripts/tistory-migrate/fetch_tistory.py list <blog_url> <work>/posts.tsv`. 출력은 날짜순 `id date category title url`이다.
2. `blog/*-tistory-<id>`가 이미 있는 글은 건너뛴다. 남은 글을 **카테고리 단위**로 묶고, 카테고리 안에서는 날짜순으로 처리한다.
3. 글마다 아래 "글 1개 이전"을 수행한다.
4. 카테고리 하나를 끝내면 `npm run build`를 돌린다. 통과하면 `git push`한다. push하면 GitHub Pages 배포가 시작된다.
5. 끝나면 이전한 글 수, 건너뛴 글, 코드로 옮기지 못한 이미지를 보고한다.

## 글 1개 이전

1. `python3 scripts/tistory-migrate/fetch_tistory.py fetch <post_url> blog <work>`를 실행한다. 이미지는 `post_dir`에 `img-NN.*`로 저장되고, 정리된 본문은 `source_html`에 저장된다.
2. `source_html`과 모든 이미지를 Read로 읽는다.
3. 아래 변환 규칙에 따라 `post_dir/index.md`를 쓴다.
4. 텍스트로 모두 옮긴 이미지는 지운다. 본문에서 참조하는 이미지만 남아 있으면 완료다.
5. 커밋한다: `git add <post_dir> blog/tags.yml && git commit -m "docs: 블로그 이전 - <제목>"`.

## 변환 규칙

**frontmatter**: `title`(원제목), `description`(내용 요약 한 문장, 직접 작성), `authors: [hyoloui]`, `tags: [<카테고리 키>]`. 날짜는 폴더 이름에서 가져오므로 적지 않는다.

**카테고리 → tag 키** (`blog/tags.yml`에 없는 키는 label·permalink·description과 함께 추가):

| Tistory 카테고리 | 키 |
| --- | --- |
| Algorithm & Data Structure | algorithm |
| Javascript | javascript |
| Typescript | typescript |
| React.js | react |
| React-Navtive | react-native |
| HTML, CSS | html-css |
| Git / Python / Web / WIL / Project | 소문자 그대로 |

**본문**
- 제목 단계: Tistory `h3` → `##`, `h4` → `###`. 글의 첫 제목은 `##`부터 시작한다.
- 도입부 다음 줄에 `<!--truncate-->`를 넣는다. 목록 미리보기는 여기서 끊긴다.
- 줄마다 끊긴 `<p>`는 문단으로 합친다. 빈 문단과 장식용 `<hr>`는 뺀다.
- 코드·명령어·식별자는 인라인 코드로 쓴다. 강조(`<b>`)는 `**`로 쓴다.
- 핵심 정리, 목적, 주의 문단은 `:::tip`, `:::note`, `:::warning` 안에 넣는다.
- 링크 카드는 `[사이트 - 제목](url)` 한 줄로 바꾼다. 원문 오타는 고치고, 말투와 내용은 그대로 둔다.

**이미지**
- 코드 스크린샷은 언어를 지정한 코드 블록으로 옮겨 쓴다. 파일명이 보이면 `title="solution.js"`을 붙인다. 들여쓰기는 2칸으로 맞춘다.
- 실행·테스트 결과 스크린샷은 `<details><summary>실행 결과</summary>` 안의 `bash` 블록에 텍스트로 옮긴다.
- 표와 문제 설명 스크린샷은 Markdown 표나 문장으로 옮긴다.
- 다이어그램, UI 화면 등 텍스트로 옮길 수 없는 이미지는 `![설명](./img-NN.png)`으로 남긴다.

**맺음말**: 글 끝에 `---`와 다음 한 줄을 붙인다.
`> 이 글은 [Tistory](<post_url>)에서 옮겨 온 글입니다. (원문 작성일: YYYY-MM-DD)`

## 문제 해결

- `fetch`에서 "본문 div를 찾지 못함"이 나오면 스킨 구조가 다른 것이다. HTML에서 본문 컨테이너 class를 찾아 `article_html()`에 추가한다.
- MDX 빌드 에러는 대개 본문의 `<`, `{`, 닫히지 않은 HTML 태그 때문이다. 해당 부분을 인라인 코드로 감싸거나 이스케이프한다.
