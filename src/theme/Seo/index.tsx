/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import Head from "@docusaurus/Head";
import { useTitleFormatter } from "@docusaurus/theme-common";
import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

import type { Props } from "@theme/Seo";

export default function Seo({
  title,
  description,
  keywords,
  image,
  children,
}: Props): JSX.Element {
  const pageTitle = useTitleFormatter(title);
  const { withBaseUrl } = useBaseUrlUtils();
  const pageImage = image
    ? withBaseUrl(image, { absolute: true })
    : getOgpImageUrl(title);
  return (
    <Head>
      {title && <title>{pageTitle}</title>}
      {title && <meta property="og:title" content={pageTitle} />}

      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}

      {keywords && (
        <meta
          name="keywords"
          content={
            (Array.isArray(keywords) ? keywords.join(",") : keywords) as string
          }
        />
      )}

      {pageImage && <meta property="og:image" content={pageImage} />}
      {pageImage && <meta name="twitter:image" content={pageImage} />}
      <meta name="suin" content="suin" />

      <script>{`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "9wrel6kg8q");`}</script>
      {children}
    </Head>
  );
}

function getOgpImageUrl(title: string): string {
  return `https://tsbook-og-image.vercel.app/${encodeURIComponent(
    title
  )}.png?pattern=cross&md=0&fontSize=75px&textColor=%23ffffff&textStrongColor=%238340BB&overlay=https%3A%2F%2Fraw.githubusercontent.com%2Fyytypescript%2Fog-image%2Fmain%2Fpublic%2Fogp-overlay.svg`;
}
