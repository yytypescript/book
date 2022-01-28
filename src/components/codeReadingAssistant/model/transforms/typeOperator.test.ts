import { findByPoint } from "../index";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe(CustomTopic.ReadonlyArray, () => {
  // language=TypeScript
  const code = `type X = readonly true[]`;
  test("before `true`", () => {
    const fragments = findByPoint(code, { line: 1, column: 19 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:25) type X = readonly true[]
      - ReadonlyArray (1:10-1:25) readonly true[]
      - LiteralType,TrueKeyword (1:19-1:23) true
    `);
  });
  test("after `true`", () => {
    const fragments = findByPoint(code, { line: 1, column: 23 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:25) type X = readonly true[]
      - ReadonlyArray (1:10-1:25) readonly true[]
      - LiteralType,TrueKeyword (1:19-1:23) true
    `);
  });
});

describe(CustomTopic.UniqueSymbol, () => {
  // language=TypeScript
  const code = `declare const a: unique symbol`;
  test("before `unique`", () => {
    const fragments = findByPoint(code, { line: 1, column: 18 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement (1:1-1:31) declare const a: unique symbol
      - VariableDeclarationList (1:9-1:31) const a: unique symbol
      - VariableDeclaration (1:15-1:31) a: unique symbol
      - TypeAnnotationOfVariable,UniqueSymbol (1:18-1:31) unique symbol
    `);
  });
  test("after `symbol`", () => {
    const fragments = findByPoint(code, { line: 1, column: 31 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement (1:1-1:31) declare const a: unique symbol
      - VariableDeclarationList (1:9-1:31) const a: unique symbol
      - VariableDeclaration (1:15-1:31) a: unique symbol
      - TypeAnnotationOfVariable,UniqueSymbol (1:18-1:31) unique symbol
    `);
  });
});

describe("KeyOfKeyword", () => {
  // language=TypeScript
  const code = `type A = keyof Boolean`;
  test("before `keyof`", () => {
    const fragments = findByPoint(code, { line: 1, column: 10 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:23) type A = keyof Boolean
      - KeyOfKeyword (1:10-1:23) keyof Boolean
    `);
  });
  test("after `keyof`", () => {
    const fragments = findByPoint(code, { line: 1, column: 15 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:23) type A = keyof Boolean
      - KeyOfKeyword (1:10-1:23) keyof Boolean
    `);
  });
  test("before `Boolean`", () => {
    const fragments = findByPoint(code, { line: 1, column: 16 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:23) type A = keyof Boolean
      - KeyOfKeyword (1:10-1:23) keyof Boolean
      - TypeReference,Identifier (1:16-1:23) Boolean
    `);
  });
});
