import BrowserOnly from "@docusaurus/BrowserOnly";
import { getOgpImageUrl } from "@site/src/theme/Seo/getOgpImageUrl";
import Layout from "@theme/Layout";
import React from "react";
import styles from "./code-reading-assistant.module.css";
// @ts-expect-error
import ReadMe from "../components/codeReadingAssistant/README.md";

const App = React.lazy(
  () =>
    import(
      /* webpackChunkName: "codeReadingAssistant" */ "../components/codeReadingAssistant"
    )
);

const CodeReadingAssistant: React.FC = () => {
  const readme = (
    <div className={styles.readme}>
      <ReadMe components={{}} />
    </div>
  );
  return (
    <Layout
      title={"TypeScript解読アシスタント"}
      description="TypeScriptのコードの意味を調べられるツールです。"
      image={getOgpImageUrl("TypeScript解読アシスタント")}
      noFooter
    >
      <BrowserOnly fallback={readme}>
        {() => (
          <React.Suspense fallback={Loading}>
            <App readme={readme} loading={Loading} />
          </React.Suspense>
        )}
      </BrowserOnly>
    </Layout>
  );
};

export default CodeReadingAssistant;

const Loading = <div>読込中...</div>;
