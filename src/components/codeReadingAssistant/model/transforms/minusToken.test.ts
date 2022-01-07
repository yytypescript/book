import { findByPoint } from "../findByPoint";
import { print } from "../print";

describe("MinusToken", () => {
  test("subtraction", () => {
    // language=TypeScript
    const code = `1 - 1;`;
    const fragments = findByPoint(code, { line: 1, column: 3 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:7) 1 - 1;
      - BinaryExpression (1:1-1:6) 1 - 1
      - MinusToken (1:3-1:4) -
    `);
  });
});
