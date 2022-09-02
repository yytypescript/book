---
sidebar_label: 等価であるということ
---

# 等価であるということ

どの言語でも、値を比較することがあります。JavaScriptにおいて等価の演算子は等価演算子(`==`)と厳密等価演算子(`===`)のふたつがあります。等しいことを判定するための演算子がふたつ存在するのは、必ずしも同じものを等しいとはしないためです。

## `===`で等価であるということ

厳密と名がついているとおり、この演算子での等価は**型が等しく、かつ値が等しい**ことを指します。この動作は等価演算子がひとつしかない言語の`==`と同じものです。

次の例は同然ではないかと思うかもしれません。

```ts twoslash
console.log(null === undefined);
// @log: false
console.log(0 === 0n);
// @log: false
console.log(0 === "0");
// @log: false
// @noErrors
```

`0n`はnumber型ではなくbigint型のことです。

[bigint型](./bigint.md)

## `==`で等価であるということ

ただの等価演算子という名ですが、こちらは**型が異なっていても同じと見なす**ことがあります。厳密には、値の型が異なる場合は型の変換ができないか試みてから値が等しいかを比較します。

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(0 == 0n);
// @log: true
console.log(0 == "0");
// @log: true
console.log(0 == "");
// @log: true
console.log(0 == false);
// @log: true
console.log("0" == false);
// @log: true
console.log("" == false);
// @log: true
// @noErrors
```

`"0" == false`, `"" == false`は戻り値が`true`ですが、だからとはいえ`"" == "0"`は`false`となるので注意が必要です。

## いつ`==`と`===`を使うのか、使い分けるのか

意図しない動作を避けるという観点においては、厳密等価演算子(`===`)を常用し、必要なタイミングで等価演算子を使うといいでしょう。とはいえその必要なタイミングの多くは`x == null`です。これは変数xが`null`か`undefined`のときに`true`を返します。

## 等価であることを気をつける値

安易に等値比較をすると`false`になってしまい、注意が必要な値があります。

- `NaN`
- symbol型の値
- object型の値

### `NaN`

`NaN`はnumber型の値ですが、どの値と比較をしても`false`を返します。たとえそれが`NaN`同士の比較であっても`false`を返します。

```ts twoslash
console.log(NaN == NaN);
// @log: false
console.log(NaN === NaN);
// @log: false
```

この性質を使うとその値が`NaN`であるかどうかを判定することができます。

```ts twoslash
function isNaN(value: unknown): boolean {
  return value !== value;
}

console.log(isNaN(1));
// @log: false
console.log(isNaN(NaN));
// @log: true
```

### symbol型の値

symbol型は、たとえ同じdescription(第1引数)が同じ値同士を比較しても、まったく同じ変数名を参照しない限り`false`を返します。

```ts twoslash
console.log(Symbol("piano") == Symbol("piano"));
// @log: false
console.log(Symbol("piano") === Symbol("piano"));
// @log: false
const sym = Symbol(2);
console.log(sym === sym);
// @log: true
```

### object型の値

object型は、同じプロパティと値のペアの比較をしても、まったく同じ変数名を参照しない限り`false`を返します。これはオブジェクトについて理解がある人にとっては当然の挙動です。

```ts twoslash
console.log({} == {});
// @log: false
console.log({} === {});
// @log: false
console.log({ age: 18 } == { age: 18 });
// @log: false
console.log({ equipment: "glasses" } === { equipment: "glasses" });
// @log: false
const obj = { hair: "blond" };
console.log(obj === obj);
// @log: true
```

## まとめ
