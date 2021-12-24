---
sidebar_label: ジェネレーター
---

# ジェネレーター (generator)

Generatorを使用した関数はアロー関数での表記ではなく、必ず`function*() {}`と書く必要があります。次は可能なGeneratorの記述方法です。

```ts
function* generatorFunction1() {
  // ...
}

const generatorFunction2 = function* () {
  // ...
};

class GeneratorSample {
  public *generatorFunction3() {
    // ...
  }
}
```

Generatorは反復可能(`Iterable<T>`)な反復子(`Iterator<T>`)であるインターフェース`IterableIterator<T>`を実装したクラスのオブジェクトのことです。条件を満たしたクラスはGenerator関数の中で`yield`キーワードを使えます。`yield`は呼ばれたときに一度その値を呼び出し元へ返却し、次に呼ばれたときはその続きから処理を開始します。

`Promise`が一般化する以前、非同期処理を代わりに担当する目的でGeneratorが使われていたことはありますが、前述の`Promise`に加えて`async / await`が一般的に使われるようになってから非同期処理の目的でGeneratorを使う機会は減りました。現在でも大量のデータを取得したいときに一度ではなく、小出しに取得したいときにGeneratorは使い道があります。
