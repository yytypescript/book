---
sidebar_label: Mapped Types
---

# Mapped Types

インデックス型では設定時はどのようなキーも自由に設定できてしまい、アクセス時は毎回`undefined`かどうかの型チェックが必要です。入力の形式が決まっているのであればMapped Typesの使用を検討できます。

Mapped Typesは主にユニオン型と組み合わせて使います。ここにサポートする言語を定義します。

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
```

これをインデックス型と同じようにキーの制約として使用することができます。

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
// ---cut---
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

このように`Butterfly`を定義するとシステムがサポートしない言語、ここでは`de`が設定、使用できなくなります。

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
// ---cut---
// @errors: 2353
const butterflies: Butterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
  de: "Schmetterling",
};
```

## Mapped Typesを使ったユーティリティ型の紹介とその実現方法

プロパティを読み取り専用にする`readonly`をそのオブジェクトのすべてのプロパティに適用する`Readonly<T>`というユーティリティ型があります。

[Readonly&lt;T>](utility-types/readonly.md)

`Readonly<T>`もこの機能で実現されています。`Readonly<T>`は次のように実装されています。

```ts twoslash
// @noErrors
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

`keyof T`という見慣れない表現が登場しましたが、これはオブジェクトのキーをユニオン型に変更するものだと解釈してください。`keyof`の詳細は型演算子をご覧ください。

[keyof型演算子](keyof-type-operator.md)

### mapping modifier

`-`を先頭につけ`-readonly`とすることで、逆に読み取り専用となっているプロパティを変更可能にする`Mutable<T>`を作ることもできます（これはユーティリティ型にはありません）。このときの`-`をmapping modifierと呼びます。

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
// ---cut---
// @errors: 2540
type ImmutableButterfly = Readonly<Butterfly>;
type MutableButterfly = {
  -readonly [key in SystemSupportLanguage]: string;
};

const immutableButterfly: ImmutableButterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

immutableButterfly.en = "Schmetterling";

const mutableButterfly: MutableButterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

mutableButterfly.en = "Schmetterling"; // OK
```

mapping modifier(`-`)は他にもオプション修飾子の前につけて`-?`とすることで、オプション修飾子を取り除くことができます。これを使うことで、`Partial<T>`の逆の効果を持つ`Required<T>`を実装することができます。

[Partial&lt;T>](utility-types/partial.md)

[Required&lt;T>](utility-types/required.md)

## インデックスアクセスの注意点

`{ [K in string]: ... }`のようにキーに`string`など、リテラル型でない型を指定した場合は、インデックスアクセスに注意してください。存在しないキーにアクセスしても、キーが必ずあるかのようにあつかわれるためです。

次の例のように、`{ [K in string]: number }`型の`dict`オブジェクトには、`a`キーはあるのに対し、`b`キーはありません。しかし、`dict.b`は`number`として推論されます。

```ts twoslash
// @noUncheckedIndexedAccess: false
const dict: { [K in string]: number } = { a: 1 };
dict.b;
//   ^?
```

実際の`dict.b`の値は`undefined`になるので、もしも`dict.b`のメソッドを呼び出すと実行時エラーになります。

```ts twoslash
const dict: { [K in string]: number } = { a: 1 };
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
const dict: { [K in string]: number } = { a: 1 };
dict.b;
//   ^?
dict.b.toFixed();
```

[noUncheckedIndexedAccess](../tsconfig/nouncheckedindexedaccess.md)

## Mapped Typesには追加のプロパティが書けない

Mapped Typesは追加のプロパティが定義できません。ここは、[インデックス型]とは異なる点です。

<!--prettier-ignore-->
```ts twoslash
// @errors: 7061
type KeyValuesAndName = {
  [K in string]: string;
  name: string; // 追加のプロパティ
};
```

追加のプロパティがある場合は、その部分をオブジェクトの型として定義し、Mapped Typesと[インターセクション型]を成す必要があります。

```ts twoslash
type KeyValues = {
  [K in string]: string;
};
type Name = {
  name: string; // 追加のプロパティ
};
type KeyValuesAndName = KeyValues & Name;
```

上の例は、ひとつの型にまとめることもできます。

```ts twoslash
type KeyValuesAndName = {
  [K in string]: string;
} & {
  name: string; // 追加のプロパティ
};
```

[インデックス型]: ../values-types-variables/object/index-signature.md
[インターセクション型]: ../values-types-variables/intersection.md
