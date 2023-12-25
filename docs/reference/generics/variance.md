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

継承関係がわかりやすくなるように適当なクラス`A`, `B`, `C`を定義します。`A`は`B`を継承し、`B`は`C`を継承しており、メソッドを追加しました。

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
const func01: BivariantFunction<A, B> = biFunc;
const func02: BivariantFunction<C, B> = biFunc;
const func03: BivariantFunction<B, A> = biFunc;
const func04: BivariantFunction<B, C> = biFunc;

const func05: CovariantFunction<B, A> = coFunc;
const func06: CovariantFunction<B, C> = coFunc;

const func07: ContravariantFunction<A, B> = contraFunc;
const func08: ContravariantFunction<C, B> = contraFunc;

const func09: InvariantFunction<A, B> = inFunc;
const func10: InvariantFunction<C, B> = inFunc;
const func11: InvariantFunction<B, A> = inFunc;
const func12: InvariantFunction<B, C> = inFunc;
```

これらの中でエラーになるものをまとめると

1. `func04`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、戻り値の`C`に対し`B`はメソッド`c()`を持っていないためエラーになります
2. `func06`は戻り値が共変でスーパータイプの割り当てが許容されますが、戻り値`C`は`B`のサブタイプなのでエラーになります
3. `func07`は引数が反変でサブタイプの割り当てが許容されますが、引数`A`は`B`のスーパータイプなのでエラーになります
4. `func09`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
5. `func10`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
6. `func11`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
7. `func12`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります

また、`strictFunctionTypes`を`true`にすると上記のエラーに加えて

1. `fun01`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、引数の`A`はメソッド`b()`を持っていないためエラーになります

## ユニオン型を使った例

ユニオン型を使って継承関係を表してみます。

```ts twoslash
type A = null;
type B = null | undefined;
type C = null | undefined | string;
```

このとき`A`は`B`の部分型であり、`B`は`C`の部分型です。

こちらも

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
const func01: BivariantFunction<A, B> = biFunc;
const func02: BivariantFunction<C, B> = biFunc;
const func03: BivariantFunction<B, A> = biFunc;
const func04: BivariantFunction<B, C> = biFunc;

const func05: CovariantFunction<B, A> = coFunc;
const func06: CovariantFunction<B, C> = coFunc;

const func07: ContravariantFunction<A, B> = contraFunc;
const func08: ContravariantFunction<C, B> = contraFunc;

const func09: InvariantFunction<A, B> = inFunc;
const func10: InvariantFunction<C, B> = inFunc;
const func11: InvariantFunction<B, A> = inFunc;
const func12: InvariantFunction<B, C> = inFunc;
```

1. `func03`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、戻り値の`A`に対し`B`の`undefined`は`null`に割り当てることができないためエラーになります
1. `func05`は戻り値が共変でスーパータイプの割り当てが許容されますが、戻り値`A`に対し`B`の`undefined`は`null`に割り当てることができないためエラーになります
1. `func08`は引数が反変でサブタイプの割り当てが許容されますが、引数`C`の`string`は`B`に割り当てることができないためエラーになります
1. `func09`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `func10`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `func11`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります
1. `func12`は引数、戻り値ともに不変でスーパータイプとサブタイプの関係が許容されないためエラーになります

`strictFunctionTypes`を`true`にすると上記のエラーに加えて

1. `fun02`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、引数`C`の`string`は`B`に割り当てることができないためエラーになります

## インターセクション型を使った例

インターセクション型を使った例です。なおインターセクション型は継承関係ではないので結果がこれらとは大きく異なります。

```ts twoslash
// @strictFunctionTypes: false
// @errors: 2322
type BivariantFunction<I, O> = (arg: I) => O;
type CovariantFunction<I, out O> = BivariantFunction<I, O>;
type ContravariantFunction<in I, O> = BivariantFunction<I, O>;
type InvariantFunction<in out I, in out O> = BivariantFunction<I, O>;

type A = null;
type B = null & undefined;
type C = null & undefined & string;

declare const biFunc: BivariantFunction<B, B>;
declare const coFunc: CovariantFunction<B, B>;
declare const contraFunc: ContravariantFunction<B, B>;
declare const inFunc: InvariantFunction<B, B>;

// ---cut---
const func01: BivariantFunction<A, B> = biFunc;
const func02: BivariantFunction<C, B> = biFunc;
const func03: BivariantFunction<B, A> = biFunc;
const func04: BivariantFunction<B, C> = biFunc;

const func05: CovariantFunction<B, A> = coFunc;
const func06: CovariantFunction<B, C> = coFunc;

const func07: ContravariantFunction<A, B> = contraFunc;
const func08: ContravariantFunction<C, B> = contraFunc;

const func09: InvariantFunction<A, B> = inFunc;
const func10: InvariantFunction<C, B> = inFunc;
const func11: InvariantFunction<B, A> = inFunc;
const func12: InvariantFunction<B, C> = inFunc;
```

`strictFunctionTypes`を`true`にすると上記のエラーに加えて

1. `fun01`は引数、戻り値ともに双変でスーパータイプとサブタイプの関係が許容されますが、引数`C`の`string`は`B`に割り当てることができないためエラーになります

## 継承関係を見る

継承関係を見るために[Conditional Types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html)を使ってみましょう。ある型`T`が`U`のサブタイプかどうかを判定する型`IsSubType<T, U>`を定義します。

```ts twoslash
type IsSubType<T, U> = T extends U ? symbol : never;
```

`symbol`と`never`については判別さえできればどの型を使っても問題ありませんが、リテラル型`true`, `false`を使うと`boolean`を返されたと判断されたときに判別できないためこのようにしています。

先ほどのクラス`A`, `B`, `C`に`IsSubType<T, U>`を適用してみます。

```ts twoslash
type IsSubType<T, U> = T extends U ? symbol : never;

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

自分自身のクラスあるいはサブクラスに限り`symbol`が返されることがわかります。

ユニオン型も見てみましょう。

```ts twoslash
type IsSubType<T, U> = T extends U ? symbol : never;

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

こちらは先ほどのクラスと異なりすべて`symbol`が返されています。特筆するのは`IsSubType<A, B>`, `IsSubType<B, C>`, `IsSubType<A, C>`のみっつです。これらは`A`が`B`のサブタイプであり、`B`が`C`のサブタイプであることを示しています。
つまり`B`は`A`のサブタイプでありながら`B`は`A`のサブタイプであることも示しています。`B`, `C`についても同様です。

インターセクション型はどうなっているでしょうか。

```ts twoslash
type IsSubType<T, U> = T extends U ? symbol : never;

// ---cut---
type A = null;
type B = null & undefined;
type C = null & undefined & string;

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

こちらはすべて`never`が返されています。これはインターセクション型は継承関係ではないことを意味しています。
