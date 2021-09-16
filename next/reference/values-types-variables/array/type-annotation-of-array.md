# 🚧配列の型注釈

型は次の2とおりの表記方法があり、自由に選択できます。

```typescript
const array1: T[] = [];
const array2: Array<T> = [];
```

1番目の筆記方法を単にarrayと呼び、2番目の筆記方法をgenericと呼びます。差はなく、プロジェクトで統一して使えればいいかと思います。一般的なのはarrayです。本書も基本的にarrayでの記述となっています。  
JavaScriptのlinterとして有名なESLintでは、この筆記方法をどちらかに統一することを強制するオプションがあります。

`T`は使う時、つまりArrayが定義された時ではなく、使う時に型を決めることができるジェネリクスと呼ばれるものです。本書にも記載がありますのでそちらに詳細は譲りますが、この`T`はその配列が要素としてどの型を受けつけるかを示します。

TODO: ジェネリクスへのリンクを入れる

たとえば、以下は`T`を`number`とした例です。

```typescript
const array1: number[] = [1, 1.5, 2];
const array2: Array<number> = [1, 1.5, 2];
```

型を指定すれば、配列の要素はそれ以外を受け付けなくなります。あらかじめ要素が含まれる状態で初期化した時も、あとから追加する時も型のチェックが働きます。

```typescript
const array: number[] = [1, 'nu'];
// Type 'string' is not assignable to type 'number'.
```

```typescript
const array: number[] = [];

array.push('nu');
// Argument of type '"nu"' is not assignable to parameter of type 'number'.
```

## \`\`

