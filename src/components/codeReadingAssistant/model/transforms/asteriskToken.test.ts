import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe("AsteriskToken", () => {
  test("Multiplication", () => {
    // language=TypeScript
    const code = `1 * 1;`;
    const fragments = findByPoint(code, { line: 1, column: 3 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:7) 1 * 1;
      - BinaryExpression (1:1-1:6) 1 * 1
      - MultiplicationOperator (1:3-1:4) *
    `);
  });
});

describe(CustomTopic.Generator, () => {
  test("function declaration", () => {
    // language=TypeScript
    const code = `function* generator() {}`;
    const fragments = findByPoint(code, { line: 1, column: 9 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FunctionDeclaration (1:1-1:25) function* generator() {}
      - Generator (1:9-1:10) *
    `);
  });

  test("function expression", () => {
    // language=TypeScript
    const code = `(function* () {});`;
    const fragments = findByPoint(code, { line: 1, column: 10 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:19) (function* () {});
      - ParenthesizedExpression (1:1-1:18) (function* () {})
      - FunctionExpression (1:2-1:17) function* () {}
      - Generator (1:10-1:11) *
    `);
  });

  test("method in object literal", () => {
    // language=TypeScript
    const code = `({ *gen() {} });`;
    const fragments = findByPoint(code, { line: 1, column: 4 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:17) ({ *gen() {} });
      - ParenthesizedExpression (1:1-1:16) ({ *gen() {} })
      - ObjectLiteralExpression (1:2-1:15) { *gen() {} }
      - MethodDeclaration (1:4-1:13) *gen() {}
      - Generator (1:4-1:5) *
    `);
  });
});

describe(CustomTopic.YieldAsterisk, () => {
  test("function declaration", () => {
    // language=TypeScript
    const code = `function* gen() {
  yield* [];
}`;
    const fragments = findByPoint(code, { line: 2, column: 8 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FunctionDeclaration (1:1-3:2) function* gen() { [3]
      - Block (1:17-3:2) { [3]
      - ExpressionStatement (2:3-2:13) yield* [];
      - YieldExpression (2:3-2:12) yield* []
      - YieldAsterisk (2:8-2:9) *
    `);
  });
});
