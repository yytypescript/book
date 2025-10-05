---
description: キー・バリューからオブジェクト型を作る
title: "Record<Keys, Type>"
---

`Record<Keys, Type>`はプロパティのキーが`Keys`であり、プロパティの値が`Type`であるオブジェクトの型を作るユーティリティ型です。

## Record&lt;Keys, Type>の型引数

### Keys

オブジェクトのプロパティーキーを指定します。`Keys`に代入できる型は、`string`、`number`、`symbol`とそれぞれのリテラル型です。

### Type

オブジェクトのプロパティの値の型を指定します。任意の型が代入できます。

## Recordの使用例

キーが`string`で値が`number`のインデックス型を定義する。

```ts twoslash
type StringNumber = Record<string, number>;
const value: StringNumber = { a: 1, b: 2, c: 3 };
```

キーが`firstName`、`middleName`、`familyName`で、値が文字列になるオブジェクトの型を定義する。

```ts twoslash
type Person = Record<"firstName" | "middleName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  middleName: "Cecil",
  lastName: "Martin",
};
```

## インデックスアクセスの注意点

`Record<string, ...>`のようにキーに`string`など、リテラル型でない型を指定した場合は、インデックスアクセスに注意してください。存在しないキーにアクセスしても、キーが必ずあるかのようにあつかわれるためです。

次の例のように、`Record<string, number>`型の`dict`オブジェクトには、`a`キーはあるのに対し、`b`キーはありません。しかし、`dict.b`は`number`として推論されます。

```ts twoslash
// @noUncheckedIndexedAccess: false
const dict: Record<string, number> = { a: 1 };
dict.b;
//   ^?
```

実際の`dict.b`の値は`undefined`になるので、もしも`dict.b`のメソッドを呼び出すと実行時エラーになります。

```ts twoslash
const dict: Record<string, number> = { a: 1 };
console.log(dict.b);
// @log: undefined
dict.b.toFixed(); // 実行時エラーが発生する
// @noUncheckedIndexedAccess: false
```

このような挙動は、型チェックで実行時エラーを減らしたいと考える開発者にとっては不都合です。

この問題に対処するため、TypeScriptにはコンパイラオプション`noUncheckedIndexedAccess`が用意されています。これを有効にすると、インデックスアクセスの結果の型が`T | undefined`になります。つまり、`undefined`の可能性を考慮した型になるわけです。そのため、`dict.b`のメソッドを呼び出すコードはコンパイルエラーになり、型チェックの恩恵が得られます。

```ts twoslash
// @errors: 18048
// @noUncheckedIndexedAccess: true
const dict: Record<string, number> = { a: 1 };
dict.b;
//   ^?
dict.b.toFixed();
```

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

一方、`Record`のキーが`"firstName" | "lastName"`のようなリテラル型だけで構成される場合は、`noUncheckedIndexedAccess`の設定にかかわらず、この問題は発生しません。キーが限定されているため、存在しないキーへのアクセスはコンパイルエラーになるからです。

```ts twoslash
// @noUncheckedIndexedAccess: false
// @errors: 2339
// noUncheckedIndexedAccessがfalseの場合
type Person = Record<"firstName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  lastName: "Martin",
};
const firstName = person.firstName;
//    ^?
person.b; // 存在しないキーへのアクセス
```

キーが`string`のときは`noUncheckedIndexedAccess`を有効にすると、コンパイラーは`undefined`を含めるようになりますが、キーがリテラル型(またはリテラル型のユニオン)のときは、コンパイラーは`undefined`を含めないようになります。キーが必ずあることが、リテラル型によるキー指定によって自明だからです。

```ts twoslash
// @noUncheckedIndexedAccess: true
// noUncheckedIndexedAccessがtrueの場合
type Person = Record<"firstName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  lastName: "Martin",
};
const firstName = person.firstName; // undefinedは含まれない
//    ^?
```

## 関連情報

[インデックス型 (index signature)](../../values-types-variables/object/index-signature.md)

[マップ型 (Mapped Types)](../mapped-types.md)

[Map<K, V>](../../builtin-api/map.md)
