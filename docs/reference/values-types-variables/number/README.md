---
sidebar_label: 数値型
slug: /reference/values-types-variables/number
---

# 数値型 (number type)

JavaScriptの数値型は、1や-1などの整数と0.1などの小数を含めた数値の型です。PHPなどの言語では、数値について整数を表す型(int)と小数を表す型(floatやdouble)の2つの型を持ちます。Javaなどの言語では、整数型をさらに32ビットと64ビットに細分化する言語もあります。JavaScriptには、整数と小数を型レベルで区別するものはありません。どちらも数値型で表現します。

## 数値リテラル

JavaScriptの数値リテラルは次のように数値を見たままに書きます。

<!--prettier-ignore-->
```js
123 // 整数
-123 // 整数(負の数)
20.315 // 小数
```

小数は小数点ではじめる書き方もできます。また、整数も小数点で終わる書き方もできます。

<!--prettier-ignore-->
```js
0.1 === .1
5.0 === 5.
```

### 2進数、8進数、16進数

2進数、8進数、16進数の表記も可能です。それぞれ表現したい数値の前に`0b`、`0o`、`0x`をつけます。

<!--prettier-ignore-->
```ts
0b1010 // 2進数
0o755 // 8進数
0xfff // 16進数
```

### 数値の区切り文字(numeric separators)

JavaScriptの数値リテラルは可読性のためにアンダースコアで区切って書けます。何桁ごとに区切るかは自由です。表したい値や、国と地域の慣習などに合わせて選択できます。

<!--prettier-ignore-->
```js
100_000_000 // 1億
```

ただし、`_`を先頭や末尾、小数点の前後、連続で2個以上置くことはできません。つまり次のような表記はできません。

```ts
_100
100_
100_.0
100._0
1__00
```

### 数値リテラルのプロパティ

JavaScriptの数値リテラルのプロパティを直接参照する場合、小数点のドットとプロパティアクセッサーのドットが区別できないため、構文エラーになります。

```ts
5.toString(); // この書き方は構文エラー
```

これを回避するには、ドットを2つ続けるか、数値をカッコで囲む必要があります。

<!--prettier-ignore-->
```js
5..toString();
(5).toString();
```

## 数値型の型注釈

TypeScriptで数値型の型注釈は`number`を用います。

```ts
const count: number = 123;
```

よく似た名前の型として`Number`型がありますが、これと`number`は別物なので注意してください。

## 数値の範囲

JavaScriptの数値型は、IEEE 754の倍精度浮動小数です。64ビットのうち、52ビットが数値の格納に、11ビットが小数の位置に、1ビットが正負符号に使われます。正確に扱える数値は`-(2^53 − 1)`から`2^53 − 1`の間です。整数について言うと、他言語の64ビット整数型の範囲より狭いので注意しましょう。

## 特殊な数値

JavaScriptの数値型には、`NaN`と`Infinity`という特殊な値があります。

### NaN

`NaN`は非数(not-a-number)を表す変数です。JavaScriptでは、処理の結果、数値にならない場合に`NaN`を返すことがあります。たとえば、文字列を数値に変換する`parseInt`関数は、数値化できない入力に対し、`NaN`を返します。

```js twoslash
const price = parseInt("百円");
console.log(price);
// @log: NaN
```

値が`NaN`であるかのチェックは`Number.isNaN`を用います。

```js
const price = parseInt("百円");
if (Number.isNaN(price)) {
  console.log("数値化できません");
}
```

`NaN`は特殊で、等号比較では常に`false`になるので注意してください。

```js twoslash
console.log(NaN == NaN);
// @log: false
console.log(NaN === NaN);
// @log: false
```

### Infinity

`Infinity`は無限大を表す変数です。たとえば、1を0で割った場合、この値になります。
