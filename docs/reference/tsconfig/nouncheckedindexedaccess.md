---
description: インデックス型のプロパティや配列要素を参照したときundefinedのチェックを必須にする
---

# noUncheckedIndexedAccess

`noUncheckedIndexedAccess`はインデックス型のプロパティや配列要素を参照したときundefinedのチェックを必須にするコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 4.1

## 解説

インデックス型や配列で宣言されたオブジェクトが持つプロパティへのアクセスを厳密に評価します。

[インデックス型 (index signature)](../values-types-variables/object/index-signature.md)

```ts
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
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

const phoneticCodes: ArrayObjectLike = {
  0: "alpha",
  1: "bravo",
  2: "charlie",
};

log(spanish);
log(third);
```

`ObjectLiteralLike, ArrayObjectLike`は共に`string`型のプロパティを持つオブジェクトの型として宣言されています。

```ts
const spanish: string = butterfly.es;
const third: string = phoneticCodes[2];
```

これらのオブジェクトのプロパティにアクセスするときは完全な型安全ではありません。このオプションを有効にすると次のようなエラーが発生します。

```text
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

```ts
const spanish: string | undefined = butterfly.es;
const third: string | undefined = phoneticCodes[2];
```

配列はインデックス記法でアクセスをすると`undefined`型とのユニオン型と解釈されますが`for-of, array.forEach()`はこの制約を受けないため積極的に使用を検討してください。

```ts
const phoneticCodes: string[] = ["alpha", "bravo", "charlie"];

for (const p of phoneticCodes) {
  // ...
}

phoneticCodes.forEach((p: string) => {
  // ...
});
```
