import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "간편한 사용",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Docusaurus는 처음부터 쉽게 설치하고 사용할 수 있도록 설계되어 웹사이트를
        빠르게 운영할 수 있습니다.
      </>
    ),
  },
  {
    title: "중요한 것에 집중",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        Docusaurus를 사용하면 문서에 집중할 수 있고, 나머지는 저희가 알아서
        처리합니다. 이제 문서를 <code>docs</code> 디렉터리로 옮기세요.
      </>
    ),
  },
  {
    title: "React로 구동",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        React를 재사용하여 웹사이트 레이아웃을 확장하거나 사용자 정의하세요.
        동일한 헤더와 푸터를 재사용하면서 Docusaurus를 확장할 수 있습니다.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
