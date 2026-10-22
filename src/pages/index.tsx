import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Hero from '../components/home/Hero';
import {
  AiSection,
  ContactSection,
  GrowthSection,
  SideProjectSection,
  WorkSection,
} from '../components/home/Sections';
import styles from '../components/home/home.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const buildDate = siteConfig.customFields?.buildDate as string;

  return (
    <Layout
      title="이승효 · 프론트엔드 개발자"
      description="2023년 5월부터 피트니스 SaaS 어시스트핏의 웹 프론트엔드를 맡고 있는 이승효입니다."
    >
      <main className={styles.page}>
        <div className={`${styles.blob} ${styles.blobA}`} aria-hidden="true" />
        <div className={`${styles.blob} ${styles.blobB}`} aria-hidden="true" />
        <div className={styles.inner}>
          <Hero buildDate={buildDate} />
          <WorkSection />
          <AiSection />
          <GrowthSection />
          <SideProjectSection />
          <ContactSection />
        </div>
      </main>
    </Layout>
  );
}
