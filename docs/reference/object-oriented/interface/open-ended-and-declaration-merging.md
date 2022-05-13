---
sidebar_label: "\U0001F6A7open-endedと宣言マージ"
---

# 🚧open-endedと宣言マージ(declaration merging)

インターフェースのみができる機能で、もっともタイプエイリアスと異なる特徴です。

JavaScriptがES2015, ES2016, ES2017, ES2018, ES2019と進化するにつれ、既存のクラスにもメソッドが追加されることもあります。たとえば`Array`クラスはES2016で`array.includes()`が、ES2019で`array.flatMap()`が追加されました。

インターフェースではバージョンごとにメソッドの`Array`のインターフェースをファイルを分けて定義して、環境に応じて読み込むファイルを変えるだけで`Array`の型定義ができます。

```ts title="ES2016.array.ts" twoslash
interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}
```

```ts title="ES2019.array.ts" twoslash
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

もしこれをタイプエイリアスでやるとすれば、次のようになるでしょう。最終的な成果物が`Array`となる必要があるため、それまで別の名前で定義して、最後にインターセクション型を使い合成して`Array`を作り出す必要があります。

```ts twoslash
import fs from "fs";

type ES2016Array<T> = {
  [key in number]: T;
};
type ES2019Array<T> = {
  [key in number]: T;
};
// ---cut---
type Array<T> = ES2016Array<T> & ES2019Array<T>;
```

このDeclaration mergingの機能は`ポリフィル`を行うパッケージの型定義でよく見ることができます。
