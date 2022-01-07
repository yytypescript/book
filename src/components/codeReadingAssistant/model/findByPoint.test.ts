import { findByPoint } from "./findByPoint";
import { print } from "./print";

test("position between two statements", () => {
  // language=TypeScript
  const code = `if(1){1}if(2){2}`;
  const fragments = findByPoint(code, { line: 1, column: 9 });
  expect(print(fragments)).toMatchInlineSnapshot(
    `- IfStatement (1:9-1:17) if(2){2}`
  );
});

test("EndOfFileToken is removed", () => {
  // language=TypeScript
  const code = `1`;
  const fragments = findByPoint(code, { line: 1, column: 2 });
  expect(print(fragments)).toMatchInlineSnapshot(
    `- ExpressionStatement,FirstLiteralToken (1:1-1:2) 1`
  );
});
