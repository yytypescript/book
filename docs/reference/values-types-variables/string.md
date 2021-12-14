---
sidebar_label: 文字列型
---

# 文字列型 (string type)

## 文字列リテラル

Javaなどの言語では、ダブルクォートで文字列リテラル(String型)を表現し、シングルクォートで文字リテラル(char型)を表現するといったように、使うクォートで型が変わります。

一方JavaScriptでは、ダブルクォートでもシングルクォートでもまったく同じ文字列型になります。この点はPHPと同様です。またバッククォート(`` ` ``)を使っても文字列型になります。

<!--prettier-ignore-->
```ts twoslash
"Hello"; 'Hello'; `Hello`
```

文字列中に同じ引用符が含まれている場合は、バックスラッシュ`\`でエスケープしなければなりません。

<!--prettier-ignore-->
```ts twoslash
'He said "madam, I\'m Adam."'
"He said \"madam, I'm Adam.\""
```

ダブルクォートとシングルクォートを使った文字列リテラルは、文字列の途中で改行できません。改行を入れたい場合は、`\n`などの改行シーケンスを入れる必要があります。

### テンプレートリテラル

JavaScriptで、バッククォート`` ` ``で囲んだ文字列はテンプレートリテラル（template literal）と言います。テンプレートリテラルは、改行と式の挿入(expression interpolation)ができます。式の挿入は`${式}`のように書きます。

```ts twoslash
const count = 10;
console.log(`現在、${count}名が見ています。`);
//=> 現在、10名が見ています。
```

式の部分は変数だけでなく、計算式や関数を使った式も書けます。

<!--prettier-ignore-->
```ts twoslash
`税込み${Math.floor(100 * 1.1)}円`
```

### 文字列リテラルは`'`、`"`、`` ` ``のどれを使うべきか？

TODO

## 文字列の型注釈

TypeScriptの文字列型の型注釈は`string`を用います。

```ts twoslash
const message: string = "Hello";
```

名前がよく似た型に`String`型がありますが、`string`とは異なるので注意してください。

## 文字列結合

JavaScriptの文字列結合は文字列結合演算子(`+`)を用います。数値型の加算でも同じ演算子が使われます。

<!--prettier-ignore-->
```ts twoslash
"hello" + "world"
```

PHPでは文字列結合演算子(`.`)と、数値の加算演算子(`+`)の2つに分かれていますが、JavaScriptでは文字列結合と加算は同じプラス記号で表現するので、PHPからJavaScriptに来た人は注意してください。
