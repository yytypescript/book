---
sidebar_label: オブジェクト型のオプションプロパティ
---

# オブジェクト型のオプションプロパティ (optional property)

TypeScriptで、オブジェクトプロパティのオプショナルを型付けするには、プロパティ名の後ろに`?`を書きます。

```ts twoslash
let size: { width?: number };
```

オプションプロパティを持ったオブジェクト型には、そのオプションプロパティを持たないオブジェクトを代入できます。

```ts twoslash
let size: { width?: number };
// ---cut---
size = {}; // OK
```

また、オプションプロパティの値が`undefined`のオブジェクトも代入できます。

```ts twoslash
let size: { width?: number };
// ---cut---
size = { width: undefined }; // OK
```

しかし、オプションプロパティの値が`null`の場合は代入できません。

```ts twoslash
// @errors: 2322
let size: { width?: number };
// ---cut---
size = { width: null };
```

## 関連情報

[オプショナルチェーン (optional chaining)](optional-chaining.md)
