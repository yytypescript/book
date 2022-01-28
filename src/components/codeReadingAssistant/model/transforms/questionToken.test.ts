import { findByPoint } from "../findByPoint";
import { print } from "../print";

describe("QuestionToken", () => {
  test("conditional expression", () => {
    // language=TypeScript
    const code = `0 ? 0 : 0;`;
    const fragments = findByPoint(code, { line: 1, column: 3 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:11) 0 ? 0 : 0;
      - ConditionalExpression (1:1-1:10) 0 ? 0 : 0
    `);
  });
});
