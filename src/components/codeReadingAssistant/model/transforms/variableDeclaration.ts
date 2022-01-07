import {
  isVariableDeclaration,
  SyntaxKind,
  VariableDeclaration,
} from "typescript";

import { childrenOf, CustomTopic, Result, Transform } from "./utils";

export const variableDeclaration: Transform = ({ node, result }) => {
  if (!isVariableDeclaration(node)) {
    return;
  }
  result.addFragment(node).addChildren(childrenOf(node));
  typeAnnotationOfVariable(node, result);
};

const typeAnnotationOfVariable = (
  node: VariableDeclaration,
  result: Result
) => {
  const children = node.getChildren();
  children.forEach((child, index) => {
    const next = children[index + 1];
    if (child.kind === SyntaxKind.ColonToken && next) {
      result.addFragmentWithTopic(next, CustomTopic.TypeAnnotationOfVariable);
    }
  });
};
