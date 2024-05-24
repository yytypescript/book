---
sidebar_label: 明確な割り当てアサーション
---

# 明確な割り当てアサーション(definite assignment assertion)

明確な割り当てアサーションは、変数やプロパティが確実に初期化されていることをTypeScriptのコンパイラに伝える演算子です。

## `strictNullChecks`と変数の初期化エラー

TypeScriptはコンパイラオプション[`strictNullChecks`](../tsconfig/strictnullchecks.md)が`true`のとき、初期化されていない変数を参照した際にエラーを出します。

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
console.log(num * 2);
```

変数の初期化が明らかに関数内で行われている場合でも、コンパイラは変数が初期化されていないとエラーを出します。

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
initNum(); // 関数内でnumを初期化しているが…
console.log(num * 2);
function initNum() {
  num = 2;
}
```

## `strictPropertyInitialization`とプロパティの初期化エラー

TypeScriptでは次のコンパイラオプションの両方が`true`のとき、クラスのプロパティが初期化されていないとエラーを出します。

- [`strictNullChecks`](../tsconfig/strictnullchecks.md)
- [`strictPropertyInitialization`](../tsconfig/strictpropertyinitialization.md)

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
// @errors: 2564
class Foo {
  num: number;
}
```

TypeScriptコンパイラは、プロパティ定義または`constructor`でプロパティが初期化されるかを見ています。しかし、`constructor`以外のメソッドで初期化されるところまでは追いかけません。たとえば、次例の`num3`は実際は初期化されるものの、コンパイラは初期化がされていないと警告を出します。

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
// @errors: 2564
class Foo {
  num1: number = 1; // 初期化している
  num2: number;
  num3: number;

  constructor() {
    this.num2 = 1; // 初期化している
    this.initNum3(); // num3を初期化している
  }

  initNum3() {
    this.num3 = 1;
  }
}
```

## 明確な割り当てアサーションを使う

変数やプロパティの初期化が確実に行われていることをコンパイラに伝えるには、明確な割り当てアサーションを使います。変数宣言の変数名やプロパティ名のあとに`!`を書きます。

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num!: number;
//     ^明確な割り当てアサーション
initNum();
console.log(num * 2); // エラーにならない
function initNum() {
  num = 2;
}
```

```ts twoslash
// @strictPropertyInitialization: true
// @strictNullChecks: true
class Foo {
  num!: number;
  // ^明確な割り当てアサーション
}
```

## 非Nullアサーション

別の方法として、非Nullアサーション(non-null assertion)を使う方法もあります。この場合は、変数を参照するコードにて、変数のあとに`!`を書きます。

```ts twoslash
// @strictNullChecks: true
// @errors: 2454
let num: number;
initNum();
console.log(num! * 2); // エラーにならない
//             ^非Nullアサーション
function initNum() {
  num = 2;
}
```

## より安全なコードを書くには

明確な割り当てアサーションと非Nullアサーションは、型の安全性を保証する責任をコンパイラからプログラマに移すものです。そして、型に関してはコンパイラより人間のほうがミスをしやすいです。なので、こうしたアサーションはできる限り使わないほうが安全性は高いです。

たとえば、上の例であれば`initNum`の戻り値を`num`に代入するほうが、より安全なコードになります。

```ts twoslash
// @strictNullChecks: true
let num: number;
num = initNum();
console.log(num * 2);
function initNum() {
  return 2;
}
```

他にも、`num`がnumber型であるかを型ガードでチェックする方法もあります。

```ts twoslash
// @strictNullChecks: true
let num: number | undefined;
initNum();
// 型ガード
if (typeof num === "number") {
  console.log(num * 2);
}
function initNum() {
  num = 2;
}
```

このようにアサーションに頼らない方法はないかを先に検討することをお勧めします。その上で、どうしてもというときにアサーションを使うようにしましょう。フレームワークやライブラリの都合で、やむを得ない場合もあります。

<PostILearned>

・明確な割り当てアサーションは、変数初期化が確実であるとTypeScriptのコンパイラに伝える
・変数名のあとに!を書く
・型安全の責任をコンパイラからプログラマに移すものなので、使わない方法を先に検討する
・どうしようもないときに使う

</PostILearned>

## 関連情報

[strictNullChecks](../tsconfig/strictnullchecks.md)

[strictPropertyInitialization](../tsconfig/strictpropertyinitialization.md)
