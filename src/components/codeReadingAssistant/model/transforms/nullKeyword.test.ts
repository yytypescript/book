import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe(CustomTopic.NullType, () => {
  test("type annotation of variable", () => {
    // language=TypeScript
    const code = `let a: null;`;
    const fragments = findByPoint(code, { line: 1, column: 8 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement (1:1-1:13) let a: null;
      - VariableDeclarationList (1:1-1:12) let a: null
      - VariableDeclaration (1:5-1:12) a: null
      - TypeAnnotationOfVariable,LiteralType,NullType (1:8-1:12) null
    `);
  });
});

describe(CustomTopic.NullLiteral, () => {
  test("in a variable declaration", () => {
    // language=TypeScript
    const code = `let a = null`;
    const fragments = findByPoint(code, { line: 1, column: 9 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:13) let a = null
      - VariableDeclaration (1:5-1:13) a = null
      - NullLiteral (1:9-1:13) null
    `);
  });
});
