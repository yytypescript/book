---
description: null・undefinedのチェックを厳しくする
tags: [strict]
---

# strictNullChecks

`strictNullChecks`は`null`や`undefined`のチェックを厳しくするコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 2.0
- TypeScript公式が有効化推奨

## 解説

このオプションがなかったころは言語的に`null`と`undefined`を無視していました。つまり、次のようなことが問題なくできました。

```typescript
const date: Date = null;
const error: Error = undefined;
```

当然ながら`null`には`getDay()`というプロパティは存在せず`undefined`には`message`というメソッドが存在しません。これらを呼び出そうとすると実行時エラーになります。

```typescript
date.getDay();
// TypeError: Cannot read property 'getDay' of null
error.message;
// TypeError: Cannot read property 'message' of undefined
```

このオプションを有効にすると`undefined`と`null`はそれぞれ独立した型を持つようになり`undefined`と`null`を他の型に代入することはできなくなります。

```text
error TS2322: Type 'undefined' is not assignable to type 'Error'.
const error: Error = undefined;
      ~~~~~
error TS2322: Type 'null' is not assignable to type 'Date'.
const date: Date = null;
      ~~~~
```
