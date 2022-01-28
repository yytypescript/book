import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe("LogicalNotOperator", () => {
  test("not 0", () => {
    // language=TypeScript
    const code = `!0;`;
    const fragments = findByPoint(code, { line: 1, column: 1 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:4) !0;
      - PrefixUnaryExpression (1:1-1:3) !0
    `);
  });
});

describe(CustomTopic.DefiniteAssignmentAssertion, () => {
  test("variable declaration", () => {
    // language=TypeScript
    const code = `let num!: number;`;
    const fragments = findByPoint(code, { line: 1, column: 8 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement (1:1-1:18) let num!: number;
      - VariableDeclarationList (1:1-1:17) let num!: number
      - VariableDeclaration (1:5-1:17) num!: number
      - TypeAnnotationOfVariable (1:11-1:17) number
      - DefiniteAssignmentAssertion (1:8-1:9) !
    `);
  });

  test("class property", () => {
    // language=TypeScript
    const code = `class X {
  prop!: string;
}`;
    const fragments = findByPoint(code, { line: 2, column: 7 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ClassDeclaration (1:1-3:2) class X { [3]
      - PropertyDeclaration (2:3-2:17) prop!: string;
      - DefiniteAssignmentAssertion (2:7-2:8) !
    `);
  });
});
