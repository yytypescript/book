import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe(CustomTopic.ParameterOfFunction, () => {
  test("function declaration", () => {
    // language=TypeScript
    const code = `function functionDeclaration(parameter: any) {}`;
    const fragments = findByPoint(code, { line: 1, column: 30 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FunctionDeclaration (1:1-1:48) function functionDeclaration(parameter: any) {}
      - ParameterOfFunction (1:30-1:44) parameter: any
      - Identifier (1:30-1:39) parameter
    `);
  });

  test("arrow function", () => {
    // language=TypeScript
    const code = `const arrowFunction = (parameter: any) => null;`;
    const fragments = findByPoint(code, { line: 1, column: 38 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement (1:1-1:48) const arrowFunction = (parameter: any) => null;
      - VariableDeclarationList (1:1-1:47) const arrowFunction = (parameter: any) => null
      - VariableDeclaration (1:7-1:47) arrowFunction = (parameter: any) => null
      - ArrowFunction (1:23-1:47) (parameter: any) => null
      - ParameterOfFunction (1:24-1:38) parameter: any
      - AnyKeyword (1:35-1:38) any
    `);
  });

  test("function expression", () => {
    // language=TypeScript
    const code = `const functionExpression = function name(parameter: any) {}`;
    const fragments = findByPoint(code, { line: 1, column: 42 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - FirstStatement,VariableDeclarationList (1:1-1:60) const functionExpression = function name(parameter: any) {}
      - VariableDeclaration (1:7-1:60) functionExpression = function name(parameter: any) {}
      - FunctionExpression (1:28-1:60) function name(parameter: any) {}
      - ParameterOfFunction (1:42-1:56) parameter: any
      - Identifier (1:42-1:51) parameter
    `);
  });
});

describe(CustomTopic.ParameterOfMethod, () => {
  test("method", () => {
    // language=TypeScript
    const code = `class Class { method(parameter: any) {} }`;
    const fragments = findByPoint(code, { line: 1, column: 22 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ClassDeclaration (1:1-1:42) class Class { method(parameter: any) {} }
      - MethodDeclaration (1:15-1:40) method(parameter: any) {}
      - ParameterOfMethod (1:22-1:36) parameter: any
      - Identifier (1:22-1:31) parameter
    `);
  });

  test("setter", () => {
    // language=TypeScript
    const code = `class Class { set setter(parameter: any) {} }`;
    const fragments = findByPoint(code, { line: 1, column: 26 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ClassDeclaration (1:1-1:46) class Class { set setter(parameter: any) {} }
      - SetAccessor (1:15-1:44) set setter(parameter: any) {}
      - ParameterOfMethod (1:26-1:40) parameter: any
      - Identifier (1:26-1:35) parameter
    `);
  });
});

describe(CustomTopic.ParameterOfConstructor, () => {
  test("constructor", () => {
    // language=TypeScript
    const code = `class Class { constructor(parameter: any) {} }`;
    const fragments = findByPoint(code, { line: 1, column: 27 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - ClassDeclaration (1:1-1:47) class Class { constructor(parameter: any) {} }
      - Constructor (1:15-1:45) constructor(parameter: any) {}
      - ParameterOfConstructor (1:27-1:41) parameter: any
      - Identifier (1:27-1:36) parameter
    `);
  });
});
