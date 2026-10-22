import Link from '@docusaurus/Link';
import {
  AI_CARDS,
  AI_INTRO,
  LINKS,
  SIDE_PROJECT,
  TIMELINE,
  WORK_INTRO,
  WORK_ROWS,
} from './content';
import styles from './home.module.css';

function SectionHead({ id, children, label }: { id: string; children: React.ReactNode; label?: string }) {
  return (
    <div className={styles.secHead}>
      <h2 id={id}>{children}</h2>
      <div className={styles.rule} />
      {label && <span className={styles.mono}>{label}</span>}
    </div>
  );
}

export function WorkSection() {
  return (
    <section className={styles.sec} aria-labelledby="work">
      <SectionHead id="work" label="2023.05 —">
        Work <i>at Assistfit</i>
      </SectionHead>
      <p className={styles.sub}>{WORK_INTRO}</p>
      <ol className={styles.rows}>
        {WORK_ROWS.map((r, i) => (
          <li key={r.title} className={`${styles.row} ${styles.enter}`} style={{ animationDelay: `${i * 0.06}s` }}>
            <span className={styles.n}>{String(i + 1).padStart(2, '0')}</span>
            <span>
              <b>{r.title}</b> · {r.desc}
            </span>
            <span className={styles.d}>{r.date}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function AiSection() {
  return (
    <section className={styles.sec} aria-labelledby="ai">
      <SectionHead id="ai" label="2026 —">
        AI <i>with verification</i>
      </SectionHead>
      <p className={styles.lead}>{AI_INTRO}</p>
      <div className={styles.cards}>
        {AI_CARDS.map((c, i) => (
          <article
            key={c.tag}
            className={`${styles.card} ${styles.enter}`}
            style={{ animationDelay: `${i * 0.06}s` }}
            data-tilt
          >
            <span className={styles.tag}>{c.tag}</span>
            <h3>{c.title}</h3>
            <p>{c.desc}</p>
            <div className={styles.num}>{c.num}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GrowthSection() {
  return (
    <section className={styles.sec} aria-labelledby="growth">
      <div className={styles.mono}>since 2022</div>
      <SectionHead id="growth">
        Growth <i>so far</i>
      </SectionHead>
      <ol className={styles.timeline}>
        {TIMELINE.map((t) => (
          <li key={t.year}>
            <div className={`${styles.mono} ${t.current ? styles.accent : ''}`}>{t.year}</div>
            <div className={`${styles.tlTitle} ${t.current ? styles.grad : ''}`}>{t.title}</div>
            <div className={styles.tlDesc}>{t.desc}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function SideProjectSection() {
  return (
    <section className={styles.sec} aria-labelledby="side">
      <SectionHead id="side">
        Side <i>project</i>
      </SectionHead>
      <article className={`${styles.card} ${styles.sideCard}`} data-tilt>
        <div>
          <h3 className={styles.sideTitle}>
            {SIDE_PROJECT.name} <span className={styles.mono}>{SIDE_PROJECT.period}</span>
          </h3>
          <p>{SIDE_PROJECT.desc}</p>
        </div>
        <a className={styles.btn} href={LINKS.fitHr} target="_blank" rel="noopener noreferrer">
          GitHub →
        </a>
      </article>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className={`${styles.sec} ${styles.contact}`} aria-labelledby="contact">
      <h2 id="contact" className={styles.contactText}>
        함께 일하고 싶다면{' '}
        <a className={`${styles.grad} ${styles.email}`} href={`mailto:${LINKS.email}`}>
          {LINKS.email}
        </a>
      </h2>
      <div className={styles.btns}>
        <a className={`${styles.btn} ${styles.primary}`} href={LINKS.resume} target="_blank" rel="noopener noreferrer">
          이력서
        </a>
        <a className={styles.btn} href={LINKS.portfolio} target="_blank" rel="noopener noreferrer">
          포트폴리오
        </a>
        <a className={styles.btn} href={LINKS.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <Link className={styles.btn} to={LINKS.blog}>
          Blog
        </Link>
      </div>
    </section>
  );
}
