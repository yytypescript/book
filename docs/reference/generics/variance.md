---
sidebar_label: 変性
---

# 変性 (variance)

TypeScriptでは、型の互換性を判定する際に変性(variance)という概念が使われます。変性とは型同士の関係性を示すもので、TypeScriptにおいてはこの変性を示すためにはジェネリクスの型変数の前に`in`あるいは`out`を付与します。

なお、ここで語られる変性はtsconfig.jsonの`strictFunctionTypes`の設定でも変更することができます。
今回は特筆しない限り`strictFunctionTypes`は`false`として説明します。

[strictFunctionTypes](../tsconfig/strictfunctiontypes.md)

## 共変性 (Covariance)

共変性はジェネリクスの型変数に`out`を付与した場合の変位です。共変性とはサブタイプの関係が保たれることを意味します。

## 反変性 (Contravariance)

反変性はジェネリクスの型変数に`in`を付与した場合の変位です。反変性とはサブタイプの関係が逆転することを意味します。

## 不変性 (Invariance)

不変性はジェネリクスの型変数に`in`と`out`を付与した場合の変位です。不変性とは型が共変性でも反変性でもないことを意味します。

## 双変性 (Bivariance)

双変性はジェネリクスの型変数に`in`と`out`を付与しない場合の変位です。

ここで例としてひとつの引数`I`を受け取り戻り値`O`を返す関数の型として`BivariantFunction<I, O>`(変位をつけていないのでTypeScriptとしては双変と同じ)を定義します。

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
```

ここで引数`I`を共変にした`CovariantFunction<in I, O>`と戻り値`O`を反変にした`ContravariantFunction<I, out O>`、引数も戻り値も不変にした`InvariantFunction<in out I, in out O>`を定義します。するとそれらは次のように定義されます。

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;
```

## クラスの継承関係を使った例

継承関係がわかりやすくなるようにクラス`A`, `B`, `C`を定義します。`A`は`B`を継承し、`B`は`C`を継承しており、メソッドを追加しました。

```ts twoslash
class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}
```

各変性の関数の`I`と`O`の両方を`B`にした関数を定義します。

```ts twoslash
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

class B {
  // NOOP
}

// ---cut---
declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;
```

これらの関数のジェネリクスを変更してみます。

```ts twoslash
// @strictFunctionTypes: false
// @errors: 2322
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}

declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;

// ---cut---
const f01: BivariantFunction<A, B> = biFunc;
const f02: BivariantFunction<C, B> = biFunc;
const f03: BivariantFunction<B, A> = biFunc;
const f04: BivariantFunction<B, C> = biFunc;

const f05: CovariantFunction<B, A> = coFunc;
const f06: CovariantFunction<B, C> = coFunc;

const f07: ContravariantFunction<A, B> = contraFunc;
const f08: ContravariantFunction<C, B> = contraFunc;

const f09: InvariantFunction<A, B> = inFunc;
const f10: InvariantFunction<C, B> = inFunc;
const f11: InvariantFunction<B, A> = inFunc;
const f12: InvariantFunction<B, C> = inFunc;
```

これらの中でエラーになるものをまとめると

1. `f04`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、戻り値の`C`に対し`B`はメソッド`c()`を持っていないためエラーになります
2. `f06`は戻り値が共変でスーパータイプの割り当てが許容されますが、戻り値`C`は`B`のサブタイプなのでエラーになります
3. `f07`は引数が反変でサブタイプの割り当てが許容されますが、引数`A`は`B`のスーパータイプなのでエラーになります
4. `f09`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
5. `f10`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
6. `f11`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
7. `f12`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります

また、`strictFunctionTypes`を`true`にすると上記のエラーに加えて

1. `f01`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、引数の`A`はメソッド`b()`を持っていないためエラーになります

## ユニオン型を使った例

ユニオン型を使って継承関係を表してみます。

```ts twoslash
type A = null;
type B = null | undefined;
type C = null | undefined | string;
```

このとき`A`は`B`の部分型であり、`B`は`C`の部分型です。言い換えると`A extends B`、`B extends C`です。

