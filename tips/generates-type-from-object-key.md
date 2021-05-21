# オブジェクトからキーの型を生成する

## オブジェクトからキーだけ欲しい

あるメッセージが言語ごとに定義されているとします。

```typescript
const confirm = {
  en: 'Are you sure?',
  fr: 'Êtes-vous sûr?',
  es: 'está seguro?',
  ja: 'よろしいですか？',
  zh: '您确定吗？'
};
```

内容は確認を促す変哲もないシステムのメッセージです。このオブジェクトを使ってシステムがサポートしている言語の一覧を作ります。以下のようなユニオン型が今回の目的です。

```typescript
type Language = 'en' | 'fr' | 'es' | 'ja' | 'zh';
```

### `typeof`

頻出するこの `typeof` はJavaScriptのものではなく、TypeScriptの `typeof` です。これをオブジェクトに対して使用している例は前のページにある通りです。

{% page-ref page="generates-type-from-object.md" %}

この例で実行すれば次のような型 `TypeOfLanguage` が生成されるでしょう \(型名は便宜的なものです\) 。

```typescript
type TypeOfLanguage = typeof confirm;
// ->
// {
//   en: string,
//   fr: string,
//   es: string,
//   ja: string,
//   zh: string
// };
```

ここまでくればあとは少しです。 `TypeOfLanguage` 型のキーだけを型にしてしまいます。

### `keyof`

タイプエイリアスで紹介したMapped Typeを使用します。

{% page-ref page="../features/type-aliases.md" %}

`kyeof` はオブジェクトの型に使うとそのオブジェクトのキーをユニオン型にして返します。上記の `TypeOfLanguage` 型があれば

```typescript
typeof Langauge = keyof TypeOfLanguage;
// -> 'en' | 'fr' | 'es' | 'ja' | 'zh';
```

となります。

## まとめ

見た目が少々いびつですが、以下でオブジェクトから希望するキーのユニオン型を生成できます。

```typescript
type Language = keyof typeof confirm;
```

### 疑問: `keyof confirm` じゃダメなんですか？

動作しません。なぜなら `keyof` は値ではなく \(オブジェクトの\) 型に対して使用できるからです。一方 `typeof` は値から型を生成するのでこの順番で使用する必要があります。

