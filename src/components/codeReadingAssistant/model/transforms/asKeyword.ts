import { isMappedTypeNode, SyntaxKind } from "typescript";
import { nextOf, positionOf, Transform } from "./utils";

export const asKeyword: Transform = ({ node, result }) => {
  if (node.kind !== SyntaxKind.AsKeyword) {
    return;
  }

  if (isMappedTypeNode(node.parent)) {
    const next = nextOf(node);
    if (next) {
      result.addFragment({
        code: `as ${next.getText()}`,
        position: { start: positionOf(node).start, end: positionOf(next).end },
        topics: new Set(["KeyRemappingViaAs"]),
      });
      return;
    }
  }
};
