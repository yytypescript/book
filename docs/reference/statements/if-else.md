# if-else文

JavaScriptの条件分岐はJavaやPHPと同じようにif-else構文を用います。

```js twoslash
if (value === 0) {
  // ...
} else {
  // ...
}
```

JavaScriptにもelse-ifがあります。`else if`のようにelseとifの間にはスペースが必要です。

```js twoslash
if (value === 0) {
  // ...
} else if (value === 1) {
  // ...
} else {
  // ...
}
```

JavaScriptのif-elseは文です。式ではないので、条件分岐を直接変数に代入することはできません。

```js
// こんな書き方はできない
const result = if (value === 0) "OK" else "NG";
```

式で条件分岐を使いたい場合は三項演算子(ternary operator)を用います。

```js twoslash
const result = value === 0 ? "OK" : "NG";
```

[三項演算子 (ternary operator)](ternary-operator.md)

上のコードと同じロジックをif-elseで書く場合は、`if`ブロックの手前で結果を代入する変数を`let`で宣言します。

```js twoslash
let result;
if (value === 0) {
  result = "OK";
} else {
  result = "NG";
}
```

## 関連情報

[switch文](switch.md)
