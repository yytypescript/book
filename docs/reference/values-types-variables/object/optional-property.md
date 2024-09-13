---
sidebar_label: オブジェクト型のオプションプロパティ
---

# オブジェクトの型のオプションプロパティ (optional property)

TypeScriptで、オブジェクトプロパティのオプショナルを型付けするには、プロパティ名の後ろに`?`を書きます。

```ts twoslash
type Size = {
  width?: number;
};
```

オプションプロパティを持ったオブジェクトの型には、そのオプションプロパティを持たないオブジェクトを代入できます。

```ts twoslash
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {}; // OK
```

また、オプションプロパティの値が`undefined`のオブジェクトも代入できます。

```ts twoslash
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: undefined,
}; // OK
```

しかし、オプションプロパティの値が`null`の場合は代入できません。

```ts twoslash
// @errors: 2322
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: null,
};
```

ただし`strictNullChecks`を無効にしている場合は`null`も代入できるようになります。

```ts twoslash title="strictNullChecksがfalseの場合"
// @strictNullChecks: false
type Size = {
  width?: number;
};
// ---cut---
const size: Size = {
  width: null,
};
```

## 関連情報

[オプショナルチェーン (optional chaining)](optional-chaining.md)

[strictNullChecks](../../../reference/tsconfig/strictnullchecks.md)
