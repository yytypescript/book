/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { useBaseUrlUtils } from "@docusaurus/core/lib/client/exports/useBaseUrl";
import React from "react";
import clsx from "clsx";

import LastUpdated from "@theme/LastUpdated";
import type { Props } from "@theme/DocItem";
import EditThisPage from "@theme/EditThisPage";
import TagsListInline, {
  Props as TagsListInlineProps,
} from "@theme/TagsListInline";

import styles from "./styles.module.css";
import { ThemeClassNames } from "@docusaurus/theme-common";

function TagsRow(props: TagsListInlineProps) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        "row margin-bottom--sm"
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  );
}

type EditMetaRowProps = Pick<
  Props["content"]["metadata"],
  "editUrl" | "lastUpdatedAt" | "lastUpdatedBy" | "formattedLastUpdatedAt"
>;
function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}: EditMetaRowProps) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, "row")}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx("col", styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  );
}

export default function DocItemFooter(props: Props): JSX.Element | null {
  const { content: DocContent } = props;
  const { metadata } = DocContent;
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
    permalink,
  } = metadata;
  const canDisplayTagsRow = tags.length > 0;
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow;

  if (!canDisplayFooter) {
    return null;
  }

  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, "docusaurus-mt-lg")}
    >
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {permalink && <OtherActions permalink={permalink} />}
    </footer>
  );
}

function OtherActions({ permalink }: { readonly permalink: string }) {
  const { withBaseUrl } = useBaseUrlUtils();
  const url = withBaseUrl(permalink, { absolute: true });
  return (
    <ul style={{ fontSize: "0.8em", listStyle: "none", padding: 0 }}>
      <li>
        <a
          href={`https://github.com/yytypescript/book/issues/new?labels=%E8%AA%AD%E8%80%85%E3%81%AE%E8%B3%AA%E5%95%8F&title=質問です&body=${encodeURIComponent(
            `<!--ここに質問内容を書いてください。-->\n\n\n関連ページ: ${url}`
          )}`}
          target="_blank"
          style={{ fontWeight: "bold" }}
        >
          質問する
        </a>{" "}
        ─
        読んでも分からなかったこと、TypeScriptで分からないこと、お気軽にGitHubまで🙂
      </li>
      <li>
        <a
          href={`https://github.com/yytypescript/book/issues/new?labels=誤字&body=${encodeURIComponent(
            url
          )}`}
          target="_blank"
          style={{ fontWeight: "bold" }}
        >
          問題を報告する
        </a>{" "}
        ─ 文章やサンプルコードなどの誤植はお知らせください。
      </li>
    </ul>
  );
}
