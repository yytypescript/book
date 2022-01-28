import { isHeritageClause, SyntaxKind } from "typescript";
import { childrenOf, CustomTopic, Transform } from "./utils";

export const heritageClause: Transform = ({ node, result }) => {
  if (!isHeritageClause(node)) {
    return;
  }

  const firstChild = node.getChildAt(0);
  if (firstChild.kind === SyntaxKind.ExtendsKeyword) {
    result.addFragmentWithTopic(node, CustomTopic.ExtendsClass);
  } else if (firstChild.kind === SyntaxKind.ImplementsKeyword) {
    result.addFragmentWithTopic(node, CustomTopic.ImplementsInterface);
  } else {
    result.addFragment(node);
  }
  result.addChildren(childrenOf(node));
};
