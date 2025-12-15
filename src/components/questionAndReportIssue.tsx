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
          href={`${baseUrl}/issues/new?labels=question&title=Câu hỏi&body=${encodeURIComponent(
            `<!--Vui lòng viết câu hỏi của bạn ở đây.-->\n\n\nTrang liên quan: ${editUrl}`
          )}`}
          target="_blank"
          style={{ fontWeight: "bold" }}
        >
          Đặt câu hỏi
        </a>{" "}
        ─
        Nếu bạn có thắc mắc sau khi đọc hoặc câu hỏi về TypeScript, hãy gửi đến GitHub nhé 🙂
      </li>
      <li>
        <a
          href={`${baseUrl}/issues/new?labels=typo&body=${encodeURIComponent(
            editUrl
          )}`}
          target="_blank"
          style={{ fontWeight: "bold" }}
        >
          Báo cáo lỗi
        </a>{" "}
        ─ Vui lòng thông báo nếu bạn phát hiện lỗi chính tả trong văn bản hoặc sample code.
      </li>
    </ul>
  );
};
