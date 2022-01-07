import { isLiteralTypeNode, SyntaxKind } from "typescript";
import { childrenOf, CustomTopic, Transform } from "./utils";

export const nullKeyword: Transform = ({ node, result }) => {
  if (node.kind !== SyntaxKind.NullKeyword) {
    return;
  }

  if (isLiteralTypeNode(node.parent)) {
    result.addFragmentWithTopic(node, CustomTopic.NullType);
  } else {
    result.addFragmentWithTopic(node, CustomTopic.NullLiteral);
  }
  result.addChildren(childrenOf(node));
};
