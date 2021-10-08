# Mapped Type

インデックス型では設定時はどのようなキーも自由に設定できてしまい、アクセス時は毎回`undefined`かどうかの型チェックが必要です。入力の形式が決まっているのであればMapped typeの使用を検討できます。

Mapped typeは主にユニオン型と組み合わせて使います。先ほどシステムがサポートする言語を定義しました。

```typescript
type SystemSupportLanguage = 'en' | 'fr' | 'it' | 'es';
```

これをインデックス型と同じようにキーの制約として使用することができます。

```typescript
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

このように`Butterfly`を定義するとシステムがサポートしない言語、ここでは`de`が設定、使用できなくなります。

```typescript
const butterflies: Butterfly = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa',
  de: 'Schmetterling'
};
// Object literal may only specify known properties, and 'de' does not exist in type 'Butterfly'.
```

プロパティを読み取り専用にする`readonly`をそのオブジェクトのすべてのプロパティに適用する`Readonly<T>`というユーティリティ型があります。他にもユーティリティ型はありますが、それらについては専門のページがありますのでここでは割愛します。

{% page-ref page="utility-types/readonly.md" %}

`Readonly<T>`もこの機能で実現されています。`Readonly<T>`は次のように実装されています。

```typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

`keyof T`という見慣れない表現が登場しましたが、これはオブジェクトのキーをユニオン型に変更するものだと解釈してください。`keyof`の詳細は型演算子をご覧ください。

{% page-ref page="keyof-type-operator.md" %}

### インデックス型と異なるところ

Mapped typeはインデックス型と異なり`symbol`型もキーにすることができます。

```typescript
type Identifier = symbol | 1;
type Sample = {
  [P in Identifier]: string;
};

const sample: Sample = {
  [Symbol('thick')]: 'thin';
  1: 'pork';
};
```
