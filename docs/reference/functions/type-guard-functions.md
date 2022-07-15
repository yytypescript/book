---
sidebar_label: 型ガード関数
---

# 型ガード関数 (type guard function)

型ガードを使用することによって`if`のブロックで特定の型に絞りこむことができます。
TypeScriptに元々用意されている型ガードとしては`typeof`や`instanceof`がありますが、これ以外にもユーザーが独自に型ガードを定義することができます。

## ユーザー定義の型ガード関数

ユーザー定義の型ガード関数を作るためにはType predicateを使用します。Type predicateの宣言は戻り値が`boolean`型の関数に対して適用でき、戻り値の型の部分を次のように書き替えます。

```ts twoslash
class Animal {}
class Duck {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  return animal instanceof Duck;
}
```

`animal is Duck` の部分がType predicateです。これで関数`isDuck()`が`true`を返す時の`if`のブロックの中では`animal`は`Duck`型として解釈されるようになります。

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

## 関連情報

[制御フロー分析と型ガードによる型の絞り込み](../statements/control-flow-analysis-and-type-guard.md)
