---
sidebar_label: Mapped Types
---

# Mapped Types

インデックス型では設定時はどのようなキーも自由に設定できてしまい、アクセス時は毎回`undefined`かどうかの型チェックが必要です。入力の形式が決まっているのであればMapped Typesの使用を検討できます。

Mapped Typesは主にユニオン型と組み合わせて使います。先ほどシステムがサポートする言語を定義しました。

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
// @errors: 2322
const butterflies: Butterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
  de: "Schmetterling",
};
```

プロパティを読み取り専用にする`readonly`をそのオブジェクトのすべてのプロパティに適用する`Readonly<T>`というユーティリティ型があります。他にもユーティリティ型はありますが、それらについては専門のページがありますのでここでは割愛します。

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
