# プリミティブ型 (primitive types)

JavaScriptのデータ型は、プリミティブ型とオブジェクトの2つに分類されます。

## イミュータブル特性

JavaScriptのプリミティブ型の1つ目の特徴は、値を直接変更できない点です。つまりイミュータブル(immutable)です。一方、オブジェクトには、値を後で変更できるというミュータブル特性(mutable)があります。

## プロパティを持たない

JavaScriptのプリミティブ型の2つ目の特徴は、基本的にプロパティがないことです。プリミティブ型の`null`と`undefined`にはプロパティがありません。

```javascript
null.toString(); // エラーになる
```

ところが、文字列や数値などのプリミティブ型は、プロパティを持ったオブジェクトとして扱えます。

```javascript
"name".length; // 4
```

このように、プリミティブ型をまるでオブジェクトのように扱えるのはJavaScriptの特徴です。JavaScriptには、プリミティブ型をオブジェクトに自動変換する機能があります。この機能はオートボクシング(autoboxing)、自動ボックス化と呼ばれます。

{% content-ref url="boxing.md" %}
[boxing.md](boxing.md)
{% endcontent-ref %}

## プリミティブ型の種類

プリミティブ型は次の7つがあります。

1. 論理型(boolean): `true`または`false`の真偽値。
2. 数値型(number): `0`や`0.1`のような数値。
3. 文字列型(string): `"Hello World"`のような文字列。
4. undefined型: 値が未定義であることを表す型。
5. ヌル型(null): 値がないことを表す型。
6. シンボル型(symbol): 一意で不変の値。
7. bigint型: `9007199254740992n`のようなnumber型では扱えない大きな整数型。

上のプリミティブ型以外は、JavaScriptにおいてはすべてオブジェクトを考えて問題ありません。配列や正規表現オブジェクトなどもすべてオブジェクトです。

{% hint style="success" %}
**学びをシェアする** **─ **_下のまとめをコピペしてツイートしよう_

・JSのプリミティブ型はイミュータブルでプロパティを持たない\
・プリミティブをオブジェクトのように扱える「オートボクシング」がある\
・プリミティブは7種類: boolean, number, string, undefined, null, symbol, bigint\
・それ以外は全部オブジェクト\
\
『サバイバルTypeScript』より
{% endhint %}
