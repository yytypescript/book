---
sidebar_label: ユニオン分配
---

# ユニオン分配 (union distribution)

ユニオン分配はジェネリクスで使われる型変数`T`に対しユニオン型が指定された場合、その各要素に対してジェネリクスの型変数を適用することを指します。

たとえば、次のような型エイリアスがあります。

```ts twoslash
type Wrapper<T> = {
  value: T;
};
```

単なる値をオブジェクト包んだだけですが、この`T`にユニオン型を代入してみると次のようになります。

```ts twoslash
type Wrapper<T> = {
  value: T;
};
// ---cut---
type IntOrStr = Wrapper<number | string>;
// ^?
```

予想通りの結果が出ますが、実はこれはユニオン分配によって`Wrapper<number> | Wrapper<string>`として評価されたあとの結果を示しています。

ただ、この例だけだと`Wrapper<number | string> = Wrapper<number> | Wrapper<string>`なのでいまいち理解が難しいかもしれませんが、Conditional Typesと併せて使うことによって、より複雑な型を作ることができます。

## Distributive Conditional Types

```ts twoslash
type IsString<T> = T extends string ? true : false;
```

この型を使って`string`と`number`のユニオン型を持つ変数`T`に対して`IsString`を適用すると、次のようになります。

```ts twoslash
type IsString<T> = T extends string ? true : false;
// ---cut---
type A = IsString<string>;
//   ^?
type B = IsString<number>;
//   ^?
type C = IsString<string | number>;
//   ^?
```

`IsString<T>`に`string`型を代入した型エイリアス`A`は`true`となります。一方`string`型以外の型を代入した型エイリアス`B`は`false`となります。

そして`string | number`型を代入した型エイリアス`C`は`string | number`型としていっぺんに評価するのではなく、`string`型と`number`型が個別に評価されます。つまり`C`は`IsString<string> | IsString<number>`を評価していることと同じになり、結果として`true | false`が得られ`boolean`型となります。

もし`string | number`型がユニオン分配されず`IsString`に適用されたとすると`string | number`型は`string`型の部分型ではないため、代入することができません。

## ユニオン分配を起こさせない方法

ユニオン分配を意図的に起こさせない方法があります。方法は簡単で型変数を`[]`で囲むだけです。

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
```

この`NotDistribute`型は`string`型に対しては`true`を返しますが、`string | number`型に対しては`false`を返します。`string | number`型は`string`型の部分型ではないためです。

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
// ---cut---
type A = NotDistribute<string>;
//   ^?
type B = NotDistribute<number>;
//   ^?
type C = NotDistribute<string | number>;
//   ^?
```
