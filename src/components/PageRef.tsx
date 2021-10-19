import Link from "@docusaurus/Link";
import React from "react";

export default function PageRef({ link }: any) {
  const { metadata } = require("@site/docs" + link.replace(/^\/+/, "/"));
  return (
    <nav
      className="pagination-nav docusaurus-mt-lg"
      style={{ margin: "0 0 var(--ifm-spacing-vertical)" }}
    >
      <Link href={metadata.permalink} className="pagination-nav__link">
        <div
          style={{
            fontWeight: "var(--ifm-heading-font-weight)",
            marginBottom: "0.25rem",
          }}
        >
          {metadata.frontMatter.sidebar_label ?? metadata.title}
        </div>
        <div
          style={{
            color: "var(--ifm-color-content-secondary)",
            fontSize: "var(--ifm-h5-font-size)",
          }}
        >
          {metadata.description}
        </div>
      </Link>
    </nav>
  );
}
