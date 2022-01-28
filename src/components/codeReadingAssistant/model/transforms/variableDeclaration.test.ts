import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe(CustomTopic.TypeAnnotationOfVariable, () => {
  test("no type annotation, no default value", () => {
    // language=TypeScript
    const code = `let a`;
    const fragments = findByPoint(code, { line: 1, column: 5 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:6) let a
      - VariableDeclaration,Identifier (1:5-1:6) a
    `);
  });

  describe("string", () => {
    // language=TypeScript
    const code = `let a: string`;
    test("before `string`", () => {
      const fragments = findByPoint(code, { line: 1, column: 8 });
      expect(print(fragments)).toMatchInlineSnapshot(`
        - FirstStatement,VariableDeclarationList (1:1-1:14) let a: string
        - VariableDeclaration (1:5-1:14) a: string
        - TypeAnnotationOfVariable,StringKeyword (1:8-1:14) string
      `);
    });
  });

  test("array destructuring", () => {
    // language=TypeScript
    const code = `const [a, b]: number[] = [1, 2]`;
    const fragments = findByPoint(code, { line: 1, column: 15 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:32) const [a, b]: number[] = [1, 2]
      - VariableDeclaration (1:7-1:32) [a, b]: number[] = [1, 2]
      - TypeAnnotationOfVariable,ArrayType (1:15-1:23) number[]
      - NumberKeyword (1:15-1:21) number
    `);
  });

  test("JSDoc comment", () => {
    // language=TypeScript
    const code = `var /** */ a: string`;
    const fragments = findByPoint(code, { line: 1, column: 15 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:21) var /** */ a: string
      - VariableDeclaration (1:5-1:21) a: string
      - TypeAnnotationOfVariable,StringKeyword (1:15-1:21) string
    `);
  });
});
