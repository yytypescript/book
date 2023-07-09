import { Props } from "@theme/EditThisPage";
import React from "react";
import { QuestionAndReportIssue } from "../../components/questionAndReportIssue";

export default function EditThisPageWrapper({ editUrl }: Props) {
  return <QuestionAndReportIssue editUrl={editUrl} />;
}
