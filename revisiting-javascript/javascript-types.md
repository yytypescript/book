---
description: JavaScriptの型のおさらいをします。
---

# JavaScriptの型

JavaScriptは動的な言語ですが、型もちゃんとあります。ここでは、JavaScriptにはどんな型があるのか、他の言語の型と比べた場合、どんな注意点があるのかを説明します。

### JavaScriptの型の種類

JavaScriptには、7つプリミティブ型とオブジェクト型があります。

### プリミティブ型

プリミティブ型は値を変更できない\(=イミュータブル\)な型です。プリミティブ型は次の7つがあります。

1. boolean型: `true`または`false`の真偽値。
2. number型: `0`や`0.1`のような数値。
3. string型: `"Hello World"`のような文字列。
4. undefined型: 値が未定義であることを表す型。
5. null型: 値がないことを表す型。
6. symbol型: 一意で不変の値。
7. bigInt型: `9007199254740992n`のようなnumber型では扱えない大きな整数型。

### number型

PHPなどの言語では、数値について整数を表す型\(int\)と小数を表す型\(floatやdouble\)の2つの型を持ちます。Javaなどの言語では、整数型を更に32ビットと64ビットに細分化する言語もあります。JavaScriptには、整数と小数を型レベルで区別するものはありません。どちらもnumber型で表現します。

number型は、IEEE 754の倍精度浮動小数です。64ビットのうち、52ビットが数値の格納に、11ビットが小数の位置に、1ビットが正負符号に使われます。正確に扱える数値は`-(2^53 − 1)`から`2^53 − 1`の間です。他言語の64ビット整数型の範囲より狭いので注意しましょう。

number型の範囲より大きい整数を扱う場合はbigint型を使うと良いです。JavaScriptに整数小数を区別しないnumber型と、整数のみを表現するbigint型が不揃いに存在している理由は、bigint型がES2020であとづけされたためです。

### string型

Javaなどの言語では、ダブルクォートで文字列リテラル\(String型\)を表現し、シングルクォートで文字リテラル\(char型\)を表現するといったように、使うクォートで型が変わります。

一方JavaScriptでは、ダブルクオートでもシングルクォートでもstring型になります。この点はPHPと同じです。またバックティック\(`````\)を使ってもstring型になります。

```javascript
// これらはすべてstring型
"Hello"
'Hello'
`Hello`
```

### undefined型

`undefined`は値が定義されていないことを表す型です。変数を宣言した際に、値を代入しない場合、`undefined`が代わりに代入されます。

```javascript
let value;
console.log(value); //=> undefined
```

`undefined`と似たものに`null`もあります。`null`は値がないことを表す型です。この2つは同じではありません。

```javascript
null === undefined //=> false
```

これは豆知識ですが、`undefined`はリテラルではなく、ただのグローバル変数です。そのため、`undefined`という変数をローカルスコープに定義することができます。

```javascript
let undefined = "TEST";
console.log(undefined); //=> "TEST"
```

`undefined`という変数を定義するのは、コードの読み手にとって意外性が増すばかりで、全くもって有用性がないので実際のコーディングではやってはいけません。

### オブジェクト型

プリミティブ型以外のものはすべてオブジェクト型です。オブジェクト型には、クラスから作ったインスタンスだけでなく、クラスそのものや配列、正規表現もあります。

プリミティブ型は値が同じであれば、同一のものと判定できますが、オブジェクト型はプロパティの値が同じであっても、参照が異なると同一のものとは判定されません。

```javascript
const value1 = 123;
const value2 = 123;
console.log(value1 == value2); //=> true

const object1 = { value: 123 };
const object2 = { value: 123 };
console.log(object1 == object2); //=> false
```

### 配列

JavaScriptの配列はオブジェクト型であるため、配列の中身が同じでも、オブジェクトの参照が異なると`==`では期待する比較ができないので注意が必要です。この点はPythonのリストと同じです。

```javascript
const list1 = [1, 2, 3];
const list2 = [1, 2, 3];
console.log(list1 == list2); //=> false
```

PHPでは配列\(添字配列\)は要素の内容で等価比較できますが、JavaScriptでは同じようにはできないので注意しましょう。

```php
<?php
$list1 = [1, 2, 3];
$list2 = [1, 2, 3];
var_dump($list1 === $list2); //=> bool(true)
```

このような配列の中身を比べるための演算子やメソッドはJavaScriptにはないため、中身を比較したいときにはlodashの[isEqual](https://lodash.com/docs/4.17.15#isEqual)などのライブラリを使うのがおすすめです。

### typeof演算子

`typeof`演算子では値の型を調べることができます。

```javascript
typeof true; //=> "boolean"
typeof 0; //=> "number"
typeof "Hello World"; //=> "string"
typeof undefined; //=> "undefined"
typeof null; //=> "object"
typeof Symbol(); //=> "symbol"
typeof 1n; //=> "bigint"
typeof [1, 2, 3]; //=> "object"
typeof { a: 1, b: 2 }; //=> "object"
```

`typeof`演算子で特筆すべきなのは、値が`null`の場合です。`typeof null`の演算結果は`"null"`ではなく`"object"`です。誤解が起きやすい部分なので注意しましょう。特に値がオブジェクトかどうかを判定したいときは、`typeof null`が`"object"`になることを意識して書かないと思いがけない不具合になることがあります。

```javascript
// まずい実装
function isObject(value) {
  return typeof value === "object"; // valueがnullになる場合を考慮していない
}

isObject(null); // 戻り値がtrueになってしまう
```

`typeof null`を考慮した実装は次のようになります。

```javascript
function isObject(value) {
  return value !== null && typeof value === "object";
}
```

### 型強制\(type coercion\)

JavaScriptにはデータ型がありますが、型が異なる2つの値に対し演算してもエラーにならない場合があります。例えば、string型の`"10"`からnumber型の`1`を減算した場合、number型の`9`が計算結果として出てきます。

```javascript
"10" - 1; //=> 9
```

これは型強制\(type coercion\)と呼ばれる仕組みがあるためです。型強制とは、型が異なる2つの値を処理するとき、暗黙的に別の型へ変換されることを言います。

上の例では、string型の`"10"`がnumber型の`10`に型強制された上で、`- 1`が演算されたため`9`が計算結果になるわけです。

型に厳しい言語では、型が異なる値同士の演算ができない言語もあるので、そのような言語に慣れている方は特に注意してください。

ちなみに、どんな型に型強制されるかは演算子によっても異なるので注意が必要です。例えば、string型の`"10"`にnumber型の`1`を加算する場合は、string型の`"101"`が計算結果になります。これは、number型の`1`がstring型の`"1"`に型強制された上で、`"10" + "1"`の文字列結合の演算になるためです。

```javascript
"10" + 1; //=> "101"
```

