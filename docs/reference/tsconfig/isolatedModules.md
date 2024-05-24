---
description: 個別にコンパイルされるモジュールをサポートする
---

# isolatedModules

`isolatedModules`は、各ファイルを独立して変換する際に、解釈できないコードがある場合に警告するコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 1.5

## `isolatedModules`はトランスパイラ向けのオプション

TypeScriptをJavaScriptに変換する際、複数のファイルが関連することがあります。しかし、Babelのようなトランスパイラは、1ファイルずつ処理するため、一部コードが正しく解釈されないことがあります。

具体的には、`const enum`や`namespace`などの機能を使用すると、実行時に問題が発生することがあります。`isolatedModules`は、このような問題を回避するために、正しく解釈できないコードがある場合に警告します。

## `isolatedModules`が有効な場合に機能しないコード

以下は、`isolatedModules`が有効な場合に機能しないコードの例です。

### 値でない識別子のエクスポート

TypeScriptでは、インポートした型を再エクスポートすることができます。
これは、複数のモジュールから型や関数をまとめてエクスポートする際に便利です。ただし、`isolatedModules`が有効な場合、型を再エクスポートする際に`export type`を使わないとエラーが発生します。

**問題のあるコード:**

```ts title="someModule.ts" twoslash
export type SomeType = any;
export function hello() {
  console.log("hello");
}
```

```ts twoslash title="index.ts"
// @filename: "someModule.ts"
export type SomeType = any
export function hello() {
  return { console.log("hello") };
}
// @filename: "index.ts"
// ---cut---
import { SomeType, hello } from "./someModule";

// someTypeは値?それとも型?トランスパイラには判断できない
export { SomeType, hello };
// @error: Re-exporting a type when the '--isolatedModules' flag is provided requires using 'export type'.
```

**解決策：**

`export type`を使用して型を再エクスポートすることで、エラーを回避できます。

```ts title="index.ts" twoslash
// @filename: "someModule.ts"
export type SomeType = any
export function hello() {
  return { console.log("hello") };
}
// @filename: "index.ts"
// ---cut---
import { SomeType, hello } from "./someModule";

export type { SomeType }; // 型だと判定できる
export { hello };
```

### モジュールでないファイル

`isolatedModules` が設定されている場合、すべての実装ファイルは モジュールでなければなりません。モジュールとは、`import`や`export`の構文を使用していることを意味します。ファイルがモジュールでない場合、エラーが発生します。

**問題のあるコード:**

```ts title="index.ts" twoslash
function fn() {}
// @error: 'index.ts' cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.
```

**解決策：**

ファイルをモジュール化するために、空の`export {}`文を追加します。

```ts title="index.ts" twoslash
function fn() {}

// 空の export文を追加することでモジュール化する
export {};
```

### const enum メンバーへの参照

TypeScriptでは、`const enum`のメンバーに参照すると、生成されるJavaScriptではその参照が実際の値に置き換えられます。しかし、他のトランスパイラは、メンバー値に関する情報がないため、参照を置き換えることができません。そのため、実行時にエラーが発生します。

**問題のあるコード:**

```ts title="index.ts" twoslash
declare const enum Numbers {
  Zero = 0,
  One = 1,
}

console.log(Numbers.Zero + Numbers.One);
// @error: Cannot access ambient const enums when the '--isolatedModules' flag is provided.
```

**解決策:**

`const enum`の代わりに、通常の`enum`を使用することで、エラーを回避できます。

```ts title="numbers.ts" twoslash
enum Numbers {
  Zero = 0,
  One = 1,
}

// 通常の enum への参照は許可されます
console.log(Numbers.Zero + Numbers.One);
```

`isolatedModules`は、このような問題を回避するためのコンパイラオプションです。
警告を出してくれることにより、コンパイラが正しく解釈できないコードの存在に気がつくことができます。

## `create-react-app`や`create-next-app`で生成されたtsconfig.jsonの`isolatedModules`をfalseにしてはいけない

ReactやNext.jsの雛形生成ツールによって作成されたtsconfig.jsonでは、`isolatedModules`が有効化されています。これは、ReactやNextが内部でBabelを使用しているためです。`isolatedModules`をfalseに変えてしまうとビルドできなくなる可能性があるため、設定を変更しないようにしましょう。

<PostILearned>

✅isolatedModulesはファイル単位での変換を前提に解釈できないコードをチェックする
🚧Babelなどのトランスパイラとの互換性向上のために存在する
👍isolatedModulesは有効にしよう

</PostILearned>
