---
description: bind、call、applyの型チェックを厳しくする
tags: [strict]
---

# strictBindCallApply

`strictBindCallApply`は`bind`、`call`、`apply`の型チェックを厳しくするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 3.2
- TypeScript公式が有効化推奨

## `bind`、`call`、`apply`が型チェックされない

`strictBindCallApply`が`false`(TypeScriptのデフォルト)の場合、ビルトイン関数`bind`、`call`、`apply`の引数の型をチェックしません。

```ts twoslash
// @strictBindCallApply: false
// 引数が文字列型の関数
function fn(x: string) {}

// 渡す引数は数値型だが、警告は出ない
fn.call(undefined, 122);
```

`bind`、`call`、`apply`で呼び出す関数の戻り値型注釈は無視され、戻り値の型は`any`になります。

```ts twoslash
// @strictBindCallApply: false
function fn(): string {
  return "str";
}
const x = fn.call(undefined);
//    ^?
```

`strictBindCallApply`が`false`の場合、実行時エラーが発生する恐れがあります。

```ts twoslash
function fn(x: string) {
  x.toUpperCase();
}
const x = fn.call(undefined, 123);
// @error: TypeError: x.toUpperCase is not a function
// @strictBindCallApply: false
```

## `bind`、`call`、`apply`の型チェックを行う

`strictBindCallApply`を`true`にすると、`bind`、`call`、`apply`の型チェックが行われます。

```ts twoslash
// @errors: 2345
function fn(x: string) {}
fn.call(undefined, 123);
```

加えて、戻り値の型は呼び出す関数の戻り値型になります。

```ts twoslash
function fn(): string {
  return "str";
}
const x = fn.call(undefined);
//    ^?
```

戻り値に型がつくため、補完が効くメリットもあります。

```ts twoslash
// @noErrors
function fn(): string {
  return "str";
}
const str = fn.call(undefined);
str.toU;
//     ^|
```

`strictBindCallApply`は有効にするのがお勧めです。

<TweetILearned>

TypeScriptのstrictBindCallApplyはbind、call、applyの型チェックを厳しくするコンパイラオプション

【falseの場合】
❌引数の型チェックがされない
⚠️戻り値はanyになる

【trueの場合】
✅引数の型チェックがされる
💚戻り値に型がつく
👍有効化推奨

</TweetILearned>

## 関連情報

[strict](./strict.md)
