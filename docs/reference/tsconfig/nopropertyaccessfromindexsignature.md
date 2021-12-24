---
description: インデックス型のプロパティ参照に[]を必須にする
---

# noPropertyAccessFromIndexSignature

`noPropertyAccessFromIndexSignature`はインデックス型のプロパティ参照に`[]`を必須にするコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 4.2

## 解説

`noUncheckedIndexedAccess`と同様にインデックス型を持つオブジェクトに対する型評価です。インデックス型に対するアクセスをインデックス記法に強制します。

ドット記法とインデックス記法についてですが、次のようにあるオブジェクトがあるとしてドット(`.`)でプロパティアクセスをしているものがドット記法、ブラケット(`[]`)でアクセスをしているものがインデックス記法です。

```ts
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

// dot syntax
butterfly.en;
// indexed syntax
butterfly["en"];
```

`SystemTerms`は`noUncheckedIndexedAccess`にて登場した型と同じものでシステムにおける単語、用語のうち英語は担保し他言語の存在は曖昧なものにしています。

```ts twoslash
type SystemTerms = {
  en: string;
  [key: string]: string;
};

const butterfly: SystemTerms = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};
// ---cut---
console.log(butterfly.fr);
// @log: "Papillon"
```

存在が不確かなプロパティへのアクセスについて、ドット記法でアクセスするときに、このオプションを有効にすると次のようなエラーが発生します。

```text
error TS4111: Property 'fr' comes from an index signature, so it must be accessed with ['fr'].

console.log(butterfly.fr);
                      ~~
```

このようにインデックス型へのドット記法でのアクセスが禁止されます。
