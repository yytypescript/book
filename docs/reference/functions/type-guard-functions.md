---
sidebar_label: 型ガード関数
---

# 型ガード関数 (type guard function)

TypeScriptのコンパイラは`if`や`switch`といった制御フローの各場所での変数の型を分析しており、この機能を[制御フロー分析](../statements/control-flow-analysis-and-type-guard.md)(control flow analysis)と呼びます。

制御フロー分析の活用として、`if`や`switch`といった制御構造で型ガードを使用することによって各場所での変数を特定の型を絞り込みことができます。

TypeScriptに元々用意されている型ガードとしては`typeof`や`instanceof`がありますが、これ以外にもユーザーが独自に型ガードを定義することができます。

## ユーザー定義の型ガード関数

ユーザー定義の型ガード関数を作るためには型述語(type predicate)と呼ばれる特殊な注釈を使用します。型述語の宣言は戻り値がboolean型の関数に対して適用でき、戻り値の型の部分を次のように書き替えます。

```ts twoslash
class Animal {}
class Duck {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  return animal instanceof Duck;
}
```

`animal is Duck`の部分が型述語です。これで関数`isDuck()`が`true`を返す時の`if`のブロックの中では`animal`は`Duck`型として解釈されるようになります。

```ts twoslash
// @errors: 2339
class Animal {}
class Duck {
  public quacks(): void {}
}
declare function isDuck(animal: Animal): animal is Duck;

const animal = new Animal();
// ---cut---
// ここではquacks()は存在しない
animal.quacks();

if (isDuck(animal)) {
  animal.quacks();
  // ...
}
```

しかしながら、これはあくまでもその型であるとTypeScriptに解釈させるだけなので、JavaScriptとして正しいということは断言できません。

```ts twoslash
function isUndefined(value: unknown): value is undefined {
  return typeof value === "number";
}
```

上記関数`isUndefined()`は明らかに誤っていますが、この誤りに対してTypeScriptは何も警告を出しません。

## 型述語

型ガード関数の説明では、いきなり型述語という用語を使って説明しましたが、もう少し詳しく見てみましょう。

型述語という言葉を分解してみると「型+述語」となります。つまり型についての述語です。この述語という用語は元々は論理学に由来するものであり、その意味を知ることで型ガード関数についての理解を深めることができます。

たとえば、`animal is Duck`という型述語は型ガード関数`isDuck`の戻り値の注釈として使われていましたが、関数本体の実体を見ると単にboolean型の値を返す関数となっています。

```ts twoslash
class Animal {}
class Duck {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  //                             ^^^^^^^^^^^^^^: 型述語
  return animal instanceof Duck; // 単に真偽値を返す
}
```

元々、述語(predicate)とは、論理学において対象が持つ属性や関係などを表現するものです。たとえば、「Xは素数である(X is a prime number)」という命題Pがあったとき、Xを変数としてP(x)のように述語を表現できます。この述語P(X)は変数Xが素数の3などであれば真を返し、非素数の4などであれば偽を返します。これはまさに真か偽(真理値)を返す関数です。

このように述語とは変数を含んだ命題(=真理値を持つ判断)のことです。型述語(型についての述語)とはそのまま「型を変数に取る命題」ということができます。`x is number`のような型述語は「xはnumber型である」という変数xが持つ型についての判断を表現しています。

```ts
function isNumber(x: unknown): x is number {
  return typeof x === "number";
}
```

先ほどの例で言えば、`isDuck`関数は命題`animal is Duck`について変数`animal`を受けて真理値を返す関数となっています。

型ガード関数の説明で見たように、型注釈に型述語を用いることは単に`boolean`型を返す関数であると型注釈するのとは異なる効果があり、制御フロー分析で型の絞り込みを行うためには型述語を利用する必要がありました。

```ts twoslash
// 型述語が注釈されているので型ガード関数として機能する
function typeGuard(x: unknown): x is number {
  return typeof x === "number";
}
// 単にboolean型の値を返す関数で型ガード関数として機能しない
function notTypeGuard(x: unknown): boolean {
  return typeof x === "number";
}

declare const input: number | string;

// 型の絞り込みができる
if (typeGuard(input)) {
  input;
  // ^?
} else {
  input;
  // ^?
}

// 型の絞り込みができない
if (notTypeGuard(input)) {
  input;
  // ^?
} else {
  input;
  // ^?
}
```

このように型述語を持つ型ガード関数は制御フローにおいて静的に型の絞り込みを行うことができますが、単に`boolean`型を返すという注釈がなされた関数ではそのように型の絞り込みができません。単に戻り値が`boolean`型であると注釈してしまうと型ガードとして機能しなくなってしまうことに注意してください。

ただし、TypeScript 5.5からは型述語の注釈無しの次のような関数でも型ガード関数として機能するようになりました。関数の実体から型述語の型推論が可能となっているので、`x is number`という型述語が推論されて型ガード関数となります。

```ts twoslash
// 返り値の注釈がないこの関数は x is number という型述語で推論される
function noAnnotation(x: unknown) {
  return typeof x === "number";
}
```

:::danger
5.5以降であっても、単にboolean型を返す関数として型注釈した場合には型ガード関数としては利用できないことに注意していください。
:::

この型述語の機能強化によって配列の`filter`メソッドなどで使用するコールバック関数の型述語の記述なしで正確に型を推論できるようになるなどの改善が得られます。

## 関連情報

[制御フロー分析と型ガードによる型の絞り込み](../statements/control-flow-analysis-and-type-guard.md)
