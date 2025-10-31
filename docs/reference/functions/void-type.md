---
sidebar_label: 戻り値がない関数とvoid型
---

# 戻り値がない関数とvoid型 (void type)

TypeScriptで戻り値がない関数の戻り値を型注釈するにはvoid型を用います。void型は関数の戻り値を型注釈するためにある特別な型です。

```ts twoslash
function print(message: string): void {
  console.log(message);
}
```

JavaScriptでは、戻り値がない関数を呼び出したとき、その関数から返る値は`undefined`です。

```ts twoslash
function fn() {
  // 戻り値のない関数
}
const result = fn();
console.log(result);
// @log: undefined
```

しかし、TypeScriptでは、このような戻り値がない関数の戻り値の型注釈には`void`を用いるのが一般的です。

```ts twoslash
function fn(): void {
  // 戻り値のない関数
}
```

## undefined型とvoid型の違い

void型の代わりに、undefined型を関数の戻り値の型注釈に用いる書き方もできます。ただし、これは一般的な書き方ではありません。

### undefined型を用いるべきときとそうでないとき

戻り値型に`undefined`型を注釈することもできます。型の扱いとしては`void`との違いはありません。しがって、次のコードはコンパイルエラーになりません。

```ts twoslash
function fn(): undefined {
  // 戻り値のない関数
}
```

しかし、戻り値がない関数を意図している場合は、`void`を使うほうが自然です。

一方で戻り値が`undefined`を含みうる関数の場合は、undefined型を含んだユニオン型を使うのが一般的です。

```ts twoslash
function getIfExists(numbers: number[], search: number): number | undefined {
  if (numbers.includes(search)) {
    return search;
  }
  return undefined;
}
```

### voidはundefinedの上位型

void型は関数戻り値の型注釈にだけ使うのが普通です。変数の型注釈に使うことはまずありません。しかし、もしも変数の型注釈にvoid型を使った場合、voidとundefinedは異なる型になります。undefined型はvoid型に代入できる一方、void型はundefined型に代入できません。これを一言でいうと、voidはundefinedの上位型(supertype)ということになります。

```ts twoslash
// @errors: 2322
const v: void = undefined; // undefined型はvoid型に代入できる
const u: undefined = v; // void型はundefined型に代入できない
```

この特徴は、関数の誤用に気づくきっかけを与えてくれます。たとえば、次の2つの関数を考えてみましょう。どちらも戻り値なしを意図した関数です。処理内容も同じです。違いは、`f1`は型注釈が`void`ですが、`f2`は`undefined`です。

```ts twoslash
function f1(): void {}
function f2(): undefined {
  return;
}
```

これらの関数を呼び出すとき、戻り値を受け取るように書けるものの、これら関数の使い方としては正しくないでしょう。次のコードは、戻り値を変数に代入しようとしています。これは誤ったコードです。

```ts twoslash
// @noErrors
function f1(): void {}
function f2(): undefined {
  return;
}
// ---cut---
let mayBeNumber: number | undefined;
mayBeNumber = f1(); // 誤った関数の使い方
mayBeNumber = f2(); // 誤った関数の使い方
```

このとき、型注釈が`void`の`f1`の呼び出し部分はコンパイルエラーとなります。これにより、誤りに気づきやすくなります。

```ts twoslash
// @errors: 2322
function f1(): void {}
function f2(): undefined {
  return;
}
// ---cut---
let mayBeNumber: number | undefined;
mayBeNumber = f1(); // コンパイルで誤りに気づける
mayBeNumber = f2(); // コンパイルでは誤りに気づけない
```

このような観点からも、戻り値がない関数を宣言するときは`void`を使ったほうがよいわけです。
