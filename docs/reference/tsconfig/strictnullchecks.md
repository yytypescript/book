---
description: null・undefinedのチェックを厳しくする
tags: [strict]
---

# strictNullChecks

`strictNullChecks`は`null`や`undefined`のチェックを厳しくするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 2.0
- TypeScript公式が有効化推奨

## `null`と`undefined`が代入できる危険性

TypeScriptでは`strictNullChecks`が`false`の場合、`null`と`undefined`の代入がチェックされません。非null型や非undefined型の変数にも、`null`と`undefined`が代入できます。

```ts twoslash title="strictNullChecksがfalseの場合"
// @strictNullChecks: false
const date: Date = null; // OK
const error: Error = undefined; // OK
```

`null`や`undefined`にはプロパティが存在しません。そのため、JavaScript実行時にエラーになります。

```ts twoslash
const date: Date = null; // OK
// ---cut---
date.getDay();
// @error: Cannot read properties of null (reading 'getDay')
// @strictNullChecks: false
```

`strictNullChecks`が`true`の場合、非Null型への`null`の代入、非undefined型への`undefined`の代入それぞれがコンパイルエラーになります。

```ts twoslash title="strictNullChecksがtrueの場合"
// @strictNullChecks: true
// @errors: 2322
const date: Date = null;
const error: Error = undefined;
```

## 関数の戻り値の型への影響

`strictNullChecks`の設定によって、関数の戻り値の型が変わることがあります。配列の`find`メソッドの戻り値の型は、要素の型もしくは`undefined`です。しかし、`strictNullChecks`が`false`の場合、戻り値が`undefined`になる可能性をコンパイラが考えなくなります。戻り値に`null`が入る可能性がある関数、たとえば`getElementById`の場合も同様です。

```ts twoslash title="strictNullChecksがfalseの場合"
// @strictNullChecks: false
const result = [1, 2, 3].find((x) => x == 1);
//    ^?
const element = document.getElementById("main");
//    ^?
```

`strictNullChecks`が`true`の場合は、`undefined`や`null`が戻り値になる可能性をコンパイラが考慮します。そのため、`find`なら要素の型と`undefined`のユニオン型に、`getElementById`なら`HTMLElement | null`になります。

```ts twoslash title="strictNullChecksがtrueの場合"
// @strictNullChecks: true
const result = [1, 2, 3].find((x) => x == 1);
//    ^?
const element = document.getElementById("main");
//    ^?
```

この設定の効果は、ユーザーが定義した関数にも及びます。たとえば、関数の戻り値を`string | undefined`と型注釈したとしても、`strictNullChecks`が`false`の場合は`string`型になります。

```ts twoslash title="strictNullChecksがfalseの場合"
// @strictNullChecks: false
// ユーザーが定義した関数
function getStringOrUndefined(): string | undefined {
  return undefined;
}
const value = getStringOrUndefined();
//    ^?
```

## `strictNullChecks`は有効にしよう

`null`や`undefined`を期待しない変数にそれらが代入できるのは危険です。また、関数の戻り値に`null`や`undefined`が入る可能性が見えなくなることも、思わぬバグを生む原因になります。`strictNullChecks`は`true`を設定するのがお勧めです。

<TweetILearned>

😱TypeScriptデフォルトでnullとundefinedの代入チェックをしない(どんな型にも代入できる)
✅コンパイラオプションstrictNullChecksをtrueにすると、nullとundefinedの代入がチェックされる
👍strictNullChecksは有効にしよう

</TweetILearned>

## 関連情報

[strict](./strict.md)

[null型](../values-types-variables/null.md)

[undefined型](../values-types-variables/undefined.md)
