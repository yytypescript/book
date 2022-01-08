import { isAsExpression, isTypeReferenceNode } from "typescript";
import { CustomTopic, Transform } from "./utils";

export const asExpression: Transform = ({ node, result }) => {
  if (!isAsExpression(node)) {
    return;
  }
  if (isTypeReferenceNode(node.type) && node.type.getText() === "const") {
    result.addFragmentWithTopic(node, CustomTopic.ConstAssertion);
  }
};
