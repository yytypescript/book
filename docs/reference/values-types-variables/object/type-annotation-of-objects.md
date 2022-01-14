---
sidebar_label: オブジェクトの型注釈
---

# オブジェクトの型注釈 (type annotation)

TypeScriptでオブジェクトの型注釈は、JavaScriptオブジェクトリテラルのような書き方で、オブジェクトプロパティをキーと値の型のペアを書きます。

```ts twoslash
let box: { width: number; height: number };
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^型注釈
box = { width: 1080, height: 720 };
```

オブジェクトの型注釈をしておくと、型の誤りをコンパイラーが警告してくれるようになります。

```ts twoslash
// @errors: 2322 2741
let box: { width: number; height: number };
// 誤ってプロパティに文字列を代入した
box = { width: "1080", height: 720 };
// 誤ってheightを指定し忘れた
box = { width: 1080 };
```

プロパティの区切り文字には、オブジェクトリテラルのようにカンマ`,`も使えますが、セミコロン`;`を用いるほうを推奨します。理由は、コード整形ツール[Prettier](/tutorials/prettier)がオブジェクト型注釈を直すとき、カンマをセミコロンに置き換えるためです。

オブジェクトの型注釈は途中で改行することもできます。改行した場合、プロパティの区切り文字は省略できます。

```ts twoslash
let box: {
  width: number;
  height: number;
};
box = { width: 1080, height: 720 };
```

インラインの型注釈の代わりに、型エイリアスを使った型注釈の書き方もできます。

```ts twoslash
// 型エイリアス
type Box = { width: number; height: number };
let box: Box = { width: 1080, height: 720 };
//       ^^^型注釈
```

[型エイリアス](../type-alias.md)

## メソッドの型注釈

オブジェクトの型注釈には、メソッドの型注釈を書くこともできます。書き方はJavaScriptのメソッド構文に引数と戻り値の型注釈を加えたようなものになります。

```ts twoslash
let calculator: {
  sum(x: number, y: number): number;
};

calculator = {
  sum(x, y) {
    return x + y;
  },
};
```

メソッドの型注釈は関数構文の書き方もできます。

```ts twoslash
let calculator: {
  sum: (x: number, y: number) => number;
};
```

メソッド構文(method syntax)の型注釈と関数構文(function syntax)の型注釈は、基本的に同じ意味ですが、コンパイラーオプションの`strictFunctionTypes`を有効にした場合に関数構文の書き方は、メソッド引数のチェックが双変(bivariant)から共変(covariant)へと厳格になります。この詳細については`strictFunctionTypes`の説明を参照してください。

[strictFunctionTypes](../../tsconfig/strictfunctiontypes.md)

## オブジェクトの型推論

オブジェクトの値を変数宣言で代入する場合、型注釈を省略できます。値から型が自動的に判別されます。これを型推論といいます。

```ts twoslash
let box = { width: 1080, height: 720 };
//  ^?
```

メソッドを持つオブジェクトリテラルでも型推論が働きます。ただし、メソッドの場合は引数の型注釈は必要です。

```ts twoslash
let calculator = {
  sum(x: number, y: number) {
    return x + y;
  },
};
calculator;
// ^?
```

## `Record<Keys, Type>`

連想配列のようなキーバリューのオブジェクト型を定義する場合、ユーティリティ型の`Record`を使う方法もあります。

```ts twoslash
let foo: Record<string, number>;
foo = { a: 1, b: 2 };
```

[Record](../../type-reuse/utility-types/record.md)

## `object`型

オブジェクトの型注釈には`object`型を用いることもできます。

```ts twoslash
let box: object;
box = { width: 1080, height: 720 };
```

`object`型の使用はお勧めしません。第1の理由は、`object`型には何のプロパティがあるかの情報がないためです。そのため、`box.width`を参照するとコンパイルエラーになります。

```ts twoslash
// @errors: 2339
let box: object;
box = { width: 1080, height: 720 };
// ---cut---
box.width;
```

第2の理由はどんなオブジェクトでも代入できるからです。期待しない値も代入できてしまうので、コードの問題に気づきにくくなります。

```ts twoslash
let box: object;
box = { wtdih: 1080, hihget: 720 }; // スペルミス
```

オブジェクトを型注釈する場合は、`object`型はできるだけ使わずに、プロパティまで型を定義することをお勧めします。

<TweetILearned>

・TypeScriptでオブジェクトを型注釈するには、プロパティキーごとに型を定義する
例: { width: number; height: number}
・変数にオブジェクトを代入すると型推論が効く
・安全性の観点からobject型を用いるのは避ける

</TweetILearned>

## 関連情報

[object、Object、{}の違い](./difference-among-object-and-object.md)

[インターフェース (interface)](/reference/object-oriented/interface)
