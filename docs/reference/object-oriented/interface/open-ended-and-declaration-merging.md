---
sidebar_label: "オープンエンドと宣言マージ"
---

# オープンエンドと宣言マージ (open-ended and declaration merging)

JavaやPHPなど、他の言語にもinterface構文がある言語があります。他の言語とは異なり、TypeScriptのinterfaceには、オープンエンド(open-ended)と宣言マージ(declaration merging)という珍しい特徴があります。

## オープンエンドと宣言マージとは

他の言語のinterface構文は、同じ名前のインターフェースを宣言するとエラーになるものが多いです。たとえば、PHPで`Foo`インターフェースを2つ宣言すると、重複エラーになります。

```php title="PHP"
interface Foo {}
interface Foo {}
// Fatal error:  Cannot declare interface Foo, because the name is already in use in...
```

TypeScriptでは、同じ名前のインターフェースを宣言してもエラーにはなりません。

```ts twoslash
interface Foo {}
interface Foo {} // エラーにならない
```

このように、複数のインターフェースを宣言してもエラーにならない仕様のことを、オープンエンドといいます。

同じ名前のインターフェースを宣言した場合、それぞれのインターフェースの型がマージされます。たとえば、次のようにプロパティ`a`を持つインターフェースと、プロパティ`b`を持つインターフェースを宣言した場合を考えてみましょう。

```ts twoslash
interface Foo {
  a: number;
}
interface Foo {
  b: number;
}
```

この宣言は、次のようにプロパティ`a`とプロパティ`b`を持つインターフェースを、ひとつ定義したことと同じことになります。

```ts twoslash
interface Foo {
  a: number;
  b: number;
}
```

このように、同じ名前のインターフェースがマージされる仕組みを宣言マージといいます。

## 宣言マージの活用シーン

JavaScriptがアップデートされるにつれ、既存のクラスにもメソッドが追加されることがあります。たとえば`Array`クラスはES2016で`includes()`メソッドが、ES2019で`flatMap()`メソッドが追加されました。

TypeScriptの開発元は、JavaScriptのアップデートに合わせて、`Array`インターフェースの型定義も対応していく必要があります。単純に考えると、JavaScriptのバージョンごとに、`Array`インターフェースを独立して定義する方法が考えられます。

このアプローチは、一見すると良さそうです。しかし、よく考えてみると、JavaScriptがアップデートされるにつれ、インターフェースのコピペコードが増えていくという問題が出てきます。ES2015とES2016の`Array`の違いは、`includes()`メソッドがあるかないかの違いだけです。それなのに、`pop()`メソッドや`push()`メソッドといった多数のメソッドまでコピーしないといけなくなってしまいます。

これを解決するのが宣言マージです。TypeScriptの開発元が、どのように宣言マージを活用しているのか、具体例を見てみましょう。まず、もっとも古いバージョンの`Array`インターフェースを宣言した型定義ファイルを用意します。

```ts twoslash title="最も古いバージョンのArrayインターフェース"
interface Array<T> {
  pop(): T | undefined;
  push(...items: T[]): number;
  concat(...items: ConcatArray<T>[]): T[];
  // ...その他沢山のメソッドが続く...
}
```

次に、ES2016で追加されたメソッドに対応する`Array`インターフェースを別ファイルに作ります。

```ts title="ES2016.array.d.ts" twoslash
interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}
```

さらに、ES2019で追加されたメソッドに対応する型定義ファイルも別に作ります。

```ts title="ES2019.array.d.ts" twoslash
interface Array<T> {
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
}
```

このようにバージョン間の差分だけを、インターフェースに定義していくと、JavaScriptのバージョンが上がっていっても、コピペコードが発生しません。

TypeScriptユーザーは、自分が必要なJavaScriptのバージョンに応じて、これらのファイルを読み込むことで、最適なインターフェースの型が使えるようになります。たとえば、ES2016のJavaScript環境を対象に開発しているなら、ES2016までの型定義ファイルまで読み込むようにします。ES2019の環境を対象とするなら、ES2016とES2019両方の型定義ファイルを読み込むといった具合です。

この例のように、すでに宣言したインターフェースは直せないが、インターフェースを拡張する必要がある場合に、宣言マージが活用されます。
