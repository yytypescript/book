# for-of文 - 拡張for文

JavaScriptで配列をループするのに使えるのがfor-of構文です。PHPの`foreach`やPythonの`for in`と使い勝手が似ている構文です。

```js
for (変数 of 配列) {
  文;
}
```

次の例は、配列`[1, 2, 3]`をループして順番に`1`、`2`、`3`を出力するものです。

```js twoslash
const numbers = [1, 2, 3];
for (const n of numbers) {
  console.log(n);
}
```

## for-ofでインデックスを取得する

JavaScriptで、for-ofで配列のインデックスと値を一緒に得るには、`entries`メソッドを組み合わせます。

```js twoslash
const words = ["I", "love", "TypeScript"];
for (const [index, word] of words.entries()) {
  console.log(index, word);
}
// @log: 0 I

// @log: 1 love

// @log: 2 TypeScript
```

## 関連情報

[配列をループする方法](../values-types-variables/array/how-to-loop-an-array.md)

[オブジェクトをループする方法](../values-types-variables/object/how-to-loop-an-object.md)
