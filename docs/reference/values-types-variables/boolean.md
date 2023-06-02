---
sidebar_label: boolean型
---

<!-- textlint-disable prh -->

# boolean型 (論理型)

<!-- textlint-enable prh -->

JavaScriptのboolean型は、`true`と`false`の論理値からなる型です。

## boolean型リテラル

JavaScriptのboolean型リテラルは`true`または`false`を用いて次のように書きます。

```ts twoslash
const isOk = true;
const isPanda = false;
```

## boolean型の型注釈

TypeScriptのboolean型の型注釈は`boolean`を使います。

```ts twoslash
const isOk: boolean = true;
```

TypeScriptには大文字で始まる`Boolean`型がありますが、これと`boolean`は別の型です。
