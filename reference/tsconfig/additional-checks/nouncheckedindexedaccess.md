# noUncheckedIndexedAccess

**リリースされたバージョン: 4.1**

インデックス型や配列で宣言されたオブジェクトが持つプロパティへのアクセスを厳密に評価します。

{% page-ref page="../../values-types-variables/object/index-signature/" %}

```typescript
type ObjectLiteralLike = {
  en: string;
  fr: string;
  it: string;
  [lang: string]: string;
};
type ArrayObjectLike = {
  0: string;
  1: string;
  [num: number]: string;
};

function log(s: string): void {
  console.log(s);
}

const butterfly: ObjectLiteralLike = {
  en: 'Butterfly',
  fr: 'Papillon',
  it: 'Farfalla',
  es: 'Mariposa'
};

const phoneticCodes: ArrayObjectLike = {
  0: 'alpha',
  1: 'bravo',
  2: 'charlie'
};

log(spanish);
log(third);
```

`ObjectLiteralLike, ArrrayObjectLike`は共に`string`型のプロパティを持つオブジェクトの型として宣言されています。

```typescript
const spanish: string = butterfly.es;
const third: string = phoneticCodes[2];
```

これらのオブジェクトのプロパティにアクセスするときは完全な型安全ではありません。このオプションを有効にすると次のようなエラーが発生します。

```typescript
error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

log(spanish);
    ~~~~~~~
error TS2345: Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  Type 'undefined' is not assignable to type 'string'.

log(third);
    ~~~~~
```

このように厳密に定義されていないプロパティは`undefined`型とのユニオン型として解釈されるようになります。

```typescript
const spanish: string | undefined = butterfly.es;
const third: string | undefined = phoneticCodes[2];
```

配列はインデックス記法でアクセスをすると`undefined`型とのユニオン型と解釈されますが`for-of, array.forEach()`はこの制約を受けないため積極的に使用を検討してください。

```typescript
const phoneticCodes: string[] = ['alpha', 'bravo', 'charlie'];

for (const p of phoneticCodes) {
  // ...
}

phoneticCodes.forEach((p: string) => {
  // ...
});
```

