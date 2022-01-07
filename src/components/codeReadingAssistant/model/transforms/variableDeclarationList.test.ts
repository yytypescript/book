import { findByPoint } from "../findByPoint";
import { print } from "../print";

test("VarKeyword", () => {
  // language=TypeScript
  const code = `var a: number = 1`;
  const fragments = findByPoint(code, { line: 1, column: 1 });
  expect(print(fragments)).toMatchInlineSnapshot(`
    - FirstStatement,VariableDeclarationList (1:1-1:18) var a: number = 1
    - VarKeyword (1:1-1:4) var
  `);
});

describe("VariableDeclarationList", () => {
  // language=TypeScript
  const code = `let var1, var2`;
  test("before let", () => {
    const fragments = findByPoint(code, { line: 1, column: 1 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:15) let var1, var2
      - LetKeyword (1:1-1:4) let
    `);
  });
  test("before var1", () => {
    const fragments = findByPoint(code, { line: 1, column: 5 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:15) let var1, var2
      - VariableDeclaration,Identifier (1:5-1:9) var1
    `);
  });
});
