import {
  isAsteriskToken,
  isFunctionDeclaration,
  isFunctionExpression,
  isMethodDeclaration,
  isYieldExpression,
  isBinaryExpression,
} from "typescript";
import { childrenOf, CustomTopic, Transform } from "./utils";

export const asteriskToken: Transform = ({ node, result }) => {
  if (!isAsteriskToken(node)) {
    return;
  }

  const parent = node.parent;
  if (isBinaryExpression(parent)) {
    result.addFragmentWithTopic(node, CustomTopic.MultiplicationOperator);
  } else if (
    isFunctionDeclaration(parent) ||
    isFunctionExpression(parent) ||
    isMethodDeclaration(parent)
  ) {
    result.addFragmentWithTopic(node, CustomTopic.Generator);
  } else if (isYieldExpression(parent)) {
    result.addFragmentWithTopic(node, CustomTopic.YieldAsterisk);
  } else {
    result.addFragment(node);
  }

  result.addChildren(childrenOf(node));
};
