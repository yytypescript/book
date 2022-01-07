import {
  createSourceFile,
  type Node,
  ScriptKind,
  ScriptTarget,
  SyntaxKind,
} from "typescript";
import { Fragment, Point, Position, Topic } from "./index";
import { childrenOf, isWithIn, positionOf, posOf } from "./nodeUtils";
import { Result, transforms } from "./transforms";

export const findByPoint = (
  code: string,
  point: Point
): ReadonlyArray<Fragment> => {
  const sourceFile = createSourceFile(
    "code.ts",
    code,
    ScriptTarget.ESNext,
    true,
    ScriptKind.TSX
  );
  const pos = posOf(sourceFile, point);
  if (!isWithIn(sourceFile, pos)) {
    return [];
  }
  const fragments = new Fragments();
  let nodes = childrenOf(sourceFile);
  while (true) {
    if (nodes.size === 0) {
      break;
    }
    const children = new Set<Node>();
    const lastNode = Array.from(nodes)
      .filter(
        (node) => isWithIn(node, pos) && node.kind !== SyntaxKind.EndOfFileToken
      )
      .pop();
    if (lastNode) {
      visit({ node: lastNode, pos, fragments, children });
    }
    nodes = children;
  }
  return fragments.toArray();
};

const visit = ({
  node,
  pos,
  fragments,
  children,
}: Readonly<{
  node: Node;
  pos: number;
  fragments: Fragments;
  children: Set<Node>;
}>): void => {
  const result: Result & { exit: boolean } = {
    exit: false,
    addFragment(fragment: Fragment | Node): Result {
      this.exit = true;
      if ("code" in fragment) {
        fragments.set(fragment);
      } else {
        this.addFragmentWithTopic(node, node.kind);
      }
      return this;
    },
    addFragmentWithTopic(node: Node, topic: Topic): Result {
      this.exit = true;
      fragments.set({
        code: node.getText(),
        position: positionOf(node),
        topics: new Set([topic]),
      });
      return this;
    },
    addChild(node: Node): Result {
      this.exit = true;
      children.add(node);
      return this;
    },
    addChildren(children: ReadonlySet<Node>): Result {
      this.exit = true;
      for (const child of children) {
        this.addChild(child);
      }
      return this;
    },
  };
  for (const transform of transforms) {
    if (result.exit) return;
    transform({ node, pos, result });
  }
};

class Fragments {
  readonly #fragments = new Map<string, Fragment>();

  set(fragment: Fragment): void {
    const position = Fragments.#stringOfPosition(fragment.position);
    const knownFragment = this.#fragments.get(position);
    this.#fragments.set(
      position,
      knownFragment
        ? Fragments.#addTopics(knownFragment, fragment.topics)
        : fragment
    );
  }

  toArray(): ReadonlyArray<Fragment> {
    return Array.from(this.#fragments.values());
  }

  static #addTopics(fragment: Fragment, topics: Fragment["topics"]): Fragment {
    return {
      ...fragment,
      topics: new Set([...Array.from(fragment.topics), ...Array.from(topics)]),
    };
  }

  static #stringOfPosition({ start, end }: Position): string {
    return `${start.line}:${start.column}-${end.line}:${end.column}`;
  }
}
