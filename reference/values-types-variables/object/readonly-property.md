# オブジェクト型のreadonlyプロパティ \(readonly property\)

TypeScriptでは、オブジェクトのプロパティを読み取り専用にすることができます。読み取り専用にしたいプロパティには`readonly`修飾子をつけます。読み取り専用のプロパティに値を代入しようとすると、TypeScriptコンパイラーが代入不可の旨を警告するようになります。

```typescript
let obj: {
  readonly foo: number;
};
obj = { foo: 1 };
obj.foo = 2;
//  ^^^ Cannot assign to 'foo' because it is a read-only property.(2540)
```

## readonlyは再帰的ではない

`readonly`は指定したそのプロパティだけが読み取り専用になります。`readonly`はそのオブジェクトが入れ子になっている場合、その中のオブジェクトのプロパティまでを`readonly`にはしません。つまり、再帰的なものではありません。

例えば、`foo`プロパティが`readonly`で、`foo.bar`プロパティが`readonly`でない場合、`foo`への代入はコンパイルエラーになるものの、`foo.bar`へ直接代入するのはコンパイルエラーになりません。

```typescript
let obj: {
  readonly foo: {
    bar: number;
  };
};
obj = {
  foo: {
    bar: 1,
  },
};
obj.foo = { bar: 2 };
//  ^^^ コンパイルエラー: Cannot assign to 'foo' because it is a read-only property.(2540)
obj.foo.bar = 2; // コンパイルエラーにはならない
```

再帰的にプロパティを読み取り専用にしたい場合は、子や孫の各プロパティに`readonly`をつけていく必要があります。

```typescript
let obj: {
  readonly foo: {
    readonly bar: number;
  };
};
```

## readonlyはコンパイル時のみ

`readonly`はTypeScriptの型の世界だけの概念です。つまり、読み取り専用指定を受けたプロパティがチェックを受けるのはコンパイル時だけです。コンパイルされた後のJavaScriptとしては、`readonly`がついていたプロパティも代入可能になります。

例えば、`foo`プロパティを`readonly`指定したコードで、`foo`に代入するコードはコンパイル時にはエラーとして検出されます。

```typescript
const obj: { readonly foo: number } = { foo: 1 };
obj.foo = 2; // コンパイルエラーになる
```

しかし、コンパイル後のJavaScriptコードでは、`readonly`の記述がなくなるので、実行時にエラーとして検出されることはありません。

{% code title="コンパイル後のJavaScriptコード" %}
```javascript
const obj = { foo: 1 };
obj.foo = 2; // 実行時エラーにはならない
```
{% endcode %}

実行時にチェックが無いことは一見すると危険そうですが、コンパイルエラーを無視せず、ちゃんと修正しておけば大きな問題になることはありません。

## すべてのプロパティを一括して読み取り専用にする方法

TypeScriptではプロパティを読み取り専用にするには、読み取り専用にしたい各プロパティにひとつひとつ`readonly`修飾子をつける必要があります。プロパティ数が多くなると`readonly`をつけていくのは記述量が多くなり手間です。

そういったケースではユーティリティ型の`Readonly`を使うのも手です。`Readonly`はプロパティをすべて読み取り専用にしてくれる型です。

```typescript
let obj: Readonly<{
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}>;
```

{% page-ref page="../../type-reuse/utility-types/readonly.md" %}

## 関連情報

{% page-ref page="../../object-oriented/class/readonly-modifier-in-classes.md" %}

{% page-ref page="../../object-oriented/interface/readonly-modifier-in-interfaces.md" %}

{% page-ref page="../array/readonly-array.md" %}

