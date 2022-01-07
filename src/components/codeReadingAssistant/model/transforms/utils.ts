import { Node } from "typescript";

export { childrenOf, positionOf } from "../nodeUtils";
export { CustomTopic } from "../topics";
export type { Transform, TransformParams, Result } from "./index";

export const nextOf = (node: Node): Node | undefined => {
  const nodes = node.parent.getChildren();
  for (const [index, current] of nodes.entries()) {
    if (current === node) {
      return nodes[index + 1];
    }
  }
  return undefined;
};
