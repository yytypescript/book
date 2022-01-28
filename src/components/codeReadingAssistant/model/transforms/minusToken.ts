import { isMappedTypeNode, isMinusToken, SyntaxKind } from "typescript";
import { childrenOf, CustomTopic, nextOf, Transform } from "./utils";

export const minusToken: Transform = ({ node, result }) => {
  if (!isMinusToken(node)) {
    return;
  }

  if (isMappedTypeNode(node.parent)) {
    const next = nextOf(node);
    if (next) {
      if (next.kind === SyntaxKind.ReadonlyKeyword) {
        result.addFragmentWithTopic(
          node,
          CustomTopic.MinusReadonlyOfMappedType
        );
        return;
      }
      if (next.kind === SyntaxKind.QuestionToken) {
        result.addFragmentWithTopic(
          node,
          CustomTopic.MinusOptionTypeOfMappedType
        );
        return;
      }
    }
  }

  result.addFragment(node);
  result.addChildren(childrenOf(node));
};
