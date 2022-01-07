import { isMappedTypeNode, isPlusToken, SyntaxKind } from "typescript";
import { childrenOf, CustomTopic, nextOf, Transform } from "./utils";

export const plusToken: Transform = ({ node, result }) => {
  if (!isPlusToken(node)) {
    return;
  }

  if (isMappedTypeNode(node.parent)) {
    const next = nextOf(node);
    if (next) {
      if (next.kind === SyntaxKind.ReadonlyKeyword) {
        result.addFragmentWithTopic(node, CustomTopic.PlusReadonlyOfMappedType);
        return;
      }
      if (next.kind === SyntaxKind.QuestionToken) {
        result.addFragmentWithTopic(
          node,
          CustomTopic.PlusOptionTypeOfMappedType
        );
        return;
      }
    }
  }

  result.addFragment(node);
  result.addChildren(childrenOf(node));
};
