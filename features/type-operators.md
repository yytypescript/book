# 型演算子

### 型演算子とは

TypeScriptには使用すると型を取得する演算子が存在します。これを型演算子と言います。

### `typeof`

`typeof`は変数から型を抽出する演算子です。次は、変数`point`に`typeof`演算子を用いて、`Point`型を定義する例です。

```typescript
const point = { x: 135, y: 35 };
type Point = typeof point;
```

このPoint型は次のような型になります。

```typescript
type Point = {
    x: number;
    y: number;
}
```

{% hint style="info" %}
#### JavaScriptのtypeof演算子

ここで説明したのはTypeScriptの`typeof`演算子です。JavaScriptの`typeof`演算子と同じ名前ですが、全く別のものなので注意してください。JavaScriptのtypeofの説明は[JavaScript再入門の章](../revisiting-javascript/javascript-types.md#typeof-operator)をご覧ください。
{% endhint %}

### `keyof`

`keyof`はオブジェクト型からプロパティ名を型として返す型演算子です。例えば、`name`プロパティを持つ型に対して、`keyof`を使うと文字列リテラル型の`"name"`が得られます。

```typescript
type Person = {
	name: string;
};
type PersonKey = keyof Person;
// 上は次と同じ意味です
type PersonKey = "name";
```

2つ以上のプロパティがあるオブジェクト型に`keyof`を使った場合は、すべてのプロパティ名がユニオン型で返されます。

```typescript
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;
// 上は次と同じ意味になる
type BookKey = "title" | "price" | "rating";
```

`keyof`のメリットは、保守性が上がる点です。オブジェクト型とは別にプロパティ名のユニオン型を定義していると、オブジェクト型のプロパティを変更したときに、そのユニオン型のほうも修正が必要になります。`keyof`を使って、オブジェクト型からキーを導出するようにしておけば、変更箇所はオブジェクト型のところだけになります。

加えて、プロパティが何十個もあるようなオブジェクトを想像してみてください。そのプロパティ名のユニオン型を定義する必要が出てきたとします。その際に、プロパティ名をすべて転記するとなると、転記漏れや書き間違いもあるでしょう。そういう場合は`keyof`を使うとそもそも書き写す必要がないため、便利な上に安全なコーディングができます。

