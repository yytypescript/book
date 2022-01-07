import { SyntaxKind } from "typescript";
import { CustomTopic } from "./topics";

export { findByPoint } from "./findByPoint";

export type Fragment = Readonly<{
  code: string;
  position: Position;
  topics: ReadonlySet<Topic>;
}>;
export type Topic = SyntaxKind | CustomTopic;
export type Position = Readonly<{ start: Point; end: Point }>;
export type Point = Readonly<{ line: number; column: number }>;

export { getTopicDetail, getTopicDetails, type TopicDetail } from "./topics";
