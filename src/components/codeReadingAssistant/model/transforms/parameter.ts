import {
  isArrowFunction,
  isConstructorDeclaration,
  isFunctionDeclaration,
  isFunctionExpression,
  isMethodDeclaration,
  isParameter,
  isSetAccessor,
  Node,
  ParameterDeclaration,
} from "typescript";

import { childrenOf, CustomTopic, Result, Transform } from "./utils";

export const parameter: Transform = ({ node, result }) => {
  if (!isParameter(node)) {
    return;
  }
  const topic = topicOf(node.parent);
  if (topic) {
    if (topic === CustomTopic.ParameterOfConstructor) {
      parameterOfConstructor(node, result);
    } else {
      result.addFragmentWithTopic(node, topic);
    }
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

const parameterOfConstructor = (node: ParameterDeclaration, result: Result) => {
  if (node.modifiers?.length ?? 0 > 1) {
    result.addFragmentWithTopic(node, CustomTopic.ConstructorShorthand);
  }
  result.addFragmentWithTopic(node, CustomTopic.ParameterOfConstructor);
};
