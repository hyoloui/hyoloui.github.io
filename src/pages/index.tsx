import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className={clsx("container", styles.headerContainer)}>
        {/* 프로필 이미지 */}
        <img
          src="https://avatars.githubusercontent.com/u/115724947?v=4"
          alt="Profile"
          className={styles.profileImg}
        />
        {/* 이름 및 간단 소개 */}
        <Heading as="h1" className={clsx("hero__title", styles.heroTitle)}>
          {siteConfig.title}
        </Heading>
        <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
          {siteConfig.tagline}
        </p>
        <p className={styles.intro}>
          React, TypeScript, 개발 문화, 피트니스에 관심이 많아요.
        </p>

        {/* 주요 링크 버튼 */}
        <div className={styles.linkButtons}>
          <a
            href="https://github.com/hyoloui"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary button--sm"
          >
            GitHub
          </a>
          <a
            href="https://hyoloui.tistory.com"
            target="_blank"
            rel="noopener noreferrer"
            className="button button--secondary button--sm"
          >
            T-story
          </a>
          <a
            href="mailto:tmdgy9272@gmail.com"
            className="button button--secondary button--sm"
          >
            Email
          </a>
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            기록 ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

// 메인에 오늘의 프론트엔드 팁, 최근 글 목록 추가
export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  // 개발자 명언 랜덤
  const devQuotes = [
    "첫 번째 원칙은, 자신을 속이지 말 것. 그리고 당신이 가장 쉽게 속일 수 있는 사람이 바로 자신이다. – 리처드 파인만",
    "코드는 자신이 생각한 대로가 아니라, 작성한 대로 동작한다. – unknown",
    "좋은 코드는 자신을 설명한다. – 마틴 파울러",
    "성공한 개발자는 끊임없이 배우는 사람이다. – unknown",
    "단순함은 궁극의 정교함이다. – 레오나르도 다 빈치",
  ];
  const randomQuote = devQuotes[Math.floor(Math.random() * devQuotes.length)];

  // 자주 쓰는 개발 도구/서비스
  const devTools = [
    {
      name: "GitHub",
      url: "https://github.com/hyoloui",
      color: "#181717",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    },
    {
      name: "VS Code",
      url: "https://vscode.dev/",
      color: "#007ACC",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "AWS",
      url: "https://aws.amazon.com/ko/console/",
      color: "#FF9900",
      icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazonaws.svg",
    },
    {
      name: "Figma",
      url: "https://figma.com/",
      color: "#a259ff",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "MDN",
      url: "https://developer.mozilla.org/ko/",
      color: "#000",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firefox/firefox-original.svg",
    },
    {
      name: "Stack Overflow",
      url: "https://stackoverflow.com/",
      color: "#f48024",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/stackoverflow/stackoverflow-original.svg",
    },
    { name: "Can I use", url: "https://caniuse.com/", color: "#2b2b2b" },
  ];

  // 관심 기술/키워드
  const keywords = [
    "React19",
    "Next15",
    "Accessibility",
    "Jest",
    "CI/CD",
    "Amplify",
    "Open Source",
    "개발 문화",
  ];

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="프론트엔드, 인프라, 개발자 도구, 프로젝트 관리, 커리어, 그리고 개발자로서의 삶에 대한 다양한 주제를 다루는 개발자 커뮤니티입니다."
    >
      <HomepageHeader />
      <main>
        {/* 개발자 명언 */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>개발자 명언 💬</h2>
          <blockquote className={styles.quote}>{randomQuote}</blockquote>
        </section>
        {/* 자주 쓰는 개발 도구/서비스 */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>자주 쓰는 개발 도구/서비스 🛠️</h2>
          <div className={styles.devToolsWrap}>
            {devTools.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.devToolBtn}
                style={{ background: tool.color }}
              >
                {tool.icon && (
                  <img
                    src={tool.icon}
                    alt={tool.name}
                    className={styles.devToolIcon}
                  />
                )}
                {tool.name}
              </a>
            ))}
          </div>
        </section>
        {/* 관심 기술/키워드 */}
        <section className={styles.sectionCard}>
          <h2 className={styles.sectionTitle}>관심 기술/키워드 🔖</h2>
          <div className={styles.keywordsWrap}>
            {keywords.map((kw) => (
              <span key={kw} className={styles.keywordBadge}>
                {kw}
              </span>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
