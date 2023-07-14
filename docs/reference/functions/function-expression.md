---
sidebar_label: 関数式
---

# 関数式 (function expression)

関数式はJavaScriptで関数を作る方法のひとつで、function**式**を用います。

## 関数式の構文

関数式の構文は、[関数宣言]と同じです。

[関数宣言]: ./function-declaration.md

<!--prettier-ignore-->
```js twoslash
// @noImplicitAny: false
function 関数名(引数) {
  // 処理内容
};
```

[関数宣言]は文でしたが、関数式は式です。式とは、評価した結果が値になるものを言います。関数式は値になるので、変数に直接代入できます。

```js twoslash
// @noImplicitAny: false
const 変数名 = function 関数名(引数) {
  // 処理内容
};
```

## 関数名の省略

<!--textlint-disable prh-->

関数式は、関数名を省略できます。名前がない関数なので、匿名関数や無名関数とも呼ばれます。

<!--textlint-enable prh-->

```js twoslash
const 変数名 = function () {};
//                     ^関数名を省略
```

関数式を呼び出すには、変数名を使います。

```js twoslash
const 変数名 = function () {};
// ---cut---
変数名(); // 呼び出し
```

たとえば、次の関数宣言で書かれたincrement関数を、

```js twoslash
function increment(n) {
  return n + 1;
}
```

関数式に書き直すと次のようになります。

```js twoslash
const increment = function (n) {
  return n + 1;
};
```

関数式は、オブジェクトのプロパティに直接代入することもできます。

```ts twoslash
const オブジェクト = {
  メソッド名: function () {},
};
```

関数式は、別の関数の引数に直接渡すこともできます。たとえば、ボタンがクリックされたときの処理を指定するときに関数式を用います。

```js twoslash
button.addEventListener("click", function (event) {
  console.log("クリックされました");
});
```

## 関数式と型注釈

TypeScriptでは、関数宣言と同様に引数の型注釈が書けます。

```ts twoslash
const increment = function (n: number) {
  //                         ^^^^^^^^引数の型注釈
  return n + 1;
};
```

引数の型注釈を省略した場合、その型は`any`になります。

```ts twoslash
const increment = function (n) {};
//                          ^?
// @noImplicitAny: false
```

関数型の変数に関数式を代入する場合は、引数の型注釈を省略しても、型推論が効きます。変数の型情報から、引数の型がわかるからです。

```ts twoslash
type UseString = (value: string) => void;
let useString: UseString; // 関数型の変数
useString = function (value) {}; // 関数型変数に関数式を代入
//                    ^?
```

TypeScriptの関数式では、戻り値の型注釈も書けます。

```ts twoslash
const getZero = function (): number {
  //                         ^^^^^^戻り値の型注釈
  return 0;
};
```

戻り値の型注釈を省略した場合、関数のロジックから型が推論されます。

```ts twoslash
const getZero = function () {
  return 0;
};
const num = getZero();
//    ^?
```

## 関数式の関数名

JavaScriptでは、function式に関数名を書いた場合、その関数名は関数の処理内部からのみ参照できます。これは再帰関数を書くときに活用されます。次の例は、与えられた数値`n`の階乗を求める関数です。関数名の`fact`はその関数の中でのみ使えます。関数の外からは`factorial`で呼び出す必要があります。

```js twoslash
const factorial = function fact(n) {
  if (n <= 1) {
    return 1;
  }
  return n * fact(n - 1); // 関数名を使い再帰呼び出し
};
```

上の例は、次のように変数名を使った再帰呼び出しに書き換えることもできます。

```js {6} twoslash
//                        ↓関数名を省略
const factorial = function (n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1); // 変数名を使った再帰呼び出し
};
```

<TweetILearned>

・関数式はfunction式を使った関数
・関数式は関数名が省略可。匿名関数と呼ばれる。
・関数式は変数や引数などに直接代入できる
・型注釈の書き方は関数宣言と同じ
・関数式の関数名は、関数内部からのみ参照可

</TweetILearned>

## 関連情報

[関数式とアロー関数の違い](function-expression-vs-arrow-functions.md)

[関数宣言](./function-declaration.md)

[アロー関数](./arrow-functions.md)
