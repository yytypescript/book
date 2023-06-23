import React, { FC } from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export type Props = {
  readonly editUrl: string;
};

export const QuestionAndReportIssue: FC<Props> = ({ editUrl }) => {
  const { siteConfig } = useDocusaurusContext();
  const { organizationName, projectName } = siteConfig;
  const baseUrl = `https://github.com/${organizationName}/${projectName}`;
  return (
    <ul style={{ fontSize: "0.8em", listStyle: "none", padding: 0 }}>
      <li>
        <a
          href={`${baseUrl}/issues/new?labels=%E8%AA%AD%E8%80%85%E3%81%AE%E8%B3%AA%E5%95%8F&title=質問です&body=${encodeURIComponent(
            `<!--ここに質問内容を書いてください。-->\n\n\n関連ページ: ${editUrl}`
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
          href={`${baseUrl}/issues/new?labels=誤字&body=${encodeURIComponent(
            editUrl
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
};
