# noPropertyAccessFromIndexSignature

リリースされたバージョン: 4.2

`noUncheckedIndexedAccess`と同様にインデックス型を持つオブジェクトに対する型評価です。インデックス型に対するアクセスをインデックス記法に強制します。

ドット記法とインデックス記法についてですが、次のようにあるオブジェクトがあるとしてドット(`.`)でプロパティアクセスをしているものがドット記法、ブラケット(`[]`)でアクセスをしているものがインデックス記法です。

```typescript
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

```typescript
console.log(butterfly.fr);
```

存在が不確かなプロパティへのアクセスについて、ドット記法でアクセスするときに、このオプションを有効にすると次のようなエラーが発生します。

```text
error TS4111: Property 'fr' comes from an index signature, so it must be accessed with ['fr'].

console.log(butterfly.fr);
                      ~~
```

このようにインデックス型へのドット記法でのアクセスが禁止されます。
