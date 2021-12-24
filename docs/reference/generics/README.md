---
sidebar_label: ジェネリクス
slug: /reference/generics
---

# ジェネリクス (generics)

型の安全性とコードの共通化の両立は難しいものです。あらゆる型で同じコードを使おうとすると、型の安全性が犠牲になります。逆に、型の安全性を重視しようとすると、同じようなコードを量産する必要が出てコードの共通化が達成しづらくなります。こうした問題を解決するために導入された言語機能がジェネリクスです。ジェネリクスを用いると、**型の安全性とコードの共通化を両立する**ことができます。

## ジェネリクスが解決する問題

ジェネリクスが具体的にどのような問題を解決するのか見ていきましょう。ここに、`chooseRandomlyString()`という普通の関数があります。この関数は、2つの文字列を引数に受け取り、五分五分の確率で第1引数か第2引数の値を抽選して返します。

```ts
function chooseRandomlyString(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}
```

`chooseRandomlyString`は文字列の抽選に限っては、この関数を再利用していくことができます。

```ts
const winOrLose = chooseRandomlyString("勝ち", "負け");
```

次に、文字列だけでなく数値の抽選も同じロジックで行う必要が出てきたと考えてみましょう。`chooseRandomlyString()`は文字列にしか対応していないので、数値用の関数を新設しないとなりません。

```ts
// 数値用の抽選関数
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
const num: number = chooseRandomlyNumber(1, 2);
```

さらに、五分五分抽選のロジックは汎用的なので、広告のA/Bテストのために`URL`オブジェクト向けの実装も作ることになりました。

```ts
// URLオブジェクト向けの抽選関数
function chooseRandomlyURL(v1: URL, v2: URL): URL {
  return Math.random() <= 0.5 ? v1 : v2;
}
const url: URL = chooseRandomlyURL(urlA, urlB);
```

ここまでで、`chooseRandomly()`関数は二度複製され、型だけが異なる同じ関数が3つもできてしまいました。

```ts
// 重複した3つの関数
function chooseRandomlyString(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomlyURL(v1: URL, v2: URL): URL {
  return Math.random() <= 0.5 ? v1 : v2;
}
```

では、コードを共通化するにはどうしたらいいのでしょうか？まず考えられる方法としては、型を`any`にしてしまう方法です。この方法の問題点としては、戻り値の型も`any`になってしまうため、コンパイラのチェックが行われなくなり、バグを生みやすくなることです。つまり、型の安全性が損なわれるということです。

下のサンプルコードでは、`chooseRandomly()`に`number`型を渡していますが、戻り値は`string`型のつもりで扱っています。このコードはコンパイルエラーにはなりませんが、コンパイル後のコードを実行してみると5行目で「TypeError: str.toLowerCase is not a function」というエラーが発生します。

```ts
function chooseRandomly(v1: any, v2: any): any {
  return Math.random() <= 0.5 ? v1 : v2;
}
let str = chooseRandomly(0, 1);
str = str.toLowerCase();
```

コードの共通化と型の安全性の両方を達成するにはどうしたらいいのでしょうか？ここで、役に立つのがジェネリクスです。ジェネリクスの発想は実はとてもシンプルで、「型も変数のように扱えるようにする」というものです。どういうことでしょうか？先に取り上げた重複した3つの関数を「どの部分がそれぞれ異なっているのか？」という視点で見てみましょう。すると、次のように`<>`で強調した部分が違うことに気がつくはずです。それ以外はまったく同じコードです。

```ts
function chooseRandomly<String>(v1: <string>, v2: <string>): <string> {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomly<Number>(v1: <number>, v2: <number>): <number> {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomly<URL>(v1: <URL>, v2: <URL>): <URL> {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<String>("勝ち", "負け");
chooseRandomly<Number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

このそれぞれ違う部分は型に関するところです。この部分を変数のように扱いたいとしたら、ジェネリクスの文法を知らなくても、プログラマーなら次のようなコードを想像するのではないでしょうか？

```ts
// 注意: これは架空の文法です
function chooseRandomly<type>(v1: <type>, v2: <type>): <type> {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<string>("勝ち", "負け");
chooseRandomly<number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

`<type>`に置き換えたところが「型の引数」を表した部分です。値の引数と同様に、この例では型も引数なので`chooseRandomly()`関数を呼び出すときは、`chooseRandomly<string>`のように型を関数に渡します。型をまるで引数のように扱ったコードがここで誕生したわけです。「ジェネリクスは、型も変数のように扱えるようにすること」だと説明しましたが、もうその意味がお分かりなのではないでしょうか。

上のコードは、あくまでジェネリクスの発想を理解するためにでっち上げた架空のコードでした。このままではTypeScriptは理解できないので、TypeScriptのジェネリクスの文法で書き直してみましょう。架空のコードともそこまでかけ離れてはいません。次のように書きます。

```ts
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<string>("勝ち", "負け");
chooseRandomly<number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

`chooseRandomly`の`<T>`は型変数名の定義です。慣習として`T`がよく使われますが、`A`でも`Type`でも構いません。関数の引数の型や戻り値の型として書かれた`T`は型変数を参照しています。

先ほどコンパイル時には気づけなかったバグコードに、ジェネリクス化した`chooseRandomly`を使ってみましょう。すると、「Argument of type '0' is not assignable to parameter of type 'string'.」というコンパイルエラーが発生するようになり、`string`型を入れなければならないところに`0`を代入しているバグに気づくことができるようになりました。

```ts
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}
let str = chooseRandomly<string>(0, 1); // コンパイルエラー
str = str.toLowerCase();
```

これまでで、ジェネリックではない関数たちを共通化した上で、さらに型の安全性を確保していく過程を見ながら、ジェネリクスが解決する問題点について説明してきました。ジェネリクスはコードの共通化と型の安全性を両立してくれる言語機能です。汎用的なコードをさまざまな型で使えるようにしたい際に、ジェネリクスを使うことを考えてみてください。

## まとめ

- コードの共通化すると、型の安全性が弱まる。
- 型の安全性を高めると、コードの共通化が難しくなる。
- ジェネリクスは、コードの共通化と型の安全性を両立するための言語機能。
- ジェネリクスは、型も引数のように扱うという発想。
