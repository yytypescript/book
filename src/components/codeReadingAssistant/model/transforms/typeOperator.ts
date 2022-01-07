import {
  isArrayTypeNode,
  isTypeOperatorNode,
  SyntaxKind,
  TypeOperatorNode,
} from "typescript";
import { childrenOf, CustomTopic, Transform, Result } from "./utils";

export const typeOperator: Transform = ({ node, result }) => {
  if (!isTypeOperatorNode(node)) {
    return;
  }

  switch (node.operator) {
    case SyntaxKind.ReadonlyKeyword:
      return readonly(node, result);
    case SyntaxKind.UniqueKeyword:
      return uniqueSymbol(node, result);
    case SyntaxKind.KeyOfKeyword:
      return keyofKeyword(node, result);
  }
};

const readonly = (node: TypeOperatorNode, result: Result): void => {
  const child = node.getChildAt(1);
  if (!isArrayTypeNode(child)) {
    return;
  }
  result
    .addFragmentWithTopic(node, CustomTopic.ReadonlyArray)
    .addChildren(childrenOf(child));
};

const uniqueSymbol = (node: TypeOperatorNode, result: Result): void => {
  const [unique, symbol] = node.getChildren();
  if (
    unique?.kind === SyntaxKind.UniqueKeyword &&
    symbol?.kind === SyntaxKind.SymbolKeyword
  ) {
    result.addFragmentWithTopic(node, CustomTopic.UniqueSymbol);
  }
};

const keyofKeyword = (node: TypeOperatorNode, result: Result): void => {
  const [keyofKeyword, ...children] = node.getChildren();
  if (keyofKeyword)
    result
      .addFragmentWithTopic(node, SyntaxKind.KeyOfKeyword)
      .addChildren(new Set(children));
};
