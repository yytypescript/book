# インデックス型 \(Index signature\)

オブジェクトのキーをあえて指定せず、プロパティのみを指定したい場合があります。そのときに使えるのがこのインデックス型です。  
プロパティがすべて`string`型であるようなオブジェクトのタイプエイリアスは以下です。

```typescript
type Butterfly = {
  [key: string] : string;
};
```

キーを表している変数`key`は別名でも構いません。

もちろんこの`Butterfly`にはプロパティが`string`型であればなんでも入ります。

```typescript
const butterflies: Butterfly = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa',
  de: 'Schmetterling'
};
```

この型の変数を利用する時、どのキーも存在するものとして扱われます。存在しないキーを指定してもエラーが発生することなく`undefined`を返します。またTypeScriptによる入力補完も働きません。

```typescript
butterflies.ja;
// -> undefined
```

このチェックをより厳密にするオプションがtsconfig.jsonにあります。このオプションを有効にするとたとえプロパティがあるキーにアクセスしてもプロパティの型は`undefined`とのユニオン型であると解釈されるようになります。こちらについてはtsconfig.json Deep Diveのページをご覧ください。

{% page-ref page="../../../../features/tsconfig.json-deep-dive.md" %}

### インデックス型の制限

インデックス型は`string`型、`number`型しか指定できません。

```typescript
type Jekyll = {
};
// An index signature parameter type must be either 'string' or 'number'.
```

ちなみに`number`型のキーを持つオブジェクトとは配列のようなオブジェクトのことです。