```ts twoslash
// @strictFunctionTypes: false
// @errors: 2322
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

type A = null;
type B = null | undefined;
type C = null | undefined | string;

declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;

// ---cut---
const f01: BivariantFunction<A, B> = biFunc;
const f02: BivariantFunction<C, B> = biFunc;
const f03: BivariantFunction<B, A> = biFunc;
const f04: BivariantFunction<B, C> = biFunc;

const f05: CovariantFunction<B, A> = coFunc;
const f06: CovariantFunction<B, C> = coFunc;

const f07: ContravariantFunction<A, B> = contraFunc;
const f08: ContravariantFunction<C, B> = contraFunc;

const f09: InvariantFunction<A, B> = inFunc;
const f10: InvariantFunction<C, B> = inFunc;
const f11: InvariantFunction<B, A> = inFunc;
const f12: InvariantFunction<B, C> = inFunc;
```

1. `f03`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、戻り値の`A`に対し`B`の`undefined`は`null`に割り当てることができないためエラーになります
1. `f05`は戻り値が共変でスーパータイプの割り当てが許容されますが、戻り値`A`に対し`B`の`undefined`は`null`に割り当てることができないためエラーになります
1. `f08`は引数が反変でサブタイプの割り当てが許容されますが、引数`C`の`string`は`B`に割り当てることができないためエラーになります
1. `f09`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `f10`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `f11`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `f12`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります

`strictFunctionTypes`を`true`にすると上記のエラーに加えて

1. `f02`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、引数`C`の`string`は`B`に割り当てることができないためエラーになります

## 継承関係を見る

継承関係を見るために[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)を使ってみましょう。ある型`T`が`U`のサブタイプかどうかを判定する型`IsSubType<T, U>`を定義します。

```ts twoslash
type IsSubType<T, U> = T extends U ? true : false;
```

先ほどのクラス`A`, `B`, `C`に`IsSubType<T, U>`を適用してみます。

```ts twoslash
type IsSubType<T, U> = T extends U ? true : false;

// ---cut---
class A {
  public a(): void {
    console.log("a");
  }
}

class B extends A {
  public b(): void {
    console.log("b");
  }
}

class C extends B {
  public c(): void {
    console.log("c");
  }
}

declare const t1: IsSubType<A, A>;
//            ^?
declare const t2: IsSubType<B, B>;
//            ^?
declare const t3: IsSubType<C, C>;
//            ^?

declare const t4: IsSubType<A, B>;
//            ^?
declare const t5: IsSubType<B, C>;
//            ^?
declare const t6: IsSubType<A, C>;
//            ^?

declare const t7: IsSubType<B, A>;
//            ^?
declare const t8: IsSubType<C, B>;
//            ^?
declare const t9: IsSubType<C, A>;
//            ^?
```

自分自身のクラスあるいはサブクラスに限り`true`が返されることがわかります。

ユニオン型も見てみましょう。なお、こちらはユニオン型であるためDistributive Conditional Typeを使用します。

[Distributive Conditional Types](../type-reuse/union-distribution.md)

```ts twoslash
type IsSubType<T, U> = [T] extends [U] ? true : false;
```

```ts twoslash
type IsSubType<T, U> = [T] extends [U] ? true : false;

// ---cut---
type A = null;
type B = null | undefined;
type C = null | undefined | string;

declare const t1: IsSubType<A, A>;
//            ^?
declare const t2: IsSubType<B, B>;
//            ^?
declare const t3: IsSubType<C, C>;
//            ^?

declare const t4: IsSubType<A, B>;
//            ^?
declare const t5: IsSubType<B, C>;
//            ^?
declare const t6: IsSubType<A, C>;
//            ^?

declare const t7: IsSubType<B, A>;
//            ^?
declare const t8: IsSubType<C, B>;
//            ^?
declare const t9: IsSubType<C, A>;
//            ^?
```

`A`は`B`の部分型であり、`B`は`C`の部分型であるため`t4`、`t5`、`t6`が`true`になることがわかります。
