---
sidebar_label: 型アサーション「as」
---

# 型アサーション「as」(type assertion)

TypeScriptには、型推論を上書きする機能があります。その機能を型アサーション(type assertion)と言います。

TypeScriptコンパイラーはコードをヒントに型を推論してくれます。その型推論は非常に知的ですが、場合によってはコンパイラーよりもプログラマーがより正確な型を知っている場合があります。そのような場合は、型アサーションを用いるとコンパイラーに型を伝えることができます。型アサーションはコンパイラに「私を信じて！私のほうが型に詳しいから」と伝えるようなものです。

## 型アサーションの書き方

型アサーションの書き方は2つあります。1つはas構文です。

```ts
const value: string | number = "this is a string";
const strLength: number = (value as string).length;
```

もう1つはアングルブランケット構文(angle-bracket syntax)です。

```ts
const value: string | number = "this is a string";
const strLength: number = (<string>value).length;
```

どちらを用いるかは好みですが、アングルブランケット構文はJSXと見分けがつかないことがあるため、as構文が用いられることのほうが多いです。

## コンパイルエラーになる型アサーション

型アサーションを使えば制限なく型の情報を上書きできるかというとそうではありません。たとえば、`number`型を`string`型にする型アサーションはコンパイルエラーになります。

```ts
const num = 123;
const str: string = num as string;
//                  ^^^^^^^^^^^^^ コンパイルエラー
```

この例ではコンパイルエラーの内容は次のようになります。

> Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.(2352)

このエラーは「number型をstring型にするのは間違いです。お互いの型に共通する部分が少なすぎるからです」という内容です。

このように型アサーションはコンパイラーの型推論を上書きできるとは言っても、無茶な型の変換はできないようになっています。

それでも自分の書いた型アサーションが正しいという場合は、`unknown`型を経由することで上のようなエラーを出さないようにもできます。

```ts
const num = 123;
const str: string = num as unknown as string; // OK
```

## 型アサーションとキャストの違い

型アサーションは、他の言語のキャストに似ています。キャストとは、実行時にある値の型を別の型に変換することです。型アサーションは、実行時に影響しません。値の型変換はしないのです。あくまでコンパイル時にコンパイラーに型を伝えるだけです。コンパイラーはその情報を手がかりに、コードをチェックします。型アノテーションはキャストではないため、TypeScriptでは型アノテーションをキャストとは呼ばないことになっています。実行時に型変換をするには、そのためのロジックを書く必要があります。

## 大いなる力には大いなる責任が伴う

型アサーションには、コンパイラーの型推論を上書きする強力さがあります。そのため、プログラマーは型アサーションによってバグを産まないように十分注意する必要があります。型に関することはできるだけ、コンパイラーの型推論に頼ったほうが安全なので、型アサーションは、やむを得ない場合にのみ使うべきです。

型アサーションを使う必要が出てきたら、それよりも先に、型ガードやユーザー定義型ガードで解決できないか検討してみるとよいでしょう。

[制御フロー分析と型ガードによる型の絞り込み](../statements/control-flow-analysis-and-type-guard.md)

[型ガード関数 (type guard function)](../functions/type-guard-functions.md)

[アサーション関数 (assertion functions)](../functions/assertion-functions.md)

## 型アサーションと型アノテーションの違い

型アサーションと型アノテーション(type annotation)は名前が似ているためかしばしば混同されます。本書では型アノテーションを「型注釈」と表記しています。この2つはTypeScriptの異なる機能です。

型注釈は、コンパイラーに「この変数に代入できるのはこの型だよ」と伝えるものです。コンパイラーは型注釈をヒントに、その型に値が代入可能かどうかをチェックし、代入できないことが分かり次第報告してきます。

```ts
let value: number;
//         ^^^^^^ 型注釈
```

一方、型アサーションはコンパイラーに「君はこの型だと思ってるかもしれないけど、本当はこの型だよ」と型推論の不正確さを伝えるものです。

[変数宣言の型注釈 (type annotation)](type-annotation.md)
