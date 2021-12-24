# keyof型演算子

`keyof`はオブジェクト型からプロパティ名を型として返す型演算子です。たとえば、`name`プロパティを持つ型に対して、`keyof`を使うと文字列リテラル型の`"name"`が得られます。

```ts
type Person = {
  name: string;
};
type PersonKey = keyof Person;
// 上は次と同じ意味です
type PersonKey = "name";
```

2つ以上のプロパティがあるオブジェクト型に`keyof`を使った場合は、すべてのプロパティ名がユニオン型で返されます。

```ts
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;
// 上は次と同じ意味になる
type BookKey = "title" | "price" | "rating";
```

インデックス型に`keyof`を用いると、インデックスキーの型が返ります。

```ts
type MapLike = { [K: string]: any };
type MapKeys = keyof MapLike;
//=> string | number
```

キーが`string`のインデックス型は、`string`ではなく`string | number`が返ります。number型のキーアクセスの`obj[0]`は`obj["0"]`と同じになるからです。

mapped typeに`keyof`を用いると、そのキーの型が返ります。

```ts
type MapLike = { [K in "x" | "y" | "z"]: any };
type MapKeys = keyof MapLike;
//=> "x" | "y" | "z"
```

プロパティを持たないオブジェクト型に`keyof`を使うと`never`型が返ります。

```ts
type What = keyof {};
//=> never
```

`any`型に`keyof`を使うと`string | number | symbol`型が返ります。

```ts
type AnyKeys = keyof any;
//=> string | number | symbol
```

## keyofのメリット

`keyof`のメリットは、保守性が上がる点です。オブジェクト型とは別にプロパティ名のユニオン型を定義していると、オブジェクト型のプロパティを変更したときに、そのユニオン型のほうも修正が必要になります。`keyof`を使って、オブジェクト型からキーを導出するようにしておけば、変更箇所はオブジェクト型のところだけになります。

加えて、プロパティが何十個もあるようなオブジェクトを想像してみてください。そのプロパティ名のユニオン型を定義する必要が出てきたとします。その際に、プロパティ名をすべて転記するとなると、転記漏れや書き間違いもあるでしょう。そういう場合は`keyof`を使うとそもそも書き写す必要がないため、便利な上に安全なコーディングができます。

## keyofはmapped typeと一緒に使われる

keyofは単体で使うことよりmapped typeと組み合わせて使われることが多いです。

[マップ型 (mapped type)](mapped-types.md)
