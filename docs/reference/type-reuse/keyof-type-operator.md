# keyof型演算子

`keyof`はオブジェクトの型からプロパティ名を型として返す型演算子です。たとえば、`name`プロパティを持つ型に対して、`keyof`を使うと文字列リテラル型の`"name"`が得られます。

```ts twoslash
type Person = {
  name: string;
};
type PersonKey = keyof Person;
//    ^?
```

2つ以上のプロパティがあるオブジェクトの型に`keyof`を使うと、各プロパティ名の文字列リテラル型が`|`で結合されたユニオン型が返されます。

```ts twoslash
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;
//   ^?
// 上は次と同じ意味になる
// type BookKey = "title" | "price" | "rating";
```

インデックス型に`keyof`を使うと、インデックスキーの型が返ります。

```ts twoslash
type MapLike = { [K: string]: any };
type MapKeys = keyof MapLike;
//    ^?
```

キーが`string`のインデックス型は、`string`ではなく`string | number`が返ります。number型のキーアクセスの`obj[0]`は`obj["0"]`と同じになるからです。

Mapped Typesに`keyof`を使うと、そのキーの型が返ります。

```ts twoslash
type MapLike = { [K in "x" | "y" | "z"]: any };
type MapKeys = keyof MapLike;
//    ^?
```

プロパティを持たないオブジェクトの型に`keyof`を使うと`never`型が返ります。

```ts twoslash
type What = keyof {};
//   ^?
```

`any`型に`keyof`を使うと`string | number | symbol`型が返ります。

```ts twoslash
type AnyKeys = keyof any;
//    ^?
```

## keyofのメリット

`keyof`のメリットは、保守性が上がる点です。オブジェクトの型とは別にプロパティ名のユニオン型を定義していると、オブジェクトの型のプロパティを変更したときに、そのユニオン型のほうも修正が必要になります。`keyof`を使って、オブジェクトの型からキーを導出するようにしておけば、変更箇所はオブジェクトの型のところだけになります。

加えて、プロパティが何十個もあるようなオブジェクトを想像してみてください。そのプロパティ名のユニオン型を定義する必要が出てきたとします。その際に、プロパティ名をすべて転記するとなると、転記漏れや書き間違いもあるでしょう。そういう場合は`keyof`を使うとそもそも書き写す必要がないため、便利な上に安全なコーディングができます。

## keyofはMapped Typesと一緒に使われる

keyofは単体で使うことよりMapped Typesと組み合わせて使われることが多いです。

[マップ型 (Mapped Types)](mapped-types.md)
