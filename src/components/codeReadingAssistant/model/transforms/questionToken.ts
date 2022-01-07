import {
  isConditionalExpression,
  isMappedTypeNode,
  Node,
  QuestionToken,
  SyntaxKind,
} from "typescript";
import { childrenOf, CustomTopic, Transform } from "./utils";

export const questionToken: Transform = ({ node, result }) => {
  if (!isQuestionToken(node)) {
    return;
  }

  // fragment is not added if parent is conditional expression
  if (isConditionalExpression(node.parent)) {
    result.addChildren(childrenOf(node));
    return;
  }

  if (isMappedTypeNode(node.parent)) {
    result.addFragmentWithTopic(node, CustomTopic.OptionProperty);
    return;
  }

  result.addFragment(node);
};

const isQuestionToken = (node: Node): node is QuestionToken => {
  return node.kind === SyntaxKind.QuestionToken;
};
