import DocCard from "@theme/DocCard";
import React from "react";

export default function PageRef({ link, title }: any) {
  try {
    const { metadata } = require("@site/docs" + link.replace(/^\/+/, "/"));
    return (
      <DocCard
        item={{
          type: "link",
          href: metadata.permalink,
          label: metadata.frontMatter.sidebar_label ?? metadata.title,
          docId: metadata.id,
        }}
      />
    );
  } catch (e) {
    console.error(e);
    return (
      <p>
        <a href={link}>{title}</a>
      </p>
    );
  }
}
