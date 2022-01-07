import { isVariableDeclarationList } from "typescript";
import { childrenOf, Transform } from "./utils";

export const variableDeclarationList: Transform = ({ node, result }) => {
  if (!isVariableDeclarationList(node)) {
    return;
  }
  // expose keywords(var, let, const) as fragments
  result.addFragment(node);
  result.addChild(node.getChildAt(0));
  result.addChildren(childrenOf(node));
};
