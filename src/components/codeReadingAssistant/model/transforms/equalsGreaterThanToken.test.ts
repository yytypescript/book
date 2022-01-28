import { findByPoint } from "../findByPoint";
import { print } from "../print";

describe("EqualsGreaterThanToken", () => {
  test("EqualsGreaterThanToken is removed in arrow function", () => {
    // language=TypeScript
    const code = `() => {};`;
    const fragments = findByPoint(code, { line: 1, column: 4 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ExpressionStatement (1:1-1:10) () => {};
      - ArrowFunction (1:1-1:9) () => {}
    `);
  });
});
