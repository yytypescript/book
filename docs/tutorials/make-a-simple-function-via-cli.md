# 簡単な関数を作ってみよう

このチュートリアルではTypeScriptで簡単な関数を作る体験を通じて、TypeScriptの型がJavaScriptのどのような問題を解決するのか、コンパイラはどのような役割を果たすのかを学びます。

## このチュートリアルに必要なもの

このチュートリアルをやるに当たり、必要なツールがあります。次にリストアップするものを準備しておいてください。

- Node.js
- VS CodeやWebStormなどのエディター
- tsc(TypeScriptコンパイラ)

[開発環境の準備](./setup.md)

## JavaScriptで発生しうる問題

まず、次のJavaScriptファイルをローカル環境に作ります。

```js title="increment.js"
function increment(num) {
  return num + 1;
}

console.log(increment(999));
```

このプログラムは引数をインクリメントして返すだけのものです。これをNode.jsで実行してみましょう。

```sh
$ node increment.js
1000
```

問題なく動いたと思います。つづいて、`increment`関数の引数を`999`から文字列型の`"999"`に書き換えてみましょう。

```js title="increment.js"
function increment(num) {
  return num + 1;
}

console.log(increment("999"));
//                    ^^^^^
```

この小さな変更で実行結果は大きく変わってしまいます。実行してみましょう。

```sh
$ node increment.js
9991
```

出力結果は1000から9991に変わったはずです。この理由は、引数`num`が文字列になったせいで、`+`演算子が足し算ではなく文字列結合になったからです。JavaScriptは`"999" + 1`を`"999" + "1"`と解釈します。この解釈の詳細を知るには型強制の説明をご覧ください。

[型強制](../reference/values-types-variables/type-coercion.md)

引数は`999`と`"999"`という型の微妙な違いだけです。もしもこれが金額の計算だったら大問題です。`increment`関数は引数`num`が数値型のときだけ正しい動きをします。しかし、関数を呼び出すときは、制約なしにさまざまな型を渡せてしまいます。引数に数値型のみ代入できるように制約するには、どのようにしたらよいのでしょうか。ここでTypeScriptの出番になります。

## JavaScriptをTypeScriptに変換する

JavaScriptをTypeScriptにする第一歩は、ファイルの拡張子を`.js`から`.ts`に変更することです。TypeScriptはざっくり言って、JavaScriptに型関連の構文を追加したにすぎない言語です。なので、JavaScriptのコードはそのままでもTypeScriptとして扱えます。

```sh
mv increment.js increment.ts
```

## コンパイラを働かせる

TypeScriptの目玉機能はなんと言ってもコンパイラです。コンパイラの役割のひとつは、上例のような型の問題をチェックし、発見した問題点をプログラマに報告することです。TypeScriptコンパイラはとても賢く、ノーヒントでも型の問題を指摘してくれます。しかし、ヒントを十分に与えたほうが、コンパイラはもっと緻密なチェックをしてくれます。

コンパイラに与えるヒントのことを「型注釈(type annotation)」と言います。それでは、`increment`関数の引数`num`に型注釈を書いてみましょう。型注釈は`num`の右に`: number`と書きます。これを書くことで「引数`num`は数値型だけが代入できます」という意味になります。コンパイラはこれをヒントに関数呼び出しコードをチェックするようになります。

<!--prettier-ignore-->
```ts twoslash {1,2} title="increment.ts"
// @noErrors
function increment(num: number) {
//                 ^^^^^^^^型注釈
  return num + 1;
}

console.log(increment("999"));
```

型注釈を書いたら、TypeScriptコンパイラにチェックをさせてみましょう。TypeScriptコンパイラのコマンドは`tsc`です。

```sh
tsc increment.ts
```

すると、次のエラーが報告されるはずです。

```ts twoslash {1,2}
// @errors: 2345
function increment(num: number) {
  return num + 1;
}
// ---cut---
console.log(increment("999"));
```

このエラーの内容は、「引数`num`は数値型しか代入できないはずだが、関数呼び出しでは文字列型を代入している。本当に問題ないか？」という指摘です。

エラーというと望まれないものというイメージがあるかもしれません。しかし、コンパイラが報告するエラーはむしろ歓迎されるものです。なぜなら、自分の代わりにコードに潜んでいる危険を、コーディング時点で知らせてくれるからです。

## コンパイルを通す

コンパイラが指摘する問題点をすべて解消する作業のことを「コンパイルを通す」といいます。上のコードをコンパイルが通るコードに直してみましょう。直し方は単純に、関数呼び出しの引数を数値型にするだけです。

```ts twoslash {5} title="increment.ts"
function increment(num: number) {
  return num + 1;
}

console.log(increment(999));
//                    ^^^直す箇所
```

直したら再びコンパイルしてみましょう。

```sh
tsc increment.ts
```

今度は何も表示されずに処理が終わるはずです。コンパイル成功です。

## 生成されたJavaScript

ここまでの手順で、increment.jsというファイルができていることに気づいたかもしれません。そのファイルの内容は次のようになっていると思います。

```ts twoslash title="increment.js"
// @showEmit
// @alwaysStrict: false
function increment(num: number) {
  return num + 1;
}

console.log(increment(999));
```

これは、increment.tsをコンパイルする過程でコンパイラが生成したJavaScriptファイルです。TypeScriptのコードと比べてみると、引数`num`から型注釈が取り除かれていることがわかります。

型注釈の部分はTypeScript固有のものです。それが書いてあるとブラウザやNode.jsでは実行できません。なので、TypeScriptコンパイラはJavaScript実行環境で動かす用のJavaScriptファイルを生成してくれます。開発者はこの成果物のJavaScriptファイルを本番環境にデプロイすることになります。

<TweetILearned>

・JavaScriptからTypeScriptへの書き換えは拡張子を.tsにする
・コンパイラは型の問題を教えてくれる
・型注釈を書き加えると、コンパイラはより細かいチェックをしてくれる
・コンパイラが生成したJSをデプロイして使う

</TweetILearned>
