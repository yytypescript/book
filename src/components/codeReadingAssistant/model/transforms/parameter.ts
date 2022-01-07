import {
  isFunctionDeclaration,
  isArrowFunction,
  isParameter,
  isFunctionExpression,
  isMethodDeclaration,
  isConstructorDeclaration,
  Node,
  isSetAccessor,
} from "typescript";

import { childrenOf, CustomTopic, Transform } from "./utils";

export const parameter: Transform = ({ node, result }) => {
  if (!isParameter(node)) {
    return;
  }
  const topic = topicOf(node.parent);
  if (topic) {
    result.addFragmentWithTopic(node, topic);
  } else {
    result.addFragment(node);
  }
  result.addChildren(childrenOf(node));
};

const topicOf = (node: Node): CustomTopic | undefined => {
  return isFunctionDeclaration(node) ||
    isArrowFunction(node) ||
    isFunctionExpression(node)
    ? CustomTopic.ParameterOfFunction
    : isMethodDeclaration(node) || isSetAccessor(node)
    ? CustomTopic.ParameterOfMethod
    : isConstructorDeclaration(node)
    ? CustomTopic.ParameterOfConstructor
    : undefined;
};
