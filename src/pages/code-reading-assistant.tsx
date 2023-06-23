import BrowserOnly from "@docusaurus/BrowserOnly";
import { getOgpImageUrl } from "../components/ogpImage";
import Layout from "@theme/Layout";
import React from "react";
import styles from "./code-reading-assistant.module.css";
// @ts-expect-error
import ReadMe from "../components/codeReadingAssistant/README.md";
import Head from "@docusaurus/Head";

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
  const pageImage = getOgpImageUrl("TypeScript解読アシスタント");
  return (
    <Layout
      title={"TypeScript解読アシスタント"}
      description="TypeScriptのコードの意味を調べられるツールです。"
      noFooter
    >
      <Head>
        <meta property="og:image" content={pageImage} />
        <meta name="twitter:image" content={pageImage} />
      </Head>
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
