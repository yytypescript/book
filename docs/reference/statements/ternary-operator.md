---
sidebar_label: 三項演算子
---

# 三項演算子 (ternary operator)

JavaScriptの三項演算子(ternary operator)は、条件分岐ができる演算子です。条件式、真の場合の値、偽の場合の値の三項を取るため三項演算子と呼ばれています。

```js
条件式 ? 真の場合の値 : 偽の場合の値;
```

演算の結果は変数に代入できます。

```js twoslash
const age = 20;
const drink = age >= 20 ? "ビール" : "ジュース";
console.log(drink);
// @log: "ビール"
```

条件分岐といえばif-elseですが、if-elseは構文なので上のようにif-elseを直接、値を返すような書き方はできません。

```js
// こうした書き方はできない
const drink = if (age >= 20) "ビール" else "ジュース";
```

三項演算子は条件をネストできます。

```js twoslash
const extension = "ts";
const language =
  extension === "js"
    ? "JavaScript"
    : extension === "ts"
    ? "TypeScript"
    : extension === "java"
    ? "Java"
    : "不明";
```

上のコードと同等の処理をif-elseで書くと次のようになります。

```js twoslash
const extension = "ts";
let language;
if (extension === "js") {
  language = "JavaScript";
} else if (extension === "ts") {
  language = "TypeScript";
} else if (extension === "java") {
  language = "Java";
} else {
  language = "不明";
}
```

## 関連情報

[if-else文](if-else.md)

[switch文](switch.md)
