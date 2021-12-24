# オブジェクトからキーの型を生成する

## オブジェクトからキーだけ欲しい

あるメッセージが言語ごとに定義されているとします。

```ts
const conf = {
  en: "Are you sure?",
  fr: "Êtes-vous sûr?",
  es: "Está seguro?",
  ja: "よろしいですか？",
  zh: "您确定吗？",
};
```

内容は確認を促す変哲もないシステムのメッセージです。このオブジェクトを使ってシステムがサポートしている言語の一覧を作ります。次のようなユニオン型が今回の目的です。

```ts
type Language = "en" | "fr" | "es" | "ja" | "zh";
```

### `typeof`

頻出するこの`typeof`はJavaScriptのものではなく、TypeScriptの`typeof`です。これをオブジェクトに対して使用している例は前のページにあるとおりです。

[オブジェクトから型を生成する](generates-type-from-object.md)

この例で実行すれば次のような型`TypeOfLanguage`が生成されるでしょう (型名は便宜的なものです) 。

```ts
type TypeOfLanguage = typeof conf;
// ->
// {
//   en: string,
//   fr: string,
//   es: string,
//   ja: string,
//   zh: string
// };
```

ここまでくればあとは少しです。`TypeOfLanguage`型のキーだけを型にしてしまいます。

### `keyof`

`keyof`はオブジェクトの型に使うとそのオブジェクトのキーをユニオン型にして返します。上記の`TypeOfLanguage`型があれば

```ts
type Language = keyof TypeOfLanguage;
// -> 'en' | 'fr' | 'es' | 'ja' | 'zh';
```

となります。

[keyof型演算子](../reference/type-reuse/keyof-type-operator.md)

## まとめ

見た目が少々いびつですが、次でオブジェクトから希望するキーのユニオン型を生成できます。

```ts
type Language = keyof typeof conf;
```

### 疑問: `keyof conf`じゃダメなんですか？

動作しません。なぜなら`keyof`は値ではなく (オブジェクトの) 型に対して使用できるからです。一方`typeof`は値から型を生成するのでこの順番で使用する必要があります。
