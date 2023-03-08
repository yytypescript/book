# 配列から全要素の型を生成する

前ページでは、配列から全要素の型を生成する方法が登場しました。

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = typeof currencies[number];
//   ^?
```

`typeof currencies[number]`という書き方は、初めて見ると理解に苦しむコードかもしれません。そのためより詳しく説明します。

## 前ページのコードを観察する

配列からある要素の型を生成するコードについて、前ページに続き通貨の配列でもう一度確認します。

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Currency = typeof currencies[2];
//   ^?
```

ここで、`typeof currencies[2]`の`2`は、前ページでリテラル型と説明していますが本当でしょうか？次のコードで確認してみます。

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
const index = 2 as const;
// @errors: 2749
type Currency = typeof currencies[index];
```

`2`が値として解釈されるコードではエラーになってしまいました。

では明確にリテラル型だとわかるコードも試してみましょう。

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Index = 2;
type Currency = typeof currencies[Index];
//   ^?
```

これで`typeof currencies[2]`の`2`はリテラル型であることがはっきりしました。

## 数値のリテラル型と`number`型

`2`のリテラル型と`number`型の関係を集合で表現すると、`2`⊂`number`と書くことができます。他の表現をすると、`0`、`1`、`2`..など数値のリテラル型のいずれかの型として振る舞うのが`number`型です。

「いずれかの型」といえばユニオン型の出番です。

[ユニオン型 (union type)](../reference/values-types-variables/union.md)

`number`型の代わりにリテラルのユニオン型を使ってみましょう。

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Currency = typeof currencies[0 | 1 | 2 | 3 | 4 | 5];
//   ^?
```

`0 | 1 | 2 | 3 | 4 | 5`型でも`currencies`配列から全要素の型を生成することができました。このように`number`型は数値のリテラル型のワイルドカードとして振る舞うことがわかります。

## 一般化する

このページの締めくくりに一般化したコードを示します。

```ts twoslash
type List = (string | number | boolean)[];
type Elem = List[number];
//   ^?
```

`List`型から`List[number]`という書き方ですべての要素の型である`string | number | boolean`が生成できました。

### アンチパターンの紹介

次のように具体的なインデックスで同じ型を生成することは可能ですが、アンチパターンなので注意してください。

```ts twoslash
type List = (string | number | boolean)[];
type Elem = List[0]; // 避けるべき書き方
//   ^?
```

この書き方がアンチパターンである理由は`List`型をタプル型だと混乱させてしまう可能性があるためです。`List[0]`は特定の要素から型を生成しているため、各要素の型が同じ型ではない、つまり`List`が配列型ではなくタプル型だからこの書き方をしていると誤解させる可能性があります。配列型はどの要素の型も同じものとして扱うので、`List[number]`の書き方が適切です。
