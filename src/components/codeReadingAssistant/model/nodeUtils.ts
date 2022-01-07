import { getPositionOfLineAndCharacter, Node, SourceFile } from "typescript";
import { Point, Position } from "./index";

export const positionOf = (node: Node): Position => {
  const sourceFile = node.getSourceFile();
  return {
    start: pointOf(sourceFile, node.getStart(sourceFile, true)),
    end: pointOf(sourceFile, node.getEnd()),
  };
};

const pointOf = (sourceFile: SourceFile, pos: number): Point => {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(pos);
  return { line: line + 1, column: character + 1 };
};

export const posOf = (sourceFile: SourceFile, point: Point): number => {
  try {
    return getPositionOfLineAndCharacter(
      sourceFile,
      point.line - 1,
      point.column - 1
    );
  } catch (e) {
    console.error(Object.assign(e, { point }));
    return NaN;
  }
};

export const childrenOf = (node: Node): ReadonlySet<Node> => {
  const children = new Set<Node>();
  node.forEachChild((child) => {
    children.add(child);
  });
  return children;
};

export const isWithIn = (node: Node, pos: number): boolean =>
  node.getStart() <= pos && pos <= node.getEnd();
