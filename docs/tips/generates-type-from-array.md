# 配列から型を生成する

単位のように振る舞うことを期待されて定義されたコレクションは少なくないでしょう。今回はコレクションでも主に配列に焦点を当てそれらから型を生成する方法の紹介です。

## 通貨の配列から通貨の型を作りたい

国際的な外貨を使うことができるサービスを開発していたとします。サポートしている通貨を配列で保持しているとし次のようになっているとします。

```ts
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"];
```

このようなとき、このJavaScriptの資産をできるだけ変更せずに貨幣の型 (ユニオン型) を作ることができれば今後便利そうです。つまり次のようなユニオン型です。

```ts
type Currency = "CNY" | "EUR" | "GBP" | "JPY" | "KRW" | "USD";
```

### `typeof`

これはJavaScriptの`typeof`ではなくTypeScriptの`typeof`です。`typeof`はTypeScriptがその変数をどのような型であるかと認識しているかかを教えてくれます。

```ts
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"];

type Currency = typeof currencies;
// -> string[]
```

予想されている方が多かったかもしれませんが`string[]`型と出てしまいました。ではこれをどうすれば`string`ではなく定数値で取得できるでしょうか。それは定数値で取得したいオブジェクトに`as const`をつけると取得できます。

```ts
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = typeof currencies;
```

`Currency`は次のようになります。

```ts
type Currency = readonly ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"];
```

定数 (リテラル型) は取れましたが依然配列のままです。これをユニオン型で取るためには考え方を逆転させる必要があります。

#### 何番目のリテラル型が欲しいか

たとえば`'GBP'`が欲しいとします。`'GBP'`は2番目なので`currencies`の2番目の型を取れば希望のリテラル型が取れます。

```ts
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = typeof currencies[2];
// -> 'GBP'
```

`'GBP'`を取ることができました。

### すべてのリテラル型が欲しい

本題です。まさか次のようにするわけには行かないのでもっと賢い方法を考える必要があります。

```ts
type Currency = typeof currencies[0] | typeof currencies[1] | typeof currencies[2] | ....
```

そこで思いつくのは`typeof`をしているときのインデックスです。実はこれもリテラル型であり`currencies`の`2`のリテラル型を取ることを意味しています。

配列はnumber型のインデックスに要素を代入しているオブジェクトなのでこのリテラル型のインデックスの代わりに`number`を使うことによって

```ts
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = typeof currencies[number];
// -> 'CNY' | 'EUR' | 'GBP' | 'JPY' | 'KRW' | 'USD'
```

と希望のユニオン型を取得できます。
