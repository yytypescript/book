import { findByPoint } from "../findByPoint";
import { print } from "../print";
import { CustomTopic } from "./utils";

describe("MappedType", () => {
  test("no modifiers", () => {
    // language=TypeScript
    const code = `type A = { [K in 1]: any };`;
    const fragments = findByPoint(code, { line: 1, column: 13 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:28) type A = { [K in 1]: any };
      - MappedType (1:10-1:27) { [K in 1]: any }
      - TypeParameter (1:13-1:19) K in 1
      - Identifier (1:13-1:14) K
    `);
  });

  test("readonly", () => {
    // language=TypeScript
    const code = `type B = { readonly [K in 1]: any };`;
    const fragments = findByPoint(code, { line: 1, column: 12 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:37) type B = { readonly [K in 1]: any };
      - MappedType (1:10-1:36) { readonly [K in 1]: any }
      - ReadonlyKeyword (1:12-1:20) readonly
    `);
  });

  test("minus readonly", () => {
    // language=TypeScript
    const code = `type C = { -readonly [K in 1]: any };`;
    const fragments = findByPoint(code, { line: 1, column: 12 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:38) type C = { -readonly [K in 1]: any };
      - MappedType (1:10-1:37) { -readonly [K in 1]: any }
      - MinusReadonlyOfMappedType (1:12-1:13) -
    `);
  });

  test("plus readonly", () => {
    // language=TypeScript
    const code = `type D = { +readonly [K in 1]: any };`;
    const fragments = findByPoint(code, { line: 1, column: 12 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:38) type D = { +readonly [K in 1]: any };
      - MappedType (1:10-1:37) { +readonly [K in 1]: any }
      - PlusReadonlyOfMappedType (1:12-1:13) +
    `);
  });

  test("question", () => {
    // language=TypeScript
    const code = `type E = { [K in 1]?: any };`;
    const fragments = findByPoint(code, { line: 1, column: 20 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:29) type E = { [K in 1]?: any };
      - MappedType (1:10-1:28) { [K in 1]?: any }
      - OptionProperty (1:20-1:21) ?
    `);
  });

  test("plus question", () => {
    // language=TypeScript
    const code = `type F = { [K in 1]+?: any };`;
    const fragments = findByPoint(code, { line: 1, column: 20 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:30) type F = { [K in 1]+?: any };
      - MappedType (1:10-1:29) { [K in 1]+?: any }
      - PlusOptionTypeOfMappedType (1:20-1:21) +
    `);
  });

  test("plus question focusing question", () => {
    // language=TypeScript
    const code = `type F = { [K in 1]+?: any };`;
    const fragments = findByPoint(code, { line: 1, column: 21 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:30) type F = { [K in 1]+?: any };
      - MappedType (1:10-1:29) { [K in 1]+?: any }
      - OptionProperty (1:21-1:22) ?
    `);
  });

  test("minus question", () => {
    // language=TypeScript
    const code = `type G = { [K in 1]-?: any };`;
    const fragments = findByPoint(code, { line: 1, column: 20 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:30) type G = { [K in 1]-?: any };
      - MappedType (1:10-1:29) { [K in 1]-?: any }
      - MinusOptionTypeOfMappedType (1:20-1:21) -
    `);
  });

  test("minus question focusing question", () => {
    // language=TypeScript
    const code = `type G = { [K in 1]-?: any };`;
    const fragments = findByPoint(code, { line: 1, column: 21 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:30) type G = { [K in 1]-?: any };
      - MappedType (1:10-1:29) { [K in 1]-?: any }
      - OptionProperty (1:21-1:22) ?
    `);
  });

  test(CustomTopic.KeyRemappingViaAs, () => {
    // language=TypeScript
    const code = `type X = { readonly [K in string as string]: string };`;
    const fragments = findByPoint(code, { line: 1, column: 34 });
    expect(print(fragments)).toMatchInlineSnapshot(`
      - TypeAliasDeclaration (1:1-1:55) type X = { readonly [K in string as string]: string };
      - MappedType (1:10-1:54) { readonly [K in string as string]: string }
      - KeyRemappingViaAs (1:34-1:43) as string
    `);
  });
});
