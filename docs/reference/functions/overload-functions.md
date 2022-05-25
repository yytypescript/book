---
sidebar_label: オーバーロード関数
---

# オーバーロード関数 (overload function)

オーバーロード関数(overload function)は、TypeScriptの機能で、ひとつの関数に異なる関数シグネチャを複数もつ関数です。関数シグネチャとは、どのような引数を取るか、どのような戻り値を返すかといった関数の型のことです。要するに、異なる引数や戻り値のパターンがいくつかある関数をオーバーロード関数と言います。

## オーバーロード関数の文法

TypeScriptでは、オーバーロード関数は、関数シグネチャと実装の2つの部分に分けて書きます。

```ts twoslash
// 関数シグネチャ部分
function hello(person: string): void; // シグネチャ1
function hello(persons: string[]): void; // シグネチャ2
// 関数の実装部分
function hello(person: string | string[]): void {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
}
```

関数シグネチャの部分は、オーバーロードのパターン数だけ複数書きます。この部分はインターフェースを定義するところなので、関数のボディは書けません。

関数の実装部分は、オーバーロードの全パターンを網羅する関数を書きます。ありうる引数の数や型のパターンを網羅したものになります。ロジックも分岐などを用いて、パターンごとの処理を書く必要があります。

関数シグネチャと実装部分の関数名は同じにする必要があります。

オーバーロード関数の文法を一般化すると次のようになります。

```js
function 関数名 関数シグネチャ1
function 関数名 関数シグネチャ2
function 関数名 すべてのシグネチャを網羅する実装
```

## オーバーロード関数のコンパイル結果

オーバーロード関数はTypeScriptからJavaScriptにコンパイルすると、関数シグネチャ部分と型注釈が消され、次のようなコードになります。

```ts twoslash title="コンパイル後のJavaScript"
// @showEmit
// @target: esnext
// @alwaysStrict: false
function hello(person: string): void;
function hello(persons: string[]): void;
function hello(person: string | string[]): void {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
}
```

## なぜJavaのようなオーバーロードではないのか？

オーバーロードは他の言語にもあります。たとえば、Javaを始めとするJVM言語、C#、Swiftなどです。これらの言語のオーバーロードを知っていると、TypeScriptのオーバーロードは独特に思えるかもしれません。

他の言語のオーバーロードの書き方は、シグネチャごとに実装が書けます。たとえば、JVM言語のひとつのKotlinでは、次のように書けます。TypeScriptと比べると、シグネチャごとに実装が別れていて、if分岐もなく、読みやすいのではないでしょうか。

```kotlin title="Kotlinのオーバーロード関数"
fun hello(person: String) {
  println("Hello $person")
}

fun hello(persons: Array<String>) {
  println("Hello ${persons.joinToString(",")}")
}
```

では、なぜTypeScriptは、このような書き方を採用しなかったのでしょうか。理由として、JavaScriptにオーバーロードがない点が挙げられます。

TypeScriptで書いたコードは「型に関する部分を消したらJavaScriptになる」というのがTypeScriptの基本方針です。このおかげで、開発者はTypeScriptコードが意図したJavaScriptにコンパイルされたかを確認する必要がなく、TypeScriptコードを見るだけでJavaScriptコードが予測できるという利点があります。

もしも、Javaのようなオーバーロードを採用すると、JavaScriptにオーバーロードがない以上、どの関数を呼ぶかといった解決ロジックをTypeScriptがコンパイル時に生成しなければなりません。そうなると、TypeScriptの基本方針から大きく外れてしまいます。ソースコードからの予測可能性も下がります。こうしたことから、TypeScriptのオーバーロードは関数シグネチャ定義にとどめていると見られます。

## アロー関数とオーバーロード

オーバーロード関数の構文が用意されているのは関数宣言だけです。アロー関数にはオーバーロードの構文がありません。アロー関数でオーバーロード関数を作るには、関数呼び出しシグネチャで型注釈する必要があります。

