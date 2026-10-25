const NOTION = 'https://lilac-hacksaw-9e8.notion.site';

export const LINKS = {
  resume: `${NOTION}/3fe090ed651a80dd8373e083e9ad75de`,
  portfolio: `${NOTION}/bd288977a9b340508f9653610b63449a`,
  github: 'https://github.com/hyoloui',
  fitHr: 'https://github.com/hyoloui/fit-hr',
  blog: '/blog',
  email: 'tmdgy9272@gmail.com',
};

/** 어시스트핏 정식 출시일. "출시 후 운영 N년+" 계산에 쓴다. */
export const RELEASE_DATE = '2024-08-09';

export const STATS = {
  centers: { value: '1,036', label: '누적 가입 센터', note: '2026.10 기준' },
  years: { label: '출시 후 운영' },
  errors: { value: '−88%', label: '주간 오류 이벤트' },
};

export const WORK_INTRO = '에이피티플레이 · 2023.05 입사, 2023.08 센터용 CRM 웹 저장소 생성부터 담당';

export const WORK_ROWS = [
  { title: '저장소 생성부터 11개월 만에 정식 출시', desc: '출시까지 PR 264건 중 257건 작성', date: '2024.08' },
  {
    title: '운영자 불편을 기능으로',
    desc: '단체 연장(2024.09), 문자·무료 앱 알림 발송(2026.02 출시 · 2026년 문자 9,050건, 앱 알림 19,620건)',
    date: '2024.09 · 2026.02',
  },
  {
    title: 'Next.js 16 성능 저하를 배포 전에 발견',
    desc: '첫 응답 속도(TTFB)가 392ms → 2,813ms로 느려지는 것을 확인하고 15로 전환, 회원 상세 화면 407ms로 기존 수준 유지',
    date: '2026.06',
  },
  {
    title: '운영 오류 대응',
    desc: 'Sentry로 찾은 오류 3종을 고쳐 운영 환경 주간 오류 이벤트 평균 약 930건 → 약 110건',
    date: '2026.09',
  },
];

export const AI_INTRO =
  '반복되는 일은 AI 스킬로 만들어 팀이 함께 씁니다. AI가 쓴 코드도 PR 리뷰를 거치고, 결과 판정은 읽기 전용 검증 AI에 따로 맡깁니다.';

export const AI_CARDS = [
  {
    tag: '팀 공유 스킬',
    title: '반복 작업을 스킬로',
    desc: 'API 명세로 연동 코드 만들기, 오류 분류와 Jira 등록, 화면 설명서 작성',
    num: '화면 가이드 20개',
  },
  {
    tag: '검증 분리',
    title: '구현 AI와 검증 AI를 나눔',
    desc: '구현 AI의 "완료" 보고는 그대로 믿지 않고, 판정은 읽기 전용 검증 AI가 합니다',
    num: '배포 전 결함 2건 발견 (403·502)',
  },
  {
    tag: '교차 리뷰',
    title: '모델 3개가 같은 변경을 리뷰',
    desc: '따로 리뷰한 뒤 엇갈린 지적은 서로 검토하게 하는 스킬을 팀에 공유',
    num: '로그아웃 설계 결함 3건 사전 발견',
  },
  {
    tag: '병렬 분업',
    title: 'AI 워커 7개로 인증 공통화',
    desc: '파일 316개 리팩터링을 티켓 15개로 나누고, 작업 범위와 검증 기준을 먼저 정함',
    num: '하루 만에 통합 · 오류 0건 · 테스트 536개 통과 · QA 진행 중',
  },
];

export const TIMELINE = [
  { year: '2022', title: '퍼블리셔', desc: '결함 약 210건 처리' },
  { year: '2023', title: '어시스트핏 합류', desc: '웹 프론트엔드 단독' },
  { year: '2024', title: 'CRM 웹 출시', desc: '컴공 3학년 편입, 일과 학업 병행' },
  { year: '2025', title: '범위 넓히기', desc: '사내 디자인 시스템, 메시지 기능, Fit HR' },
  { year: '2026 →', title: 'AI와 함께 일하기', desc: '2월 컴퓨터공학 졸업, 팀 공유 AI 스킬', current: true },
];

export const SIDE_PROJECT = {
  name: 'Fit HR',
  period: '2025.11 — 2026.03',
  desc: '피트니스 센터와 트레이너를 잇는 구인구직 웹 · Next.js 16, Supabase',
};
