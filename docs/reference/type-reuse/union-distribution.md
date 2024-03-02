---
sidebar_label: ユニオン分配
---

# ユニオン分配 (union distribution)

ユニオン分配はジェネリクスで使われる型変数`T`に対しユニオン型が指定された場合、その各要素に対してジェネリクスの型変数を適用することを指します。

たとえば、次のような型エイリアスがあります。

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
