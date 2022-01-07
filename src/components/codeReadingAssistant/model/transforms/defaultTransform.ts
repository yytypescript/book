import { childrenOf, Transform } from "./utils";

export const defaultTransform: Transform = ({ node, result }) =>
  result.addFragment(node).addChildren(childrenOf(node));
