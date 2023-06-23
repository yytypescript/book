import { PageMetadata } from "@docusaurus/theme-common";
import React from "react";
import { useOgpImageUrl } from "../../../components/ogpImage";
import { useDoc } from "../../../components/useDoc";

export default function MetadataWrapper() {
  const { metadata, frontMatter } = useDoc();
  const ogpImageUrl = useOgpImageUrl();
  return (
    <>
      <PageMetadata
        title={metadata.title}
        description={metadata.description}
        keywords={frontMatter.keywords}
        image={ogpImageUrl}
      />
    </>
  );
}
