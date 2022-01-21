---
sidebar_label: ユニオン型
---

# ユニオン型 (union type)

TypeScriptのユニオン型(union type)は「いずれかの型」を表現するものです。

## ユニオン型の型注釈

ユニオン型の型注釈は、2つ以上の型をパイプ記号(`|`)で繋げて書きます。たとえば、数値型もしくはundefined型を表す場合は、`number | undefined`のように書きます。

```ts
let numberOrUndefined: number | undefined;
```

`|`は型のリストの冒頭に置くこともできます。型ごとに改行するときに、列が揃うので便利です。

<!--prettier-ignore-->
```ts
type ErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405;
```

## 配列要素にユニオン型を使う際の書き方

配列の要素としてユニオン型を用いる場合は、書き方に注意が必要です。たとえば、`string`または`number`からなる配列の型を宣言することを考えてみましょう。`string`または`number`をユニオン型で表現すると`string | number`になります。配列型は要素の型に`[]`をつけて表現します。これをそのまま繋げて考えると、次のような型を思いつくかもしれませんが、これは間違いです。

```ts
type List = string | number[];
```

これは`string`型または`number[]`型であることになっているためです。正しくは以下です。特に配列を`T[]`形式で書いているときは`()`が必要になるので注意してください。

```ts
type List = (string | number)[];
```

## ユニオン型と絞り込み

ユニオン型`string | null`が`string`なのか`null`なのかを判定したいときは、TypeScriptの絞り込み(narrowing)を用います。絞り込みをするにはいくつかの方法がありますが、代表例はif文です。条件分岐で変数が文字列型かどうかをチェックすると、同じ変数でも分岐内では`string | null`型が`string`型だと判定されます。

```ts
const maybeUserId: string | null = localStorage.getItem("userId");

const userId: string = maybeUserId; // nullかもしれないので、代入できない。

if (typeof maybeUserId === "string") {
  const userId: string = maybeUserId; // この分岐内では文字列型に絞り込まれるため、代入できる。
}
```

[制御フロー分析と型ガードによる型の絞り込み](../statements/control-flow-analysis-and-type-guard.md)

## 関連情報

[判別可能なユニオン (discriminated union)](discriminated-union.md)