```ts twoslash
// 関数呼び出しシグネチャでHello型を定義
type Hello = {
  (person: string): void;
  (persons: string[]): void;
};
// Hello型で型注釈
const hello: Hello = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
};
```

関数呼び出しシグネチャ以外に、関数型(function type)とインターセクション型を用いる方法もあります。

```ts twoslash {1-2}
// 関数型とインターセクション型を用いてHello型を定義
type Hello = ((person: string) => void) & ((persons: string[]) => void);
const hello: Hello = (person: string | string[]): void => {
  if (typeof person === "string") {
    console.log(`Hello ${person}`);
  } else {
    console.log(`Hello ${person.join(",")}`);
  }
};
```

## 関数シグネチャは詳しい順に書く

オーバーロードの関数シグネチャは順番が重要になります。TypeScriptは関数シグネチャを上から順に試していき、最初にマッチしたシグネチャを採用します。そのため、より詳しい関数シグネチャが上に、詳しくないものが下に来るように書き並べなければなりません。詳しいとは、引数の型の範囲が狭いという意味です。たとえば、`number`より`1 | 2`のほうが狭い型です。`any`は`number`より広い型です。

```ts twoslash
function func(param: 1 | 2): 1 | 2; // 詳しい関数
function func(param: number): number; // そこそこ詳しい関数
function func(param: any): any; // 詳しくない関数
function func(param: any): any {
  // ...
}
const result1 = func(1);
//    ^?
const result2 = func(100);
//    ^?
const result3 = func("others");
//    ^?
```

次の誤りのように、詳しい関数を下のほうに書いてしまうと、詳しい関数がまったく採用されなくなります。

```ts twoslash title="誤り:シグネチャの順番が間違っている"
function func(param: any): any; // 詳しくない関数。採用される
function func(param: 1 | 2): 1 | 2; // 詳しい関数。採用されない
function func(param: any): any {
  // ...
}
const result = func(1);
//     ^?
```

## オーバーロード以外も検討しよう

オーバーロード関数以外の方法を使ったほうがいい場合もあります。

### 代わりにオプション引数を使う

引数の数が違うだけの場合、オーバーロードより[オプション引数](./optional-parameters.md)を使ったほうがよいです。たとえば、次のようなオーバーロード関数は、[strictNullChecks](../tsconfig/strictnullchecks.md)が有効な場合、第2引数に`undefined`が渡せません。

```ts twoslash title="オーバーロードを使う例"
// @strictNullChecks: true
// @errors: 2345
function func(one: number): void;
function func(one: number, two: number): void;
function func(one: number, two?: number): void {}
func(1, undefined);
```

これは次のように[オプション引数](./optional-parameters.md)を使うだけにとどめたほうがよいです。

```ts twoslash title="オプション引数を使う例"
// @strictNullChecks: true
function func(one: number, two?: number): void {}
func(1, undefined);
```

### 代わりにユニオン型を使う

引数の型だけが異なる場合は、[ユニオン型](../values-types-variables/union.md)を使ったほうがシンプルです。

```ts twoslash title="オーバーロードを使う例"
function func(x: string): void;
function func(x: number): void;
function func(x: string | number) {}
```

```ts twoslash title="ユニオン型を使う例"
function func(x: string | number) {}
```

### 代わりにジェネリクスを使う

引数の型と戻り値の型に一定の対応関係がある場合は、[ジェネリクス](../generics/README.md)を使ったほうがシンプルになる場合があります。

```ts twoslash title="オーバーロードを使う例"
function func(x: boolean): boolean;
function func(x: number): number;
function func(x: string): string;
function func(x: boolean | string | number): boolean | string | number {
  return x;
}
```

```ts twoslash title="ジェネリクスを使う例"
function func<T extends boolean | number | string>(x: T): T {
  return x;
}
```
