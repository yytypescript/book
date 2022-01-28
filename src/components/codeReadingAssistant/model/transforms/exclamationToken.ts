import { SyntaxKind } from "typescript";
import { childrenOf, CustomTopic, Transform } from "./utils";

export const exclamationToken: Transform = ({ node, result }) => {
  if (node.kind !== SyntaxKind.ExclamationToken) {
    return;
  }
  result.addFragmentWithTopic(node, CustomTopic.DefiniteAssignmentAssertion);
  result.addChildren(childrenOf(node));
};
