import { SyntaxKind } from "typescript";
import { Fragment, Position, Topic } from "./index";

export const print = (fragments: ReadonlyArray<Fragment>): string =>
  fragments.map(stringOfFragment).join("\n");

const stringOfFragment = ({ topics, position, code }: Fragment): string =>
  `- ${stringOfTopics(topics)} (${stringOfPosition(position)}) ${stringOfCode(
    code
  )}`;

const stringOfTopics = (topics: ReadonlySet<Topic>): string =>
  Array.from(topics).map(stringOfTopic).join(",");

const stringOfTopic = (topic: Topic): string =>
  typeof topic === "string" ? topic : SyntaxKind[topic]!;

const stringOfCode = (code: string): string => {
  const lines = code.split("\n");
  const extra = lines.length > 1 ? ` [${lines.length}]` : "";
  return `${lines[0]}${extra}`;
};

const stringOfPosition = ({ start, end }: Position): string =>
  `${start.line}:${start.column}-${end.line}:${end.column}`;
