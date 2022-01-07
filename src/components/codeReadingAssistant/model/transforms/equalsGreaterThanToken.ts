import { isArrowFunction, SyntaxKind } from "typescript";
import { childrenOf, Transform } from "./utils";

export const equalsGreaterThanToken: Transform = ({ node, result }) => {
  if (node.kind !== SyntaxKind.EqualsGreaterThanToken) {
    return;
  }

  // if parent is arrow function, this token is ignored.
  if (!isArrowFunction(node.parent)) {
    result.addFragment(node);
  }

  result.addChildren(childrenOf(node));
};
