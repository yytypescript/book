---
sidebar_label: 戻り値がない関数とvoid型
---

# 戻り値がない関数とvoid型 (void type)

TypeScriptで戻り値がない関数の戻り値を型注釈するにはvoid型を用います。void型は関数の戻り値を型注釈するためにある特別な型です。

```ts
function print(message: string): void {
  console.log(message);
}
```

## undefined型とvoid型の違い

JavaScriptの関数では、戻り値がない場合は値として`undefined`を返します。またTypeScriptにはundefined型もあります。TypeScriptの型上の意味としては、undefined型とvoid型は同じです。したがって、戻り値の型注釈に`undefined`を用いることもできます。ただし、戻り値型がundefined型の場合は、`return undefined`が必要です。

```ts
function print(message: string): undefined {
  console.log(message);
  return undefined; // これがないとコンパイルエラーになる
}
```

戻り値がundefinedを含みうる関数の場合は、undefined型を含んだユニオン型を使うのが一般的です。

```ts
function getIfExists(numbers: number[], search: number): number | undefined {
  if (numbers.includes(search)) {
    return number;
  }
  return undefined;
}
```

void型は関数戻り値の型注釈にだけ使うのが普通なので、変数の型注釈に使うことはまずありませんが、もしも変数の型注釈にvoid型を使った場合は、異なる挙動になります。undefined型の変数をvoid型の変数に代入することができる一方、void型の変数をundefined型の変数に代入することはできません。

```ts twoslash
// @errors: 2322
const v: void = undefined;
const u: undefined = v;
```
