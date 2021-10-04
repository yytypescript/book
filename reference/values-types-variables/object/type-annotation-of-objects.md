# 🚧オブジェクトの型注釈 \(type annotation\)

TypeScriptでオブジェクトの型注釈は、JavaScriptオブジェクトリテラルのような書き方で、オブジェクトプロパティをキーと値の型のペアを書きます。

```typescript
let box: { width: number; height: number };
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^型注釈
box = { width: 1080, height: 720 };
```

プロパティの区切り文字には、オブジェクトリテラルのようにカンマ`,`も使えますが、セミコロン`;`を用いるほうを推奨します。理由は、コード整形ツールPrettierがオブジェクト型注釈を直すとき、カンマをセミコロンに置き換えるためです。

オブジェクトの型注釈は途中で改行することもできます。改行した場合、プロパティの区切り文字は省略できます。

```typescript
let box: {
  width: number;
  height: number;
};
```

## メソッドの型注釈

オブジェクトの型注釈には、メソッドの型注釈を書くこともできます。書き方はJavaScriptのメソッド構文に引数と戻り値の型注釈を加えたようなものになります。

```typescript
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

```typescript
let calculator: {
  sum: (x: number, y: number) => number;
};
```

メソッド構文\(method syntax\)の型注釈と関数構文\(function syntax\)の型注釈は、基本的に同じ意味ですが、コンパイラーオプションの`strictFunctionTypes`を有効にした場合に関数構文の書き方は、メソッド引数のチェックが双変\(bivariant\)から共変\(covariant\)へと厳格になります。この詳細については`strictFunctionTypes`の説明を参照してください。

{% page-ref page="../../tsconfig/strict-type-checks/strictfunctiontypes.md" %}

## Record

TODO: Recordを用いたオブジェクト型の書き方も紹介する
