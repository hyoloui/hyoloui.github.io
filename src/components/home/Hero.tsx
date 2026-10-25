import Link from '@docusaurus/Link';
import { LINKS, RELEASE_DATE, STATS } from './content';
import { yearsSince } from './motion';
import styles from './home.module.css';


export default function Hero({ buildDate }: { buildDate: string }) {
  const years = `${yearsSince(new Date(RELEASE_DATE), new Date(buildDate))}년+`;

  return (
    <header className={styles.hero}>
      <div className={styles.glow} data-cursor-glow aria-hidden="true" />
      <div className={`${styles.eyebrow} ${styles.enter}`}>
        <span className={styles.dot} aria-hidden="true" />
        Frontend · Seoul
      </div>
      <h1 className={`${styles.title} ${styles.enter}`} style={{ animationDelay: '.06s' }}>
        <span className={styles.line} data-parallax-line>
          불편을 들으면 직접 만들어 보고,
        </span>
        <br />
        <span className={styles.line} data-parallax-line>
          <span className={styles.grad}>수치로 고르는</span> 프론트엔드 개발자
        </span>
      </h1>
      <div className={`${styles.heroBody} ${styles.enter}`} style={{ animationDelay: '.12s' }}>
        <div className={styles.introWrap}>
          <p className={styles.intro}>
            <b>이승효</b> · 2023년 5월부터 에이피티플레이에서
            <br />
            피트니스 SaaS 어시스트핏의 웹 프론트엔드를 맡고 있습니다.
            <br />
            요즘은 반복 작업을 AI 스킬로 만들어 팀과 나눠 쓰고, 결과는 따로 검증합니다.
          </p>
          <div className={styles.btns}>
            <a className={`${styles.btn} ${styles.primary}`} href={LINKS.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <Link className={styles.btn} to={LINKS.blog}>
              Blog
            </Link>
            <a className={styles.btn} href={LINKS.resume} target="_blank" rel="noopener noreferrer">
              이력서
            </a>
            <a className={styles.btn} href={LINKS.portfolio} target="_blank" rel="noopener noreferrer">
              포트폴리오
            </a>
          </div>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <b>{STATS.centers.value}</b>
            <span>{STATS.centers.label}</span>
            <span>{STATS.centers.note}</span>
          </div>
          <div className={styles.stat}>
            <b>{years}</b>
            <span>{STATS.years.label}</span>
          </div>
          <div className={styles.stat}>
            <b>{STATS.errors.value}</b>
            <span>{STATS.errors.label}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
