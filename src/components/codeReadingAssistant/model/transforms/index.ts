import { Node } from "typescript";
import { Fragment, Topic } from "../index";
import { asExpression } from "./asExpression";
import { asKeyword } from "./asKeyword";
import { asteriskToken } from "./asteriskToken";
import { defaultTransform } from "./defaultTransform";
import { equalsGreaterThanToken } from "./equalsGreaterThanToken";
import { exclamationToken } from "./exclamationToken";
import { heritageClause } from "./heritageClause";
import { mappedType } from "./mappedType";
import { minusToken } from "./minusToken";
import { nullKeyword } from "./nullKeyword";
import { parameter } from "./parameter";
import { plusToken } from "./plusToken";
import { questionToken } from "./questionToken";
import { typeOperator } from "./typeOperator";
import { variableDeclaration } from "./variableDeclaration";
import { variableDeclarationList } from "./variableDeclarationList";

export type Transform = ({ node, result }: TransformParams) => void;
export type TransformParams = Readonly<{
  node: Node;
  pos: number;
  result: Result;
}>;
export type Result = {
  addFragment: (fragment: Fragment | Node) => Result;
  addFragmentWithTopic: (node: Node, topic: Topic) => Result;
  addChild: (child: Node) => Result;
  addChildren: (children: ReadonlySet<Node>) => Result;
};
export const transforms: ReadonlyArray<Transform> = [
  questionToken,
  nullKeyword,
  equalsGreaterThanToken,
  plusToken,
  minusToken,
  asteriskToken,
  exclamationToken,
  typeOperator,
  asKeyword,
  asExpression,
  heritageClause,
  variableDeclarationList,
  variableDeclaration,
  parameter,
  mappedType,
  defaultTransform,
];
