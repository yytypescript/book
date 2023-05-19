# never型

`never`型は「値を持たない」を意味するTypeScriptの特別な型です。

## neverの特性

### 何も代入できない

`never`型には何も代入できません。

```ts twoslash
// @errors: 2322
const foo: never = 1;
```

たとえany型でも代入は不可能です。

```ts twoslash
// @errors: 2322
const any: any = 1;
const foo: never = any;
```

唯一`never`型は代入できます。

```ts twoslash
const foo: never = 1 as never;
```

### 何にでも代入できる

`never`型はどんな型にも代入できます。

```ts twoslash
const nev = 1 as never;
const a: string = nev; // 代入OK
const b: string[] = nev; // 代入OK
```

## 値が無いとは

`never`型の「値が無い」とはどういうことでしょうか。たとえば、例外が必ず発生する関数の戻り値です。戻り値は絶対に取れません。そのため、戻り値の型は`never`型になります。

```ts twoslash
function throwError(): never {
  throw new Error();
}
```

終了しない関数も戻り値が`never`型になります。

```ts twoslash
function forever(): never {
  while (true) {} // 無限ループ
}
```

作り得ない値も`never`型になります。たとえば、number型とstring型の両方に代入可能な値は作れません。そのため、number型とstring型の[インターセクション型](../values-types-variables/intersection.md)は`never`型になります。

```ts twoslash
type NumberString = number & string;
//   ^?
```

## void型とnever型の違い

`void`型は`undefined`が代入できますが、`never`は値を持てません。

```ts twoslash
// @errors: 2322
const ok: void = undefined;
const ng: never = undefined;
```

意味的に戻り値での`void`と`never`は、戻り値が無い点は同じです。関数が終了するかが異なります。`void`は関数が最後まで実行されるという意味です。`never`は関数の処理が中断、もしくは、永遠に続くことを意味します。

| 型      | 戻り値 | 終了するか                           |
| ------- | ------ | ------------------------------------ |
| `void`  | 無い   | `return`されるか、最後まで実行される |
| `never` | 無い   | 中断されるか、永遠に実行される       |

そのため、戻り値が`never`の関数が最後まで到達できてしまう実装の場合、TypeScriptはコンパイルエラーを出します。

```ts twoslash
// @errors: 2534
function func(): never {}
```

## neverを使った網羅性チェック

`never`の何も代入できないという特性は、網羅性チェック(exhaustiveness check)に応用できます。網羅性チェックとは、[ユニオン型](../values-types-variables/union.md)を分岐処理するとき、ロジックがすべてのパターンを網羅しているかをコンパイラにチェックさせることを言います。

たとえば、3パターンのユニオン型があるとします。

```ts twoslash
type Extension = "js" | "ts" | "json";
```

このうち2パターンにだけ対応した分岐処理が次です。これには網羅性がありませんが、TypeScriptは警告を出しません。

```ts twoslash title="網羅性がない分岐"
type Extension = "js" | "ts" | "json";
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    // "json"に対する分岐がない
  }
}
```

### 網羅性チェックの基本

網羅性チェックを行うには、`default`分岐で網羅性をチェックしたい値をnever型に代入します。すると、TypeScriptが代入エラーの警告を出すようになります。

```ts twoslash title="網羅性チェックがついた分岐"
// @errors: 2322
type Extension = "js" | "ts" | "json";
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    default:
      const exhaustivenessCheck: never = ext;
      break;
  }
}
```

### 例外による網羅性チェック

一歩進んで網羅性チェック用の例外クラスを定義するのがお勧めです。このクラスは、コンストラクタ引数に`never`型を取る設計にします。

```ts twoslash title="網羅性チェック関数"
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
```

この例外を`default`分岐で投げるようにします。コンストラクタに網羅性をチェックしたい引数を渡します。こうしておくと、網羅性が満たされていない場合、TypeScriptが代入エラーを警告します。

```ts twoslash
// @errors: 2345
type Extension = "js" | "ts" | "json";
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
// ---cut---
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JavaScript");
      break;
    case "ts":
      console.log("TypeScript");
      break;
    default:
      throw new ExhaustiveError(ext);
  }
}
```

例外にしておく利点は2つあります。

1. `noUnusedLocals`に対応可能
2. 実行時を意識したコードになる

#### `noUnusedLocals`に対応可能

コンパイラオプション[`noUnusedLocals`](../tsconfig/nounusedlocals.md)は使われていない変数について警告を出すかを設定します。これが`true`のとき、変数に代入するだけの網羅性チェックはコンパイルエラーになります。

```ts twoslash title="全網羅するも未使用変数で警告される"
// @noUnusedLocals: true
// @errors: 6133
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      const exhaustivenessCheck: never = value;
      break;
  }
}
```

網羅性チェックを例外にしておくと、未使用変数についてのコンパイルエラーが発生しなくなります。

#### 実行時を意識したコードになる

例外のほうが、コンパイル後のJavaScriptを意識した実装になります。変数代入による網羅性チェックのコードをコンパイルすると、次のJavaScriptが生成されます。

```ts twoslash title="コンパイル後のJavaScript(変数代入による網羅性チェック)"
// @alwaysStrict: false
// @showEmit
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      const exhaustivenessCheck: never = value;
      break;
  }
}
```

コンパイルもとのTypeScriptを知らない者がこのコードを見ると、`exhaustivenessCheck`への代入は意図が不明です。また、網羅性のチェックは実行時に行われません。

例外による網羅性チェックは、コンパイル後コードだけ見ても意図が明瞭です。また、実行時にもチェックが行われます。このほうがよい実装になります。

```ts twoslash title="コンパイル後のJavaScript(例外による網羅性チェック)"
// @alwaysStrict: false
// @showEmit
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
function func(value: "yes" | "no"): void {
  switch (value) {
    case "yes":
      console.log("YES");
      break;
    case "no":
      console.log("NO");
      break;
    default:
      throw new ExhaustiveError(value);
  }
}
```

<TweetILearned>

TypeScriptのneverは「値を持たない」型。

1️⃣特性1: neverへは何も代入できない
2️⃣特性2: neverは何にでも代入できる
💥常に例外を起こす関数の戻り値に使える
👐voidとは異なる
✅網羅性チェックに応用できる

</TweetILearned>
