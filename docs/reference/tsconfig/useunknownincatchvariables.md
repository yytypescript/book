---
description: 例外捕捉catch(e)のeをunknown型として扱う
tags: [strict]
---

# useUnknownInCatchVariables

`useUnknownInCatchVariables`は例外捕捉`catch(e)`の`e`をunknown型として扱うコンパイラオプションです。

- デフォルト: [strict](./strict.md)が有効の場合は`true`、それ以外は`false`
- 追加されたバージョン: 4.4
- TypeScript公式が有効化推奨

## 解説

JavaScript はいかなる値も例外として投げることができます。そのため捕捉した値は`any`型でした。

```ts twoslash
// @useUnknownInCatchVariables: false
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err) {
  //       ^?
}
```

この混沌は TypeScript4.0 でようやく整理されることとなりました。捕捉した値に対して`unknown`型を明記することによって捕捉した値の型はわからないものの型安全を獲得できるようになりました。

```ts twoslash
// @useUnknownInCatchVariables: false
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err: unknown) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err: unknown) {
  //       ^?
}
```

今回のオプションはこの機能を常時有効にするものです。例外が捕捉した値は型の明記をすることなくすべてが`unknown`型として解釈されるようになります。

```ts twoslash
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err) {
  //       ^?
}
```

また、この制限を緩くしたい。つまり`unknown`型ではなく`any`型にしたいのであれば捕捉した値に対し`any`型を明記してください。
