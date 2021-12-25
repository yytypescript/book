---
sidebar_label: 関数の型の宣言
---

# 関数の型の宣言 (function type declaration)

TypeScriptでは、関数の型を宣言できます。関数の型の宣言とは、関数の実装を示さずに、関数のインターフェースを定義することです。

## 関数の型宣言構文

関数の型宣言は、[型エイリアス](../values-types-variables/type-alias.md)を用います。構文は次のようになります。

```ts twoslash
type 引数の型 = any;
type 戻り値の型 = any;
// ---cut---
type 型の名前 = (引数名: 引数の型) => 戻り値の型;
```

たとえば、数値型を受け取り数値型を返す関数の型宣言は次です。

```ts twoslash
type Increment = (num: number) => number;
```

## 型宣言を型注釈で使う

定義した関数の型宣言は、[アロー関数](./arrow-functions.md)の型注釈に使えます。

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const increment: Increment = (num: number): number => num + 1;
//               ^^^^^^^^^型注釈
```

[関数式(function**式**)](./function-expression.md)の型注釈にも使えます。

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const increment: Increment = function (num: number): number {
  return num + 1;
};
```

しかし、[関数宣言(function**文**)](./function-declaration.md)の型注釈には使えません。

## 関数実装の型注釈の省略

関数の型宣言を型注釈に使った場合、関数の実装側の引数と戻り値の型注釈は省略できます。

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const f1: Increment = (num: number): number => num + 1;
// ↓省略形
const f2: Increment = (num) => num + 1;
```

実際のコードでは、省略形で書くのが一般的です。

## メソッド構文による関数の型宣言

TypeScriptでは、アロー関数構文で関数の型を宣言する方法とは別に、メソッド構文でも関数の型を宣言できます。

```ts twoslash title="メソッド構文"
type 引数の型 = any;
type 戻り値の型 = any;
// ---cut---
type 型の名前 = {
  (引数名: 引数の型): 戻り値の型;
};
```

アロー関数構文とメソッド構文は、書き方が異なるだけです。次の2つの型宣言は同じ型です。

```ts twoslash
// アロー関数構文による型宣言
type Increment1 = (num: number) => number;
// メソッド構文による型宣言
type Increment2 = {
  (num: number): number;
};
```

一般的には、アロー関数構文で型宣言します。アロー関数構文のほうが短くシンプルだからです。

メソッド構文による型宣言は、[オーバーロード関数](./overload-functions.md)の型宣言に使われることがあります。

## 関数から関数の型を宣言する

TypeScriptでは、関数の実装から関数の型を宣言できます。関数の値に対して[`typeof`型演算子](../type-reuse/typeof-type-operator.md)を使います。

```ts twoslash
// 関数の実装
function increment(num: number): number {
  return num + 1;
}
// 関数の型を宣言する
type Increment = typeof increment;
//   ^?
```

<TweetILearned>

・TypeScriptでは関数の型が宣言できる
例: type Func = (n: number) => number
・定義した型は型注釈で使える
・その場合、実装側の型注釈は省略可
・メソッド風の型宣言もある
・通常はアロー関数風の型宣言を使う
・typeofで関数から型を導くこともできる

</TweetILearned>
