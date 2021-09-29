# for-of文 - 拡張for文

JavaScriptで配列をループするのに使えるのがfor-of構文です。PHPの`foreach`やPythonの`for in`と使い勝手が似ている構文です。

```javascript
for (変数 of 配列) {
  文;
}
```

次の例は、配列`[1, 2, 3]`をループして順番に`1`、`2`、`3`を出力するものです。

```javascript
const numbers = [1, 2, 3];
for (const n of numbers) {
  console.log(n);
}
```

## for-ofでインデックスを取得する

JavaScriptで、for-ofで配列のインデックスと値を一緒に得るには、`entries`メソッドを組み合わせます。

```javascript
const words = ["I", "love", "TypeScript"];
for (const [index, word] of words.entries()) {
  console.log(index, word);
}
// 出力結果:
// 0 I
// 1 love
// 2 TypeScript
```

