# TypeScriptは何ではないか？

多くの開発者がTypeScriptを高く評価しています。そのような中、誤解の上にTypeScriptを過度に高評価する人もいます。TypeScriptも魔法の杖ではありません。本稿では、TypeScriptが何を解決してくれないのかを見ていきます。TypeScriptでできないことを無理にやらせようとしても、その努力は無駄になりますから、これを理解することは重要です。

## 実行時の高速化・省メモリ化に影響しない

しばしば、TypeScriptとJavaScriptを比較する話の中で、次のような言説が見られます。

- TypeScriptはJavaScriptより高速に実行できる
- TypeScriptはJavaScriptよりメモリ消費量が少ない

また逆に次のように心配されることもあります。

- TypeScriptはJavaScriptで書くより低速になるのでは？
- TypeScriptはJavaScriptよりメモリ消費量が大きいのでは？

結論を言うと、TypeScriptの実行時パフォーマンスはJavaScriptと同じです。これを理解するには、次の2つの前提をおさえておく必要がります。

1. TypeScriptのランタイムはない。
1. TypeScriptコンパイラは最適化しない。

### TypeScriptランタイムはない

TypeScriptにはランタイムがありません。どういうことかというと、TypeScriptを直接実行するエンジンがないということです。TypeScriptを開発しているMicrosoftのブラウザMicrosoft Edgeであっても、TypeScriptは実行できません。サーバーのNode.jsもそうです[^1]。TypeScriptで書いたコードを実行するには、一度JavaScriptコードに変換する必要があります。そのため、TypeScriptのパフォーマンスは、コンパイル後のJavaScriptがどうなっているかで決まるわけです。

[^1]: TypeScriptのランタイムを謳うDenoというサーバー環境があります。このDenoであっても、内部的にTypeScriptをJavaScriptにコンパイルし、それをJavaScriptエンジン上で実行しています。

### TypeScriptコンパイラは最適化しない

一般的に「コンパイラ」には、次の3つの仕事があると言われます。

1. ソースコードを解析し、問題点をチェックする
1. ソースコードを別の言語に変換する
1. 最適化する
   - 実行速度が速くなるようにする
   - 少ないメモリで動くようにする
   - 少ない電力で済むようにする
   - 実行ファイルのサイズを小さくする

このうち、TypeScriptコンパイラがするのは上の2つです。3つ目の最適化はしません。TypeScriptコンパイラは、基本的に型に関する部分を消すだけで、それ以外の部分はほぼそのままJavaScriptに変換します。

たとえば、次のようなTypeScriptコードをコンパイルすると、

```ts twoslash title="TypeScriptコード"
const oneDay: number = 60 * 60 * 24;
```

次のJavaScriptコードが生成されます。型注釈の`number`が消されただけです。

```js twoslash title="コンパイル後のJavaScriptコード"
const oneDay = 60 * 60 * 24;
```

この`60 * 60 * 24`の式は静的に計算できるものです。コンパイル時に計算して、次のようなJavaScriptを生成しておけば、実行時の余計な計算が不要になります。高速化に寄与します。

```js twoslash title="予め計算したJavaScriptコード"
const oneDay = 86400;
```

上のような最適化は技術的には可能なはずです。しかし、TypeScriptはこうした最適化は原則的に行いません。TypeScriptコンパイラがするのは基本的に型を外すだけです。

### 両者のパフォーマンスは基本的に同等

TypeScriptには次の特徴があることを見てきました。

1. TypeScriptのランタイムはない。
1. TypeScriptコンパイラは最適化しない。

この2つの特徴から、まったく同じロジックのコードをTypeScriptとJavaScriptで書いて比較したとき、その間には注意が必要なほどのパフォーマンスの違いはないと考えて差し支えありません[^2]。

[^2]: 厳密に言うと、コンパイラオプション`target`を`es3`(古いJavaScript)に指定するなどで、「単に型を消すだけ」のコンパイルではなくなる場合もあるので常に同等が保証されているわけではありません。

## JavaScriptの仕様バグは修正しない

JavaScriptには元々バグだったものが仕様に変わった例があります。たとえば、値の型を調べる[typeof演算子]は、`null`を渡すと`"object"`が返ります。これはバグと考えられていましたが、後方互換性のため修正されることなく仕様になりました。

[typeof演算子]: ../reference/values-types-variables/typeof-operator.md

```js twoslash
typeof null;
// @log: "object"
```

TypeScriptでも、こうした仕様バグは修正されていません。なぜかというと、TypeScriptはあくまでJavaScriptに型をプラスした言語というスタンスだからです。

<TweetILearned>

TypeScriptが解決しないこと

・JavaScriptの実行時パフォーマンス改善
・JSの仕様バグの解決

</TweetILearned>
