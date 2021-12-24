---
sidebar_label: リテラル型
---

# リテラル型 (literal type)

TypeScriptではプリミティブ型の特定の値だけを代入可能にする型を表現できます。そのような型をリテラル型と呼びます。

たとえば、次の例は数値が代入可能な型注釈です。数値であれば、1でも100でも何でも代入できます。

```ts
let x: number;
x = 1;
```

リテラル型を用いると、1だけが代入可能な型が作れます。

```ts twoslash
// @errors: 2322
let x: 1;
x = 1;
x = 100;
```

## リテラル型として表現できるもの

リテラル型として表現できるプリミティブ型は次のとおりです。

- 論理型のtrueとfalse
- 数値型の値
- 文字列型の文字列

```ts
const isTrue: true = true;
const num: 123 = 123;
const str: "foo" = "foo";
```

## リテラル型の用途

一般的にリテラル型はマジックナンバーやステートの表現に用いられます。その際、ユニオン型と組み合わせることが多いです。

```ts
let status: 1 | 2 | 3 = 1;
```

[ユニオン型 (union type)](union.md)

[判別可能なユニオン (discriminated union)](discriminated-union.md)
