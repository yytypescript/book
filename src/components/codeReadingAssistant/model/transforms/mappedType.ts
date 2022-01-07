import {
  isMappedTypeNode,
  MappedTypeNode,
  MinusToken,
  PlusToken,
  SyntaxKind,
} from "typescript";
import { Topic } from "../index";
import { CustomTopic, nextOf, positionOf, Result, Transform } from "./utils";

export const mappedType: Transform = ({ node, result }) => {
  if (!isMappedTypeNode(node)) {
    return;
  }

  // mappedType: "{" readonlyToken? "[" typeParameter ("as" nameType)? "]" questionToken? ":" type "}"
  // readonlyToken: ("+" | "-")? "readonly"
  // typeParameter: * "in" *
  // nameType: *
  // questionToken: ("+" | "-")? "?"
  // type: *

  result.addFragment(node);
  addReadonlyTokenToChild(node.readonlyToken, result);
  addTypeParameterToChild(node.typeParameter, result);
  addNameTypeToChild(node.nameType, result);
  addQuestionTokenToChild(node.questionToken, result);
  addTypeToChild(node.type, result);
};

const addReadonlyTokenToChild = (
  node: MappedTypeNode["readonlyToken"],
  result: Result
) => {
  switch (node?.kind) {
    case SyntaxKind.ReadonlyKeyword:
      result.addChild(node);
      break;
    case SyntaxKind.MinusToken:
      result.addChild(node);
      addNextToken(node, result);
      break;
    case SyntaxKind.PlusToken:
      result.addChild(node);
      addNextToken(node, result);
      break;
    default:
  }
};

const addTypeParameterToChild = (
  node: MappedTypeNode["typeParameter"],
  result: Result
) => result.addChild(node);

const addNameTypeToChild = (
  node: MappedTypeNode["nameType"],
  result: Result
) => {
  if (node) {
    for (const n of node.parent.getChildren()) {
      if (n.kind === SyntaxKind.AsKeyword) {
        result.addChild(n);
      }
    }
    result.addChild(node);
  }
};

const addQuestionTokenToChild = (
  node: MappedTypeNode["questionToken"],
  result: Result
) => {
  switch (node?.kind) {
    case SyntaxKind.QuestionToken:
      result.addChild(node);
      break;
    case SyntaxKind.MinusToken:
      result.addChild(node);
      addNextToken(node, result);
      break;
    case SyntaxKind.PlusToken:
      result.addChild(node);
      addNextToken(node, result);
      break;
    default:
  }
};

const addTypeToChild = (node: MappedTypeNode["type"], result: Result) => {
  if (node) {
    result.addChild(node);
  }
};

const addNextToken = (node: MinusToken | PlusToken, result: Result) => {
  const next = nextOf(node);
  if (next) {
    result.addChild(next);
  }
};
